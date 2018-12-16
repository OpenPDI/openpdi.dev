"""wapo.py

This fetches, calculates, and updates everything we need for our
officer-involved shootings page. The primary data source is The Washington
Post's database: https://github.com/washingtonpost/data-police-shootings
"""
import codecs
import collections
import csv
import datetime
import json

import addfips
import requests

from variables import STATE_POPS, ABBR_TO_STATE, CITY_TO_COUNTY
from utils import write_json, write_js

FIPS = addfips.AddFIPS()
REPO = "https://raw.githubusercontent.com/washingtonpost/data-police-shootings/"
BLOB = "master/fatal-police-shootings-data.csv"

TODAY = datetime.datetime.today()
WAPO_RACE = {
    "W": "White",
    "B": "Black",
    "A": "Asian",
    "N": "Native American",
    "H": "Hispanic",
}
# B = (325,719,178 * .12) / 100,000,000
RACE_POPS = {"W": 1.986, "B": 0.390, "H": 0.586, "N": 0.032, "A": 0.195}

# VARIABLE #1: The total number of shootings in each state per year:
totals_by_year = {}
for k in STATE_POPS.keys():
    totals_by_year[k] = collections.Counter(
        [str(x) for x in range(2015, TODAY.year + 1)]
    )

# VARIABLE #2: The total number of shootings by race:
totals_by_race = {}
for k in WAPO_RACE:
    totals_by_race[k] = 0

# VARIABLE #3: Shootings by weapon and race.
by_weapon_race = {k: {} for k in ABBR_TO_STATE.keys()}
for state in by_weapon_race:
    for cat in ["unarmed", "gun", "other"]:
        by_weapon_race[state][cat] = {k: 0 for k in WAPO_RACE.values()}

# VARIABLE #4: Shootings by their fips code.
by_fips = {}

# VARIABLE #5: Shootings by race and state.
by_state_race = {k: {} for k in ABBR_TO_STATE.keys()}
for state in by_state_race:
    by_state_race[state] = {k: 0 for k in WAPO_RACE.values()}

# Fetch the latest version of the database from GitHub:
with requests.get(REPO + BLOB, stream=True) as r:
    database = []
    for row in csv.DictReader(codecs.iterdecode(r.iter_lines(), "utf-8")):
        city, state, year = row["city"], row["state"], row["date"].split("-")[0]

        weapon, race = row["armed"], WAPO_RACE.get(row["race"])
        if any(x in weapon for x in ("gun", "guns")):
            weapon = "gun"
        elif weapon in ("unknown", "undetermined", "unarmed"):
            weapon = "unarmed"
        else:
            weapon = "other"

        totals_by_year[state][year] += 1
        if race:
            by_state_race[state][race] += 1
            by_weapon_race[state][weapon][race] += 1
            totals_by_race[row["race"]] += 1

        try:
            full_state = ABBR_TO_STATE[state]
            query = "{0}, {1}".format(city, full_state)
            county = CITY_TO_COUNTY[query]

            fips = FIPS.get_county_fips(county, state=full_state)
            if fips:
                fips_key = "us-{0}-{1}".format(state.lower(), fips[-3:])
                if state in by_fips and fips_key in by_fips[state]:
                    by_fips[state][fips_key] += 1
                elif state in by_fips:
                    by_fips[state][fips_key] = 1
                else:
                    by_fips[state] = {fips_key: 1}
        except KeyError as e:
            # FIXME: Add manually?
            print("Skipping", query)

        database.append(row)

    # Calculate the per 1 million averages:
    for state, pops in STATE_POPS.items():
        for year, total in totals_by_year[state].items():
            # If we don't have data on the current year yet, fall back to last
            # year.
            pop = pops.get(year, pops[str(TODAY.year - 1)])
            totals_by_year[state][year] = str(round(total / pop, 3))

    # Calculate the per 1 million averages by race:
    for race, pop in RACE_POPS.items():
        if race in RACE_POPS:
            total = RACE_POPS[race]
            totals_by_race[race] = round(totals_by_race[race] / total, 3)

    # Required for HighCharts.
    cats = ["Asian", "Black", "Hispanic", "Native American", "White"]
    for state, history in by_weapon_race.items():
        for weapon in history:
            by_weapon_race[state][weapon] = [history[weapon][k] for k in cats]

    write_js(
        "ois",
        [
            ("by_weapon_race", by_weapon_race),
            ("by_race", by_state_race),
            ("by_county", by_fips),
            ("by_1_mil", totals_by_year),
            ("by_1_mil_race", totals_by_race),
            ("wapo_db", database),
        ],
    )

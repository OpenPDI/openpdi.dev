import os

import jinja2_highlight
import ujson

from flask import Flask, render_template
from flask_assets import Environment, Bundle


class MyFlask(Flask):
    jinja_options = dict(Flask.jinja_options)
    jinja_options.setdefault("extensions", []).append(
        "jinja2_highlight.HighlightExtension"
    )


app = MyFlask(__name__)


def read_json(path):
    """Read and return the given JSON file.
    """
    with open(os.path.join("app", "data", path)) as f:
        return ujson.load(f)


SHOOTINGS_BY_COUNTY = read_json("shootings_by_county.json")
SHOOTINGS_VS_NATION = read_json("shootings_vs_nation.json")


@app.route("/")
def home():
    """Render the home page.
    """
    return render_template("pages/home.html")


@app.route("/about")
def about():
    """Render the about page.
    """
    return render_template("pages/about.html")


@app.route("/national")
def national():
    """Render the national page.
    """
    return render_template("pages/national.html")


@app.route("/state-entry")
def state_entry():
    """Render the state-entry page.
    """
    return render_template("pages/state-entry.html")


@app.route("/states/<code>")
def state(code):
    """Render a state-specific page.

    `code` is a two-letter state code -- e.g., "TX" for Texas.
    """
    meta = read_json("states/{0}/meta.json".format(code))

    # Calculate the occurrences of each weapon type within each race:
    #
    # TODO: Pre-compute this?
    history = read_json("weapons_by_race.json")[code]
    cats = ["Asian", "Black", "Hispanic", "Native American", "White", "Other"]
    by_weapon = {}
    for weapon in history:
        by_weapon[weapon] = [history[weapon][k] for k in cats]

    # Get the number of shootings for each race:
    by_race = read_json("shootings_by_race.json")[code]
    by_fips = read_json("shootings_by_fips.json")[code]

    # Get the pre-computed shootings stats:
    by_county, by_year = SHOOTINGS_BY_COUNTY[code], SHOOTINGS_VS_NATION[code]

    # Get the national average:
    nation = SHOOTINGS_VS_NATION["nat"]

    return render_template(
        "pages/state.html",
        state_meta=meta,
        by_county=by_county,
        by_weapon=by_weapon,
        by_race=by_race,
        by_fips=list(by_fips.items()),
        by_year=[by_year[k] for k in sorted(by_year)],
        nation_by_year=[nation[k] for k in sorted(nation)],
    )


@app.route("/agencies/<name>")
def agency(name):
    """TODO
    """
    state, _ = name.split("-")
    meta = read_json("states/{0}/meta.json".format(state))
    for a in meta.get("agencies", []):
        if a["id"] == name:
            agency = a

    try:
        depts = read_json("states/{0}/depts/{1}.json".format(state, name))
        titles = [k for k in depts.keys() if k != "dept"]
        return render_template(
            "pages/agency.html", dist=titles[0], data=depts, agency=agency, names=titles
        )
    except FileNotFoundError as e:
        return render_template("pages/agency.html", agency=agency)


# Static assets
assets = Environment(app)

js = Bundle(
    "js/lib/jquery.min.js",
    "js/lib/uswds.min.js",
    filters="jsmin",
    output="js/lib.min.js",
)
assets.register("js_all", js)

css = Bundle(
    "css/uswds.css",
    "css/code.css",
    filters="cssmin",
    output="css/lib.min.css",
)

assets.register("css_all", css)

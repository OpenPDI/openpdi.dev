import csv
import json
import tempfile

import openpdi
import pandas as pd

from utils import write_js, write_json

ORDER = ['Resistance', 'Active Aggression', 'Non-compliance', 'Fleeing', 'Weapon Display', 'Other']


def read_dataset(src):
    """Read the given `openpdi.Dataset` into a `pandas.Dataframe`.
    """
    df = pd.read_csv(src, dtype="str")
    # Map column values to force categories.
    #
    # TODO: Train a classifier?
    dv = {
        "ARREST": "RESISTANCE",
        "NECESSARY TO EFFECT ARREST / DETENTION": "RESISTANCE",
        "RESISTING LAWFUL ARREST": "RESISTANCE",
        "SUBJECT RESISTING ARREST": "RESISTANCE",
        "ACTIVE RESISTANCE": "RESISTANCE",
        "ACTIVE RESISTER UNARMED": "RESISTANCE",
        "ACTIVE RESISTER ARMED": "RESISTANCE",
        "RESISTING OFFICER W/WEAPON": "RESISTANCE",
        "DEFENSIVE RESISTANCE": "RESISTANCE",
        "PASSIVE RESISTANCE": "RESISTANCE",
        "RESISTING ARREST": "RESISTANCE",
        "SUBJECT RESISTING LEGAL 2000": "RESISTANCE",
        "FLIGHT FROM AN OFFICER": "FLEEING",
        "ESCAPE": "FLEEING",
        "ACTIVE FLEEING": "FLEEING",
        "SUBJECT FLEEING": "FLEEING",
        "REFUSE VERBAL COMMANDS": "NON-COMPLIANT",
        "SUBJECT NON COMPLIANT": "NON-COMPLIANT",
        "PASSIVE NON COMPLIANT": "NON-COMPLIANT",
        "UNARMED ATTACK": "ACTIVE AGGRESSION",
        "ARMED THREATENING": "ACTIVE AGGRESSION",
        "UNARMED THREATENING": "ACTIVE AGGRESSION",
        "ARMED ATTACK": "ACTIVE AGGRESSION",
        "ASSAULTING OFFICER(S)": "ACTIVE AGGRESSION",
        "ASSAULT TO OTHER PERSON": "ACTIVE AGGRESSION",
        "ASSAULTING CITIZEN(S)": "ACTIVE AGGRESSION",
        "COMBATIVE SUSPECT": "ACTIVE AGGRESSION",
        "SUBJECT COMBATIVE": "ACTIVE AGGRESSION",
        "BATTERY ON POLICE OFFICER": "ACTIVE AGGRESSION",
        "NECESSARY TO DEFEND REPORTING OFFICER": "ACTIVE AGGRESSION",
        "NECESSARY TO DEFEND ANOTHER": "ACTIVE AGGRESSION",
        "DESTRUCTIVE SELF/OTHERS": "ACTIVE AGGRESSION",
        "DANGER TO SELF OR OTHERS": "ACTIVE AGGRESSION",
        "TO PREVENT A VIOLENT FELONY": "ACTIVE AGGRESSION",
        "ILLEGAL CARRYING OF A WEAPON": "WEAPON DISPLAY",
        "WEAPON EXHIBITED": "WEAPON DISPLAY",
        "POSSIBLY ARMED SUBJECT": "WEAPON DISPLAY",
        "IN CUSTODY, MAINTAINING CONTROL": "OTHER",
        "TO RESTRAIN FOR SUBJECTS SAFETY": "OTHER",
        "TACTICAL DEPLOYMENTS": "OTHER",
        "OTHER (DOCUMENT IN SUPPLEMENT)": "OTHER",
        "BARRICADED PERSON": "OTHER",
        "CROWD DISBURSEMENT": "OTHER",
        "DETENTION/FRISK": "OTHER",
        "PROPERTY DESTRUCTION": "OTHER",
        "ROOM CLEARING": "OTHER",
        "AGGRESSIVE ANIMAL": "OTHER",
    }
    # Perform the category standardization:
    df = df.replace(dv)
    return df[df["reason"].isin(set(dv.values()))]


# Step 1: Find all entries that specify a 'reason' for using force:
dataset = openpdi.Dataset("uof", columns=["reason"], strict=True)

# Write to a CSV file:
with tempfile.NamedTemporaryFile("w+") as temp:
    writer = csv.writer(temp, delimiter=",", quoting=csv.QUOTE_ALL)
    writer.writerows(dataset.download())

    df = read_dataset(temp.name)
    dt = df["reason"].value_counts().to_dict()

    total, freqs = sum(dt.values()), {}
    for r, c in dt.items():
        freqs[r] = round(c / total, 3) * 100

    assert sum(freqs.values()) > 99.9 and sum(freqs.values()) < 100
    write_json("uof-meta.json", {"total": df.shape[0], "cat_freqs": freqs})

# Step 2: Find all entries that specify a 'reason' and a 'force_type':
dataset = openpdi.Dataset("uof", columns=["reason", "force_type"], strict=True)

# Write to a CSV file:
with tempfile.NamedTemporaryFile("w+") as temp:
    writer = csv.writer(temp, delimiter=",", quoting=csv.QUOTE_ALL)
    writer.writerows(dataset.download())

    df = read_dataset(temp.name)
    gf = df.groupby(["reason", "force_type"])

    physical = [
        "ARM BAR",
        "LEG",
        "FEET",
        "LEGS",
        "BALANCE DISPLACEMENT",
        "JOINT",
        "HAND",
        "PRESSURE POINTS",
        "TAKE DOWN",
        "HANDS",
        "ARMS",
        "HELD",
        "PUSH",
        "PUSHED",
        "GRABBED",
        "ELBOW",
        "HOLD",
        "STACKED WEIGHT",
        "TRIPPED",
        "PHYSICAL",
    ]
    impact = ["STRIKE", "BATON", "BEAN", "BAG", "BAR", "HAMMER"]
    chemical = ["OC", "SPRAY", "PEPPERBALL", "PEPPER", "CS"]
    weapon = ["WEAPON", "FIREARM", "HANDGUN", "LETHAL", "RIFLE", "SHOTGUN"]
    electric = ["CEW", "TASER", "LASER"]
    canine = ["CANINE"]

    mapped = {
        "ACTIVE AGGRESSION": {},
        "RESISTANCE": {},
        "FLEEING": {},
        "NON-COMPLIANT": {},
        "WEAPON DISPLAY": {},
        "OTHER": {},
    }

    for group, _ in gf:
        label = group[0]
        if label not in mapped:
            continue

        options = set([x.strip() for x in group[1].split(",")])
        for f in options:
            if any(s in f for s in physical):
                k = "PHYSICAL"
            elif any(s in f for s in impact):
                k = "IMPACT"
            elif any(s in f for s in chemical):
                k = "CHEMICAL"
            elif any(s in f for s in weapon):
                k = "WEAPON"
            elif any(s in f for s in electric):
                k = "ELECTRIC"
            elif any(s in f for s in canine):
                print("WOOP")
                k = "CANINE"
            else:
                pass
                # print("No category for", f)

            if k in mapped[label]:
                mapped[label][k] += 1
            else:
                mapped[label][k] = 1

    # HACK: re-structuring for Highcharts.
    keys = mapped["OTHER"].keys()
    by_response = {k: [] for k in keys}
    for k in keys:
        for label in mapped:
            if k in mapped[label]:
                by_response[k].append(mapped[label][k])
            else:
                by_response[k].append(0)

    write_js("uof", [("by_response", by_response)])

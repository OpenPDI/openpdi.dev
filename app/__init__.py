import codecs
import csv
import datetime
import os

import requests
import ujson
import us

from flask import Flask, render_template, jsonify
from flask_assets import Environment, Bundle


app = Flask(__name__)


def read_json(path):
    """Read and return the given JSON file.
    """
    with open(os.path.join("app", "static", "data", path)) as f:
        return ujson.load(f)


@app.route('/_shootings')
def fetch_wapo():
    """Fetch the latest OIS database from GitHub.
    """
    host = "https://raw.githubusercontent.com"
    repo = "washingtonpost/data-police-shootings/master"
    data = "fatal-police-shootings-data.csv"

    with requests.get('/'.join([host, repo, data]), stream=True) as r:
        stream = csv.DictReader(codecs.iterdecode(r.iter_lines(), "utf-8"))
        return jsonify(data=list(stream))


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


@app.route("/uof")
def uof():
    """Render the Use of Force page.

    This page uses data collected and hosted by The OpenPDI project -- see
    `scripts/uof.py` for more information on how we process the data.
    """
    pt = os.path.join("app", "static", "js", "uof", "data.js")
    ts = os.path.getmtime(pt)
    dt = datetime.datetime.utcfromtimestamp(ts).strftime("%m-%d-%Y")

    meta = read_json("uof-meta.json")
    return render_template("pages/uof.html",
        updated=dt,
        total=meta["total"],
        freqs=meta["cat_freqs"])


@app.route("/ois")
def ois():
    """Render the officer-involved shootings page.

    This page uses data collected and hosted by The Washington Post -- see
    `scripts/wapo.py` for more information on how we process the data.
    """
    pt = os.path.join("app", "static", "js", "ois", "data.js")
    ts = os.path.getmtime(pt)
    dt = datetime.datetime.utcfromtimestamp(ts).strftime("%m-%d-%Y")
    return render_template("pages/ois.html",
        states=[s.abbr for s in us.states.STATES],
        updated=dt)


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
    "js/polyfills.js",
    filters="jsmin",
    output="js/lib.min.js",
)
assets.register("js_all", js)

css = Bundle(
    "css/uswds.css", "css/code.css", filters="cssmin", output="css/lib.min.css"
)

assets.register("css_all", css)

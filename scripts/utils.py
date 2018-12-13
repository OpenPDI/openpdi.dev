import csv
import io
import os

import requests
import ujson


def write_js(path, variables):
    """Read and return the given JSON file.
    """
    with open(os.path.join("app", "static", "js", path, "data.js"), "w+") as f:
        for var in variables:
            f.write("var {0} = {1};\n".format(var[0], ujson.dumps(var[1])))


def read_json(path):
    """Read and return the given JSON file.
    """
    with open(os.path.join("app", "data", path)) as f:
        return ujson.load(f)


def write_json(path, data):
    """Write the given JSON to the given file.
    """
    with open(os.path.join("app", "data", path), "w+") as f:
        ujson.dump(data, f)


def read_csv(text, start):
    """Read the given string as a CSV file.
    """
    csvfile = io.StringIO(text)
    dialect = csv.Sniffer().sniff(csvfile.readline())

    reader = csv.reader(csvfile, dialect)
    for _ in range(start - 1):
        # NOTE: we use 'start - 1' because we've already read the first line
        # (see above).
        next(reader)

    return reader


def fetch(url):
    """Fetch the provided resource, ``url``.
    """
    r = requests.get(url, allow_redirects=True)
    return read_csv(r.text, 1)


def change(current, previous):
    """Calculate the percent change between `current` and `previous`.
    """
    if current == previous:
        return 0
    try:
        v = ((current - previous) / previous) * 100.0
        if v > 0:
            return "+{:.2f}".format(v)
        return "{:.2f}".format(v)
    except ZeroDivisionError:
        return 0

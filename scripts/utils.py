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
            if hasattr(var[1], "to_json"):
                data = var[1].to_json()
            else:
                data = ujson.dumps(var[1])
            f.write("var {0} = {1};\n".format(var[0], data))


def read_json(path):
    """Read and return the given JSON file.
    """
    with open(os.path.join("app", "static", "data", path)) as f:
        return ujson.load(f)


def write_json(path, data, parse=True):
    """Write the given JSON to the given file.
    """
    with open(os.path.join("app", "static", "data", path), "w+") as f:
        if parse:
            ujson.dump(data, f)
        else:
            f.write(data)


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

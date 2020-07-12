---
title: About the OpenPDI
slug: about
layout: single
---

In May 2015, the White House launched the [Police Data Initiative][1] (PDI) in an effort to
encourage law enforcement agencies to release data on their interactions with the communities they
serve:

> The Police Data Initiative promotes the use of open data to encourage joint problem solving,
> innovation, enhanced understanding, and accountability between communities and the law
> enforcement agencies that serve them.

The PDI has largely been a success, with [more than 130 agencies][2] releasing data on topics
including officer-involved shootings, use-of-force incidents, and traffic stops.

However, when it comes to actually analyzing and visualizing the data, there are still a number of
challenges&mdash;as explained by DJ Patil, former U.S. chief data scientist, during a
[Twitter Q&amp;A][3] on the initiative.

> I've found in my experience that cleaning the data is 80% of the hard work.

The above quote is making reference to a well-known adage of data science (known as the
"80/20 rule"): 80 percent of a data scientist's time is spent cleaning, standardzing, or otherwise
preparing data for analysis.

This is especially true for a project like the PDI, which accepts data from hundreds of different
sources without enforcing any submission standards or guidelines.

## Introducing the OpenPDI

The OpenPDI project is an unofficial, open-source effort to aggregate, standardize, and present
data on police activity in the U.S. In other words, we hope to address the "80/20 rule" when it
comes to publicly-available police data, allowing other scientists and reseachers to focus on
actual analysis.

And while we share many of the same goals as the PDI, our efforts aren't limited to PDI-submitted
data: we hope to eventually include data from a wide range of sources, including law enforcement
agencies, universities, media outlets, and other grassroots organizations.

The high-level goals of the project are dicussed in more depth below.

### Storage

The PDI provides an index of available data</a>, but doesn't actually collect or maintain the data
itself.

> The agencies participating in this community of practice have chosen to release their data to the
> public, therefore anyone can collect the data. However, it is important to note that this
> initiative, the DOJ COPS Office, nor The Police Foundation are collecting this data at the
> national level.

This means that, in many cases, the long-term availability of data is dependent on a particular
agency maintaining links to data stored on their own servers.

The OpenPDI project aims to address the potential issues with this practice by collecting and
publishing the raw, unprocessed data through publicly-accessible [GitHub releases][4].

This follows the trend of maintaining a public release history for non-code assets set by a number
of science-related Python projects&mdash;such as the popular [spaCy library][5].

See the [GitHub repository][6] for more information.

### Standardization

Since the PDI merely provides links to external data sources, there are no formatting requirements.
This means that there's significant variation within the datasets submitted to the PDI (e.g., file
types, column names, and value formats), which makes it difficult to perform analysis between
states, agencies, and even years within the same agency.

![A diagram showing how different data sources can differ.](/img/diagrams/standard.svg)

The OpenPDI solves this issue by providing <i>standardized</i> access to all or our aggregated data through an MIT-licensed, open-source Python library.

See the [OpenPDI/code](/code) for more information.

### Exploration

While spreadsheet-compatible file types are ideal for data analysis and research, the average
person is unlikely to gain much from looking through a 5,000 line CSV file. This makes it
difficult for anyone without research or programming experience to explore the available data.

OpenPDI aims to lower the entry barrier to the PDI by using `openpdi.dev` (this website) as a means
for non-technical users to explore the available data. Inspired by projects like the Knight News
Challenge-funded [Census Reporter][7], our goal is to be an impartial, easy-to-access source for
data on policing in the U.S.

[1]: https://www.policedatainitiative.org/
[2]: https://www.policedatainitiative.org/participating-agencies/
[3]: https://twitter.com/DJ44/status/601119768955920384?s=20
[4]: https://github.com/OpenPDI/data/releases
[5]: https://github.com/explosion/spacy-models#spacy-models
[6]: https://github.com/OpenPDI/openpdi
[7]: https://censusreporter.org/

if (!Object.entries) {
  Object.entries = function (obj) {
    var ownProps = Object.keys(obj),
      i = ownProps.length,
      resArray = new Array(i) // preallocate the Array
    while (i--) { resArray[i] = [ownProps[i], obj[ownProps[i]]] }

    return resArray
  }
}

Highcharts.setOptions({
  colors: [
    '#9bdaf1', '#002F50', '#02BFE7', '#0098BF', '#007398', '#005073'
  ],
  credits: false,
  lang: {
    thousandsSep: ','
  }
})

function shootings_by_county_map (id, county_data) {
  return Highcharts.mapChart('map', {
    chart: {
      map: 'countries/us/us-' + id + '-all'
    },
    title: {
      text: null
    },
    subtitle: {
      text: null
    },
    mapNavigation: {
      enabled: false
    },
    colorAxis: {
      minColor: '#e1f3f8',
      maxColor: '#046b99',
      min: 0
    },
    series: [{
      data: Object.entries(county_data),
      name: 'Shootings by county',
      states: {
        hover: {
          color: '#9bdaf1'
        }
      },
      dataLabels: {
        enabled: false,
        format: '{point.name}'
      }
    }],
    plotOptions: {
      area: {
        fillColor: '#02bfe7'
      },
      series: {
        /*
        cursor: 'pointer',
        point: {
          events: {
            click: function () {
              var name = this.name
              if (name in raw_data) {
                datatable.clear()
                datatable.rows.add(raw_data[name])
                datatable.draw()
              }
            }
          }
        } */
      }
    }
  })
}

function shootings_trend_chart (id, state, nation) {
  return Highcharts.chart('trend', {
    title: {
      text: 'FATAL SHOOTINGS PER 1 MILLION PEOPLE'
    },
    exporting: {
      enabled: false
    },
    yAxis: {
      title: {
        text: null
      }
    },
    xAxis: {
      tickInterval: 1
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        },
        pointStart: 2015
      }
    },
    series: [{
      name: id,
      data: state
    },
    {
      name: 'U.S.',
      data: nation
    }]
  })
}

function shootings_by_weapon_chart (weapons) {
  return Highcharts.chart('demo', {
    chart: {
      type: 'column'
    },
    exporting: {
      enabled: false
    },
    title: {
      text: 'By Weapon Type'
    },
    subtitle: {
      text: 'Click on a category (e.g, "Gun") below to filter the chart.'
    },
    xAxis: {
      categories: [
        'Asian',
        'Black',
        'Hispanic',
        'Native',
        'White'
      ],
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Total deaths'
      }
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [{
      name: 'Unarmed / Unreported',
      data: weapons.unarmed

    }, {
      name: 'Gun',
      data: weapons.gun

    }, {
      name: 'Other',
      data: weapons.other
    }]
  })
}

function shootings_by_race_chart (races) {
  return Highcharts.chart('pie', {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    exporting: {
      enabled: false
    },
    title: {
      text: 'By Race'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f}%',
          style: {
            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
          }
        }
      }
    },
    series: [{
      name: 'Percent of total deaths',
      colorByPoint: true,
      data: [{
        name: 'Asian',
        y: races.Asian
      }, {
        name: 'Black',
        y: races.Black
      }, {
        name: 'Hispanic',
        y: races.Hispanic
      }, {
        name: 'Native',
        y: races['Native American']
      }, {
        name: 'White',
        y: races.White
      }, {
        name: 'Other',
        y: races.Other
      }]
    }]
  })
}

function shootings_by_1m (counts, year) {
  return Highcharts.chart('heat-tiles', {
    chart: {
      type: 'tilemap',
      inverted: true,
      height: '80%'
    },

    title: {
      text: 'By State (per 1M people)'
    },

    subtitle: {
      text: ''
    },

    xAxis: {
      visible: false
    },

    yAxis: {
      visible: false
    },

    colorAxis: {
      dataClasses: [{
        from: 0,
        to: 2,
        color: '#e1f3f8',
        name: '< 2'
      }, {
        from: 2,
        to: 4,
        color: '#9ec5d5',
        name: '2 - 4'
      }, {
        from: 4,
        to: 6,
        color: '#5d98b6',
        name: '4 - 6'
      }, {
        from: 6,
        color: '#046b99',
        name: '> 6'
      }]
    },

    tooltip: {
      headerFormat: '',
      pointFormat: '{point.name}: <b>{point.value}</b> fatal shootings per 1M people.'
    },

    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          format: '{point.hc-a2}',
          color: '#000000',
          style: {
            textOutline: false
          }
        }
      }
    },

    series: [{
      name: '',
      data: [{
        'hc-a2': 'AL',
        name: 'Alabama',
        region: 'South',
        x: 6,
        y: 7,
        value: counts['AL'][year]
      }, {
        'hc-a2': 'AK',
        name: 'Alaska',
        region: 'West',
        x: 0,
        y: 0,
        value: counts['AK'][year]
      }, {
        'hc-a2': 'AZ',
        name: 'Arizona',
        region: 'West',
        x: 5,
        y: 3,
        value: counts['AZ'][year]
      }, {
        'hc-a2': 'AR',
        name: 'Arkansas',
        region: 'South',
        x: 5,
        y: 6,
        value: counts['AR'][year]
      }, {
        'hc-a2': 'CA',
        name: 'California',
        region: 'West',
        x: 5,
        y: 2,
        value: counts['CA'][year]
      }, {
        'hc-a2': 'CO',
        name: 'Colorado',
        region: 'West',
        x: 4,
        y: 3,
        value: counts['CO'][year]
      }, {
        'hc-a2': 'CT',
        name: 'Connecticut',
        region: 'Northeast',
        x: 3,
        y: 11,
        value: counts['CT'][year]
      }, {
        'hc-a2': 'DE',
        name: 'Delaware',
        region: 'South',
        x: 4,
        y: 9,
        value: counts['DE'][year]
      }, {
        'hc-a2': 'DC',
        name: 'District of Columbia',
        region: 'South',
        x: 4,
        y: 10,
        value: counts['DC'][year]
      }, {
        'hc-a2': 'FL',
        name: 'Florida',
        region: 'South',
        x: 8,
        y: 8,
        value: counts['FL'][year]
      }, {
        'hc-a2': 'GA',
        name: 'Georgia',
        region: 'South',
        x: 7,
        y: 8,
        value: counts['GA'][year]
      }, {
        'hc-a2': 'HI',
        name: 'Hawaii',
        region: 'West',
        x: 8,
        y: 0,
        value: counts['HI'][year]
      }, {
        'hc-a2': 'ID',
        name: 'Idaho',
        region: 'West',
        x: 3,
        y: 2,
        value: counts['ID'][year]
      }, {
        'hc-a2': 'IL',
        name: 'Illinois',
        region: 'Midwest',
        x: 3,
        y: 6,
        value: counts['IL'][year]
      }, {
        'hc-a2': 'IN',
        name: 'Indiana',
        region: 'Midwest',
        x: 3,
        y: 7,
        value: counts['IN'][year]
      }, {
        'hc-a2': 'IA',
        name: 'Iowa',
        region: 'Midwest',
        x: 3,
        y: 5,
        value: counts['IA'][year]
      }, {
        'hc-a2': 'KS',
        name: 'Kansas',
        region: 'Midwest',
        x: 5,
        y: 5,
        value: counts['KS'][year]
      }, {
        'hc-a2': 'KY',
        name: 'Kentucky',
        region: 'South',
        x: 4,
        y: 6,
        value: counts['KY'][year]
      }, {
        'hc-a2': 'LA',
        name: 'Louisiana',
        region: 'South',
        x: 6,
        y: 5,
        value: counts['LA'][year]
      }, {
        'hc-a2': 'ME',
        name: 'Maine',
        region: 'Northeast',
        x: 0,
        y: 11,
        value: counts['ME'][year]
      }, {
        'hc-a2': 'MD',
        name: 'Maryland',
        region: 'South',
        x: 4,
        y: 8,
        value: counts['MD'][year]
      }, {
        'hc-a2': 'MA',
        name: 'Massachusetts',
        region: 'Northeast',
        x: 2,
        y: 10,
        value: counts['MA'][year]
      }, {
        'hc-a2': 'MI',
        name: 'Michigan',
        region: 'Midwest',
        x: 2,
        y: 7,
        value: counts['MI'][year]
      }, {
        'hc-a2': 'MN',
        name: 'Minnesota',
        region: 'Midwest',
        x: 2,
        y: 4,
        value: counts['MN'][year]
      }, {
        'hc-a2': 'MS',
        name: 'Mississippi',
        region: 'South',
        x: 6,
        y: 6,
        value: counts['MS'][year]
      }, {
        'hc-a2': 'MO',
        name: 'Missouri',
        region: 'Midwest',
        x: 4,
        y: 5,
        value: counts['MO'][year]
      }, {
        'hc-a2': 'MT',
        name: 'Montana',
        region: 'West',
        x: 2,
        y: 2,
        value: counts['MT'][year]
      }, {
        'hc-a2': 'NE',
        name: 'Nebraska',
        region: 'Midwest',
        x: 4,
        y: 4,
        value: counts['NE'][year]
      }, {
        'hc-a2': 'NV',
        name: 'Nevada',
        region: 'West',
        x: 4,
        y: 2,
        value: counts['NV'][year]
      }, {
        'hc-a2': 'NH',
        name: 'New Hampshire',
        region: 'Northeast',
        x: 1,
        y: 11,
        value: counts['NH'][year]
      }, {
        'hc-a2': 'NJ',
        name: 'New Jersey',
        region: 'Northeast',
        x: 3,
        y: 10,
        value: counts['NJ'][year]
      }, {
        'hc-a2': 'NM',
        name: 'New Mexico',
        region: 'West',
        x: 6,
        y: 3,
        value: counts['NM'][year]
      }, {
        'hc-a2': 'NY',
        name: 'New York',
        region: 'Northeast',
        x: 2,
        y: 9,
        value: counts['NY'][year]
      }, {
        'hc-a2': 'NC',
        name: 'North Carolina',
        region: 'South',
        x: 5,
        y: 9,
        value: counts['NC'][year]
      }, {
        'hc-a2': 'ND',
        name: 'North Dakota',
        region: 'Midwest',
        x: 2,
        y: 3,
        value: counts['ND'][year]
      }, {
        'hc-a2': 'OH',
        name: 'Ohio',
        region: 'Midwest',
        x: 3,
        y: 8,
        value: counts['OH'][year]
      }, {
        'hc-a2': 'OK',
        name: 'Oklahoma',
        region: 'South',
        x: 6,
        y: 4,
        value: counts['OK'][year]
      }, {
        'hc-a2': 'OR',
        name: 'Oregon',
        region: 'West',
        x: 4,
        y: 1,
        value: counts['OR'][year]
      }, {
        'hc-a2': 'PA',
        name: 'Pennsylvania',
        region: 'Northeast',
        x: 3,
        y: 9,
        value: counts['PA'][year]
      }, {
        'hc-a2': 'RI',
        name: 'Rhode Island',
        region: 'Northeast',
        x: 2,
        y: 11,
        value: counts['RI'][year]
      }, {
        'hc-a2': 'SC',
        name: 'South Carolina',
        region: 'South',
        x: 6,
        y: 8,
        value: counts['SC'][year]
      }, {
        'hc-a2': 'SD',
        name: 'South Dakota',
        region: 'Midwest',
        x: 3,
        y: 4,
        value: counts['SD'][year]
      }, {
        'hc-a2': 'TN',
        name: 'Tennessee',
        region: 'South',
        x: 5,
        y: 7,
        value: counts['TN'][year]
      }, {
        'hc-a2': 'TX',
        name: 'Texas',
        region: 'South',
        x: 7,
        y: 4,
        value: counts['TX'][year]
      }, {
        'hc-a2': 'UT',
        name: 'Utah',
        region: 'West',
        x: 5,
        y: 4,
        value: counts['UT'][year]
      }, {
        'hc-a2': 'VT',
        name: 'Vermont',
        region: 'Northeast',
        x: 1,
        y: 10,
        value: counts['VT'][year]
      }, {
        'hc-a2': 'VA',
        name: 'Virginia',
        region: 'South',
        x: 5,
        y: 8,
        value: counts['VA'][year]
      }, {
        'hc-a2': 'WA',
        name: 'Washington',
        region: 'West',
        x: 2,
        y: 1,
        value: counts['WA'][year]
      }, {
        'hc-a2': 'WV',
        name: 'West Virginia',
        region: 'South',
        x: 4,
        y: 7,
        value: counts['WV'][year]
      }, {
        'hc-a2': 'WI',
        name: 'Wisconsin',
        region: 'Midwest',
        x: 2,
        y: 5,
        value: counts['WI'][year]
      }, {
        'hc-a2': 'WY',
        name: 'Wyoming',
        region: 'West',
        x: 3,
        y: 3,
        value: counts['WY'][year]
      }]
    }]
  })
}

function shootings_by_1m_race (counts) {
  return Highcharts.chart('summary', {
    chart: {
      type: 'bar'
    },
    title: {
      text: 'Race & Ethnicity (per 1M people)'
    },
    subtitle: {
      text: ''
    },
    xAxis: {
      type: 'category',
      title: {
        text: null
      },
      min: 0,
      max: 4,
      scrollbar: {
        enabled: true
      },
      tickLength: 0
    },
    yAxis: {
      min: 0,
      // max: 1200,
      title: {
        text: ''
      }
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true
        }
      }
    },
    legend: {
      enabled: false
    },
    credits: {
      enabled: false
    },
    series: [{
      name: 'Total Deaths',
      data: [
          ['White', counts.W],
          ['Black', counts.B],
          ['Native', counts.N],
          ['Asian', counts.A],
          ['Hispanic', counts.H]
      ]
    }]
  })
}

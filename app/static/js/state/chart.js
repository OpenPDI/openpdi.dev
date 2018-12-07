Highcharts.setOptions({
  colors: [
    '#9bdaf1', '#002F50', '#02BFE7', '#0098BF', '#007398', '#005073'
  ],
  credits: false
})

function shootings_by_county_map (id, county_data, raw_data, datatable) {
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
      data: county_data,
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
        }
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
      text: 'DEATHS BY WEAPON TYPE'
    },
    subtitle: {
      text: 'Click on a category (e.g, "Gun") below to filter the chart.'
    },
    xAxis: {
      categories: [
        'Asian',
        'Black',
        'Hispanic',
        'Native American',
        'White',
        'Other'
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
      text: 'FATAL SHOOTINGS BY RACE'
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
        name: 'Native American',
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

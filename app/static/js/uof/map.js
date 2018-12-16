Highcharts.setOptions({
  credits: false
})

$(function () {
  Highcharts.chart('map', {
    chart: {
      type: 'tilemap',
      inverted: true,
      height: '80%'
    },
    title: {
      text: ''
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
        from: 1,
        color: '#9bdaf1',
        name: '1'
      }, {
        from: 2,
        color: '#59a1c4',
        name: '2'
      }, {
        from: 3,
        color: '#046b99',
        name: '> 3 datasets'
      }]
    },

    tooltip: {
      headerFormat: '',
      pointFormat: '<b>{point.name}</b> has <b>{point.value} / 3</b>  available datasets'
    },

    plotOptions: {
      series: {
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '{point.hc-a2}',
          color: '#000000',
          style: {
            textOutline: false
          }
        },
        point: {
          events: {
            click: function () {
              location.href = $SCRIPT_ROOT + '/states/' + this['hc-a2']
            }
          }
        }
      }
    },

    // Datasets: WaPo, Stanford, PDI
    series: [{
      name: '',
      data: [{
        'hc-a2': 'AL',
        name: 'Alabama',
        region: 'South',
        x: 6,
        y: 7,
        value: 1
      }, {
        'hc-a2': 'AK',
        name: 'Alaska',
        region: 'West',
        x: 0,
        y: 0,
        value: 2
      }, {
        'hc-a2': 'AZ',
        name: 'Arizona',
        region: 'West',
        x: 5,
        y: 3,
        value: 1
      }, {
        'hc-a2': 'AR',
        name: 'Arkansas',
        region: 'South',
        x: 5,
        y: 6,
        value: 1
      }, {
        'hc-a2': 'CA',
        name: 'California',
        region: 'West',
        x: 5,
        y: 2,
        value: 2
      }, {
        'hc-a2': 'CO',
        name: 'Colorado',
        region: 'West',
        x: 4,
        y: 3,
        value: 1
      }, {
        'hc-a2': 'CT',
        name: 'Connecticut',
        region: 'Northeast',
        x: 3,
        y: 11,
        value: 2
      }, {
        'hc-a2': 'DE',
        name: 'Delaware',
        region: 'South',
        x: 4,
        y: 9,
        value: 2
      }, {
        'hc-a2': 'DC',
        name: 'District of Columbia',
        region: 'South',
        x: 4,
        y: 10,
        value: 1
      }, {
        'hc-a2': 'FL',
        name: 'Florida',
        region: 'South',
        x: 8,
        y: 8,
        value: 1
      }, {
        'hc-a2': 'GA',
        name: 'Georgia',
        region: 'South',
        x: 7,
        y: 8,
        value: 1
      }, {
        'hc-a2': 'HI',
        name: 'Hawaii',
        region: 'West',
        x: 8,
        y: 0,
        value: 1
      }, {
        'hc-a2': 'ID',
        name: 'Idaho',
        region: 'West',
        x: 3,
        y: 2,
        value: 1
      }, {
        'hc-a2': 'IL',
        name: 'Illinois',
        region: 'Midwest',
        x: 3,
        y: 6,
        value: 1
      }, {
        'hc-a2': 'IN',
        name: 'Indiana',
        region: 'Midwest',
        x: 3,
        y: 7,
        value: 2
      }, {
        'hc-a2': 'IA',
        name: 'Iowa',
        region: 'Midwest',
        x: 3,
        y: 5,
        value: 1
      }, {
        'hc-a2': 'KS',
        name: 'Kansas',
        region: 'Midwest',
        x: 5,
        y: 5,
        value: 1
      }, {
        'hc-a2': 'KY',
        name: 'Kentucky',
        region: 'South',
        x: 4,
        y: 6,
        value: 1
      }, {
        'hc-a2': 'LA',
        name: 'Louisiana',
        region: 'South',
        x: 6,
        y: 5,
        value: 2
      }, {
        'hc-a2': 'ME',
        name: 'Maine',
        region: 'Northeast',
        x: 0,
        y: 11,
        value: 1
      }, {
        'hc-a2': 'MD',
        name: 'Maryland',
        region: 'South',
        x: 4,
        y: 8,
        value: 2
      }, {
        'hc-a2': 'MA',
        name: 'Massachusetts',
        region: 'Northeast',
        x: 2,
        y: 10,
        value: 2
      }, {
        'hc-a2': 'MI',
        name: 'Michigan',
        region: 'Midwest',
        x: 2,
        y: 7,
        value: 1
      }, {
        'hc-a2': 'MN',
        name: 'Minnesota',
        region: 'Midwest',
        x: 2,
        y: 4,
        value: 1
      }, {
        'hc-a2': 'MS',
        name: 'Mississippi',
        region: 'South',
        x: 6,
        y: 6,
        value: 1
      }, {
        'hc-a2': 'MO',
        name: 'Missouri',
        region: 'Midwest',
        x: 4,
        y: 5,
        value: 1
      }, {
        'hc-a2': 'MT',
        name: 'Montana',
        region: 'West',
        x: 2,
        y: 2,
        value: 1
      }, {
        'hc-a2': 'NE',
        name: 'Nebraska',
        region: 'Midwest',
        x: 4,
        y: 4,
        value: 1
      }, {
        'hc-a2': 'NV',
        name: 'Nevada',
        region: 'West',
        x: 4,
        y: 2,
        value: 2
      }, {
        'hc-a2': 'NH',
        name: 'New Hampshire',
        region: 'Northeast',
        x: 1,
        y: 11,
        value: 1
      }, {
        'hc-a2': 'NJ',
        name: 'New Jersey',
        region: 'Northeast',
        x: 3,
        y: 10,
        value: 1
      }, {
        'hc-a2': 'NM',
        name: 'New Mexico',
        region: 'West',
        x: 6,
        y: 3,
        value: 1
      }, {
        'hc-a2': 'NY',
        name: 'New York',
        region: 'Northeast',
        x: 2,
        y: 9,
        value: 1
      }, {
        'hc-a2': 'NC',
        name: 'North Carolina',
        region: 'South',
        x: 5,
        y: 9,
        value: 1
      }, {
        'hc-a2': 'ND',
        name: 'North Dakota',
        region: 'Midwest',
        x: 2,
        y: 3,
        value: 1
      }, {
        'hc-a2': 'OH',
        name: 'Ohio',
        region: 'Midwest',
        x: 3,
        y: 8,
        value: 2
      }, {
        'hc-a2': 'OK',
        name: 'Oklahoma',
        region: 'South',
        x: 6,
        y: 4,
        value: 2
      }, {
        'hc-a2': 'OR',
        name: 'Oregon',
        region: 'West',
        x: 4,
        y: 1,
        value: 1
      }, {
        'hc-a2': 'PA',
        name: 'Pennsylvania',
        region: 'Northeast',
        x: 3,
        y: 9,
        value: 2
      }, {
        'hc-a2': 'RI',
        name: 'Rhode Island',
        region: 'Northeast',
        x: 2,
        y: 11,
        value: 1
      }, {
        'hc-a2': 'SC',
        name: 'South Carolina',
        region: 'South',
        x: 6,
        y: 8,
        value: 1
      }, {
        'hc-a2': 'SD',
        name: 'South Dakota',
        region: 'Midwest',
        x: 3,
        y: 4,
        value: 1
      }, {
        'hc-a2': 'TN',
        name: 'Tennessee',
        region: 'South',
        x: 5,
        y: 7,
        value: 1
      }, {
        'hc-a2': 'TX',
        name: 'Texas',
        region: 'South',
        x: 7,
        y: 4,
        value: 3
      }, {
        'hc-a2': 'UT',
        name: 'Utah',
        region: 'West',
        x: 5,
        y: 4,
        value: 1
      }, {
        'hc-a2': 'VT',
        name: 'Vermont',
        region: 'Northeast',
        x: 1,
        y: 10,
        value: 1
      }, {
        'hc-a2': 'VA',
        name: 'Virginia',
        region: 'South',
        x: 5,
        y: 8,
        value: 1
      }, {
        'hc-a2': 'WA',
        name: 'Washington',
        region: 'West',
        x: 2,
        y: 1,
        value: 1
      }, {
        'hc-a2': 'WV',
        name: 'West Virginia',
        region: 'South',
        x: 4,
        y: 7,
        value: 1
      }, {
        'hc-a2': 'WI',
        name: 'Wisconsin',
        region: 'Midwest',
        x: 2,
        y: 5,
        value: 1
      }, {
        'hc-a2': 'WY',
        name: 'Wyoming',
        region: 'West',
        x: 3,
        y: 3,
        value: 1
      }]
    }]
  })

  $(window).resize(function () {
    var chart = $('#map').highcharts()
    var w = $('#map').closest('#wrapper').width()
    chart.setSize(w, w * (3 / 4), false)
  })
})

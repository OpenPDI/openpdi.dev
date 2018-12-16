Highcharts.chart('traffic', {
  chart: {
    animation: {
      duration: 1500,
      easing: 'easeOutBounce'
    }
  },
  colors: ['#046b99', '#fff', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee',
    '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'
  ],
  credits: {
    enabled: false
  },
  chart: {
    spacing: 20,
    height: 360,
        // backgroundColor: '#61BC7B',
    style: {
      fontFamily: 'Roboto, sans-serif'
    }
  },
  title: {
    text: 'Total Stops vs. Time of Stop',
    style: {
          // color: 'white'
    }
  },
  legend: {
    enabled: false
  },
  plotOptions: {
    series: {
      borderColor: 'none'
    }
  },
  xAxis: [{
    categories: ['12 a.m. - 2 a.m.', '2 a.m. - 4 a.m.', '4 a.m. - 6 a.m.', '6 a.m. - 8 a.m.', '8 a.m. - 10 a.m.', '10 a.m. - 12 p.m.', '12 p.m. - 2 p.m.', '2 p.m. - 4 p.m.', '4 p.m. - 6 p.m.', '6 p.m. - 8 p.m.', '8 p.m. - 10 p.m.', '10 p.m. - 12 a.m.'],
    tickWidth: 0,
    lineWidth: 2,

    labels: {
      style: {
            // color: '#FFF',
        fontSize: '1em'
      }
    }
  }],
  yAxis: [{ // Primary yAxis
    labels: {
      align: 'left',
      x: 0,
      y: -2,
      style: {
            // color: '#FFF'
      }
    },
    showFirstLabel: false,
    showLastLabel: false,
    title: {
      text: 'Number of Stops (millions)',
      style: {
            // color: '#FFF',
        fontSize: '1.2em'
      }
    }
  }, { // Secondary yAxis
    title: {
      text: '',
      style: {
            // color: '#FFF',
        fontSize: '1.2em'
      }
    },
    showFirstLabel: false,
    showLastLabel: false,
    opposite: true
  }],
  series: [{
    name: 'Stops',
    type: 'column',
    yAxis: 1,
    data: [2672925, 1436203, 1408685, 4553897, 6724748, 6117666, 5943431, 6527610, 5887199, 4506772, 4077038, 2469755],
    animation: {
      duration: animDuration
    }
  }]
})

var reasons = {'Equipment': 1687815, 'Registration/plates': 1800031, 'Speeding': 8163986, 'Lights': 1505715, 'Safe movement': 3494152}
Highcharts.chart('reasons', {
  chart: {
    allowPointSelect: true,
    color: '#FFD664',
    cursor: 'pointer',
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: 'pie',
      // backgroundColor: '#61BC7B',
    style: {
      fontFamily: 'Roboto, sans-serif'
    }
  },
  exporting: {
    enabled: false
  },
  title: {
    text: 'Stops by Violation'
  },
  tooltip: {
    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: true
      }
    }
  },
  series: [{
    name: 'Percent of total stops',
    colorByPoint: true,
    data: [{
      name: 'Equipment',
      y: reasons.Equipment,
      color: '#046b99'
    }, {
      name: 'Registration/plates',
      y: reasons['Registration/plates'],
      color: '#0081a3'
    }, {
      name: 'Speeding',
      y: reasons.Speeding,
      color: '#0095a2'
    }, {
      name: 'Lights',
      y: reasons.Lights,
      color: '#02a89a'
    }, {
      name: 'Safe movement',
      y: reasons['Safe movement'],
      color: '#57b98d'
    }]
  }]
})

Highcharts.chart('days', {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: 'pie',
    style: {
      fontFamily: 'Roboto, sans-serif'
    }
  },
  exporting: {
    enabled: false
  },
  title: {
    text: 'Stops by Day'
  },
  tooltip: {
    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  },
  plotOptions: {
    pie: {
      series: {
        borderColor: 'none'
      },
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: true
      }
    }
  },
  series: [{
    name: 'Percent of total stops',
    colorByPoint: true,
    data: [{
      name: 'Sunday',
      y: 3838369,
      color: '#046b99'
    }, {
      name: 'Monday',
      y: 4413938,
      color: '#0081a3'
    }, {
      name: 'Tuesday',
      y: 4627933,
      color: '#0095a2'
    }, {
      name: 'Wednesday',
      y: 4527001,
      color: '#02a89a'
    }, {
      name: 'Thursday',
      y: 4677450,
      color: '#57b98d'
    },
    {
      name: 'Friday',
      y: 5114428,
      color: '#8ec780'
    }, {
      name: 'Saturday',
      y: 4579396,
      color: '#c4d27a'
    }]
  }]
})

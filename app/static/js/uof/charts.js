Highcharts.setOptions({
  colors: [
    '#9bdaf1', '#002F50', '#02BFE7', '#0098BF', '#007398', '#005073'
  ],
  credits: false,
  lang: {
    thousandsSep: ','
  }
})

Highcharts.chart('uof-group', {
  chart: {
    type: 'column'
  },
  title: {
    text: 'Force Type by Reason'
  },
  subtitle: {
    text: 'Click on a label (e.g., "Physical") below to filter it from the chart.'
  },
  xAxis: {
    categories: ['Resistance', 'Active Aggression', 'Non-compliance', 'Fleeing', 'Weapon Display', 'Other']
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Total Force Composition'
    }
  },
  tooltip: {
    pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
    shared: true
  },
  plotOptions: {
    column: {
      stacking: 'percent'
    }
  },
  series: [{
    name: 'Physical',
    data: by_response['PHYSICAL']
  }, {
    name: 'Chemical',
    data: by_response['CHEMICAL']
  }, {
    name: 'Firearm',
    data: by_response['WEAPON']
  }, {
    name: 'Electronic',
    data: by_response['ELECTRIC']
  }, {
    name: 'Impact',
    data: by_response['IMPACT']
  }]
})

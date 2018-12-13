var input = document.getElementById('state-search')

// Show label but insert value into the input:
new Awesomplete(input, {
  list: [
    [ 'Alaska', 'AK' ],
    [ 'Alabama', 'AL' ],
    [ 'Arkansas', 'AR' ],
    [ 'Arizona', 'AZ' ],
    [ 'California', 'CA' ],
    [ 'Colorado', 'CO' ],
    [ 'Connecticut', 'CT' ],
    [ 'District of Columbia', 'DC' ],
    [ 'Delaware', 'DE' ],
    [ 'Florida', 'FL' ],
    [ 'Georgia', 'GA' ],
    [ 'Hawaii', 'HI' ],
    [ 'Iowa', 'IA' ],
    [ 'Idaho', 'ID' ],
    [ 'Illinois', 'IL' ],
    [ 'Indiana', 'IN' ],
    [ 'Kansas', 'KS' ],
    [ 'Kentucky', 'KY' ],
    [ 'Louisiana', 'LA' ],
    [ 'Massachusetts', 'MA' ],
    [ 'Maryland', 'MD' ],
    [ 'Maine', 'ME' ],
    [ 'Michigan', 'MI' ],
    [ 'Minnesota', 'MN' ],
    [ 'Missouri', 'MO' ],
    [ 'Mississippi', 'MS' ],
    [ 'Montana', 'MT' ],
    [ 'North Carolina', 'NC' ],
    [ 'North Dakota', 'ND' ],
    [ 'Nebraska', 'NE' ],
    [ 'New Hampshire', 'NH' ],
    [ 'New Jersey', 'NJ' ],
    [ 'New Mexico', 'NM' ],
    [ 'Nevada', 'NV' ],
    [ 'New York', 'NY' ],
    [ 'Ohio', 'OH' ],
    [ 'Oklahoma', 'OK' ],
    [ 'Oregon', 'OR' ],
    [ 'Pennsylvania', 'PA' ],
    [ 'Rhode Island', 'RI' ],
    [ 'South Carolina', 'SC' ],
    [ 'South Dakota', 'SD' ],
    [ 'Tennessee', 'TN' ],
    [ 'Texas', 'TX' ],
    [ 'Utah', 'UT' ],
    [ 'Virginia', 'VA' ],
    [ 'Vermont', 'VT' ],
    [ 'Washington', 'WA' ],
    [ 'Wisconsin', 'WI' ],
    [ 'West Virginia', 'WV' ],
    [ 'Wyoming', 'WY' ]
  ]
})

input.addEventListener('awesomplete-selectcomplete', function (event) {
  var code = event.text.value

  $('#state-label').html('By state (' + event.text.label + ')')
  $('#census-url').attr('href', 'https://www.census.gov/quickfacts/' + code.toLowerCase())
  $('#census-url').text('QuickFacts, ' + event.text.label)

  // Update the charts:
  shootings_by_county_map(code.toLowerCase(), by_county[code])
  shootings_by_race_chart(by_race[code])
  shootings_by_weapon_chart(by_weapon_race[code])
})

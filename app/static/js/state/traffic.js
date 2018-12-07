mapboxgl.accessToken = 'pk.eyJ1IjoiamRrYXRvIiwiYSI6ImNqb2FramIyODF0YXgzcW5sOWluMTIwZDMifQ.OFS2HBJsUABQgTb89JNSjg' // Put your Mapbox Public Access token here

// Load a new map in the 'map' HTML div
var map = new mapboxgl.Map({
  container: 'traffic',
  style: 'mapbox://styles/mapbox/light-v9',
  center: meta['center'],
  zoom: 13
})

var TRAFFIC_PAINT = {
  'circle-color': '#fdb81e',
  'circle-opacity': 0.8
}

// Load the vector tile source from the Mapbox Pedestrian traffic example
map.on('load', function () {
  var layers = ['Traffic stop', 'Use of Force', 'Hate Crime']
  var colors = ['#fdb81e', '#b0e695', '#75cff0']

  for (i = 0; i < layers.length; i++) {
    var layer = layers[i]
    var color = colors[i]
    var item = document.createElement('div')
    var key = document.createElement('span')
    key.className = 'legend-key'
    key.style.backgroundColor = color

    var value = document.createElement('span')
    value.innerHTML = layer
    item.appendChild(key)
    item.appendChild(value)
    legend.appendChild(item)
  }

  for (i = 0; i < meta['layers'].length; i++) {
    if (meta['layers'][i]['id'] === 'traffic_stops') {
      meta['layers'][i]['paint'] = TRAFFIC_PAINT
      // meta['layers'][i]['filter'] = ['==', ['string', ['get', 'stop_outcome']], 'Warning']
    }
    map.addLayer(meta['layers'][i])
  }
})

var nav = new mapboxgl.NavigationControl()
var search = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  bbox: meta['bbox']
})

map.addControl(nav, 'top-left')
map.addControl(search, 'top-right')

// When a click event occurs near a place, open a popup at the location of
// the feature, with HTML description from its properties
map.on('click', function (e) {
  if (map.getLayer('traffic_stops')) {
    var features = map.queryRenderedFeatures(e.point, { layers: ['traffic_stops'] })
    if (!features.length) {
      return
    }

    var feature = features[0]
    // Populate the popup and set its coordinates
    // based on the feature found
    var popup = new mapboxgl.Popup()
      .setLngLat(feature.geometry.coordinates)
      .setHTML('<div id="popup" class="popup">' +
                  '<div class="map-department">' +
                    feature.properties['stop_outcome'] +
                  '</div>' +
                  '<div class="map-rule"></div>' +
                  '<div class="map-discretion">Reason</div>' +
                  '<div class="map-center">' + feature.properties['violation'].split(',').join(', ') + '</div>' +
                  '<div class="map-discretion">Race, sex</div>' +
                  '<div class="map-center">' +
                    feature.properties['driver_race'] +
                    ', ' + feature.properties['driver_gender'] + '</div>' +
                  '<div class="map-discretion">Searched, contraband found</div>' +
                  '<div class="map-center">' +
                    feature.properties['search_conducted'] +
                    ', ' + feature.properties['contraband_found'] + '</div>' +
                '</div>')
      .addTo(map)
  }
})

// Use the same approach as above to indicate that the symbols are clickable
// by changing the cursor style to 'pointer'
map.on('mousemove', function (e) {
  if (map.getLayer('traffic_stops')) {
    var features = map.queryRenderedFeatures(e.point, { layers: ['traffic_stops'] })
    if (!features.length) {
      return
    }
    map.getCanvas().style.cursor = features.length ? 'pointer' : ''
  }
})

map.scrollZoom.disable()

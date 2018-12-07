mapboxgl.accessToken = 'pk.eyJ1IjoiamRrYXRvIiwiYSI6ImNqb2FramIyODF0YXgzcW5sOWluMTIwZDMifQ.OFS2HBJsUABQgTb89JNSjg'

var map = new mapboxgl.Map({
  container: 'map', // container element id
  style: 'mapbox://styles/mapbox/light-v9',
  center: [-74.0059, 40.7128], // initial map center in [lon, lat]
  zoom: 12
})

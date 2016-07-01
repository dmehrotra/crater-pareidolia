var map;
var s = true
var to;


function init() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: {lat: 37.1366728, lng: -116.0577398},
    mapTypeId: google.maps.MapTypeId.SATELLITE,
    disableDefaultUI: true
  });
  mapMoveable = new google.maps.Map(document.getElementById('map-moveable'), {
    zoom: 13,
    center: {lat: 37.1366728, lng: -116.0577398},
    mapTypeId: google.maps.MapTypeId.SATELLITE,
  });

  google.maps.event.addListenerOnce(map, 'idle', function(){
      bounds = getBounds();
      to = setInterval(function(){recenter(bounds)}, 9000)
  });
  google.maps.event.addListener(map, "tilesloaded", function() { 
            takeImage()
  }); 
}
function getBounds(){
  return {
    "lat_min": map.getBounds().getSouthWest().lat(),
    "lat_range": map.getBounds().getNorthEast().lat() - map.getBounds().getSouthWest().lat(),
    "lng_min": map.getBounds().getSouthWest().lng(),
    "lng_range": map.getBounds().getNorthEast().lng() - map.getBounds().getSouthWest().lng()
  }
}
function recenter(m) {
  s = !s;
  if (s){
    map.setCenter( new google.maps.LatLng(m.lat_min + (Math.random() * m.lat_range), 
                            m.lng_min + (Math.random() * m.lng_range)))
    map.setZoom(16);
  }else{
    map.setCenter(new google.maps.LatLng(m.lat_min + (Math.random() * m.lat_range), 
                        m.lng_min + (Math.random() * m.lng_range)))
    map.setZoom(15);
  }

}
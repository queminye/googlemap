

var map;
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: -34.397, lng: 150.644},
		zoom: 8
	});
}

function moveTo(latitude,longitude) {
	var myLatlng = {lat: latitude, lng: longitude};
	map.panTo(myLatlng);
} 

map.addListener('click', function(e) {
	placeMarkerAndPanTo(e.latLng, map);
});

function placeMarkerAndPanTo(latLng, map) {
	var marker = new google.maps.Marker({
		position: latLng,
		map: map,
		icon: "image/ic_finger_marker.png"
	});
	map.panTo(latLng);
}
var map;
var marker;

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: -34.397, lng: 150.644},
		zoom: 8
	});

	map.addListener('click', function(e) {
		placeMarkerAndPanTo(e.latLng, map);
	});
}

function placeMarkerAndPanTo(latLng, map) {
	if(marker!=null)
		marker.setMap(null);
	marker = new google.maps.Marker({
		position: latLng,
		map: map,
		icon: "image/ic_finger_marker.png"
	});

	console.dir(latLng);

	window.setTimeout(function() {
		map.panTo(latLng);
	}, 500);

	onPositionChoosed(latLng.lat(), latLng.lng(), "test");
}

//--------------------------from java-------------------------
function moveTo(latitude,longitude) {
	var myLatlng = {lat: latitude, lng: longitude};
	map.panTo(myLatlng);
} 

//-------------------------to java-------------------
function onPositionChoosed(latitude, longitude, address) {
	// console.log(latitude+""+longitude);
	window.control.onPositionChoosed(latitude, longitude, address);
}


var map;
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: -34.397, lng: 150.644},
		zoom: 8
	});

	map.addListener('click', function(e) {
		placeMarkerAndPanTo(e.latLng, map);
	});
}

function moveTo(latitude,longitude) {
	var myLatlng = {lat: latitude, lng: longitude};
	map.panTo(myLatlng);
} 

var marker;

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


//-------------------------to java-------------------
function onPositionChoosed(latitude, longitude, address) {
	// console.log(latitude+""+longitude);
	window.control.onPositionChoosed(latitude, longitude, address);
}
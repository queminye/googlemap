var map;
var marker;
var xiAnLatlng = {lat:34.31621838080741, lng:108.951416015625};

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center:xiAnLatlng,
		zoom: 4
	});

	map.addListener('click', function(e) {
		placeMarkerTo(e.latLng, map, "image/ic_finger_marker.png");
		onPositionChoosed(latLng.lat(), latLng.lng(), "test");
		delayPanTo(e.latLng, map, 500);
	});
}

function delayPanTo(latLng, map, dayduring){
	window.setTimeout(function() {
		map.panTo(latLng);
	}, during);
}

function placeMarkerTo(latLng, map, iconPath){
	console.dir(latLng);

	if(marker!=null)
		marker.setMap(null);
	marker = new google.maps.Marker({
		position: latLng,
		map: map,
		icon: iconPath
	});
}

//--------------------------from java-------------------------
function moveTo(latitude,longitude) {
	console.log(latitude+"   "+longitude);
	var latlng = {lat: latitude, lng: longitude};
	map.panTo(latlng);
	placeMarkerTo(latlng, map, "image/ic_map_mark.png");
	map.setZoom(19);
} 

//-------------------------to java-------------------
function onPositionChoosed(latitude, longitude, address) {
	console.log(latitude+"   "+longitude);
	// window.control.onPositionChoosed(latitude, longitude, address);
}
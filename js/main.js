var map;
var marker;
var xiAnLatlng = {lat:34.31621838080741, lng:108.951416015625};

function initMap() {
	var geocoder = new google.maps.Geocoder;

	map = new google.maps.Map(document.getElementById('map'), {
		center:xiAnLatlng,
		zoom: 4,
		mapTypeControl:false,
		panControl:false,
		streetViewControl:false,
		zoomControl:false
	});

	map.addListener('click', function(e) {
		placeMarkerTo(e.latLng, map, "image/ic_finger_marker.png");
		geocodeLatLng(geocoder,e.latLng)
		delayPanTo(e.latLng, map, 500);
	});
}

function delayPanTo(latLng, map, during){
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

function geocodeLatLng(geocoder, latLng) {
	geocoder.geocode({'location': latLng}, function(results, status) {
		if (status === 'OK') {
			if (results[1]) {
				onPositionChoosed(latLng, results[1].formatted_address);
				console.dir(results[1].formatted_address);
			} else {
				onPositionChoosed(latLng, "");
				window.alert('No results found');
			}
		} else {
			window.alert('Geocoder failed due to: ' + status);
			onPositionChoosed(latLng, "");
		}
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
function onPositionChoosed(latLng, address) {
	console.log(latLng.lat()+"   "+latLng.lng() +"    "+address);
	// window.control.onPositionChoosed(latitude, longitude, address);
}
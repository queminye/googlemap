var map;
var marker;
var xiAnLatlng = {lat:34.31621838080741, lng:108.951416015625};


function initMap() {
	geocoder = new google.maps.Geocoder;
	map = new google.maps.Map(document.getElementById('map'), {
		center:xiAnLatlng,
		zoom: 4,
		mapTypeControl:false,
		panControl:false,
		streetViewControl:false,
		zoomControl:false,
		clickableIcons:false,
	});

	var input = document.getElementById('pac-input');
	var autocomplete = new google.maps.places.Autocomplete(input);
	autocomplete.bindTo('bounds', map);

	autocomplete.addListener('place_changed', function() {
		var place = autocomplete.getPlace();
		if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            //window.alert("No details available for input: '" + place.name + "'");
            return;
        }

          // If the place has a geometry, then present it on a map.
          if (place.geometry.viewport) {
          	map.fitBounds(place.geometry.viewport);
          } else {
          	map.setCenter(place.geometry.location);
          	map.setZoom(17);// Why 17? Because it looks good.
          	placeMarkerTo(place.geometry.location,map, "image/ic_finger_marker.png");
          }


          var address = '';
          if (place.address_components) {
          	address = [
          	(place.address_components[0] && place.address_components[0].short_name || ''),
          	(place.address_components[1] && place.address_components[1].short_name || ''),
          	(place.address_components[2] && place.address_components[2].short_name || '')
          	].join(' ');
          }
          console.dir(place);
      });

	

	map.addListener('click', function(e) {
		input.blur();
		placeMarkerTo(e.latLng, map, "image/ic_finger_marker.png");
		geocodeLatLng(geocoder,{lat: e.latLng.lat(), lng : e.latLng.lng()})
		delayPanTo(e.latLng, map, 500); 
	});

	onMapLoaded();
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
			if (results[0]) {
				var addressComponent = results[0];
				console.dir(addressComponent);
				var address_components = addressComponent.address_components;

				var country, state, city;

				for(var i = 0, length1 = address_components.length; i < length1; i++){
					var types =address_components[i].types;
					for(var j = 0, length2 = types.length; j < length2; j++){
						if(types[j]=="country")
							country = address_components[i].long_name;
						else if(types[j]=="administrative_area_level_1")
							state = address_components[i].long_name;
						else if(types[j]=="locality")
							city = address_components[i].long_name;
					}
				}
				console.log(city+"_"+state+"_"+country);
				if(country=="China" || country=="中国" || html_language=="zh"){
					onPositionChoosed(latLng, results[0].formatted_address, "");
				}else {
					onPositionChoosed(latLng, addressComponent.formatted_address, city+"_"+state+"_"+country);
				}
				
			}else {
				onPositionChoosed(latLng, "","");
				//window.alert('No results found');
			}
		} else {
			//window.alert('Geocoder failed due to: ' + status);
			onPositionChoosed(latLng, "","");
		}
	});
}
//--------------------------invocate  from java-------------------------
function moveLocationTo(latitude,longitude) {
	var latlng = {lat: latitude, lng: longitude};
	map.panTo(latlng);
	placeMarkerTo(latlng, map, "image/ic_map_mark.png");
	map.setZoom(19);
	geocodeLatLng(geocoder,latlng)
} 

function moveChoosedPositionTo(latitude,longitude) {
	window.setTimeout(function() {
		var latlng = {lat: latitude, lng: longitude};
		map.panTo(latlng);
		placeMarkerTo(latlng, map, "image/ic_finger_marker.png");
		map.setZoom(19);
		geocodeLatLng(geocoder,latlng)
	}, 2000);
} 

function zoom(delt) {
	var zoom = map.getZoom();
	map.setZoom(zoom+delt);
} 

//-------------------------js to java-------------------
function onPositionChoosed(latLng, address, cityCode) {
	try {
		// statements
		window.control.onPositionChoosed(latLng.lat, latLng.lng, address, cityCode);
	} catch(e) {
		// statements
		console.log(e);
	} finally {
		// statements
	}
}

function onMapLoaded () {
	try {
		window.control.onMapLoaded();
	} catch(e) {
		// statements
		console.log(e);
	} finally {
		// statements
	}
}
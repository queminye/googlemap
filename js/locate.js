  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onLocatSuccess, onLocatFailed,
    {
     enableHighAcuracy: false,
     timeout: 1000*60,
     maximumAge: 3000
   });
  } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }

        var infoWindow = new google.maps.InfoWindow({map: map});


        function handleLocationError(browserHasGeolocation, infoWindow, pos) {
          infoWindow.setPosition(pos);
          infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
        }

        function onLocatSuccess(position){
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent('Location found.');
          map.setCenter(pos);
        }


        function onLocatFailed(error){
          switch(error.code) {
            case error.TIMEOUT:
            window.alert("A timeout occured! Please try again!");
            break;
            case error.POSITION_UNAVAILABLE:
            window.alert("We can't detect your location. Sorry!");
            break;
            case error.PERMISSION_DENIED:
            window.alert("Please allow geolocation access for this to work.");
            break;
            case error.UNKNOWN_ERROR:
            window.alert("An unknown error occured!");
            break;
          }
        }
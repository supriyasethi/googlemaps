var geocoder;

var map;
let infowindow;
let service;
function initialize() {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(-34.397, 150.644);
  var mapOptions = {
    zoom: 11,
    center: latlng,
  };
  map = new google.maps.Map(document.getElementById("map"), mapOptions);
  //var service = new google.maps.places.PlacesService(map);
}

function codeAddress() {
  var address = document.getElementById("address").value;
  let lat;
  let lng;

  geocoder.geocode({ address: address }, function (results, status) {
    if (status == "OK") {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location,
      });
      lat = results[0].geometry.location.lat();
      lng = results[0].geometry.location.lng();
      searchyourplace(lat, lng);
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}

function searchyourplace(lat, lng) {
  console.log(lat);
  var center = new google.maps.LatLng(lat, lng);
  var request = {
    location: center,
    radius: 15000,
    fields: ["name", "geometry"],
    type: ["cafe"],
  };

  service = new google.maps.places.PlacesService(map);
  console.log(map);
  //service.nearbySearch(request, placecallback);
  service.nearbySearch(request, placecallback);
}

function placecallback(results, status) {
  if (status == "OK") {
    for (var i = 0; i < results.length; i++) {
      lat = results[i].geometry.location.lat();
      lng = results[i].geometry.location.lng();
      var center = new google.maps.LatLng(lat, lng);
      console.log(results[i]);
      createMarker(results[i], center);
    }
  }
}

function createMarker(place, cent) {
  //var placeloc = cent;
  var req = {
    placeId: place.place_id,
    fields: [
      "name",
      "rating",
      "place_id",
      "formatted_address",
      "geometry",
      "icon",
    ],
  };
  infowindow = new google.maps.InfoWindow();
  service.getDetails(req, (place, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      const marker = new google.maps.Marker({
        map,
        position: cent,
      });
      var rating = "Rating " + place.rating;
      google.maps.event.addListener(marker, "click", () => {
        infowindow.setContent(
          "<div><strong>" +
            place.name +
            "</strong> <br>" +
            rating +
            "</strong> <br>" +
            place.formatted_address +
            "</div>"
        );
        infowindow.open(map, marker);
      });
    }
  });
  // var ul = document.getElementById("dynamic-list");
  // console.log(ul);
  // console.log(place.icon);
  // var li = document.createElement("li");
  // var img = document.createElement("img");
  // var liitem = document.createTextNode(place.name);
  // li.setAttribute("id", place.name + place.formatted_address);
  // img.setAttribute("img", place.icon);
  // li.setAttribute(
  //   "style",
  //   "width: 100px; \
  //   padding: 10px; \
  //   border: 5px color white; \
  //   border-radius: 4px \
  //   background-color: cornsilk \
  //   margin: 0;"
  // );

  // //"color:black; background-color:white; font-family:verdana; margin-top: 1em; margin-bottom: 1em; margin-left: 0; margin-right: 0; text-align: right;"
  // li.appendChild(img);
  // li.appendChild(liitem);
  // ul.appendChild(li);
}

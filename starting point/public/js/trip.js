// GLOBAL VARIABLES
var markers = [];
var iconURLs = {
	hotel: '/images/lodging_0star.png',
	restaurant: '/images/restaurant.png',
	activity: '/images/star-3.png'
};


// INITIAL FUNCTION CALLS
$(document).ready(function () {
	console.log("DOCUMENT READY");
	dropdown();
	update();
	remove();
})


// HELPER FUNCTIONS
function updateMap(location, data, iconType){
	var position;
	data.forEach(function (element) {
		if (element.name === location) position = element.place.location;
	})
	if (position) drawMarker(iconType, position, location);
}

// initiates dropdown menus from within database
function dropdown() {
	this.hotels.forEach(function (hotel) {
		$('#hotel-choices').append($("<option>" + hotel.name + "</option>"));
	})
	this.restaurants.forEach(function (restaurant) {
		$('#restaurant-choices').append($("<option>" + restaurant.name + "</option>"));
	})
	this.activities.forEach(function (activity) {
		$('#activity-choices').append($("<option>" + activity.name + "</option>"));
	})
}

function update() {
	var selectedRestaurants = [];
	var selectedActivitiesArray = [];
	var hotels = this.hotels;
	var restaurants = this.restaurants;
	var activities = this.activities;

	$("#hotelAdd").click(function () {
		var selectedHotel = $("#hotel-choices option:selected").text();

		// prevents user from inputting heading of dropdown
		if (selectedHotel !== '--Select Your Hotel--') {
			updateMap(selectedHotel, hotels, 'hotel');
			// allows only one hotel to be selected
			if ($("#hotelGroup .itinerary-item")) $("#hotelGroup .itinerary-item").replaceWith('');
			// selects DOM elements that we want to insert, namely select hotel/button
			var $hotelName = $("<span>" + selectedHotel + "</span>");
			var $button = $("<button class='btn btn-xs btn-danger remove btn-circle'>" + 'x' + "</button>");

			// append hotel to ul, then wrap div around it, then insert button as sibling to select hotel
			$("#hotelGroup").append($hotelName);
			$hotelName.wrap("<div class='itinerary-item' id='"+selectedHotel+"'></div>").after($button);
		}
	})

	$("#restaurantAdd").click(function () {

		var selectedRestaurant = $("#restaurant-choices option:selected").text();

		// prevents user from inputting heading of dropdown
		if (selectedRestaurant !== '--You Hungry Yet?--') {

			// doesn't allow restaurant duplicates
			if (selectedRestaurants.indexOf(selectedRestaurant) >= 0) {
				alert("Already selected")
			} else {
				selectedRestaurants.push(selectedRestaurant)
				updateMap(selectedRestaurant, restaurants, 'restaurant');

				// selects DOM elements that we want to insert, namely select hotel/button
				var $restaurantName = $("<span>" + selectedRestaurant + "</span>");
				var $button = $("<button class='btn btn-xs btn-danger remove btn-circle'>" + 'x' + "</button>");

				// append hotel to ul, then wrap div around it, then insert button as sibling to select hotel
				$("#restaurantGroup").append($restaurantName);
				$restaurantName.wrap("<div class='itinerary-item' id='"+selectedRestaurant+"'></div>").after($button);
			}
		}
	})

	$("#activityAdd").click(function () {

		var selectedActivities = $("#activity-choices option:selected").text();
		// prevents user from inputting heading of dropdown
		if (selectedActivities !== '--You Hungry Yet?--') {
			if (selectedActivitiesArray.indexOf(selectedActivities) >= 0) {
				alert("Already selected")
			} else {
				selectedActivitiesArray.push(selectedActivities)
				updateMap(selectedActivities, activities, 'activity');
				// selects DOM elements that we want to insert, namely select hotel/button
				var $activitiesName = $("<span>" + selectedActivities + "</span>");
				var $button = $("<button class='btn btn-xs btn-danger remove btn-circle'>" + 'x' + "</button>");

				// append hotel to ul, then wrap div around it, then insert button as sibling to select hotel
				$("#activitiesGroup").append($activitiesName);
				$activitiesName.wrap("<div class='itinerary-item' id='"+selectedActivities+"'></div>").after($button);
			}
		}
	})

	}

// removes places/activities from itinerary

function remove(){
	$('#itinerary').on('click','.remove', function() {

		var closestDiv = $(this).closest("div.itinerary-item");
		var closestId = closestDiv["0"].id;
		console.log(closestDiv["0"]);
		console.log(closestId);
		markers.forEach(function(marker){
			console.log("Marker: ", marker);
			if (marker[0] === closestId) marker[1].setMap(null);
		})
		closestDiv.remove();

	})
}

// copied over from map.js boiler plate
function drawMarker (type, coords, location) {
	var latLng = new google.maps.LatLng(coords[0], coords[1]);
	var iconURL = iconURLs[type];
	var marker = new google.maps.Marker({
		icon: iconURL,
		position: latLng
	});
	markers.push([location, marker]);
	marker.setMap(gMap);
}




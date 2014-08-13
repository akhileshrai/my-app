/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var start_lat = '';
var start_lng = '';
var start_place = '';
var end_place = '';
var end_lat = '';
var end_lng = '';

var map = '';
var mapOptions = '';
var dist = 0;

var modeTravel = 'Auto'; //auto or meru

var options = [
    {"Mode": "Auto", "Option": "Day", "rate": [0, 1.9, 25, 13, 1], "Timing":['0500','2300']}, //Fare array = baseFare, least distance, least fare, per km rate, multiplier
    {"Mode": "Auto", "Option": "Night", "rate": [0, 1.9, 25, 13, 1.5], "Timing":['2300', '0500']},
    {"Mode": "Meru", "Option": "Day", "rate": [0, 4, 80, 19.50, 1],"Timing":['0500','0000'], "Convenience":[40,60], "Comment":["Rs. 40 within 35 minutes, Rs. 60 within 24h", "No charge for the first 20min"]},
    {"Mode": "Meru", "Option": "Night", "rate": [0, 4, 88, 21.45, 1],"Timing":['0000', '0500'], "Convenience":[40,60], "Comment":["Rs. 40 within 35 minutes, Rs. 60 within 24h", "No charge for the first 20min"]},
    {"Mode": "MegaCabs", "Option": "Day", "rate": [0, 4, 80, 19.50,1], "Timing":['0600','0000'], "Convenience":[35], "Comment":"Flat Rs. 35 per phone booking"},
    {"Mode": "MegaCabs", "Option": "Night", "rate": [0, 4, 80, 19.50, 1.1],"Timing":['0000','0600'],"Convenience":[35], "Comment":"Flat Rs. 35 per phonebooking"},
    {"Mode": "Ola", "Option": "Day/Night", "rate": [0, 7.14, 150, 21, 1], "Comment":"No Night Fees or Phone Booking Charges."},
    {"Mode": "Ola", "Option": "Luxury", "rate": [0, 5, 200, 20, 1], "Comment":"No Night Fees or Phone Booking Charges."},
    {"Mode": "Uber", "Option": "Uber Black", "rate": [80, 4.4, 200, 18, 1], "Comment":"App only bookings."},
    {"Mode": "Uber", "Option": "Uber X", "rate": [50, 5, 125, 15, 1], "Comment":"App only bookings."}
];

var myRoute = '';



var app = {
	

    // Application Constructor
    initialize: function() {
    	console.log("app initialize called");
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
	    if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
	        document.addEventListener("deviceready", this.onDeviceReady, false);
	    } else {
	        this.onDeviceReady();
	    }
	    //document.addEventListener('click', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        initializeMap();
        console.log('Received Event: ');
    }
};

function initializeMap() {
	console.log("initialize called");

	//navigator.geolocation.getCurrentPosition(onSuccess, onError, { maximumAge: 10000, timeout: 10000, enableHighAccuracy: true });  
	start_autocomplete = new google.maps.places.Autocomplete(
     	/** @type {HTMLInputElement} */(document.getElementById('start_loc'))
      		//{ types: ['geocode'] } //Avoiding so you get all places in drop down
      		);
    end_autocomplete = new google.maps.places.Autocomplete(
     	/** @type {HTMLInputElement} */(document.getElementById('end_loc')) 
      		//{ types: ['geocode'] } //Avoiding so you get all places in drop down
      		);
    
  	// When the user selects an address from the dropdown, populate the address fields in the form.
  	google.maps.event.addListener(start_autocomplete, 'place_changed', function() {
    	changeMap();}
    	); 
    google.maps.event.addListener(end_autocomplete, 'place_changed', function() {
    	changeMap();}
    	); 
    document.getElementById("Auto").addEventListener("click", function() {
    	reCalc("Auto");
    	}, false);
	document.getElementById("Meru").addEventListener("click", function() {
    	reCalc("Meru");
    	},false);
    document.getElementById("MegaCabs").addEventListener("click", function() {
    	reCalc("MegaCabs");
    	},false);
   	document.getElementById("Ola").addEventListener("click", function() {
    	reCalc("Ola");
    	},false);
    document.getElementById("Uber").addEventListener("click", function() {
    	reCalc("Uber");
    	},false);
};

function changeMap() {
	console.log("changemap called");
	start_place = start_autocomplete.getPlace();
	end_place = end_autocomplete.getPlace();
	
	start_lat = start_place.geometry.location.lat();
	start_lng = start_place.geometry.location.lng();
	end_lat = end_place.geometry.location.lat();
	end_lng = end_place.geometry.location.lng();
	//var end_latlng = (end_lat, end_lng);
	var start_latlng = new google.maps.LatLng(start_lat, start_lng);
	var end_latlng = new google.maps.LatLng(end_lat, end_lng);

	//start_autocomplete.set('place', end_latlng);
	mapOptions = {
		center: new google.maps.LatLng(start_lat, start_lng),
		zoom: 18,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	
    logError("Starting");
	map = new google.maps.Map(document.getElementById("map"), mapOptions);
    var directionsService = new google.maps.DirectionsService();
    var directionDisplay;
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);
 
	var request = {
    	origin:start_latlng,
    	destination:end_latlng,
    	travelMode: google.maps.TravelMode.DRIVING
  	};
  	directionsService.route(request, function(result, status) {
    	if (status == google.maps.DirectionsStatus.OK) {
      		directionsDisplay.setDirections(result);
      		myRoute = result.routes[0].legs[0];
  			dist = myRoute.distance.value/1000;
      		updateFare();
			
    	}
  	});

}

function updateFare () {
   	var resultDist = document.getElementById("resultDist");
	resultDist.innerHTML = myRoute.distance.text;
	var resultFare = document.getElementById("resultFare");
	resultFare.innerHTML = calcFare();
	var resultMode = document.getElementById("resultMode");
	resultMode.innerHTML = 'Fare (in Rs.) for '+modeTravel;

}
function logError(msg) {
    //var s = document.getElementById("debug");
    //s.value += msg;
}
function reCalc(transport) {
	document.getElementById(modeTravel).className = "icon passive";
	modeTravel = transport;
	document.getElementById(modeTravel).className = "icon active";
	//calcFare();
	updateFare();
	logError(transport);
}

function calcFare(){
	console.log(options);
	fares = [];
	fare = [];
	farecolumns = '<tr>';
	farerows = '<tr>';
	//firstrow = 1;
	for (mode in options)
	{		
		if (options[mode].Mode == modeTravel)
		{
			fare = calcMatrix(options[mode].rate[0], options[mode].rate[1], options[mode].rate[2],options[mode].rate[3], options[mode].rate[4]);
			//if (firstrow) {
			farecolumns = farecolumns +'<th>'+options[mode].Option+'</th>';
			//	firstrow = 0;
			//}
			farerows = farerows +'<td>'+fare+'</td>';
		}	
	}
	farehtml = '<table class="fare-table">'+farecolumns +'</tr>'+farerows+'</tr></table>';
	
	return farehtml;
}
function calcMatrix(baseFare, minDist, minFare, unitFare, fareMultiplier){
	/*if (dist<=minDist) {
		fare = minFare*fareMultiplier;
	}
	else fare = Math.ceil(dist*unitFare*fareMultiplier);*/
	fare = baseFare+dist*unitFare;
	if (fare<=minFare) {
		fare = minFare;
	}
	fare = Math.ceil(fare*fareMultiplier);
	
	return fare;
}

var onSuccess = function(position) {
    alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');
    start_lat = position.coords.latitude;
    start_lng = position.coords.longitude;
	mapOptions = {
		center: new google.maps.LatLng(start_lat, start_lng),
		zoom: 18,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById("map"), mapOptions);

};

// onError Callback receives a PositionError object
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

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
var end_lat = '';
var end_lng = '';

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
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
        console.log('Received Event: ' + id);
    }
};
function initializeMap() {
	navigator.geolocation.getCurrentPosition(onSuccess, onError, { maximumAge: 10000, timeout: 10000, enableHighAccuracy: true });  
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
};

function changeMap() {
	//document.getElementById('location').value = "";
	//x.setAttribute("value","");
	
	var start_place = start_autocomplete.getPlace();
	var end_place = end_autocomplete.getPlace();
	start_lat = start_place.geometry.location.lat();
	start_lng = start_place.geometry.location.lng();
	var mapOptions = {
		center: new google.maps.LatLng(start_lat, start_lng),
		zoom: 18,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    start_autocomplete.set('place',void(0));
    end_autocomplete.set('place',void(0));
	

	
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
	var mapOptions = {
		center: new google.maps.LatLng(start_lat, start_lng),
		zoom: 18,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("map"), mapOptions);

};

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

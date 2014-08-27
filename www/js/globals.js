var start_lat = '';
var start_lng = '';
var start_place = '';
var end_place = '';
var end_lat = '';
var end_lng = '';
var bang_lat = 12.971599;
var bang_lng = 	77.594563;

var map = '';
var mapOptions = '';
var dist = 0;
var options = '';


var modeTravel = 'Auto'; //auto or meru
var curPage=1;
/*
var options = '';/*[
    {"City":"Bangalore", "Mode": "Auto", "Option": "Day", "rate": [0, 1.9, 25, 13, 1], "Timing":['0500','2300']}, //Fare array = baseFare, least distance, least fare, per km rate, multiplier
    {"City":"Bangalore", "Mode": "Auto", "Option": "Night", "rate": [0, 1.9, 25, 13, 1.5], "Timing":['2300', '0500']},
    {"City":"Bangalore", "Mode": "Meru", "Option": "Day", "rate": [0, 4, 80, 19.50, 1],"Timing":['0500','0000'], "Convenience":[40,60], "Comment":["Rs. 40 within 35 minutes, Rs. 60 within 24h", "No charge for the first 20min"]},
    {"City":"Bangalore", "Mode": "Meru", "Option": "Night", "rate": [0, 4, 88, 21.45, 1],"Timing":['0000', '0500'], "Convenience":[40,60], "Comment":["Rs. 40 within 35 minutes, Rs. 60 within 24h", "No charge for the first 20min"]},
    {"City":"Bangalore", "Mode": "MegaCabs", "Option": "Day", "rate": [0, 4, 80, 19.50,1], "Timing":['0600','0000'], "Convenience":[35], "Comment":"Flat Rs. 35 per phone booking"},
    {"City":"Bangalore", "Mode": "MegaCabs", "Option": "Night", "rate": [0, 4, 80, 19.50, 1.1],"Timing":['0000','0600'],"Convenience":[35], "Comment":"Flat Rs. 35 per phonebooking"},
    {"City":"Bangalore", "Mode": "Ola", "Option": "Day/Night", "rate": [0, 7.14, 150, 21, 1], "Comment":"No Night Fees or Phone Booking Charges."},
    {"City":"Bangalore", "Mode": "Ola", "Option": "Luxury", "rate": [0, 5, 200, 20, 1], "Comment":"No Night Fees or Phone Booking Charges."},
    {"City":"Bangalore", "Mode": "Uber", "Option": "Uber Black", "rate": [80, 4.4, 200, 18, 1], "Comment":"App only bookings."},
    {"City":"Bangalore", "Mode": "Uber", "Option": "Uber X", "rate": [50, 5, 125, 15, 1], "Comment":"App only bookings."}
];*/

var myRoute = '';
var myRoute = [{"distance":[{"value":"", text:"N/A"}]}];
//var myRoute.distance.value = '';
//var myRoute.distance.text = 'N/A';


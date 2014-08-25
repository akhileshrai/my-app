function calc_dist (point_lat, point_lng){
  	var R = 6371; // Radius of the earth in km
  	var dLat = (point_lat-bang_lat) * Math.PI / 180;  // deg2rad below
  	var dLon = (point_lng - bang_lng) * Math.PI / 180;
	var a = 
	     0.5 - Math.cos(dLat)/2 + 
	     Math.cos(bang_lat * Math.PI / 180) * Math.cos(point_lat * Math.PI / 180) * 
	     (1 - Math.cos(dLon))/2;
	var d = R * 2 * Math.asin(Math.sqrt(a));
	console.log("HI");
	console.log(point_lat, bang_lat);
	console.log(d);
}

function updateFare () {
   	var resultDist = document.getElementById("resultDist");
	resultDist.innerHTML = myRoute.distance.text;
	var resultFare = document.getElementById("resultFare");
	resultFare.innerHTML = calcFare();
	//var resultMode = document.getElementById("resultMode");
	//resultMode.innerHTML = 'Fare (in Rs.) for '+modeTravel;

}
function logError(msg) {
    //var s = document.getElementById("debug");
    //s.value += msg;
}
function reCalc(transport) {
	document.getElementById(modeTravel).className = "iconimg passive";
	modeTravel = transport;
	document.getElementById(modeTravel).className = "iconimg  active";
	//calcFare();
	console.log(transport);
	try {
		updateFare();
	}
	catch (error){
		noNetwork(error);
	}
	logError(transport);
}
function calcFare(){
	//console.log(options);
	fare = [];
	farecolumns = '<tr>';
	farerows = '<tr>';
	//firstrow = 1;
	if (options!=''){
		console.log('got into mode loop')
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
	}
	else {
		farehtml = '<table class="fare-table"><th>Cannot download current prices</th></table>';
	}
	
	
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

//var fares='';
var userId = '1';
//
angular.module('directory.controllers', [])

    .controller("MyController", function($scope) {
        $scope.myData = {};
        $scope.myData.doClick = function(modeIn) {
            //reCalc(modeIn);
            
        };
    })
    .controller('EmployeeListCtrl', function ($scope, Employees) {

        $scope.searchPlate = "";
        $scope.userId = userId;
        $scope.driverId = '';

        $scope.clearSearch = function () {
            $scope.searchState = "";
            $scope.searchSeg1 = "";
            $scope.searchSeg2 = "";
            $scope.searchPlate = "";
        };
        $scope.clearDriver = function () {
            $scope.firstName = "";
            $scope.lastName = "";
       };

        $scope.addDriver = function () {
            console.log('Adding Driver', $scope.firstName, $scope.lastName);
            chosenDriver = Employees.query({State:$scope.searchState, SEG1: $scope.searchSeg1, SEG2: $scope.searchSeg2, Plate: $scope.searchPlate, firstName:$scope.firstName, lastName: $scope.lastName});
	    	chosenDriver.$promise.then(function (result) {
	    		$scope.chosenDriver = result[0];
	    		$scope.driverId = result[0]["_id"];
	    		$scope.oneResult = 1;
			});
        };
        $scope.search = function () {
            $scope.fares = Employees.query({State:$scope.searchState, SEG1: $scope.searchSeg1, SEG2: $scope.searchSeg2, Plate: $scope.searchPlate});
            $scope.fares.$promise.then(function (result) {
			    if (result.length===1){
			    	$scope.oneResult = 1;
			    	$scope.driverId = result[0]["_id"];
			    	$scope.chosenDriver = result[0];
			    	
			    }
			    else if (result.length===0) {	
			    	$scope.oneResult = 0;
			    }
			    else {
			    	$scope.oneResult = 2;
			    }
			});
        };
        $scope.scoreDriver = function () {
        	$scope.ScoreIt = Employees.query({userId:userId, driverId:$scope.driverId, rating:$scope.driverRating});
        	$scope.ScoreIt.$promise.then(function (result) { 
        		$scope.chosenDriver.Score = result[0].rating;
        		});

        };

        $scope.fares = Employees.query();
        console.log('updated fares');
        
    })
    
    .controller('watchCtrl', function ($scope, Watch) {
    	console.log('watching position');
    	$scope.position = '';
		var watchID = navigator.geolocation.watchPosition(onSuccess, onError, { timeout: 300000 });
		function onSuccess(position) {
		    //var element = document.getElementById('geolocation');
		    $scope.position += 'Latitude: '  + position.coords.latitude      + '<br />' +
		                        'Longitude: ' + position.coords.longitude     + '<br />' +
		                        '<hr />';
		    Watch.save({lat:position.coords.latitude,lng:position.coords.longitude}, function(response){
		    	console.log ('got a response');
				$scope.message = response.message;
			});
		    //console.log(position.coords.latitude, position.coords.longitude);
		}
		
		// onError Callback receives a PositionError object
		//
		function onError(error) {
		    $scope.position = 'Latitude: Couldn\'t find position';
		    
		}

		
		
    })
    
    .controller('OptionCtrl', function ($scope, Fares) {
	    console.log('optioncctrl' + options);
        receivedEvent('deviceready');
        var uuid = device.uuid;
		console.log ("uuid:", uuid)


		if (options=='') {
	        options = Fares.query();
	        options.$promise.then(function (result) {
	   		    $scope.modes = returnModes(result);
			    
			});
		
		}
		else $scope.modes = returnModes(options);
        
		returnModes = function (options) 
		{
			var lookup = {};
			var items = options;
			var result = [];
			for (item in items) {
				
				var name = items[item].Mode;
				if (name!=null && !(name in lookup)) {
					lookup[name] = 1;
					result.push({"Mode":name});
				}
			}
			return result;
		};
		
		$scope.myData = {};
        $scope.myData.doClick = function(modeIn) {
            console.log(modeIn);
            reCalc(modeIn);
            
        };

    });
 	
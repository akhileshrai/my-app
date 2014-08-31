//var fares='';
angular.module('directory.controllers', [])

    .controller("MyController", function($scope) {
        $scope.myData = {};
        $scope.myData.doClick = function(modeIn) {
            //reCalc(modeIn);
            
        };
    })
    .controller('EmployeeListCtrl', function ($scope, Employees) {

        $scope.searchPlate = "";

        $scope.clearSearch = function () {
            $scope.searchKey = "";
            $scope.fares = Employees.query();
            //options = $scope.fares;
        };

        $scope.search = function () {
        	console.log('searching')
            $scope.fares = Employees.query({Plate: $scope.searchPlate});
        };

        $scope.fares = Employees.query();
    	//options = Employees.query();
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
	
		if (options=='') {
	        options = Fares.query();
	        $scope.modes = {};
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
			console.log(result);
			
			//return result;
			return result;
		};
		
		$scope.myData = {};
        $scope.myData.doClick = function(modeIn) {
            console.log(modeIn);
            reCalc(modeIn);
            
        };


        //console.log(mode);
    })
/**
    .controller('EmployeeDetailCtrl', function($scope, $stateParams, Employees) {
        console.log('details');
        $scope.employee = Employees.get({employeeId: $stateParams.employeeId});
    })

    .controller('EmployeeReportsCtrl', function ($scope, $stateParams, Employees) {
        console.log('reports');
        $scope.employee = Employees.get({employeeId: $stateParams.employeeId, data: 'reports'});
    })*/;
    
 	
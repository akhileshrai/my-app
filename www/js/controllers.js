//var fares='';
angular.module('directory.controllers', [])

    .controller("MyController", function($scope) {
        $scope.myData = {};
        $scope.myData.doClick = function(modeIn) {
            //reCalc(modeIn);
            
        };
    })
    .controller('EmployeeListCtrl', function ($scope, Employees) {

        $scope.searchKey = "";

        $scope.clearSearch = function () {
            $scope.searchKey = "";
            $scope.fares = Employees.query();
            //options = $scope.fares;
        };

        $scope.search = function () {
            $scope.fares = Employees.query({name: $scope.searchKey});
        };

        $scope.fares = Employees.query();
    	//options = Employees.query();
        console.log('updated fares');
        
    })
    
    .controller('watchCtrl', function ($scope, Fares) {
    	console.log('watching position');
		var watchID = navigator.geolocation.watchPosition(onSuccess, onError, { timeout: 30000 });
		function onSuccess(position) {
		    //var element = document.getElementById('geolocation');
		    element.innerHTML = 'Latitude: '  + position.coords.latitude      + '<br />' +
		                        'Longitude: ' + position.coords.longitude     + '<br />' +
		                        '<hr />'      + element.innerHTML;
		    console.log(position.coords.latitude, position.coords.longitude);
		}
		
		// onError Callback receives a PositionError object
		//
		function onError(error) {
		    alert('code: '    + error.code    + '\n' +
		          'message: ' + error.message + '\n');
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
    
 	
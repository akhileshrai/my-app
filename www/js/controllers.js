//var fares='';
var options = '';
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
            options = $scope.fares;
        };

        $scope.search = function () {
            $scope.fares = Employees.query({name: $scope.searchKey});
        };

        $scope.fares = Employees.query();
    	options = Employees.query();
        console.log('updated fares');
        console.log(options);
        
    })
    
    .controller('OptionCtrl', function ($scope, Fares) {
    	
        $scope.searchKey = "";
/*
        $scope.clearSearch = function () {
            $scope.searchKey = "";
            $scope.fares = Fares.query();
            fares = $scope.fares;
        };

        $scope.search = function () {
            $scope.fares = Fares.query({name: $scope.searchKey});
        };

*/
  		//options = Fares.query();


		
        $scope.options = Fares.query();

        $scope.modes = {}
		$scope.returnModes = function (options) 
		{
			var lookup = {};
			var items = options;
			var result = [];
		
		    
		    console.log("returnin modes");
		    	
			for (item in items) {
				var name = items[item].Mode;
				if (name!=null && !(name in lookup)) {
					lookup[name] = 1;
					result.push({"Mode":name});
					console.log('hi');
				}
			}
			console.log(result);
			
			//return result;
			$scope.modes = result;
		};
		
		$scope.myData = {};
        $scope.myData.doClick = function(modeIn) {
            //reCalc(modeIn);
            
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
    
 	
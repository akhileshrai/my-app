angular.module('directory', ['ngRoute', 'directory.controllers', 'directory.services'])

    .config(['$routeProvider',
		  function($routeProvider) {
		    $routeProvider.
		      when('/employees', {
		        templateUrl: 'templates/employee-detail.html',
		        controller: 'EmployeeDetailCtrl'
		      }).
		      when('/search', {
		        templateUrl: 'templates/employee-list.html',
		        controller: 'EmployeeListCtrl'
		      }).
		      when('/rate', {
		        templateUrl: 'templates/mode-detail.html',
		        controller: 'OptionCtrl'
		      }).
		      when('/watch', {
		        templateUrl: 'templates/watch.html',
		        controller: 'watchCtrl'
		      }).
		      otherwise({
		        redirectTo: '/rate'
		      });
		  }]);
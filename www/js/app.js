angular.module('directory', ['ngRoute', 'directory.controllers', 'directory.services'])

	/*
    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider

            .state('employee', {
                url: '/employees/:employeeId',
                templateUrl: 'templates/employee-detail.html',
                controller: 'EmployeeDetailCtrl'
            })
            .state('search', {
                url: '/search',
                templateUrl: 'templates/employee-list.html',
                controller: 'EmployeeListCtrl'
            });

        $urlRouterProvider.otherwise('/search');

    });*/
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
		      when('/options', {
		        templateUrl: 'templates/mode-detail.html',
		        controller: 'OptionCtrl'
		      }).
		      
		      otherwise({
		        redirectTo: '/search'
		      });
		  }]);
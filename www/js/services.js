angular.module('directory.services', ['ngResource'])

    .factory('Employees', function ($resource) {
        return $resource('http://127.0.0.1:5000/employees/:employeeId/:data');
    })
    .factory('Fares', function ($resource) {
        return $resource('http://127.0.0.1:5000/options/:mode/:data');
    })
    .factory('Watch', function ($resource) {
        return $resource('http://127.0.0.1:5000/watch/:data');
    })
    .factory('AddDriver', function ($resource) {
        return $resource('http://127.0.0.1:5000/drivers/:data');
    });
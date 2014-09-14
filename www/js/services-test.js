angular.module('directory.services', ['ngResource'])

    .factory('Employees', function ($resource) {
        return $resource('http://ec2-54-88-42-116.compute-1.amazonaws.com:5000/employees/:employeeId/:data');
    })
    .factory('Fares', function ($resource) {
        return $resource('http://ec2-54-88-42-116.compute-1.amazonaws.com:5000/options/:mode/:data');
    })
    .factory('Watch', function ($resource) {
        return $resource('http://ec2-54-88-42-116.compute-1.amazonaws.com:5000/watch/:data');
    })
    .factory('AddDriver', function ($resource) {
        return $resource('http://ec2-54-88-42-116.compute-1.amazonaws.com:5000/drivers/:data');
    });
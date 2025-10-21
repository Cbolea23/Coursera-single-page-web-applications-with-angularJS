(function (){
    'use strict';

    angular.module('myFirstApp', [])
    .controller('MyFirstController', function($scope){
        $scope.name = "John Doe";
        $scope.sayHello = function(){
            return "Hello Coursera!";
        }
    });

})();
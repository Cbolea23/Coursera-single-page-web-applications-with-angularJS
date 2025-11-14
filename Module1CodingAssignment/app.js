(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {
    $scope.lunchItems = "";
    $scope.message = "";

    $scope.checkItems = function () {
        var items = $scope.lunchItems;

        if (items.trim() === "") {
            $scope.message = "Please enter data first";
            return;
        }

        var itemList = items.split(',');
        var itemCount = itemList.length;

        var realItemCount = 0;
        for (var i = 0; i < itemList.length; i++) {
            if (itemList[i].trim() !== "") {
                realItemCount++;
            }
        }

        if (realItemCount <= 3) {
            $scope.message = "Enjoy!";
        } else {
            $scope.message = "Too much!";
        }
    };
}

})();

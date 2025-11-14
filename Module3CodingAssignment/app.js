(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.directive('itemsLoaderIndicator', ItemsLoaderIndicatorDirective)
.constant('ApiBasePath', "https://coursera-jhu-default-rtdb.firebaseio.com");

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
    var ctrl = this;
    ctrl.searchTerm = "";
    ctrl.found = [];
    ctrl.loading = false;
    ctrl.searched = false;

    ctrl.searchItems = function () {
        ctrl.loading = true;
        ctrl.searched = true;
        ctrl.found = [];

        if (ctrl.searchTerm.trim() === "") {
            ctrl.loading = false;
            return;
        }

        var promise = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);
        promise.then(function (result) {
            ctrl.found = result;
        })
        .catch(function (error) {
            console.error("Something went wrong!", error);
        })
        .finally(function () {
            ctrl.loading = false;
        });
    };

    ctrl.removeItem = function (index) {
        ctrl.found.splice(index, 1);
    };
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
    var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
        return $http({
            method: "GET",
            url: (ApiBasePath + "/menu_items.json")
        }).then(function (result) {
            var foundItems = [];
            var menuItems = result.data.menu_items;

            for (var i = 0; i < menuItems.length; i++) {
                if (menuItems[i].description.toLowerCase().includes(searchTerm.toLowerCase())) {
                    foundItems.push(menuItems[i]);
                }
            }
            return foundItems;
        });
    };
}

function FoundItemsDirective() {
    var ddo = {
        templateUrl: 'foundItems.html',
        scope: {
            items: '<',
            onRemove: '&'
        },
        controller: FoundItemsDirectiveController,
        controllerAs: 'list',
        bindToController: true
    };
    return ddo;
}

function FoundItemsDirectiveController() {
}

function ItemsLoaderIndicatorDirective() {
    var ddo = {
        templateUrl: 'itemsloaderindicator.template.html'
    };
    return ddo;
}

})();

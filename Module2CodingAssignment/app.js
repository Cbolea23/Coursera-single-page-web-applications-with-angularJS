(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
    var toBuy = this;
    toBuy.items = ShoppingListCheckOffService.getToBuyItems();
    toBuy.buyItem = function (itemIndex) {
        ShoppingListCheckOffService.buyItem(itemIndex);
    };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
    var alreadyBought = this;
    alreadyBought.items = ShoppingListCheckOffService.getBoughtItems();
}

function ShoppingListCheckOffService() {
    var service = this;

    var toBuyItems = [
        { name: "cookies", quantity: 10 },
        { name: "soda", quantity: 5 },
        { name: "milk", quantity: 1 },
        { name: "apples", quantity: 12 },
        { name: "bread", quantity: 1 }
    ];

    var boughtItems = [];

    service.buyItem = function (itemIndex) {
        var item = toBuyItems[itemIndex];
        toBuyItems.splice(itemIndex, 1);
        boughtItems.push(item);
    };

    service.getToBuyItems = function () {
        return toBuyItems;
    };

    service.getBoughtItems = function () {
        return boughtItems;
    };
}

})();

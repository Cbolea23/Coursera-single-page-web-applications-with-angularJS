(function () {
'use-strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider

        .state('home', {
            url: '/',
            templateUrl: 'home.template.html'
        })

        .state('categories', {
            url: '/categories',
            template: '<categories categories="catList.categories"></categories>',
            controller: 'CategoriesController as catList',
            resolve: {
                categories: ['MenuDataService', function (MenuDataService) {
                    return MenuDataService.getAllCategories();
                }]
            }
        })

        .state('items', {
            url: '/items/{categoryShortName}',
            template: '<items items="itemList.items"></items>',
            controller: 'ItemsController as itemList',
            resolve: {
                items: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
                    return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
                }]
            }
        });
}

})();

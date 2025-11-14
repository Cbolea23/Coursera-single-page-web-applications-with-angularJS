(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['MenuService', 'RegistrationService'];
function SignUpController(MenuService, RegistrationService) {
  var signUpCtrl = this;
  signUpCtrl.user = {};
  signUpCtrl.saved = false;
  signUpCtrl.favoriteDishInvalid = false;

  signUpCtrl.submit = function () {
 
    var promise = MenuService.getMenuItemByShortName(signUpCtrl.user.favoriteDish);

    promise.then(function (response) {

      signUpCtrl.favoriteDishInvalid = false;
      
 
      signUpCtrl.user.favoriteMenuItem = response; 
      

      RegistrationService.saveUserInfo(signUpCtrl.user);
      

      signUpCtrl.saved = true;
    })
    .catch(function (error) {

      signUpCtrl.favoriteDishInvalid = true;
      signUpCtrl.saved = false;
    });
  };

  signUpCtrl.validateFavoriteDish = function () {
    signUpCtrl.favoriteDishInvalid = false;
    signUpCtrl.saved = false;
  };
}

})();
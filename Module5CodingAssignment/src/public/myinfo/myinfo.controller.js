(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['RegistrationService', 'ApiPath'];
function MyInfoController(RegistrationService, ApiPath) {
  var myInfoCtrl = this;
  
  myInfoCtrl.basePath = ApiPath;

  myInfoCtrl.user = RegistrationService.getUserInfo();
}

})();
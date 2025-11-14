(function () {
"use strict";

angular.module('public')
.service('RegistrationService', RegistrationService);

function RegistrationService() {
  var service = this;
  var userInfo; 

  service.saveUserInfo = function (user) {
    userInfo = user;
  };

  service.getUserInfo = function () {
    return userInfo;
  };
}

})();
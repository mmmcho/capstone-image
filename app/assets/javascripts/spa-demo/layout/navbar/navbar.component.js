(function() {
  "use strict";

  angular
    .module("spa-demo.layout")
    .component("sdNavbar", {
      templateUrl: templateUrl,
      controller: NavbarController
    });


  templateUrl.$inject = ["spa-demo.config.APP_CONFIG"];
  function templateUrl(APP_CONFIG) {
    return APP_CONFIG.navbar_html;
  }

  NavbarController.$inject = ["$scope","spa-demo.authn.Authn"];
  function NavbarController($scope, Authn) {
    var vm=this;
    vm.getLoginLabel = getLoginLabel;
    vm.getProfileImageUrl = getProfileImageUrl;
    vm.getCurrentUserImage = Authn.getCurrentUserImage;
    vm.$onInit = function() {
      console.log("NavbarController",$scope);
    }
    return;
    //////////////
    function getLoginLabel() {
      return Authn.isAuthenticated() ? Authn.getCurrentUserName() : "Login";
    }

    function getProfileImageUrl(){
      var imageid = Authn.getCurrentUserImage();
      if (imageid) {
        return "/api/images/"+ imageid +"/content?width=50";
      } else {
        return "#";
      }

    }

  }
})();

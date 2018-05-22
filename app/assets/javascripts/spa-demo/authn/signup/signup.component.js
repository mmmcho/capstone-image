(function() {
  "use strict";

  angular
    .module("spa-demo.authn")
    .component("sdSignup", {
      templateUrl: templateUrl,
      controller: SignupController,
    });


  templateUrl.$inject = ["spa-demo.config.APP_CONFIG"];
  function templateUrl(APP_CONFIG) {
    return APP_CONFIG.authn_signup_html;
  }

  SignupController.$inject = ["$scope","$state",
                              "spa-demo.authn.Authn",
                              "spa-demo.layout.DataUtils",
                              "spa-demo.subjects.Image","$window"];
  function SignupController($scope, $state, Authn, DataUtils, Image, $window) {
    var vm=this;
    vm.signupForm = {}
    vm.signup = signup;
    vm.setImageContent = setImageContent;

    vm.$onInit = function() {
      console.log("SignupController",$scope);
      vm.item = new Image();
    }
    return;
    //////////////
    function setImageContent(dataUri) {
      //console.log("setImageContent from signup", dataUri ? dataUri.length : null);
      vm.item.image_content = DataUtils.getContentFromDataUri(dataUri);
      //console.log("SignupController",$scope);
    }

    function signup() {
      console.log("signup...");
      $scope.signup_form.$setPristine();

          Authn.signup(vm.signupForm).then(
            function(response){
              vm.id = response.data.data.id;
              console.log("signup complete", response.data, vm);
              if (vm.item.image_content) {
                //vm.item.signup=true;
                vm.item.$save().then(
                  function() {
                    console.log("image saved", vm.item.id);
                    vm.signupForm.image_id = vm.item.id;
                    Authn.updateProfileImage(vm.signupForm).then(
                      function(response) {
                        console.log("user profile image updated");
                         $window.location.href = '/';
                      }, handleError);
                  }, handleError);
                } else {
                  $window.location.href = '/';
                }
              }, handleError);
    }

    function handleError(response) {
      console.log("error", response);
      if (response.data) {
        vm.signupForm["errors"]=response.data.errors;
      }
      if (!vm.signupForm.errors) {
        vm.signupForm["errors"]={}
        vm.signupForm["errors"]["full_messages"]=[response];
      }
      $scope.signup_form.$setPristine();
    }

  }
})();

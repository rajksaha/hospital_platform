app.controller('HomeController', function($scope, $rootScope, $modal, $http, $timeout, $location, UserSetupService) {




    $scope.hasError = false;
    $scope.hasSuccess = false;
    $scope.message = "";

    $scope.changePassword = function(userData){


        var modalInstance = $modal.open({
            templateUrl: 'resources/javascript/templates/user/changePasswordModal.html',
            controller: 'HomeController.ChangePasswordModal',
            backdrop: "static",
            windowClass: 'fade in ',
            resolve: {
                modalConfig: function () {
                    return userData;
                }
            }
        });

        modalInstance.result.then(function(result) {
            $scope.hasError = false;
            $scope.hasSuccess = true;
            $scope.message = result;
        });

    };

    if($rootScope.userData.status == 2){
        //Ask for password change
        $scope.changePassword($rootScope.userData);
        $rootScope.userData.status = 2;
    }


});

app.controller('HomeController.ChangePasswordModal', function($scope, $modalInstance, $timeout, $filter, $rootScope, modalConfig, UserSetupService) {

    $scope.userData = modalConfig;



    $scope.save = function(){

        if(validator.validateForm("#validationRequired",".validatorMsg",null)) {

            var userData = {};
            userData.password = $scope.password;
            userData.userID = $scope.userData.userID;
            UserSetupService.updateUserPassword.query({}, userData).$promise.then(function(result) {
                if(result && result.success) {

                    $modalInstance.close("Password changed Successfully");
                } else {
                }
            });
        }
    }
    $scope.cancel = function (){
        $modalInstance.dismiss('cancel');
    };


});
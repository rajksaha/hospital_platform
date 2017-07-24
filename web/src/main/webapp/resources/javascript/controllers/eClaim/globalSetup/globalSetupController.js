/**
 * Created by raj on 4/26/2016.
 */

app.controller('GlobalSetupController', function($scope, $modal, $state, $stateParams, $http, $timeout, $location, GlobalSetupService) {

    $scope.hasError = false;
    $scope.hasSuccess = false;
    $scope.message = "";
    $scope.globalSetup = {};
    $scope.showForm = false;
    $scope.editObj = {};

    $scope.searchData = {};



    $scope.init = function() {


        GlobalSetupService.getData.query({}, {} ).$promise.then(function(result) {
            $scope.globalSetup = result;
        });



    };

    $scope.save = function(subCategory) {
        //$scope.hideMessage();
        if(validator.validateForm("#validationRequired",".validatorMsg",null)) {
            GlobalSetupService.save.query({}, subCategory ).$promise.then(function(result) {
                if(result && result.success) {
                    $scope.showSuccessMessage("Information saved successfully");
                    $scope.init();
                } else {
                    $scope.showErrorMessage(result.message);
                }
            });
        }
    };

    $scope.update = function(subCategory) {
        //$scope.hideMessage();
        if(validator.validateForm("#validationRequired",".validatorMsg",null)) {
            GlobalSetupService.update.query({}, subCategory ).$promise.then(function(result) {
                if(result && result.success) {
                    $scope.showSuccessMessage("Information saved successfully");
                    $scope.init();
                } else {
                    $scope.showErrorMessage(result.message);
                }
            });
        }
    };






    $scope.showErrorMessage = function(message){
        $scope.hasError = true;
        $scope.hasSuccess = false;
        $scope.message = message;
    };

    $scope.showSuccessMessage = function(message){
        $scope.hasError = false;
        $scope.hasSuccess = true;
        $scope.message = message;
    };

    $scope.showDetailPopUp = function(claim){

        var modalInstance = $modal.open({
            templateUrl: 'resources/javascript/templates/hrApproval/claimDetailModal.html',
            controller: 'HrApprovalController.ClaimDetailPopUp',
            backdrop: "static",
            windowClass: 'fade in ',
            resolve: {
                modalConfig: function () {
                    return claim.resultList;
                }
            }
        });
        modalInstance.result.then(function(result) {
            $scope.showSuccessMessage("Information updated successfully");
            $scope.init();
        });

    };

    $scope.getClaimBulkDetail = function (userClaim){

        $scope.claimBulk = {};
        $scope.claimBulk = userClaim;
        $scope.markAllApprove(userClaim.claimFormList);
        $scope.singleView = true;

    };



    $scope.init();

});

app.controller('HrApprovalController.ClaimDetailPopUp', function($scope, $modalInstance, $timeout, $filter, modalConfig) {

    $scope.resultList = modalConfig;


    $scope.close = function (){
        $modalInstance.dismiss('cancel');
    };


});


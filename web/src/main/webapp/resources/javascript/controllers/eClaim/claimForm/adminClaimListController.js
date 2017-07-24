app.controller('AdminClaimListController', function($scope, $rootScope, $state, $stateParams, $http, $timeout, $location, CategoryService, ClaimService, $filter) {

    $scope.hasError = false;
    $scope.hasSuccess = false;
    $scope.message = "";
    $scope.categoryList = [];
    $scope.showForm = false;
    $scope.editObj = {};



    $scope.init = function() {
        var claimantID = 1;
        ClaimService.getClaimEventByStatus.query({}, {status: 'APPROVAL'}).$promise.then(function(result) {
                $scope.claimList = result;
            });
    };

    $scope.getText = function(val){
        if(val == 0){
            return "Text";
        }else if(val == 1){
            return "Number";
        }else{
            return "Date";
        }
    }





    $scope.masterClaim = [];

    $scope.update = function(status) {
        $scope.claim.status = status;
        ClaimService.update.query({}, $scope.claim ).$promise.then(function(result) {
            if(result && result.success) {
                $scope.showSuccessMessage("Information updated successfully");
                $scope.init();
                $scope.showForm = false;
            } else {
                $scope.showErrorMessage(result.message);
            }
        });
    };



    $scope.detail = function(categoryField) {
        $state.go('root.categoryField/' + category.categoryField);
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

    $scope.hideMessage = function(){
        $scope.hasError = false;
        $scope.hasSuccess = false;
    };

    $scope.edit = function(claim){
        $scope.categoryList = {};
        $scope.claim = claim;
        $scope.categoryList = claim.claimList;
        $scope.hideMessage();
        $scope.showForm = true;
    };

    $scope.reset = function(){
        angular.copy($scope.editObj, $scope.categoryField);
        $scope.hideMessage();
        validator.hideError("#validationRequired");
    };

    $scope.claimFormList = [];
    $scope.add = function(category){
        $scope.editObj = {};
        $scope.reset();

        if(category.claimFormList == undefined){
            category.claimFormList = [];
            category.updatedData = [];
        }
        if(category.claimFormList.length == 0){
            angular.copy(category.fieldDATAs, category.updatedData);
        }

        var test = [];
       angular.copy(category.updatedData, test);
        var claimForm = {'resultList' : test};
        category.claimFormList.push(claimForm);
        $scope.showForm = true;
    };

    $scope.cancel = function(){
        $scope.reset();
        $scope.showForm = false;
    };

    $scope.backToList = function() {
        $scope.cancel();
    };

    $scope.init();

});
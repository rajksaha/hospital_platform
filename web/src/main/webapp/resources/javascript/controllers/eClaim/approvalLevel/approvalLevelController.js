app.controller('ApprovalLevelController', function($scope, $rootScope, $state, $stateParams, $http, $timeout, $location, ApprovalLevelService) {

    $scope.hasError = false;
    $scope.hasSuccess = false;
    $scope.message = "";
    $scope.approvalLevel = {};
    $scope.approvalLevelList = [];
    $scope.orderList = [];
    $scope.showForm = false;
    $scope.editObj = {};

    $scope.getText = function(num){
        if(num == 1){
            return "HR Claim";
        }else if(num == 2){
            return "Admin Claim";
        }else{
            return "Operational Claim";
        }
    };


    $scope.delete = function(data, index){

        ApprovalLevelService.delete.remove({companyApprovalID : data.companyApprovalID} ).$promise.then(function(result) {
            $scope.approvalLevelList.splice(index,1);
            $scope.showSuccessMessage("Information deleted successfully");
        });
    };

    $scope.init = function() {
        $scope.showForm = false;
        $scope.approvalLevel = {};

        ApprovalLevelService.getAll.query({}, {} ).$promise.then(function(result) {
            $scope.approvalLevelList = result;
        });

        ApprovalLevelService.getPermission.query({}, {} ).$promise.then(function(result) {
            $scope.permissionList = result;
        });

    };


    $scope.populateOrderList = function(add){

        $scope.orderList = [];
        if($scope.approvalLevelList && $scope.approvalLevelList.length > 0){
            for(var i = 0; i < $scope.approvalLevelList.length + add; i++){
                var temp = { 'value' : i +1, 'name' : i+1};
                $scope.orderList.push(temp);
            }
        }else{
            var temp = { 'value' : 1, 'name' : 1};
            $scope.orderList.push(temp);
        }
    };

    $scope.save = function(approvalLevel) {
        $scope.hideMessage();
        if(validator.validateForm("#validationRequired",".validatorMsg",null)) {
            ApprovalLevelService.save.query({}, approvalLevel ).$promise.then(function(result) {
                if(result && result.success) {
                    $scope.showSuccessMessage("Information saved successfully");
                    $scope.init();
                } else {
                    $scope.showErrorMessage(result.message);
                }
            });
        }
    };

    $scope.update = function(approvalLevel){
        $scope.hideMessage();
        if(validator.validateForm("#validationRequired",".validatorMsg",null)) {
            ApprovalLevelService.update.query({}, approvalLevel ).$promise.then(function(result) {
                if(result && result.success) {
                    $scope.showSuccessMessage("Information updated successfully");
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

    $scope.hideMessage = function(){
        $scope.hasError = false;
        $scope.hasSuccess = false;
    };

    $scope.edit = function(approvalLevel){
        $scope.approvalLevel = {};
        angular.copy(approvalLevel, $scope.editObj);
        angular.copy(approvalLevel, $scope.approvalLevel);
        $scope.hideMessage();
        $scope.populateOrderList(0);
        $scope.showForm = true;
    };

    $scope.reset = function(){
        angular.copy($scope.editObj, $scope.categoryField);
        $scope.hideMessage();
        validator.hideError("#validationRequired");
    };

    $scope.add = function(){
        $scope.editObj = {};
        $scope.reset();
        $scope.approvalLevel = {};
        $scope.populateOrderList(1);
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
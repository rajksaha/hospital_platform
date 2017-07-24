/**
 * Created by raj on 5/21/2016.
 */


app.controller('PendingDocumentController', function($scope, $modal, $state, $filter, $stateParams, $http, $timeout, $location, ApprovalService) {

    $scope.hasError = false;
    $scope.hasSuccess = false;
    $scope.message = "";
    $scope.categoryList = [];
    $scope.showForm = false;
    $scope.editObj = {};
    $scope.searchData = {};

    $scope.searchData = {};


    $scope.init = function() {
        ApprovalService.bringPendingDocument.query({}, $scope.searchData ).$promise.then(function(result) {
            $scope.claimFormList = result;
        });

    };

    $scope.getCompanyStatus = function (status){

        var returnString = status;

        if(status == "SUBMITTED"){
            return "Submitted";
        }
        if(status == "DRAFT"){
            return "Draft";
        }

        if(status == "APPROVED"){
            return "Approved";
        }



        for(var i=0;i<$scope.approvalLevelList.length;i++){
            if($scope.approvalLevelList[i].actionStateCode == status)   {
                returnString =  $scope.approvalLevelList[i].approvalState;
                break;
            }
        }
        if(returnString != status){
            return returnString;
        }

        for(var i=0;i<$scope.approvalLevelList.length;i++){
            if($scope.approvalLevelList[i].rejectStatus == status)   {
                returnString =  $scope.approvalLevelList[i].approvalState + " Rejected";
                break;
            }
        }

        if(returnString != status){
            return returnString;
        }
    };

    $scope.getText = function(resultList, type){

        var result = $filter('filter')(resultList, {fieldType: type})[0];

        return result.fieldValue;
    };


    $scope.showDetailPopUp = function(resultList, type){

        var result = $filter('filter')(resultList, {fieldType: type})[0];

        return result.fieldValue;
    };

    $scope.getAmount = function(resultList){

        var sum = 0;
        angular.forEach(resultList, function (value, key) {
            if(value.isAmount == 1){
                sum = sum + parseFloat(value.fieldValue);
            }
        });
        return sum.toFixed(2);
    };

    $scope.getAttachColumn = function(resultList, type){

        var result = $filter('filter')(resultList, {fieldType: type})[0];

        if(result){
            return result.imageContentList && result.imageContentList.length > 0;
        }

    };

    $scope.formatClaimRunningNumber = function(claim){
        if(claim.createdOn){
            var d = new Date(claim.createdOn);
            var n = d.getFullYear().toString().substr(2,2);
            var displayString = n + "-";
            for(var i = claim.claimBulkID.toString().length; i< 6; i++){
                displayString +="0";
            }
            displayString +=claim.claimBulkID;
            return displayString;
        }
        return null;
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
            templateUrl: 'resources/javascript/templates/eClaim/approval/claimDetailModal.html',
            controller: 'ClaimDetailModalController',
            backdrop: "static",
            windowClass: 'fade in ',
            resolve: {
                modalConfig: function () {
                    return claim.resultList;
                }
            }
        });
    };


    $scope.showImageInPopUP = function(data, type){


        var result = $filter('filter')(data, {fieldType: type})[0];

        var modalInstance = $modal.open({
            templateUrl: 'resources/javascript/templates/ImageModal.html',
            controller: 'ImageModalController',
            backdrop: "static",
            windowClass: 'fade in ',
            resolve: {
                modalConfig: function () {
                    return result.imageContentList;
                }
            }
        });

    };



    $scope.init();

});

/**
 * Created by raj on 9/21/2016.
 */


app.controller('ApprovalOnBehalfController', function($scope, $modal, $state, $stateParams, $http, $timeout, $location, $filter, $upload, limitToFilter, ApprovalService, ApprovalLevelService, CompanyTaxInfoService) {

    $scope.hasError = false;
    $scope.hasSuccess = false;
    $scope.message = "";
    $scope.categoryList = [];
    $scope.showForm = false;
    $scope.editObj = {};
    $scope.searchData = {};

    $scope.claimType = null;
    $scope.actionStateCode = null;

    $scope.reset = function(){
        $scope.hasError = false;
        $scope.hasSuccess = false;
        $scope.message = "";
    };

    $scope.init = function() {

        $scope.userProfileList = [];
        $scope.categoryList = [];
        $scope.searchComplete = false;

        ApprovalLevelService.getByClaimType.query({}, {claimType : $scope.claimType} ).$promise.then(function(result) {
            $scope.approvalLevelList = result;
            $scope.actionStateCode = null;
            $scope.staffCode = null;
        });

    };

    if($stateParams.claimType == undefined || $stateParams.claimType == null){
        $state.go('root.home');
    }else{
        $scope.claimType = $stateParams.claimType;
        $scope.init();
    }

    $scope.getTypeHeadItem = function(term) {
        return  ApprovalService.getItemForTypeHead.query({}, {data : term}).$promise.then(function(result) {
            $scope.productList = result;
            return limitToFilter($scope.productList, 10);
        });
    };


    $scope.onSelectItem = function(item, model, label){
        $scope.staffCode = item.employeeCode;
    };

    $scope.getApprovalLevelData = function(actionStateCode){

        var result = $filter('filter')($scope.approvalLevelList, {actionStateCode: actionStateCode})[0];

        return result;
    };

    $scope.search = function(){

        $scope.reset();
        if(validator.validateForm("#searchBox",".validatorMsg",null)) {
            $scope.searchData = {};
            $scope.approvalData = $scope.getApprovalLevelData($scope.actionStateCode);
            $scope.searchData.entityStatus = $scope.approvalData.actionStateCode;
            $scope.searchData.entityName = $scope.approvalData.approvalStateCode;
            $scope.searchData.entityType = $scope.approvalData.claimType;
            $scope.searchData.userName = $scope.staffCode;

            $scope.defaultView = "USERBULK";

            $scope.bringViewData("USERBULK");

        }

    };




    $scope.bringViewData = function (value){

        if(value == "USERBULK"){

            ApprovalService.bringClaimListBySearchData.query({}, $scope.searchData).$promise.then(function(result) {
                $scope.userProfileList = result;
                $scope.markAllUserApprove($scope.userProfileList);
                $scope.singleView = false;
                $scope.searchComplete = true;
            });

        }else{

            ApprovalService.bringCategoryClaimListBySearchData.query({}, $scope.searchData ).$promise.then(function(result) {
                $scope.categoryList = result;
                $scope.markAllApproveByCategory($scope.categoryList);
                $scope.singleView = false;
                $scope.searchComplete = true;

            });
        }
    };


    $scope.changeView = function (defaultValue){

        $scope.bringViewData(defaultValue);
    };

    $scope.bringClaimListBySearch = function(){
        ApprovalService.bringCategoryClaimListBySearchData.query({}, $scope.searchData ).$promise.then(function(result) {
            $scope.categoryList = result;
            $scope.markAllApprove($scope.categoryList);
        });

    };

    $scope.markAllUserApprove = function(userProfileList){
        angular.forEach(userProfileList, function (value, key) {
            value.isApproved = true;
        });
    };

    $scope.markAllApproveByCategory = function(categoryList){
        angular.forEach(categoryList, function (category, key) {
            category.isApproved = true;
            angular.forEach(category.categoryClaimFormList, function (claim, key) {
                claim.isApproved = true;
            });
        });
    };

    $scope.markAllApprove = function(claimFromList){
        angular.forEach(claimFromList, function (claim, key) {
            claim.isApproved = true;
        });
    };

    $scope.markApproveByCategory = function(categoryClaimFormList, status){
        angular.forEach(categoryClaimFormList, function (claim, key) {
            claim.isApproved = status;
        });
    };

    $scope.getText = function(resultList, type){

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

    $scope.saveFullList = function (approvedStatus, nonApprovedStatus){

        if(validator.validateForm("#validationRequired",".validatorMsg",null)) {

            var finalClaimBulkList = [];
            angular.forEach( $scope.userProfileList, function (userClaim, key) {
                var claimBulk = {};
                claimBulk.claimBulkID = userClaim.claimBulkID;
                claimBulk.claimType = userClaim.claimType;
                claimBulk.isApproved = userClaim.isApproved;
                claimBulk.nonApprovalReason = userClaim.nonApprovalReason;
                claimBulk.claimFormList = userClaim.claimFormList;
                angular.forEach(claimBulk.claimFormList, function (claimForm, key) {
                    claimForm.isApproved = claimBulk.isApproved;
                });
                finalClaimBulkList.push(claimBulk);
            });

            var searchData = {};
            searchData.approvedStatus = approvedStatus;
            searchData.nonApprovedStatus = nonApprovedStatus;
            searchData.claimBulkDataList = finalClaimBulkList;


            ApprovalService.approveByClaimBulk.query({}, searchData ).$promise.then(function(result) {
                if(result && result.success) {
                    $scope.showSuccessMessage("Information saved successfully");
                    $scope.init();
                } else {
                    $scope.showErrorMessage(result.message);
                }

            });
        }
    };

    $scope.saveSingle = function (approvedStatus, nonApprovedStatus){

        if(validator.validateForm("#validationRequiredSingle",".validatorMsg",null)) {

            var claimBulk = {};
            claimBulk.claimBulkID = $scope.claimBulk.claimBulkID;
            claimBulk.isApproved  = true;
            claimBulk.claimType = $scope.claimBulk.claimType;
            angular.forEach($scope.claimBulk.claimFormList, function (claimForm, key) {
                if(claimForm.isApproved == false){
                    claimBulk.isApproved  = false;
                    claimBulk.nonApprovalReason = claimForm.nonApprovalReason;
                }
            });
            claimBulk.claimFormList = $scope.claimBulk.claimFormList;

            var searchData = {};
            searchData.approvedStatus = approvedStatus;
            searchData.nonApprovedStatus = nonApprovedStatus;
            searchData.claimBulkDataList = [];
            searchData.claimBulkDataList.push(claimBulk);

            ApprovalService.approveByClaimBulk.query({}, searchData ).$promise.then(function(result) {
                if(result && result.success) {
                    $scope.showSuccessMessage("Information saved successfully");
                    $scope.init();
                } else {
                    $scope.showErrorMessage(result.message);
                }
            });
        }
    };


    $scope.saveByCategory = function(approvedStatus, nonApprovedStatus){

        if(validator.validateForm("#validationRequiredCat",".validatorMsg",null)) {
            var searchData = {};
            searchData.categoryList = $scope.categoryList;
            searchData.approvedStatus = approvedStatus;
            searchData.nonApprovedStatus = nonApprovedStatus;

            angular.forEach( $scope.categoryList, function (category, key) {
                delete category.isApproved;
            });

            ApprovalService.save.query({}, searchData ).$promise.then(function(result) {
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
            templateUrl: 'resources/javascript/templates/eClaim/approval/claimDetailModal.html',
            controller: 'ApprovalController.ClaimDetailPopUp',
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

    $scope.getUserClaimDetail = function(staffCode){

        $scope.searchData.entityName = staffCode;

        ApprovalService.bringClaimListBySearchData.query({}, $scope.searchData ).$promise.then(function(result) {
            $scope.claimBulk = result[0];
            $scope.markAllApprove($scope.claimBulk.claimFormList);
            $scope.singleView = true;
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

app.controller('ApprovalController.ClaimDetailPopUp', function($scope, $modalInstance, $timeout, $filter, modalConfig) {

    $scope.resultList = modalConfig;


    $scope.close = function (){
        $modalInstance.dismiss('cancel');
    };


});

app.controller('ImageModalController', function($scope, $modalInstance, $timeout, $filter, $rootScope, modalConfig) {

    $scope.images = modalConfig;
    $scope.disable = true;

    $scope.currentImage = $scope.images[0];

    $scope.delete = function (currentImage){

        var res = confirm("Are you sure to delete?");
        if(res){
            $scope.images.splice( $.inArray(currentImage, $scope.images), 1 );
            $scope.currentImage = $scope.images[0];
        }else{
            return false;
        }
    };

    $scope.setCurrentImage = function(image) {
        $scope.currentImage = image;
        if(image.imgFormat == "pdf"){
            window.open(image.imgUrl);
        }else if(image.imgFormat == "csv" || image.imgFormat == "xlsx"){
            window.open(image.imgUrl);
        }
    };



    $scope.cancel = function (){
        $modalInstance.dismiss('cancel');
    };


});

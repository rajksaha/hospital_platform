/**
 * Created by raj on 8/10/2016.
 */
app.controller('CompanyTaxController', function($scope, $modal, $state, $filter, $stateParams, $http, $timeout, $location, CompanyTaxInfoService, limitToFilter) {

    $scope.hasError = false;
    $scope.hasSuccess = false;
    $scope.message = "";
    $scope.categoryList = [];
    $scope.companyCodeList = [];
    $scope.locationList = [];
    $scope.departmentList = [];
    $scope.costCenterList = [];
    $scope.showForm = false;
    $scope.editObj = {};
    $scope.searchData = {};


    $scope.search = function() {

        $scope.showForm = false;
        CompanyTaxInfoService.getNonTaggedTaxItems.query({}, $scope.searchData).$promise.then(function(result) {
            $scope.searchData.claimFormDataList = result;
            if($scope.searchData.claimFormDataList.length <= 0){
                $scope.hasWarning = true;
                $scope.message = "No Records found";
            }else{
                $scope.hasWarning = false;
                $scope.displayReport = true;
            }
        });
    };




    $scope.getTypeHeadItem = function(term, field) {
        return  CompanyTaxInfoService.getItemForTypeHead.query({}, {data : term, field :field}).$promise.then(function(result) {
            $scope.productList = result;
            return limitToFilter($scope.productList, 10);
        });

    };

    $scope.onSelectItem = function(item, model, label, companyTax){

        companyTax.companyTaxInfoID = item.companyTaxInfoID;
        companyTax.regNumber = item.regNumber;
        companyTax.companyCode = item.companyCode;
        companyTax.companyName = item.companyName;
        companyTax.tradingName = item.tradingName;
    };


    $scope.gstIf = function(){
            var found = false;
        angular.forEach($scope.categoryList, function (value, key) {
            if($scope.searchData.categoryID == value.categoryID && value.isTaxRequire){
                found =  true;
            }
            });
        return found;
    };

    $scope.ifGstIncluded = function(isGst, claimList){
        var found = isGst;
        angular.forEach(claimList, function (value, key) {
            if(value.isAmount && value.isTaxRequire){
                found =  true;
            }
        });
        return found;
    }

    $scope.calculateGstAmount = function(claimList, taxPercent){

        var tax = 0.0;
        var taxAmount = (taxPercent * 100) / (100 + (taxPercent*100));
        angular.forEach(claimList, function (value, key) {
            if(value.isAmount && value.isTaxRequire){
                tax =  (taxAmount * value.fieldValue).toFixed(2);
            }
        });

        return tax;
    };


    $scope.save = function(){

        if (validator.validateForm("#validationRequired", ".validatorMsg", null)) {
            CompanyTaxInfoService.save.query({}, $scope.searchData).$promise.then(function (result) {
                $scope.showSuccessMessage("Information Saved Successfully");
            });
        }

    };



    $scope.formatClaimRunningNumber = function(claimBulkID){

        if(claimBulkID.toString().length < 6){
            var displayString = "16-";
            for(var i = claimBulkID.toString().length; i< 6; i++){
                displayString +="0";
            }
            displayString +=claimBulkID;
            return displayString;

        }
        return claimBulkID;
    };

    $scope.getAmount = function(resultList){

        var result = $filter('filter')(resultList, {isAmount: 1})[0];

        return result.fieldValue;
    };

    $scope.getAttachColumn = function(resultList, type){

        var result = $filter('filter')(resultList, {fieldType: type})[0];

        if(result){
            return result.imageContentList && result.imageContentList.length > 0;
        }

    };

    $scope.showDetailPopUp = function(claim){

        var modalInstance = $modal.open({
            templateUrl: 'resources/javascript/templates/eClaim/approval/claimDetailModal.html',
            controller: 'ClaimDetailModalController',
            backdrop: "static",
            windowClass: 'fade in ',
            resolve: {
                modalConfig: function () {
                    return claim;
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

    $scope.reset = function(){
        angular.copy($scope.editObj, $scope.categoryField);
        $scope.hideMessage();
        validator.hideError("#validationRequired");
    };


    $scope.cancel = function(){
        $scope.reset();
        $scope.showForm = false;
    };


    //$scope.init();

});



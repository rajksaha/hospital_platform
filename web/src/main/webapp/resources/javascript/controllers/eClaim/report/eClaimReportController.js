app.controller('EClaimReportController', function($scope, $rootScope, $state, $filter, $modal, $stateParams, $http, $timeout, $location, EClaimReportService, limitToFilter) {

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


    $scope.init = function() {
        $scope.showForm = false;
        $scope.searchData.claimType = $scope.claimType;
        EClaimReportService.getSearchElements.query({}, $scope.searchData).$promise.then(function(result) {
            $scope.categoryList = result.categoryList;
            $scope.companyCodeList = result.companyCodeList;
            $scope.companyRule = result.companyRule;
            $scope.searchData.entityType = 1;
            $scope.searchData.startDate = result.startDate;
            $scope.searchData.endDate = result.endDate;
            $scope.search();
        });

    };

    $scope.bringInfo = function (level, levelValue) {

        $scope.queryData = {};
        $scope.queryData.entityName = level;
        $scope.queryData.entityStatus = levelValue;
        EClaimReportService.getChildContentInfo.query({}, $scope.queryData).$promise.then(function(result) {
            if(level == 'COMPANY_CODE'){
                $scope.costCenterList = result;
            }else if(level == 'COST_CENTRE'){
                $scope.locationList = result;
            }else if(level == 'LOCATION'){
                $scope.departmentList = result;
            }
        });
    };


    $scope.gstIf = function(){
        if($scope.searchData.categoryID != null && $scope.displayDownload){
            var found = false;
            angular.forEach($scope.categoryList, function (value, key) {
                if($scope.searchData.categoryID == value.categoryID && value.isTaxRequire){
                    found =  true;
                }
            });
        }
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
        var taxAmount = ($scope.companyRule.taxRate * 100) / (100 + ($scope.companyRule.taxRate*100));
        angular.forEach(claimList, function (value, key) {
            if(value.isAmount && value.isTaxRequire){
                tax =  (taxAmount * value.fieldValue).toFixed(2);
            }
        });

        return tax;
    };

    $scope.getTypeHeadItem = function(term, field) {

        return  EClaimReportService.getItemForTypeHead.query({}, {data : term, field :field}).$promise.then(function(result) {
            $scope.productList = result;
            return limitToFilter($scope.productList, 10);
        });

    };

    $scope.onSelectItem = function(item, model, label){
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

    $scope.search = function() {

        $scope.searchData.startDateStr = $filter('date')($scope.searchData.startDate, "MMddyyyy");
        $scope.searchData.endDateStr = $filter('date')($scope.searchData.endDate, "MMddyyyy");
        $scope.searchData.claimType = $scope.claimType;
        EClaimReportService.searchHRReport.query({}, $scope.searchData).$promise.then(function(result) {
            $scope.searchData = result;
            $scope.displayReport = true;
            $scope.displayDownload = true;
        });
    };

    $scope.download = function() {
        $scope.searchData.claimType = $scope.claimType;
        EClaimReportService.createExcelReport.query({}, $scope.searchData).$promise.then(function(result) {
            window.open(result.fileName);
        });
    };

    $scope.downloadPayRoll = function() {

        $scope.searchData.startDateStr = $filter('date')($scope.searchData.startDate, "MMddyyyy");
        $scope.searchData.endDateStr = $filter('date')($scope.searchData.endDate, "MMddyyyy");
        $scope.searchData.claimType = $scope.claimType;
        EClaimReportService.createHrPayrollReport.query({}, $scope.searchData).$promise.then(function(result) {
            window.open(result.fileName);
        });
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

    if($stateParams.claimType == undefined || $stateParams.claimType == null){
        $state.go('root.home');
    }else{
        $scope.claimType = $stateParams.claimType;
        $scope.init();
    }


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

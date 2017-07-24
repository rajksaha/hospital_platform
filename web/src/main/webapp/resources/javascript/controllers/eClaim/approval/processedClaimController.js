/**
 * Created by raj on 11/28/2016.
 */

/**
 * Created by raj on 4/16/2016.
 */

app.controller('ProcessedClaimController', function($scope, $modal, $state, $stateParams, $http, $timeout, $location, CategoryService, ClaimService, $filter, $upload, ApprovalService, $window, $sce, deviceDetector, limitToFilter, ApprovalLevelService ) {

    $scope.hasError = false;
    $scope.hasSuccess = false;
    $scope.message = "";
    $scope.processedCategoryList = [];
    $scope.showForm = false;
    $scope.editObj = {};
    $scope.fileInput = {};
    $scope.queryData = {};

    $scope.overlays = [{x : 50, y:155, w:106, h:29, color:'#00FF00'}];
    $scope.options = { controls : { toolbar : true, fit : 'width'} };
    $scope.$watch('fileInput', function(newValue) {
        if (typeof(newValue) != "string") {
            $scope.overlays = [];
        }
    });


    if($stateParams.actionState == undefined || $stateParams.actionState == null){
        $state.go('root.home');
    }else{
        $scope.searchData.entityStatus = $stateParams.actionState;
        $scope.searchData.claimType = $stateParams.claimType;
    }

    $scope.init = function() {

        $scope.displayDetail = false;
        CategoryService.getCategoryByClaimType.query({}, {claimType : $scope.searchData.claimType}).$promise.then(function(result) {
            $scope.searchCategoryList = result;
        });
        ApprovalService.bringApprovalDetailBySearchData.query({}, $scope.searchData ).$promise.then(function(result) {
            $scope.approvalData = result;
            $scope.queryData.entityStatus = $scope.approvalData.actionStateCode;
            $scope.queryData.entityName = $scope.approvalData.approvalStateCode;
            $scope.queryData.entityType = $scope.approvalData.approvalUserType;
            $scope.queryData.claimType = $scope.approvalData.claimType;
            if(!$scope.approvalLevelList){
                ApprovalLevelService.getAll.query({}, {} ).$promise.then(function(result) {
                    $scope.approvalLevelList = result;
                });
            }

        });


    };

    $scope.getCompanyStatus = function (status){

        var returnString = status;

        if($scope.searchData.claimType){
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
                if(($scope.approvalLevelList[i].approvalStatus == status) && ($scope.searchData.claimType == $scope.approvalLevelList[i].claimType))   {
                    returnString =  $scope.approvalLevelList[i].approvalState + " Approved";
                    break;
                }
                if(($scope.approvalLevelList[i].rejectStatus == status) && ($scope.searchData.claimType == $scope.approvalLevelList[i].claimType))   {
                    returnString =  $scope.approvalLevelList[i].approvalState + " Rejected";
                    break;
                }
            }
        }

        if(returnString != status){
            return returnString;
        }

    };

    $scope.getTypeHeadItem = function(term) {
        return  ApprovalService.getItemForTypeHead.query({}, {data : term}).$promise.then(function(result) {
            $scope.productList = result;
            return limitToFilter($scope.productList, 10);
        });
    };

    $scope.onSelectItem = function(item, model, label){
        $scope.queryData.userID = item.userID;
    };



    $scope.markAllUserApprove = function(userViewProfileList){
        angular.forEach(userViewProfileList, function (value, key) {
            value.isApproved = 1;
        });
    };
    $scope.markAllApproveByCategory = function(categoryList){
        angular.forEach(categoryList, function (category, key) {
            category.isApproved = 1;
            angular.forEach(category.categoryClaimFormList, function (claim, key) {
                claim.isApproved = 1;
            });
        });
    };
    $scope.markAllApprove = function(claimFromList){
        angular.forEach(claimFromList, function (claim, key) {
            claim.isApproved = 1;
        });
    };

    $scope.markApproveByCategory = function(categoryClaimFormList, status){
        angular.forEach(categoryClaimFormList, function (claim, key) {
            claim.isApproved = status;
        });
    };

    $scope.getAmountForUser = function(claimList){
        var sum = 0;
        angular.forEach(claimList, function (claim, key) {
            angular.forEach(claim.resultList, function (value, key) {
                if(value.isAmount == 1){
                    sum = sum + parseFloat(value.fieldValue);
                }
            });
        });

        return sum.toFixed(2);
    };

    $scope.calculateAmountForCategory = function(category){
        var sum = 0;
        angular.forEach(category.categoryClaimFormList, function (claim, key) {
            angular.forEach(claim.resultList, function (value, key) {
                if(value.isAmount == 1){
                    sum = sum + parseFloat(value.fieldValue);
                }
            });
        });

        return sum.toFixed(2);
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

    $scope.getAmountForUserCategory = function (category, department) {
        var sum = 0;
            angular.forEach(category.categoryClaimFormList, function (claim, key) {
                if(claim.department == department){
                    angular.forEach(claim.resultList, function (value, key) {
                        if(value.isAmount == 1){
                            sum = sum + parseFloat(value.fieldValue);
                        }
                    });
                }

            });
        return sum.toFixed(2);
    };


    $scope.calculateSub = function(claimList){

        var sum = 0;
        angular.forEach(claimList, function (claim, key) {
            angular.forEach(claim.resultList, function (field, key) {
                if(field.isAmount == 1){
                    sum += parseFloat(field.fieldValue);
                }
            });
        });
        return sum.toFixed(2);
    };

    $scope.hideClaimDetail = function(){
        $scope.claimDetail = false;
        angular.forEach($scope.singleViewUserClaim.claimFormList, function (claim, key) {
            claim.active = false;
        });

        angular.forEach($scope.singleViewCategoryClaim.categoryClaimFormList, function (claim, key) {
            claim.active = false;
        });
    }

    $scope.showDetailPopUp = function(claim){
        $scope.reset();
        if(claim){
            if($scope.defaultView == "CATEGORYBULK"){
                angular.forEach($scope.singleViewCategoryClaim.categoryClaimFormList, function (claim, key) {
                    claim.active = false;
                });
                $scope.claim = {};
                claim.active = true;
                $scope.claim = claim;
                $scope.claimDetail = true;
            }else{
                $scope.claim = {};
                angular.forEach($scope.singleViewUserClaim.claimFormList, function (claim, key) {
                    claim.active = false;
                });
                claim.active = true;
                $scope.claim = claim;

                $scope.claimDetail = true;

            }
        }

    };

    $scope.haveImage = function(imageData){
        if(imageData.imgFormat == "xlsx"){
            $scope.currentImage = null;
        }else if(imageData.imgFormat == "pdf"){
            try{
                imageData.imgUrl = $sce.trustAsResourceUrl(imageData.imgUrl);
                if(imageData.imgUrl == undefined){
                    $scope.alertForExtension();
                }else{
                    $scope.currentImage = imageData;
                }

            }catch(exception){
                $scope.alertForExtension();
            }
        }else{
            $scope.currentImage = imageData;
        }


    };

    $scope.displayFile = function(imageData){
        if(imageData.imgFormat == "xlsx"){
            $window.open(imageData.imgUrl, "_blank");
        }else{
            try{
                if(typeof imageData.imgUrl === 'string'){
                    imageData.imgUrl = $sce.trustAsResourceUrl(imageData.imgUrl);
                    $scope.currentImage = imageData;
                }
            }catch(exception){
                //alert(deviceDetector.browser);
                $scope.alertForExtension(imageData);
            }


        }

    };

    $scope.alertForExtension = function(imageData){

        var modalData = {};
        modalData.modalTitle = "Alert";

        if(deviceDetector.browser == "chrome"){
            modalData.url = "https://chrome.google.com/webstore/search/" + imageData.imgFormat;

        }else if(deviceDetector.browser == "firefox"){
            modalData.url = "about:addons";
        }else if(deviceDetector.browser == "safari"){
            modalData.url = "about:addons";
        }else if(deviceDetector.browser == "opera"){
            modalData.url = "about:addons";
        }else if(deviceDetector.browser == "ie"){
            modalData.url = "about:addons";
        }else if(deviceDetector.browser == "ms-edge"){
            modalData.url = "about:addons";
        }
        var modalInstance = $modal.open({
            templateUrl: 'resources/javascript/templates/eClaim/approval/attachmentExceptionModal.html',
            controller: 'ApprovalController.InformationModalController',
            backdrop: "static",
            windowClass: 'fade in ',
            resolve: {
                modalConfig: function () {
                    return modalData;
                }
            }
        });

        modalInstance.result.then(function(result) {

            if(result == 1){
                $window.open(imageData.imgUrl);
            }else if(result == 2){
                $window.open(modalData.url,"_blank");
                win.focus();


            }
        });
    };

    

    $scope.getClaimBulkDetail = function (userClaim){

        $scope.reset();

        if(userClaim){
            angular.forEach($scope.userViewProfileList, function (value, key) {
                value.isActive = false;
            });
            $scope.singleViewUserClaim = {};
            $scope.singleViewUserClaim = userClaim;
            userClaim.isActive = true;
            //$scope.markAllApprove($scope.singleViewUserClaim.claimFormList);
            $scope.displayDetail = true;
        }
    };

    $scope.getCategoryDetail = function (category){

        if(category){
            angular.forEach($scope.processedCategoryList, function (value, key) {
                value.isActive = false;
            });
            $scope.singleViewCategoryClaim = {};
            $scope.singleViewCategoryClaim = category;
            category.isActive = true;
            $scope.displayDetail = true;
        }
    };



    //reloading the grid
    $scope.reloadList = false;
    $scope.refreshList = function () {
        $scope.reloadList = !$scope.reloadList;
        $scope.dataSourceConfig.params.refresh = $scope.reloadList;
    };



    $scope.searchProcessedClaim = function(){
        $scope.reset();

        $scope.queryData.startDateStr = $filter('date')($scope.startDate, "MMddyyyy");
        $scope.queryData.endDateStr = $filter('date')($scope.endDate, "MMddyyyy");
        $scope.queryData.approvedStatus = $scope.approvalData.approvalStatus;
        $scope.queryData.nonApprovedStatus = $scope.approvalData.rejectStatus;
        $scope.queryData.entityType = $scope.defaultView == "USERBULK" ? 0 : 1;
        $scope.queryData.claimType = $scope.approvalData.claimType;

        if($scope.defaultView == "USERBULK"){
            $scope.dataSourceConfig.params = angular.copy($scope.queryData);
        }else{
            ApprovalService.bringProcessedClaimByCategory.query({}, $scope.queryData ).$promise.then(function(result) {
                $scope.processedCategoryList = result;
                $scope.getCategoryDetail($scope.processedCategoryList[0]);
            });
        }

    };


    $scope.dataSourceConfig = {
        url: 'rest/claimApproval/bringProcessedClaim',
        method: "GET",
        params: {},
        paginationConfig: {
            response: {
                totalItems: 'count',
                itemsLocation: 'list'
            },

        }
    };





    // column definition
    $scope.columnDefinition = [
        {columnHeaderDisplayName: 'Staff Code', displayProperty: 'staffCode', sortKey: 'eu.username', width: '8em'},
        {columnHeaderDisplayName: 'Staff Name', templateUrl: 'firstName_template',width: '12em'},
        {columnHeaderDisplayName: 'Submission Date', template: '<strong>{{item.submissionDate | date:"dd/MM/yy"}}</strong>', sortKey: 'cf.updatedOn', width: '10em'},
        {columnHeaderDisplayName: 'Amount', template: '<strong>{{  getAmountForUser(item.claimFormList) }}</strong>', width: '3em'}
    ];



    $scope.init();

});


app.controller('ApprovalController.InformationModalController', function($scope, $modalInstance, $timeout, modalConfig) {

    $scope.modalData = modalConfig;

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };

    $scope.action = function(data) {
        $modalInstance.close(data);
    };


});


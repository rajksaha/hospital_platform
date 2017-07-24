/**
 * Created by raj on 11/28/2016.
 */

/**
 * Created by raj on 4/16/2016.
 */

app.controller('ApprovalClaimController', function($scope, $modal, $state, $stateParams, $http, $timeout, $location, CategoryService, ClaimService, $filter, $upload, ApprovalService, $window, $sce, deviceDetector, limitToFilter ) {

    $scope.hasError = false;
    $scope.hasSuccess = false;
    $scope.message = "";
    $scope.categoryList = [];
    $scope.showForm = false;
    $scope.editObj = {};
    $scope.searchData = {};
    $scope.fileInput = {};
    $scope.queryData = {};

    $scope.searchData = {};

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

        ApprovalService.bringApprovalDetailBySearchData.query({}, $scope.searchData ).$promise.then(function(result) {
            $scope.approvalData = result;
            $scope.searchData.entityStatus = $scope.approvalData.actionStateCode;
            $scope.searchData.entityName = $scope.approvalData.approvalStateCode;
            $scope.searchData.entityType = $scope.approvalData.approvalUserType;
            $scope.searchData.claimType = $scope.approvalData.claimType;
            $scope.bringViewData($scope.approvalData.defaultView);

        });

    };

    

    $scope.bringViewData = function (value){
        /*$scope.reset();

        $scope.displayDetail = false;
        $scope.claimDetail = false;
        $scope.defaultView = value;

        if($scope.defaultView == "USERBULK"){
            $scope.search();
        }else{
            var categorySearch = {};
            categorySearch.entityStatus = $scope.approvalData.actionStateCode;
            categorySearch.entityName = $scope.approvalData.approvalStateCode;
            categorySearch.entityType = $scope.approvalData.approvalUserType;
            categorySearch.claimType = $scope.approvalData.claimType;

            ApprovalService.bringCategoryClaimListBySearchData.query({}, $scope.searchData ).$promise.then(function(result) {
                $scope.categoryList = result;
                $scope.getCategoryDetail($scope.categoryList[0]);
            });
        }*/
    };


    /*$scope.changeView = function (defaultValue){
        $scope.bringViewData(defaultValue);
    };*/

    $scope.markAllUserApprove = function(userProfileList){
        angular.forEach(userProfileList, function (value, key) {
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

    $scope.getAmountForUserCategory = function (categoryList, department) {
        var sum = 0;
        angular.forEach(categoryList, function (category, key) {
            angular.forEach(category.categoryClaimFormList, function (claim, key) {
                if(claim.department == department){
                    angular.forEach(claim.resultList, function (value, key) {
                        if(value.isAmount == 1){
                            sum = sum + parseFloat(value.fieldValue);
                        }
                    });
                }

            });
        });


        return sum.toFixed(2);
    };

    /*    $scope.saveFullList = function (approvedStatus, nonApprovedStatus){

     if(validator.validateForm("#validationRequired",".validatorMsg",null)) {

     var finalClaimBulkList = [];
     angular.forEach( $scope.userProfileList, function (userClaim, key) {
     if(userClaim.isApproved == 1 || userClaim.isApproved == -1){
     var claimBulk = {};
     claimBulk.claimBulkID = userClaim.claimBulkID;
     claimBulk.claimantID = userClaim.claimantID;
     claimBulk.claimType = userClaim.claimType;
     claimBulk.isApproved = userClaim.isApproved == 1 ? true : false;
     claimBulk.nonApprovalReason = userClaim.nonApprovalReason;
     claimBulk.claimFormList = userClaim.claimFormList;
     angular.forEach(claimBulk.claimFormList, function (claimForm, key) {
     claimForm.isApproved = claimBulk.isApproved;
     });
     finalClaimBulkList.push(claimBulk);
     }

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
     };*/

    $scope.saveSingle = function (approvedStatus, nonApprovedStatus){



        if(validator.validateForm("#validationRequiredSingle",".validatorMsg",null)) {

            var modalData = {};
            modalData.modalTitle = "Approval Confirmation";
            modalData.modalBody = "Are you sure you want to proceed? You cannot edit once processed.";
            modalData.button1 = true;
            modalData.button2 = true;
            modalData.button1Text = "Yes";
            modalData.button2Text = "No";

            var modalInstance = $modal.open({
                templateUrl: 'resources/javascript/templates/informationModal.html',
                controller: 'InformationModalController',
                backdrop: "static",
                windowClass: 'fade in ',
                resolve: {
                    modalConfig: function () {
                        return modalData;
                    }
                }
            });

            modalInstance.result.then(function(result) {

                var finalClaimForm = [];
                var claimBulk = {};
                //claimBulk.claimBulkID = $scope.singleUserClaim.claimBulkID;
                claimBulk.claimantID = $scope.singleUserClaim.claimantID;
                claimBulk.isApproved  = true;
                claimBulk.claimType = $scope.singleUserClaim.claimType;
                angular.forEach($scope.singleUserClaim.claimFormList, function (claimForm, key) {
                    if(claimForm.isApproved == -1 || claimForm.isApproved == 1){
                        claimForm.isApproved  = claimForm.isApproved == 1 ? true : false;
                        claimBulk.isApproved  = claimForm.isApproved;
                        claimBulk.nonApprovalReason = claimForm.nonApprovalReason;
                        delete claimForm.active;
                        finalClaimForm.push(claimForm);
                    }
                });
                claimBulk.claimFormList = finalClaimForm;

                var searchData = {};
                searchData.approvedStatus = approvedStatus;
                searchData.nonApprovedStatus = nonApprovedStatus;
                searchData.claimBulkDataList = [];
                searchData.claimBulkDataList.push(claimBulk);

                ApprovalService.approveByClaimBulk.query({}, searchData).$promise.then(function(result) {
                    if(result && result.success) {
                        $scope.showSuccessMessage("Successfully Processed. Well done!");
                        $scope.init();
                    } else {
                        $scope.showErrorMessage(result.message);
                    }
                });
            });


        }else{
            $scope.showErrorMessage("Please Key-in reason(s) for rejected claims");
        }
    };


    $scope.saveByCategory = function(approvedStatus, nonApprovedStatus){

        if(validator.validateForm("#validationRequiredCat",".validatorMsg",null)) {
            var searchData = {};
            searchData.approvedStatus = approvedStatus;
            searchData.nonApprovedStatus = nonApprovedStatus;


            angular.forEach( $scope.categoryList, function (category, key) {
                var finalClaimForm = [];
                angular.forEach(category.categoryClaimFormList, function (claim, key) {
                    if(claim.isApproved == -1 || claim.isApproved == 1){
                        claim.isApproved  = claim.isApproved == 1 ? true : false;
                        finalClaimForm.push(claim);
                    }
                });
                category.categoryClaimFormList = finalClaimForm;
                delete category.isApproved;
            });

            searchData.categoryList = $scope.categoryList;
            ApprovalService.save.query({}, searchData).$promise.then(function(result) {
                if(result && result.success) {
                    $scope.showSuccessMessage("Information saved successfully");
                    $scope.init();
                } else {
                    $scope.showErrorMessage(result.message);
                }

            });
        }
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
    }

    $scope.reset = function(){
        $scope.hasError = false;
        $scope.hasSuccess = false;
        $scope.message = "";
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

    $scope.hideClaimDetail = function(){
        $scope.claimDetail = false;
        angular.forEach($scope.singleUserClaim.claimFormList, function (claim, key) {
            claim.active = false;
        });
    }



    $scope.toggleSearch = function(){
        $scope.searchBar = !$scope.searchBar;
    }

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

    $scope.setDataToMyList = function($success, $response) {
        $scope.userProfileList = $response.items;
        $scope.getClaimBulkDetail($scope.userProfileList[0]);
    };

    $scope.getClaimBulkDetail = function (userClaim){

        $scope.reset();

        if(userClaim){
            angular.forEach($scope.userProfileList, function (value, key) {
                value.isActive = false;
            });
            $scope.singleUserClaim = {};
            $scope.singleUserClaim = userClaim;
            userClaim.isActive = true;
            $scope.markAllApprove($scope.singleUserClaim.claimFormList);
            $scope.displayDetail = true;
        }
    };

    $scope.getCategoryDetail = function (category){

        if(category){
            angular.forEach($scope.categoryList, function (value, key) {
                value.isActive = false;
            });
            $scope.singleCategoryClaim = {};
            $scope.singleCategoryClaim = category;
            category.isActive = true;
            $scope.markApproveByCategory($scope.singleCategoryClaim.categoryClaimFormList, 1);
            $scope.displayDetail = true;
        }
    };



    //reloading the grid
    $scope.reloadList = false;
    $scope.refreshList = function () {
        $scope.reloadList = !$scope.reloadList;
        $scope.dataSourceConfig.params.refresh = $scope.reloadList;
    };


    $scope.search = function() {
        $scope.reset();
        $scope.dataSourceConfig.params = angular.copy($scope.searchData);
        $scope.claimDetail = false;
        $scope.displayDetail = false;
    };

    $scope.dataSourceConfig = {
        url: 'rest/claimApproval/bringClaimListBySearchData',
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


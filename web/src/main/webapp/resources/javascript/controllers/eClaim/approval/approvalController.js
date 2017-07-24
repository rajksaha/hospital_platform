/**
 * Created by raj on 4/16/2016.
 */

app.controller('ApprovalController', function($scope, $modal, $state, $stateParams, $http, $timeout, $location, CategoryService, ClaimService, $filter, $upload, ApprovalService, $window, $sce, deviceDetector, limitToFilter, ApprovalLevelService ) {

    $scope.hasError = false;
    $scope.hasSuccess = false;
    $scope.message = "";
    $scope.categoryList = [];
    $scope.showForm = false;
    $scope.editObj = {};
    $scope.searchData = {};
    $scope.fileInput = {};
    $scope.queryData = {};
    $scope.selectedTab = 1;

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

        if(!$scope.approvalData){
            ApprovalService.bringApprovalDetailBySearchData.query({}, $scope.searchData ).$promise.then(function(result) {
                $scope.approvalData = result;
                $scope.searchData.entityStatus = $scope.approvalData.actionStateCode;
                $scope.searchData.entityName = $scope.approvalData.approvalStateCode;
                $scope.searchData.entityType = $scope.approvalData.approvalUserType;
                $scope.searchData.claimType = $scope.approvalData.claimType;
                $scope.bringViewData($scope.approvalData.defaultView);
            });
        }else{
            $scope.bringViewData($scope.approvalData.defaultView);
        }
        if(!$scope.approvalLevelList){
            ApprovalLevelService.getAll.query({}, {} ).$promise.then(function(result) {
                $scope.approvalLevelList = result;
            });
        }
        if(!$scope.searchCategoryList){
            CategoryService.getCategoryByClaimType.query({}, {claimType : $scope.searchData.claimType}).$promise.then(function(result) {
                $scope.searchCategoryList = result;
            });
        }



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



    $scope.tabSelected = function(tab){
        $scope.reset();
        $scope.selectedTab = tab;
        $scope.queryData.staffCode = null;
        $scope.bringViewData($scope.defaultView);
    };

    $scope.bringViewData = function (value){
        $scope.reset();
        $scope.defaultView = value;
        $scope.claimDetail = false;

        $scope.prepareQueryData();
        if($scope.defaultView == "USERBULK"){
            if($scope.selectedTab == 1){
                $scope.search();
                if($scope.userProfileList){
                    $scope.getClaimBulkDetail($scope.userProfileList[0]);
                }
            }else{
                $scope.searchProcessedClaim();
                if($scope.userViewProfileList){
                    $scope.getClaimBulkDetail($scope.userViewProfileList[0]);
                }
            }
        }else{
            if($scope.selectedTab == 1){
                ApprovalService.bringCategoryClaimListBySearchData.query({}, $scope.queryData).$promise.then(function(result) {
                    $scope.categoryList = result;
                    $scope.getCategoryDetail($scope.categoryList[0]);
                });

            }else if($scope.selectedTab == 2){
                ApprovalService.bringProcessedClaimByCategory.query({}, $scope.queryData).$promise.then(function(result) {
                    $scope.processedCategoryList = result;
                    $scope.getCategoryDetail($scope.processedCategoryList[0]);
                });
            }
        }
    };
    
    $scope.prepareQueryData = function () {

        if($scope.approvalData){
            $scope.queryData.startDateStr = $filter('date')($scope.startDate, "MMddyyyy");
            $scope.queryData.endDateStr = $filter('date')($scope.endDate, "MMddyyyy");
            $scope.queryData.entityType = $scope.approvalData.approvalUserType;
            $scope.queryData.claimType = $scope.approvalData.claimType;
            $scope.queryData.entityStatus = $scope.approvalData.actionStateCode;
            $scope.queryData.entityName = $scope.approvalData.approvalStateCode;
        }

    };

    $scope.download = function () {
        $scope.prepareQueryData();

        ApprovalService.downloadApproval.query({}, $scope.queryData).$promise.then(function(result) {
            window.open(result.imgName);
        });
    };





    $scope.changeApprovalView = function (defaultValue){
        $scope.bringViewData(defaultValue);
    };

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
        if(category){
            angular.forEach(category.categoryClaimFormList, function (claim, key) {
                angular.forEach(claim.resultList, function (value, key) {
                    if(value.isAmount == 1){
                        sum = sum + parseFloat(value.fieldValue);
                    }
                });
            });
        }
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

                var processedClaimList = [];
                angular.forEach($scope.singleUserClaim.claimFormList, function (claimForm, key) {
                    if(claimForm.isApproved == -1 || claimForm.isApproved == 1){
                        claimForm.isApproved  = claimForm.isApproved == 1 ? true : false;
                        delete claimForm.active;
                        processedClaimList.push(claimForm);
                    }
                });

                var searchData = {};
                searchData.approvedStatus = approvedStatus;
                searchData.nonApprovedStatus = nonApprovedStatus;
                searchData.claimFormDataList = processedClaimList;
                $scope.processClaimForm(searchData);
            });

        }else{
            $scope.showErrorMessage("Please Key-in reason(s) for rejected claims");
        }
    };


    $scope.saveByCategory = function(approvedStatus, nonApprovedStatus){

        if(validator.validateForm("#validationRequiredSingleCategory",".validatorMsg",null)) {

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
                var processedClaimList = [];
                angular.forEach($scope.singleCategoryClaim.categoryClaimFormList, function (claim, key) {
                    if(claim.isApproved == -1 || claim.isApproved == 1){
                        claim.isApproved  = claim.isApproved == 1 ? true : false;
                        delete claim.active;
                        processedClaimList.push(claim);
                    }
                });

                var searchData = {};
                searchData.approvedStatus = approvedStatus;
                searchData.nonApprovedStatus = nonApprovedStatus;
                searchData.claimFormDataList = processedClaimList;
                $scope.processClaimForm(searchData);
            });
        }else{
            $scope.showErrorMessage("Please Key-in reason(s) for rejected claims");
        }
    };

    $scope.processClaimForm = function(searchData){

        ApprovalService.approveByClaimBulk.query({}, searchData).$promise.then(function(result) {
            if(result && result.success) {
                $scope.showSuccessMessage("Successfully Processed. Well done!");
                if($scope.defaultView == "USERBULK"){
                    $scope.refreshList();
                }else{
                    $scope.init();
                }
            } else {
                $scope.showErrorMessage(result.message);
            }

        });
    };

    $scope.confirmationModal = function(){

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
            return true;
        });
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
        /*angular.forEach($scope.singleUserClaim.claimFormList, function (claim, key) {
            claim.active = false;
        });*/

        if($scope.defaultView == "CATEGORYBULK"){

            if($scope.selectedTab == 1){
                angular.forEach($scope.singleCategoryClaim.categoryClaimFormList, function (claim, key) {
                    claim.active = false;
                });
            }else{
                angular.forEach($scope.singleViewCategoryClaim.categoryClaimFormList, function (claim, key) {
                    claim.active = false;
                });
            }

        }else {
            if ($scope.selectedTab == 1) {
                angular.forEach($scope.singleUserClaim.claimFormList, function (claim, key) {
                    claim.active = false;
                });
            } else {
                angular.forEach($scope.singleViewUserClaim.claimFormList, function (claim, key) {
                    claim.active = false;
                });
            }
        }
    }

    $scope.showDetailPopUp = function(claim){

        if(claim){
            if($scope.defaultView == "CATEGORYBULK"){
                if($scope.selectedTab == 1){
                    angular.forEach($scope.singleCategoryClaim.categoryClaimFormList, function (claim, key) {
                        claim.active = false;
                    });
                }else{
                    angular.forEach($scope.singleViewCategoryClaim.categoryClaimFormList, function (claim, key) {
                        claim.active = false;
                    });
                }

                $scope.claim = {};
                claim.active = true;
                $scope.claim = claim;
                $scope.claimDetail = true;
            }else{
                if($scope.selectedTab == 1){
                    angular.forEach($scope.singleUserClaim.claimFormList, function (claim, key) {
                        claim.active = false;
                    });
                }else{
                    angular.forEach($scope.singleViewUserClaim.claimFormList, function (claim, key) {
                        claim.active = false;
                    });
                }
                $scope.claim = {};
                claim.active = true;
                $scope.claim = claim;
                $scope.claimDetail = true;

            }
          $scope.haveClaimImage(claim.resultList);
        }

    };

    $scope.haveImage = function(imageData){
        if(imageData.imgFormat == "xlsx"){
            $scope.currentImage = null;
        }else if(imageData.imgFormat == "pdf"){
            try{
                imageData.imgUrl = $sce.trustAsResourceUrl(imageData.imgUrl);
                $scope.currentImage = imageData;
            }catch(exception){
                $scope.alertForExtension();
            }
        }else{
            $scope.currentImage = imageData;
        }


    };

    $scope.clearFilter = function(type){
        if(type == 1){
            $scope.startDate = null;
            $scope.endDate = null;
        }else{
            $scope.queryData.staffCode = null;
        }

        $scope.bringViewData($scope.defaultView);
    };

    $scope.displayFile = function(imageData){
        $window.open(imageData.imgUrl, "_blank");
        /*imageData.linkUrl = $sce.trustAsResourceUrl(imageData.imgUrl);
        $scope.currentImage = imageData;*/

    };

    $scope.checkForDefault = function(claimResultList){

        if(claimResultList){
            for(var i=0; i<claimResultList.length;i++){
                if(claimResultList[i].fieldType == 4){
                    if(claimResultList[i].imageContentList.length > 0){
                        //$scope.haveImage(claimResultList[i].imageContentList[0])
                        return true;
                    }
                }
            }
        }else{
            return false;
        }
    };

    $scope.haveClaimImage = function(claimResultList){
        if(claimResultList){
            for(var i=0; i<claimResultList.length;i++){
                if(claimResultList[i].fieldType == 4){
                    if(claimResultList[i].imageContentList.length > 0){
                        $scope.haveImage(claimResultList[i].imageContentList[0])
                        break;
                    }
                }
            }
        }else{
            return false;
        }
    }

    $scope.alertForExtension = function(imageData){

        if(imageData){
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
        }

    };

    $scope.setDataToMyList = function($success, $response) {
        $scope.userProfileList = $response.items;
        if($scope.userProfileList && $scope.userProfileList.length > 0){
            $scope.getClaimBulkDetail($scope.userProfileList[0]);
        }else{
            $scope.claimUserDetail = false;
        }

    };

    $scope.setDataToMyViewList = function($success, $response) {

        $scope.userViewProfileList = $response.items;
        if($scope.userViewProfileList  && $scope.userViewProfileList.length > 0){
            $scope.getClaimBulkDetail($scope.userViewProfileList[0]);
        }else{
            $scope.claimUserViewDetail = false;
        }

    };

    $scope.getClaimBulkDetail = function (userClaim, userList, tempData){


        if(userClaim){
            if($scope.selectedTab == 1){
                angular.forEach($scope.userProfileList, function (value, key) {
                    value.isActive = false;
                });
                $scope.singleUserClaim = {};
                $scope.singleUserClaim = userClaim;
                $scope.markAllApprove($scope.singleUserClaim.claimFormList);
                $scope.claimUserDetail = true;
            }else{
                angular.forEach($scope.userViewProfileList, function (value, key) {
                    value.isActive = false;
                });
                $scope.singleViewUserClaim = {};
                $scope.singleViewUserClaim = userClaim;
                $scope.claimUserViewDetail = true;
            }
            userClaim.isActive = true;
        }
    };

    $scope.getCategoryDetail = function (category){

        if(category){
            if($scope.selectedTab == 1){
                angular.forEach($scope.categoryList, function (value, key) {
                    value.isActive = false;
                });
                $scope.singleCategoryClaim = {};
                $scope.singleCategoryClaim = category;
                $scope.markApproveByCategory($scope.singleCategoryClaim.categoryClaimFormList, 1);
                $scope.claimCategoryDetail = true;
            }else{
                angular.forEach($scope.processedCategoryList, function (value, key) {
                    value.isActive = false;
                });
                $scope.singleViewCategoryClaim = {};
                $scope.singleViewCategoryClaim = category;
                $scope.claimCategoryViewDetail = true;
            }
            category.isActive = true;
        }
    };



    //reloading the grid
    $scope.reloadList = false;
    $scope.refreshList = function () {
        $scope.reloadList = !$scope.reloadList;
        $scope.dataSourceConfig.params.refresh = $scope.reloadList;
        $scope.dataSourceViewConfig.params.refresh = $scope.reloadList;
        $scope.displayDetail = false;
        $scope.claimDetail = false;
    };


    $scope.search = function() {
        $scope.claimDetail = false;
        $scope.dataSourceConfig.params = angular.copy($scope.queryData);
    };

    $scope.searchProcessedClaim = function(){
        $scope.claimDetail = false;
        $scope.displayDetail = false;
        $scope.dataSourceViewConfig.params = angular.copy($scope.queryData);
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

    $scope.dataSourceViewConfig = {
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
        {columnHeaderDisplayName: 'Staff Code', displayProperty: 'staffCode', width: '8em'},
        {columnHeaderDisplayName: 'Staff Name', templateUrl: 'firstName_template',width: '12em'},
        {columnHeaderDisplayName: 'Submission Date', template: '<strong>{{item.submissionDate | date:"dd/MM/yy"}}</strong>', width: '10em'},
        {columnHeaderDisplayName: 'Amount', template: '<strong>{{  getAmountForUser(item.claimFormList) }}</strong>', width: '3em'}
    ];

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

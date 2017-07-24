app.controller('ClaimListController', function($scope, $rootScope, $sce, $state, $stateParams, $modal, $http, $timeout, $location, CategoryService, ClaimService, $filter, $upload, GlobalSetupService, UserSetupService, ApprovalLevelService, ClaimValidationService) {

    $scope.hasError = false;
    $scope.hasSuccess = false;
    $scope.hasWarning = false;
    $scope.message = "";
    $scope.categoryList = [];
    $scope.showForm = false;
    $scope.editObj = {};
    $scope.displayWarrning = false;

    $scope.submitEnable = true;


    $scope.goToList = function(){

        angular.forEach($scope.claimBulkList, function (value, key) {
            value.active = false
        });

        $scope.showForm = false;
        $scope.viewOnly = false;
        $rootScope.updateMode = false;
    };

    $scope.init = function() {

        $rootScope.updateMode = false;

        if(!$scope.approvalLevelList){
            ApprovalLevelService.getAll.query({}, {} ).$promise.then(function(result) {
                $scope.approvalLevelList = result;
            });
        }

        if(!$scope.globalSetup){
            GlobalSetupService.getData.query({}, {} ).$promise.then(function(result) {
                $scope.globalSetup = result;
                var date = new Date();
                var day = date.getDate ();
                if($scope.globalSetup.claimCutOffDay < day){
                    $scope.submitEnable = false;
                }
            });
        }





        var searchData = {};
        searchData.entityID = $scope.claimType;
        ClaimService.getClaimBulkBySearchData.query({}, searchData).$promise.then(function(result) {
            if(result.length == 0){
                var modalData = {};
                modalData.modalTitle = "Error";
                modalData.modalBody = "There is no claim in the List";
                modalData.button1 = true;
                modalData.button2 = false;
                modalData.button1Text = "Ok";
                //modalData.button2Text = "Stay on this page";
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
                    $state.go("root.home");
                });
            }else{
                $scope.claimBulkList = result;
            }
        });
        $scope.showForm = false;
    };

    if($stateParams.claimType == undefined || $stateParams.claimType == null){
        $state.go('root.home');
    }else{
        $scope.claimType = $stateParams.claimType;
        $scope.init();
    }

    $scope.deleteImage = function(data, object){

        var res = confirm("Are you sure to delete?");
        if(res){
            data.splice( $.inArray(object, data), 1 );
        }else{
            return false;
        }


    };

    $scope.onFileSelect = function($files, fieldData){


        if(fieldData.imageContentList == undefined || fieldData.imageContentList == null){
            fieldData.imageContentList = [];
        }

        var imageData = {};
        $scope.hideMessage();
        $scope.file = $files[0];
        var extension = $scope.file.name.split('.').pop().toLowerCase();

        var model = {
            extension:extension,
        };

        var fileSize = $scope.file.size / 1048576 ;
        if(fileSize > 5){
            $scope.showErrorMessage("Maximum file size limit is 5 MB");
            return false;
        }

        $scope.uploading = true;

        $upload.upload({
            url : 'rest/claimBulk/upload',
            method: 'POST',
            data : model,
            file: $scope.file
        }).then(function(result) {
            if(result.data.success == false) {
                alert("error");
            } else {
                imageData.imgUrl = result.data.imgName;
                imageData.imgFormat = extension;
                fieldData.imageContentList.push(imageData);
                $scope.uploading =false;
                $scope.showSuccessMessage("Photo added successfully");
            }
        }, function(result) {
            $scope.uploading = false;
        }, function(evt) {

        });
    };


    $scope.checkForMillage = function(fieldData, claim, category){
        return ClaimValidationService.checkForMillage(fieldData, claim, category);
    };

    $scope.setDecimalPoint = function(fieldData, resultList, category){
        return ClaimValidationService.setDecimalPoint(fieldData, resultList);
    };

    $scope.validateDate = function(fieldData, claimForm){
        return ClaimValidationService.validateDate(fieldData, claimForm, $scope.globalSetup.claimApprovalLimit, $modal);
    };


    $scope.calculateSubTotal = function(claimFormList){
        return ClaimValidationService.calculateSubTotal(claimFormList);
    };


    $scope.update = function(status) {

        if(validator.validateForm("#validationRequired",".validatorMsg",null)) {

            var itemValid = ClaimValidationService.checkItemValidation($scope.categoryList);

            if(!itemValid){
                $scope.showErrorMessage("Please key in minimum one claim");
                return false;
            }

            var warningValid = ClaimValidationService.checkForWarning($scope.categoryList);

            if(!warningValid){
                $scope.showWarningMessage("Please Click the ! icon to check all the warning");
                return false;
            }

            var attachValid = ClaimValidationService.checkValidAttachment($scope.categoryList);

            if(!attachValid){
                $scope.showErrorMessage("Please attach the required Attachments");
                return false;
            }

            var searchData = {};
            searchData.categoryList = $scope.categoryList;
            ClaimService.validateClaimForm.query({}, searchData).$promise.then(function (resultSearch) {
                $scope.categoryList = [];
                $scope.categoryList = resultSearch.categoryList;
                if (resultSearch.intStatus == 0) {
                    $scope.saveValid(status);
                }else if (resultSearch.intStatus == 2){
                        $scope.displayWarrning = true;
                        $scope.showWarningMessage("Out of policy. If you submit, it will be marked as an Exception and subject to approval.");
                }else if(resultSearch.intStatus == 3){
                    $scope.showErrorMessage(resultSearch.entityStatus);
                }else{
                    $scope.showErrorMessage("There are some validation errors, please check the red marked tabs.");
                }
            },
            function(error) {
                $scope.showErrorMessage("Something went wrong, Please contact Your administrator.");
            });

        }else{
            $scope.showErrorMessage("Please Key-in every required fields.");
        }
    };





    $scope.saveValid = function (status){


        $scope.finalClaimBulkData.claimFormList = [];

        angular.forEach($scope.categoryList, function (category, key) {
            if(category.claimBulkData != undefined && category.claimBulkData.claimFormList != undefined && category.claimBulkData.claimFormList.length > 0){
                angular.forEach(category.claimBulkData.claimFormList, function (claim, key) {
                    if (claim.status == undefined || claim.status == null || $scope.ifRejected(claim.status) || claim.status == "DRAFT") {
                        var jsonString = JSON.stringify(claim.resultList);
                        claim.jsonValue = jsonString;
                        if(!claim.requireOriginal){
                            claim.requireOriginal = category.requireOriginal;
                        }
                        $scope.finalClaimBulkData.claimFormList.push(claim);
                    }

                    //$scope.finalClaimBulkData.categoryID = category.categoryID;
                });
            }
        });


        $scope.finalClaimBulkData.status = status;
        $scope.finalClaimBulkData.claimType = $scope.claimType;

        ClaimService.update.query({}, $scope.finalClaimBulkData).$promise.then(function (result) {
            if (result && result.success) {
                $scope.showSuccessMessage("Information updated successfully");
                $scope.init();
            } else {
                $scope.showErrorMessage(result.message);
            }
        });
    };



    $scope.showErrorMessage = function(message){
        $scope.hasError = true;
        $scope.hasWarning = false;
        $scope.hasSuccess = false;
        $scope.message = message;
    };

    $scope.showWarningMessage = function(message){
        $scope.hasError = false;
        $scope.hasSuccess = false;
        $scope.hasWarning = true;
        $scope.message = message;
    };

    $scope.showSuccessMessage = function(message){
        $scope.hasError = false;
        $scope.hasSuccess = true;
        $scope.hasWarning = false;
        $scope.message = message;
    };

    $scope.hideMessage = function(){
        $scope.hasError = false;
        $scope.hasSuccess = false;
        $scope.hasWarning = false
    };

    $scope.edit = function(claimBulk){

        $rootScope.updateMode = true;


        CategoryService.getAllClaimFormByType.query({}, {claimType : $scope.claimType}).$promise.then(function(result) {
            $scope.categoryList = result;

            $scope.finalClaimBulkData = null;
            angular.forEach(claimBulk.claimFormList, function (claimForm, key) {
                angular.forEach($scope.categoryList, function (category, key) {
                    if(category.categoryID == claimForm.categoryID){
                        if(category.claimBulkData == undefined){
                            category.claimBulkData = {};
                            category.claimBulkData.claimBulkID = claimBulk.claimBulkID;
                            category.claimBulkData.shortName = claimBulk.shortName;
                            category.claimBulkData.claimantID = claimBulk.claimantID;
                            category.claimBulkData.status = claimBulk.status;
                            category.claimBulkData.claimFormList = [];

                            if($scope.finalClaimBulkData == null){
                                $scope.finalClaimBulkData = {};
                                //angular.copy(category.claimBulkData.shortName, $scope.finalClaimBulkData.shortName);
                                $scope.finalClaimBulkData.shortName = category.claimBulkData.shortName;
                                $scope.finalClaimBulkData.claimantID = category.claimBulkData.claimantID;
                                $scope.finalClaimBulkData.status = category.claimBulkData.status;
                                $scope.finalClaimBulkData.claimBulkID = category.claimBulkData.claimBulkID;
                            }
                        }

                        //var data = {'resultList' : claimForm.resultList, claimEve};
                        //category.claimBulkData.claimFormList = [];
                        category.claimBulkData.claimFormList.push(claimForm);
                    }

                });

            });


            $scope.showForm = true;
        });

    };


    $scope.editRejected = function(claimBulk){

        $rootScope.updateMode = true;

        CategoryService.getAllClaimForm.query({}, {}).$promise.then(function(result) {
            $scope.categoryList = result;
            $scope.finalClaimBulkData = null;
            angular.forEach(claimBulk.claimFormList, function (claimForm, key) {
                if ($scope.ifRejected(claimForm.status)) {
                    angular.forEach($scope.categoryList, function (category, key) {
                        if (category.categoryID == claimForm.categoryID) {
                            if (category.claimBulkData == undefined) {
                                category.claimBulkData = {};
                                category.claimBulkData.claimBulkID = claimBulk.claimBulkID;
                                category.claimBulkData.shortName = claimBulk.shortName;
                                category.claimBulkData.claimantID = claimBulk.claimantID;
                                category.claimBulkData.status = claimBulk.status;
                                category.claimBulkData.claimFormList = [];

                                if ($scope.finalClaimBulkData == null) {
                                    $scope.finalClaimBulkData = {};
                                    //angular.copy(category.claimBulkData.shortName, $scope.finalClaimBulkData.shortName);
                                    $scope.finalClaimBulkData.shortName = category.claimBulkData.shortName;
                                    $scope.finalClaimBulkData.claimantID = category.claimBulkData.claimantID;
                                    $scope.finalClaimBulkData.status = category.claimBulkData.status;
                                    $scope.finalClaimBulkData.claimBulkID = category.claimBulkData.claimBulkID;
                                }
                            }

                            //var data = {'resultList' : claimForm.resultList, claimEve};
                            category.claimBulkData.claimFormList.push(claimForm);
                        }
                    });
                }


            });


            $scope.showForm = true;
        });
    };

    $scope.view = function(claimBulk){

        angular.forEach($scope.claimBulkList, function (value, key) {
            value.active = false
        });
        $scope.viewClaimFormList = claimBulk.claimFormList;
        claimBulk.active = true;
        $scope.viewOnly = true;
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

    $scope.deleteFromClaimForm = function(category, claimForm, index){
        claimForm.isDeleted = true;
        category.claimBulkData.claimFormList.splice(index,1);

        ClaimService.delete.remove({claimFromID : claimForm.claimFromID} ).$promise.then(function(result) {
            var hasError = false;
            angular.forEach(category.claimBulkData.claimFormList, function (claim, key) {
                if(!claim.isDeleted && claim.hasError){
                    hasError = true;
                }
            });
            category.hasError = hasError;
        });

    };

    $scope.deleteClaimBulk = function(claimBulk){

        ClaimService.deleteClaimBulk.remove({claimBulkID : claimBulk.claimBulkID} ).$promise.then(function(result) {
            $scope.init();
            $scope.showSuccessMessage("Information deleted successfully");
        });
    };

    $scope.displayNonApprovalReason = function(claimForm){


        var modalData = {};
        modalData.modalTitle = "Non Approval Reason";
        modalData.modalBody = claimForm.nonApprovalReason;
        modalData.button2 = true;
        modalData.button2Text = "Ok";

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

        if(category.claimBulkData == undefined){
            category.claimBulkData = {};
            category.claimBulkData.claimFormList = [];
        }
        var test = [];
        angular.copy(category.fieldDATAs, test);
        var claimForm = {'resultList' : test, 'categoryID' : category.categoryID};
        if(category.isTaxRequire){
            angular.forEach(claimForm.resultList, function (value, key) {
                if(value.isAmount == 1){
                    value.isTaxRequire = true;
                }
            });
        }
        category.claimBulkData.claimFormList.push(claimForm);
        $scope.showForm = true;

    };

    /*$scope.checkEditStatus = function (claimBulk){

        if(claimBulk.status == 'HRREJECT' || claimBulk.status  ==  'HODREJECTED' || claimBulk.status  == 'DIVHEADREJECTED' || claimBulk.status == 'ORGDOCREJECTED'){
            return true;
        }
    };*/

    $scope.ifRejected = function (status){
        if($scope.approvalLevelList){
            for(var i=0;i<$scope.approvalLevelList.length;i++){
                if($scope.approvalLevelList[i].rejectStatus == status)   {
                    return true;
                    break;
                }
            }
        }

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
            if(($scope.approvalLevelList[i].approvalStatus == status) && ($scope.claimType == $scope.approvalLevelList[i].claimType))   {
                returnString =  $scope.approvalLevelList[i].approvalState + " Approved";
                break;
            }
            if(($scope.approvalLevelList[i].rejectStatus == status) && ($scope.claimType == $scope.approvalLevelList[i].claimType))   {
                returnString =  $scope.approvalLevelList[i].approvalState + " Rejected";
                break;
            }
        }
        if(returnString != status){
            return returnString;
        }

    };

    $scope.cancel = function(){
        $scope.reset();
        $scope.showForm = false;
    };

    $scope.backToList = function() {
        $scope.cancel();
    };

    $scope.findSelectedSubType = function(fieldData, resultList){

        var found = null;
        angular.forEach(resultList, function (field, key) {
            if(field.categoryFieldID == fieldData.dependentFieldID && field.fieldValue) {
                found = field.fieldValue;
            }
        });
        return found;
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

    $scope.showViewImageInPopUP = function(data, type){


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


    $scope.showImageInPopUP = function(imgUrl){

        var modalInstance = $modal.open({
            templateUrl: 'resources/javascript/templates/ImageModal.html',
            controller: 'ImageModalController',
            backdrop: "static",
            windowClass: 'fade in ',
            resolve: {
                modalConfig: function () {
                    return imgUrl;
                }
            }
        });

    };

    $scope.disabled = function(date, mode, fieldData) {
        return ClaimValidationService.disabled(date, mode, fieldData);
    };

    //$scope.init();

});


app.controller('ClaimFormController', function($scope, $rootScope, $sce, $state, $stateParams, $modal, $http, $timeout, $location, CategoryService, ClaimService, $filter, $upload, GlobalSetupService, ClaimValidationService) {

    $scope.hasError = false;
    $scope.hasSuccess = false;
    $scope.message = "";
    $scope.categoryList = [];
    $scope.showForm = false;
    $scope.editObj = {};
    $scope.claimUserID = null;
    $scope.submitEnable = true;
    $scope.displayWarrning = false;


    $scope.finalBulkData = {};

    $scope.convertToInt = function(val){
        return parseInt(val);
    };

    $scope.init = function() {

        $scope.finalBulkData = {};
        GlobalSetupService.getData.query({}, {}).$promise.then(function(result) {
            $scope.globalSetup = result;
            var date = new Date();
            var day = date.getDate ();
            if($scope.globalSetup.claimCutOffDay < day){
                $scope.submitEnable = false;
            }

            CategoryService.getAllClaimFormByType.query({}, {claimType : $scope.claimType}).$promise.then(function(result) {
                    if(result.length == 0){
                        var modalData = {};
                        modalData.modalTitle = "Error";
                        modalData.modalBody = "There is no claim assign to You";
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
                        $scope.categoryList = result;
                    }
                },
                function(error) {
                    $scope.showErrorMessage("Please Key-in every required fields.");
                });
        });


        $rootScope.updateMode = false;
    };



    $scope.deleteImage = function(data, object){

        var res = confirm("Are you sure to delete?");
        if(res){
            data.splice( $.inArray(object, data), 1 );
        }else{
            return false;
        }


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

    $scope.resetInputFile = function() {
        var elems = document.getElementsByTagName('input');
        for (var i = 0; i < elems.length; i++) {
            if (elems[i].type == 'file') {
                elems[i].value = null;
            }
        }
        $scope.attachment = {
            description : ''
        };
    };





    if($stateParams.claimType == undefined || $stateParams.claimType == null){
        $state.go('root.home');
    }else{
        $scope.claimType = $stateParams.claimType;
        $scope.init();
    }



    $scope.calculateSubTotal = function(claimFormList){
        return ClaimValidationService.calculateSubTotal(claimFormList);
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

    $scope.disabled = function(date, mode, fieldData) {
        return ClaimValidationService.disabled(date, mode, fieldData);
    };


    $scope.save = function(status) {



    if(validator.validateForm("#description",".validatorMsg",null)) {
        if (validator.validateForm("#validationRequired", ".validatorMsg", null)) {


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
                    } else if (resultSearch.intStatus == 2) {
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
    }else{
        $scope.showErrorMessage("Please Key-in claim description.");
    }
    };




    $scope.saveValid = function (status){

        $scope.finalBulkData.claimFormList = [];
        angular.forEach($scope.categoryList, function (category, key) {
            if(category.claimBulkData != undefined && category.claimBulkData.claimFormList != undefined){
                angular.forEach(category.claimBulkData.claimFormList, function (claim, key) {
                    var claimFormData = {};
                    var jsonString = JSON.stringify(claim.resultList);
                    claimFormData.jsonValue = jsonString;
                    claimFormData.categoryID = category.categoryID;
                    claimFormData.requireOriginal = category.requireOriginal;
                    claimFormData.isException = claim.isException;
                    claimFormData.exceptionReason = claim.exceptionReason;
                    $scope.finalBulkData.claimFormList.push(claimFormData);
                });
            }
        });
        $scope.finalBulkData.status = status;
        $scope.finalBulkData.claimType = $scope.claimType;

        //console.log(finalClaimEvent);
        ClaimService.save.query({}, $scope.finalBulkData).$promise.then(function (result) {
            if (result && result.success) {
                $scope.showSuccessMessage("Information updated successfully");
                $scope.init();
            } else {
                $scope.showErrorMessage(result.message);
            }
        },
        function(error) {
            $scope.showErrorMessage("Something went wrong, Please contact Your administrator.");
        });
    };

    $scope.deleteFromClaimForm = function(category, list, index){
        list.splice(index,1);
        var hasError = false;
        angular.forEach(category.claimBulkData.claimFormList, function (claim, key) {
            if(claim.hasError){
                hasError = true;
            }
        });
        category.hasError = hasError;
    };



    $scope.detail = function(categoryField) {
        $state.go('root.categoryField/' + category.categoryField);
    };

    $scope.showErrorMessage = function(message){
        $scope.hasError = true;
        $scope.hasSuccess = false;
        $scope.hasWarning = false;
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
        $scope.hasWarning = false;
    };

    $scope.edit = function(claimBulkData){
        $scope.claimBulkData = {};
        angular.copy(claimBulkData, $scope.editObj);
        angular.copy(claimBulkData, $scope.claimBulkData);
        $scope.hideMessage();
        $scope.showForm = true;
    };

    $scope.reset = function(){
        $scope.hideMessage();
        validator.hideError("#validationRequired");
    };



    $scope.claimFormList = [];
    $scope.add = function(category){

        $rootScope.updateMode = true;

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

    $scope.uploadFile = function (imageData){
        alert(imageData.fileName);
    };

    $scope.cancel = function(){
        $scope.reset();
        $scope.showForm = false;
    };

    $scope.backToList = function() {
        $scope.cancel();
    };

    $scope.showImageInPopUP = function(attachMentList){

        var modalInstance = $modal.open({
            templateUrl: 'resources/javascript/templates/ImageModal.html',
            controller: 'ImageModalController',
            backdrop: "static",
            windowClass: 'fade in ',
            resolve: {
                modalConfig: function () {
                    return attachMentList;
                }
            }
        });

    };




});




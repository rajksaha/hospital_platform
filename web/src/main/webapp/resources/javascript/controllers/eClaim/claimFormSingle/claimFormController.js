app.controller('ClaimFormSingleController.AddClaimMasterController', function($scope, $modalInstance, $timeout, $filter, $rootScope, modalConfig, CategoryService) {

    $scope.userData = modalConfig;
    $scope.claimBulkData = {};
    $scope.categoryList = [];
    $scope.categoryFieldList = [];

    CategoryService.getAllCategory.query({}, {}).$promise.then(function(result) {
        $scope.categoryList = result;

    });

    $scope.getRuleByCategoryFieldID = function (categoryID){

        CategoryService.getFieldWithSubCategoryByCategoryID.query({}, {categoryID: categoryID}).$promise.then(function(result) {
            $scope.categoryFieldList = result;

        });
    };

    $scope.addImageContent = function(fieldData){

        if(fieldData.imageContentList == undefined || fieldData.imageContentList == null){
            fieldData.imageContentList = [];
        }
        var temp = {};
        fieldData.imageContentList.push(temp);
    };

    $scope.close = function (){
        $modalInstance.dismiss('cancel');
    };
});
app.controller('ClaimFormSingleController', function($scope, $rootScope, $state, $modal, $http, $location, CategoryService, ClaimService, $filter, ClaimValidationService, $upload) {

    $scope.hasError = false;
    $scope.hasSuccess = false;
    $scope.message = "";
    $scope.categoryList = [];
    $scope.showForm = false;
    $scope.editObj = {};


    $scope.onFileSelect = function($files, imageData, index){
        $scope.hideMessage();
        $scope.file = $files[0];

        var fileSize = $scope.file.size / 1048576 ;
        if(fileSize > 5){
            $scope.showErrorMessage("Maximum file size limit is 5 MB");
            return false;
        }

        $scope.uploading = true;

        $upload.upload({
            url : 'rest/claimEvent/upload',
            method: 'POST',
            data : {},
            file: $scope.file
        }).then(function(result) {
            if(result.data.success == false) {
                alert("error");
            } else {
                imageData.imgUrl = result.data.imgName;
                $scope.uploading =false;
                $scope.showSuccessMessage("Photo added successfully");
            }
        }, function(result) {
            $scope.uploading = false;
        }, function(evt) {

        });
    };



    $scope.init = function() {
            CategoryService.getAllClaimForm.query({}, {}).$promise.then(function(result) {
                $scope.categoryList = result;
            });
    };

    $scope.addImageContent = function(fieldData){

        if(fieldData.imageContentList == undefined || fieldData.imageContentList == null){
            fieldData.imageContentList = [];
        }
        var temp = {};
        fieldData.imageContentList.push(temp);
    };

    $scope.getText = function(val){
        if(val == 0){
            return "Text";
        }else if(val == 1){
            return "Number";
        }else{
            return "Date";
        }
    }





    $scope.masterClaim = [];

    $scope.save = function(status) {


        if(validator.validateForm("#validationRequired",".validatorMsg",null)) {
            var searchData = {};
            //searchData.limit = 1;
            //searchData.userType = null;
            CategoryService.getCategoryRuleBySearchData.query({}, searchData).$promise.then(function (result) {
                var validationResult = true;
                angular.forEach($scope.categoryList, function (category, key) {
                    var categoryRuleList = $filter('filter')(result, {categoryID: category.categoryID});
                    if(category.claimEventData != undefined && category.claimEventData.claimFormList != undefined){
                        angular.forEach(category.claimEventData.claimFormList, function (claimList, key) {
                            var searchData = {};
                            searchData.categoryData = category;
                            searchData.userLevel = null;
                            validationResult = ClaimValidationService.validatePerReceiptClaim(categoryRuleList, claimList.resultList, searchData);
                        });
                    }
                });
                if (validationResult) {
                    $scope.validateNonPerReceipt(result, $scope.saveValid, status);
                }
            });
        }
    };

    $scope.validateNonPerReceipt = function(result, callback, status){
        var validationResult = false;
        var validated = 0;
        angular.forEach($scope.categoryList, function (category, key) {
            validated +=1;
            var categoryRuleList = $filter('filter')(result, {categoryID: category.categoryID});

            if(category.claimEventData != undefined && category.claimEventData.claimFormList != undefined){
                var resultData = ClaimValidationService.validateNonPerReceiptClaim(categoryRuleList,category.claimEventData.claimFormList);
                if(resultData.limit != undefined){
                    ClaimService.validateNonPerReceipt.query({}, resultData).$promise.then(function (result) {
                        if(result.status){
                            validationResult = true;
                            if(callback != undefined && typeof callback === 'function') {
                                callback(status);
                            }
                        }else{
                            var message = "Previous claim amount was " + result.previouslyAdded + " , can not more than " + resultData.maxAmount + " Please select a values which n more than" + result.canAddTill;
                            validationResult = false;
                            category.hasError = true;
                            $scope.showErrorMessage(message);
                        }
                    });
                }
            }
        });


    };


    $scope.saveValid = function (status){

        var finalClaimEvent = {};
        finalClaimEvent.claimFormList = [];
        angular.forEach($scope.categoryList, function (category, key) {
            if(category.claimEventData != undefined && category.claimEventData.claimFormList != undefined){
                angular.forEach(category.claimEventData.claimFormList, function (claimList, key) {
                    var claimFormData = {};
                    var jsonString = JSON.stringify(claimList.resultList);
                    claimFormData.jsonValue = jsonString;
                    claimFormData.categoryID = category.categoryID;
                    finalClaimEvent.claimFormList.push(claimFormData);
                });
            }
        });
        finalClaimEvent.status = status;

        //console.log(finalClaimEvent);
        ClaimService.save.query({}, finalClaimEvent).$promise.then(function (result) {
            if (result && result.success) {
                $scope.showSuccessMessage("Information updated successfully");
                $scope.init();
            } else {
                $scope.showErrorMessage(result.message);
            }
        });
    };



    $scope.detail = function(categoryField) {
        $state.go('root.categoryField/' + category.categoryField);
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

    $scope.edit = function(categoryField){
        $scope.categoryField = {};
        angular.copy(categoryField, $scope.editObj);
        angular.copy(categoryField, $scope.categoryField);
        $scope.hideMessage();
        $scope.showForm = true;
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

        if(category.claimEventData == undefined){
            category.claimEventData = {};
            category.claimEventData.claimFormList = [];
        }
        var test = [];
        angular.copy(category.fieldDATAs, test);
        var claimForm = {'resultList' : test, 'categoryID' : category.categoryID};
        angular.forEach(test, function (value, key) {
            if(value.fieldType == 4){
                $scope.addImageContent(value);
            }
        });
        category.claimEventData.claimFormList.push(claimForm);
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

    $scope.addMaster = function(){

        var userData = {};
        var modalInstance = $modal.open({
            templateUrl: 'resources/javascript/templates/claimForm/claimModal.html',
            controller: 'ClaimFormSingleController.AddClaimMasterController',
            backdrop: "static",
            windowClass: 'fade in ',
            resolve: {
                modalConfig: function () {
                    return userData;
                }
            }
        });
        modalInstance.result.then(function(result) {
            $scope.showSuccessMessage("Information updated successfully");
            $scope.init();
        });
    };

    $scope.init();

});
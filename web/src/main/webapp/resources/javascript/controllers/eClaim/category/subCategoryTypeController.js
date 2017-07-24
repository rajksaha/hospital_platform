app.controller('SubCategoryTypeController', function($scope, $rootScope, $state, $stateParams, $http, $timeout, $location, CategoryService) {

    $scope.hasError = false;
    $scope.hasSuccess = false;
    $scope.message = "";
    $scope.subCategoryType = {};
    $scope.subCategoryTypeList = [];
    $scope.showForm = false;
    $scope.editObj = {};


    if($stateParams.categoryID == undefined || $stateParams.categoryID == null){
        $state.go('root.category');
    }else{
        $scope.categoryID = $stateParams.categoryID;
    }

    $scope.init = function() {

        $scope.subCategoryType = {};
        $scope.showForm = false;
        if($scope.categoryID){
            CategoryService.getCategoryByCategoryID.query({}, {categoryID: $scope.categoryID}).$promise.then(function(result) {
                $scope.categoryData = result;
            });
            CategoryService.getSubCategoryTypeByCategoryID.query({}, {categoryID: $scope.categoryID}).$promise.then(function(result) {
                $scope.subCategoryTypeList = result;
            });
        }
    };

    $scope.mangeSubCategory = function(subCatType) {
        $state.go('root.subCategory', {'subCategoryTypeID' : subCatType.subCategoryTypeID, 'categoryID' : $scope.categoryID});
    };

    $scope.delete = function(data, index){


        CategoryService.deleteSubCategoryType.remove({subCategoryTypeID : data.subCategoryTypeID} ).$promise.then(function(result) {
            $scope.subCategoryTypeList.splice(index,1);
            $scope.showSuccessMessage("Information deleted successfully");
        });
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




    $scope.save = function(subCategoryType) {
        $scope.hideMessage();
        if(validator.validateForm("#validationRequired",".validatorMsg",null)) {
            CategoryService.saveSubCategoryType.query({}, subCategoryType ).$promise.then(function(result) {
                if(result && result.success) {
                    $scope.showSuccessMessage("Information saved successfully");
                    $scope.init();
                } else {
                    $scope.showErrorMessage(result.message);
                }
            });
        }
    };

    $scope.update = function(subCategoryType){
        $scope.hideMessage();
        if(validator.validateForm("#validationRequired",".validatorMsg",null)) {
            CategoryService.updateSubCategoryType.query({}, subCategoryType ).$promise.then(function(result) {
                if(result && result.success) {
                    $scope.showSuccessMessage("Information updated successfully");
                    $scope.subCategory = {};
                    $scope.refreshList();
                    $scope.showForm = false;
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

    $scope.hideMessage = function(){
        $scope.hasError = false;
        $scope.hasSuccess = false;
    };

    $scope.edit = function(subCategoryType){
        $scope.subCategoryType = {};
        angular.copy(subCategoryType, $scope.editObj);
        angular.copy(subCategoryType, $scope.subCategoryType);
        $scope.hideMessage();
        $scope.showForm = true;
    };

    $scope.reset = function(){
        angular.copy($scope.editObj, $scope.subCategoryType);
        $scope.hideMessage();
        validator.hideError("#validationRequired");
    };

    $scope.add = function(){
        $scope.editObj = {};
        $scope.reset();
        $scope.subCategoryType = {};
        $scope.subCategoryType.categoryID = $scope.categoryID;
        $scope.showForm = true;
    };

    $scope.cancel = function(){
        $scope.reset();
        $scope.showForm = false;
    };

    $scope.backToList = function() {
        $scope.cancel();
    };

    $scope.goToCategoryList = function() {
        $state.go('root.category');
    };

    $scope.init();

});
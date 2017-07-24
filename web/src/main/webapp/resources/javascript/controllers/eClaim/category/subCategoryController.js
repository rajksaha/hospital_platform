app.controller('SubCategoryController', function($scope, $rootScope, $state, $stateParams, $http, $timeout, $location, CategoryService) {

    $scope.hasError = false;
    $scope.hasSuccess = false;
    $scope.message = "";
    $scope.subCategory = {};
    $scope.subCategoryList = [];
    $scope.subCategoryMissingList = [];
    $scope.showForm = false;
    $scope.editObj = {};


    if($stateParams.subCategoryTypeID == undefined || $stateParams.subCategoryTypeID == null){
        $state.go('root.category');
    }else{
        $scope.subCategoryTypeID = $stateParams.subCategoryTypeID;
        $scope.categoryID = $stateParams.categoryID;
    }

    $scope.init = function() {

        $scope.subCategory = {};
        $scope.showForm = false;
        if($scope.categoryID){
            CategoryService.getCategoryByCategoryID.query({}, {categoryID: $scope.categoryID}).$promise.then(function(result) {
                $scope.categoryData = result;
            });
            CategoryService.getSubCategoryByType.query({}, {subCategoryTypeID: $scope.subCategoryTypeID}).$promise.then(function(result) {
                $scope.subCategoryList = result;
            });

            CategoryService.getSubCategoryByCategoryID.query({}, {categoryID: $scope.categoryID}).$promise.then(function(result) {
                $scope.subCategoryMissingList = result;
            });
        }
    };

    $scope.delete = function(data, index){

        CategoryService.deleteSubCategory.remove({subCategoryID : data.subCategoryID} ).$promise.then(function(result) {
            $scope.subCategoryList.splice(index,1);
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




    $scope.save = function(subCategory) {
        $scope.hideMessage();
        if(validator.validateForm("#validationRequired",".validatorMsg",null)) {

            CategoryService.saveSubCategory.query({}, subCategory ).$promise.then(function(result) {
                if(result && result.success) {
                    $scope.showSuccessMessage("Information saved successfully");
                    $scope.init();
                } else {
                    $scope.showErrorMessage(result.message);
                }
            });
        }
    };

    $scope.update = function(subCategory){
        $scope.hideMessage();
        if(validator.validateForm("#validationRequired",".validatorMsg",null)) {
            subCategory.subCategoryTypeID = $scope.subCategoryTypeID;
            CategoryService.updateSubCategory.query({}, subCategory ).$promise.then(function(result) {
                if(result && result.success) {
                    $scope.showSuccessMessage("Information updated successfully");
                    $scope.subCategory = {};
                    $scope.showForm = false;
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

    $scope.hideMessage = function(){
        $scope.hasError = false;
        $scope.hasSuccess = false;
    };

    $scope.edit = function(subCategory){
        $scope.subCategory = {};
        angular.copy(subCategory, $scope.editObj);
        angular.copy(subCategory, $scope.subCategory);
        $scope.hideMessage();
        $scope.showForm = true;
    };

    $scope.reset = function(){
        angular.copy($scope.editObj, $scope.subCategory);
        $scope.hideMessage();
        validator.hideError("#validationRequired");
    };

    $scope.add = function(){
        $scope.editObj = {};
        $scope.reset();
        $scope.subCategory = {};
        $scope.subCategory.subCategoryTypeID = $scope.subCategoryTypeID;
        $scope.subCategory.categoryID = $scope.categoryID;
        $scope.showForm = true;
    };

    $scope.cancel = function(){
        $scope.reset();
        $scope.showForm = false;
    };

    $scope.backToList = function() {
        $scope.cancel();
    };

    $scope.goToSubCategoryType = function() {
        $state.go('root.subCategoryType', {'categoryID' : $scope.categoryID});
    };

    $scope.init();

});
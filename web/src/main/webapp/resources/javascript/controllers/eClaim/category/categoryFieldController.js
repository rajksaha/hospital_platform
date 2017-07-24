app.controller('CategoryFieldController', function($scope, $rootScope, $state, $stateParams, $http, $timeout, $location, CategoryService) {

    $scope.hasError = false;
    $scope.hasSuccess = false;
    $scope.message = "";
    $scope.categoryField = {};
    $scope.categoryFieldList = [];
    $scope.orderList = [];
    $scope.showForm = false;
    $scope.editObj = {};


    if($stateParams.categoryID == undefined || $stateParams.categoryID == null){
        $state.go('root.category');
    }else{
        $scope.categoryID = $stateParams.categoryID;
    }

    $scope.delete = function(data, index){

        CategoryService.deleteCategoryField.remove({categoryFieldID : data.categoryFieldID} ).$promise.then(function(result) {
            $scope.categoryFieldList.splice(index,1);
            $scope.showSuccessMessage("Information deleted successfully");
        });
    };

    $scope.init = function() {
        $scope.showForm = false;
        $scope.categoryField = {};
        if($scope.categoryID){
            CategoryService.getCategoryByCategoryID.query({}, {categoryID: $scope.categoryID}).$promise.then(function(result) {
                $scope.categoryData = result;
            });
            CategoryService.getFieldByCategoryID.query({}, {categoryID: $scope.categoryID}).$promise.then(function(result) {
                $scope.categoryFieldList = result;

            });
        }
    };

    $scope.bringSubCategoryType = function(categoryField){
        if(categoryField.fieldType == 5){
            CategoryService.getSubCategoryTypeByCategoryID.query({}, {categoryID: $scope.categoryID}).$promise.then(function(result) {
                $scope.subCategoryTypeList = result;
            });
        }
    };


    $scope.getText = function(val){
        if(val == 0){
            return "Text";
        }else if(val == 1){
            return "Number";
        }else if(val == 2){
            return "Date";
        }else if(val == 3){
            return "Type Selector";
        }else if(val == 4){
            return "Attachment";
        }else if(val == 5){
            return "Fixed Option Selector";
        }else if(val == 6){
            return "Dependent Option Selector";
        }
    };

    $scope.populateOrderList = function(add){

        $scope.orderList = [];
        if($scope.categoryFieldList && $scope.categoryFieldList.length > 0){
            for(var i = 0; i < $scope.categoryFieldList.length + add; i++){
                var temp = { 'value' : i +1, 'name' : i+1};
                $scope.orderList.push(temp);
            }
        }else{
            var temp = { 'value' : 1, 'name' : 1};
            $scope.orderList.push(temp);
        }
    };

    $scope.save = function(categoryField) {
        $scope.hideMessage();
        if(validator.validateForm("#validationRequired",".validatorMsg",null)) {
            CategoryService.saveCategoryField.query({}, categoryField ).$promise.then(function(result) {
                if(result && result.success) {
                    $scope.showSuccessMessage("Information saved successfully");
                    $scope.init();
                } else {
                    $scope.showErrorMessage(result.message);
                }
            });
        }
    };

    $scope.update = function(categoryField){
        $scope.hideMessage();
        if(validator.validateForm("#validationRequired",".validatorMsg",null)) {
            CategoryService.updateCategoryField.query({}, categoryField ).$promise.then(function(result) {
                if(result && result.success) {
                    $scope.showSuccessMessage("Information updated successfully");
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

    $scope.edit = function(categoryField){
        $scope.categoryField = {};
        $scope.bringSubCategoryType(categoryField);
        angular.copy(categoryField, $scope.editObj);
        angular.copy(categoryField, $scope.categoryField);
        $scope.hideMessage();
        $scope.populateOrderList(0);
        $scope.showForm = true;
    };

    $scope.reset = function(){
        angular.copy($scope.editObj, $scope.categoryField);
        $scope.hideMessage();
        validator.hideError("#validationRequired");
    };

    $scope.add = function(){
        $scope.editObj = {};
        $scope.reset();
        $scope.categoryField = {};
        $scope.categoryField.categoryID = $scope.categoryID;
        $scope.populateOrderList(1);
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
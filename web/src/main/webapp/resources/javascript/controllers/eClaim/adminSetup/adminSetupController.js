app.controller('AdminSetupController.AdminSetupModalController', function($scope, $modalInstance, $timeout, $filter, $rootScope, modalConfig, CategoryService) {

    $scope.categoryRule = modalConfig;
    $scope.categoryFieldList = [];
    $scope.subCategoryList = [];

    CategoryService.getFieldByCategoryID.query({}, {categoryID: $scope.categoryRule.categoryID}).$promise.then(function(result) {
        $scope.categoryFieldList = result;

    });
    CategoryService.getSubCategoryByCategoryID.query({}, {categoryID: $scope.categoryRule.categoryID}).$promise.then(function(result) {
        $scope.subCategoryList = result;
    });

    $scope.close = function (){
        $modalInstance.dismiss('cancel');
    };

    $scope.addMillage = function(){
        $scope.categoryRule.ruleValueList.push({});
    };

    $scope.save = function (categoryRule){

        if(validator.validateForm("#validationRequired",".validatorMsg",null)) {
            CategoryService.updateCategoryRule.query({}, categoryRule ).$promise.then(function(result) {
                if(result && result.success) {
                    $modalInstance.dismiss('cancel');
                } else {
                    $modalInstance.close();
                }
            });
        }

    };

});
app.controller('AdminSetupController', function($scope, $rootScope, $state, $stateParams, $modal, $http, $timeout, $location, CategoryService) {

    $scope.hasError = false;
    $scope.hasSuccess = false;
    $scope.message = "";
    $scope.categoryList = [];
    $scope.showForm = false;
    $scope.editObj = {};



    $scope.init = function() {
            CategoryService.getAllCategoryRule.query({}, {}).$promise.then(function(result) {
                $scope.categoryList = result;
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






    $scope.save = function() {

        //console.log($scope.categoryList);
        if(validator.validateForm("#validationRequired",".validatorMsg",null)) {

        }

    };

    $scope.saveValid = function (validFieldList){
        angular.forEach(validFieldList, function(value, key) {
            console.log(value);
        });
    };

    $scope.update = function(categoryField){
        $scope.hideMessage();
        if(validator.validateForm("#validationRequired",".validatorMsg",null)) {
            CategoryService.update.query({}, categoryField ).$promise.then(function(result) {
                if(result && result.success) {
                    $scope.showSuccessMessage("Information updated successfully");
                    $scope.categoryField = {};
                    $scope.refreshList();
                    $scope.showForm = false;
                } else {
                    $scope.showErrorMessage(result.message);
                }
            });
        }
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

    $scope.edit = function(categoryRule){

        var modalInstance = $modal.open({
            templateUrl: 'resources/javascript/templates/eClaim/adminSetup/adminSetupModal.html',
            controller: 'AdminSetupController.AdminSetupModalController',
            backdrop: "static",
            windowClass: 'fade in ',
            resolve: {
                modalConfig: function () {
                    return categoryRule;
                }
            }
        });
        modalInstance.result.then(function(result) {
            $scope.showSuccessMessage("Information updated successfully");
            $scope.init();
        });
    };

    $scope.getTextForRule = function(val){
        if(val == 0){
            return "Range";
        }else if(val == 1){
            return "Millage";
        }
    };

    $scope.getTextForApplyTo = function(val){
        if(val == 0){
            return "All user";
        }else if(val == 1){
            return "Confirmed User";
        }else if(val == 2){
            return "Non-confirmed User";
        }
    };

    $scope.getTextForLimit = function(val){
        if(val == 1){
            return "Per Reciept";
        }else if(val == 2){
            return "Per  Month";
        }else if(val == 3){
            return "Per  year";
        }
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

        if(category.claimFormList == undefined){
            category.claimFormList = [];
            category.updatedData = [];
        }
        if(category.claimFormList.length == 0){
            angular.copy(category.fieldDATAs, category.updatedData);
        }

        var test = [];
       angular.copy(category.updatedData, test);
        var claimForm = {'fieldList' : test};
        category.claimFormList.push(claimForm);
        $scope.showForm = true;
    };

    $scope.cancel = function(){
        $scope.reset();
        $scope.showForm = false;
    };

    $scope.backToList = function() {
        $scope.cancel();
    };

    $scope.init();

});
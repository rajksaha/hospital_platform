app.controller('CategoryController', function($scope, $rootScope, $state, $http, $timeout, $location, CategoryService) {

    $scope.hasError = false;
    $scope.hasSuccess = false;
    $scope.message = "";
    $scope.category = {};
    $scope.categoryList = [];
    $scope.showForm = false;
    $scope.editObj = {};


    //reloading the grid
    $scope.reloadList = false;
    $scope.refreshList = function () {
        $scope.reloadList = !$scope.reloadList;
        $scope.dataSourceConfig.params.refresh = $scope.reloadList;
    };

    $scope.searchParam = {};
    $scope.search = function() {
        $scope.dataSourceConfig.params = angular.copy($scope.searchParam);
    };

    // column definition
    $scope.columnDefinition = [
        {columnHeaderDisplayName: 'SL', displayProperty: 'serial', width: '4em'},
        {columnHeaderDisplayName: 'Category Name', displayProperty: 'shortName', sortKey: 'shortName'},
        {columnHeaderDisplayName: 'Claim Type', template: '<strong>{{item.claimType == 1 ? "HR Claim" : "Admin Claim"}}</strong>' , sortKey: 'requireOriginal'},
        {columnHeaderDisplayName: 'Original Document Required', template: '<strong>{{item.requireOriginal == 1 ? "Yes" : "No"}}</strong>' , sortKey: 'requireOriginal'},
        {columnHeaderDisplayName: 'Separate Tax', template: '<strong>{{item.isTaxRequire ? "Yes" : "No"}}</strong>' , sortKey: 'isTaxRequire'},
        {columnHeaderDisplayName: 'Action', templateUrl: 'action_template', width: '30em'}
    ];

    //datasource configuration
    $scope.dataSourceConfig = {
        url: 'rest/category/getAll',
        method: "GET",
        params: {},
        paginationConfig: {
            response: {
                totalItems: 'count',
                itemsLocation: 'list'
            }
        }
    };

    $scope.save = function(division) {
        $scope.hideMessage();
        if(validator.validateForm("#validationRequired",".validatorMsg",null)) {
            CategoryService.save.query({}, division ).$promise.then(function(result) {
                if(result && result.success) {
                    $scope.showSuccessMessage("Information saved successfully");
                    $scope.category = {};
                    $scope.refreshList();
                    $scope.showForm = false;
                } else {
                    $scope.showErrorMessage(result.message);
                }
            });
        }
    };

    $scope.update = function(category){
        $scope.hideMessage();
        if(validator.validateForm("#validationRequired",".validatorMsg",null)) {
            CategoryService.update.query({}, category ).$promise.then(function(result) {
                if(result && result.success) {
                    $scope.showSuccessMessage("Information updated successfully");
                    $scope.category = {};
                    $scope.refreshList();
                    $scope.showForm = false;
                } else {
                    $scope.showErrorMessage(result.message);
                }
            });
        }
    };

    $scope.manageField = function(category) {
        $state.go('root.categoryField', {'categoryID' : category.categoryID});
    };

    $scope.manageSub = function(category) {
        $state.go('root.subCategoryType', {'categoryID' : category.categoryID});
    };

    $scope.applyRule = function(category) {
        $state.go('root.categoryRule', {'categoryID' : category.categoryID});
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

    $scope.edit = function(category){
        $scope.category = {};
        angular.copy(category, $scope.editObj);
        angular.copy(category, $scope.category);
        $scope.hideMessage();
        $scope.showForm = true;
    };

    $scope.delete = function(category){

        CategoryService.deleteCategory.remove({categoryID : category.categoryID} ).$promise.then(function(result) {
            $scope.refreshList();
            $scope.showSuccessMessage("Information deleted successfully");
        });
    };

    $scope.reset = function(){
        angular.copy($scope.editObj, $scope.category);
        $scope.hideMessage();
        validator.hideError("#validationRequired");
    };

    $scope.add = function(){
        $scope.editObj = {};
        $scope.reset();
        $scope.showForm = true;
    };

    $scope.cancel = function(){
        $scope.reset();
        $scope.showForm = false;
    };

    $scope.backToList = function() {
        $scope.cancel();
    };

});
/**
 * Created by raj on 5/21/2016.
 */
app.controller('UserGroupController', function($scope, $rootScope, $state, $http, $timeout, $location, EchoCommonService, UserManagementService) {

    $scope.hasError = false;
    $scope.hasSuccess = false;
    $scope.message = "";
    $scope.userGroup = {};
    $scope.showForm = false;
    $scope.editObj = {};
    $scope.companyModuleList = [];


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
        {columnHeaderDisplayName: 'Group Name', displayProperty: 'shortName', sortKey: 'shortName'},
        {columnHeaderDisplayName: 'Hospital Module Name', displayProperty: 'companyModuleName', sortKey: 'companyModuleName'},
        {columnHeaderDisplayName: 'Hospital Name', displayProperty: 'companyName', sortKey: 'companyName'},
        {columnHeaderDisplayName: 'Module Name', displayProperty: 'moduleName', sortKey: 'moduleName'},
        {columnHeaderDisplayName: 'Action', templateUrl: 'action_template', width: '5em'}
    ];

    //datasource configuration
    $scope.dataSourceConfig = {
        url: 'rest/userGroup/getAll',
        method: "GET",
        params: {},
        paginationConfig: {
            response: {
                totalItems: 'count',
                itemsLocation: 'list'
            }
        }
    };

    $scope.save = function(userGroup) {
        $scope.hideMessage();
        if(validator.validateForm("#validationRequired",".validatorMsg",null)) {
            UserManagementService.saveUserGroup.query({}, userGroup ).$promise.then(function(result) {
                if(result && result.success) {
                    $scope.showSuccessMessage("Information saved successfully");
                    $scope.userGroup = {};
                    $scope.refreshList();
                    $scope.showForm = false;
                } else {
                    $scope.showErrorMessage(result.message);
                }
            });
        }

    };

    $scope.update = function(userGroup){
        $scope.hideMessage();
        if(validator.validateForm("#validationRequired",".validatorMsg",null)) {
            UserManagementService.updateUserGroup.query({}, userGroup ).$promise.then(function(result) {
                if(result && result.success) {
                    $scope.showSuccessMessage("Information updated successfully");
                    $scope.userGroup = {};
                    $scope.refreshList();
                    $scope.showForm = false;
                } else {
                    $scope.showErrorMessage(result.message);
                }
            });
        }
    };

    $scope.delete = function(companyModule){

        EchoCommonService.deleteCompanyModule.remove({companyModuleID : companyModule.companyModuleID} ).$promise.then(function(result) {
            $scope.refreshList();
            $scope.showSuccessMessage("Information deleted successfully");
        });
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

    $scope.edit = function(userGroup){
        $scope.userGroup = {};
        angular.copy(userGroup, $scope.editObj);
        angular.copy(userGroup, $scope.userGroup);
        $scope.hideMessage();
        $scope.showForm = true;
    };

    $scope.reset = function(){
        angular.copy($scope.editObj, $scope.userGroup);
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

    $scope.init = function(){

        EchoCommonService.getAllCompanyModule.query({}, {} ).$promise.then(function(result) {
            $scope.companyModuleList = result;
        });

    };

    $scope.init();

});
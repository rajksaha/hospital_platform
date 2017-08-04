app.controller('DoctorController', function($scope, $rootScope, $state, $filter, $http, $timeout, $location, UserSetupService, $modal, EchoCommonService, ContentDetailService) {

    $scope.hasError = false;
    $scope.hasSuccess = false;
    $scope.message = "";
    $scope.userProfile = {};
    $scope.categoryList = [];
    $scope.userGroupList = [];
    $scope.showForm = false;
    $scope.editObj = {};



    $scope.init = function(){

        if($scope.dataSourceConfig.companyID == null && $rootScope.userData.userID == 1){
            $scope.companySelected = false;
            EchoCommonService.getAllCompany.query({}, {}).$promise.then(function(result) {
                $scope.companyList = result;
            });
        }else{
            $scope.companySelected = true;
            $scope.bringData();
        }
    };

    //reloading the grid
    $scope.reloadList = false;
    $scope.refreshList = function () {
        $scope.reloadList = !$scope.reloadList;
        $scope.dataSourceConfig.params.refresh = $scope.reloadList;
    };

    $scope.searchParam = {};
    $scope.search = function() {
        $scope.companySelected = true;
        $scope.dataSourceConfig.params = angular.copy($scope.searchParam);
    };

    // column definition
    $scope.columnDefinition = [
        {columnHeaderDisplayName: 'Name', displayProperty: 'firstName', sortKey: 'firstName'},
        {columnHeaderDisplayName: 'Doctor Code', displayProperty: 'userName', sortKey: 'userName'},
        {columnHeaderDisplayName: 'Contact', displayProperty: 'contactNo', sortKey: 'contactNo'},
        {columnHeaderDisplayName: 'Fee', displayProperty: 'fee', sortKey: 'fee'},
        {columnHeaderDisplayName: 'Action', templateUrl: 'action_template', width: '5em'}
    ];

    $scope.bringData = function(){

        $scope.dataSourceConfig = {
            url: 'rest/user/getAll',
            method: "GET",
            params: {userType : 1},
            paginationConfig: {
                response: {
                    totalItems: 'count',
                    itemsLocation: 'list'
                }
            }
        };
    }
    //datasource configuration

    $scope.dataSourceConfig = {
        url: 'rest/user/getAll',
        method: "GET",
        params: {userType : 1},
        paginationConfig: {
            response: {
                totalItems: 'count',
                itemsLocation: 'list'
            }
        }
    };

    $scope.save = function(userProfile) {
        $scope.hideMessage();
        userProfile.companyID = $scope.searchParam.companyID;
        if(validator.validateForm("#validationRequired",".validatorMsg",null)) {
            userProfile.userType = 1;
            UserSetupService.save.query({}, userProfile ).$promise.then(function(result) {
                if(result && result.success) {
                    $scope.showSuccessMessage("Information saved successfully");
                    $scope.userProfile = {};
                    $scope.refreshList();
                    $scope.showForm = false;
                } else {
                    $scope.showErrorMessage(result.message);
                }
            });
        }
    };

    $scope.update = function(userProfile){
        $scope.hideMessage();
        if(validator.validateForm("#validationRequired",".validatorMsg",null)) {
            UserSetupService.update.query({}, userProfile ).$promise.then(function(result) {
                if(result && result.success) {
                    $scope.showSuccessMessage("Information updated successfully");
                    $scope.userProfile = {};
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
        $state.go('root.subCategory', {'categoryID' : category.categoryID});
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

    $scope.edit = function(userProfile){


        $scope.userProfile = {};
        UserSetupService.getUserProfile.query({}, {userID : userProfile.userID}).$promise.then(function(result) {
            $scope.userProfile = result;
            $scope.hideMessage();
            $scope.showForm = true;


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

    $scope.init();

});

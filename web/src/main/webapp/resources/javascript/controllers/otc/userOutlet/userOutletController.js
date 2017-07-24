/**
 * Created by raj on 9/21/2016.
 */


app.controller('UserOutletController', function($scope, $modal, $state, $stateParams, $http, $timeout, $location, $filter, $upload, limitToFilter, ApprovalService, DashboardService) {

    $scope.hasError = false;
    $scope.hasSuccess = false;
    $scope.message = "";
    $scope.categoryList = [];
    $scope.showForm = false;
    $scope.editObj = {};
    $scope.searchData = {};

    $scope.claimType = null;
    $scope.actionStateCode = null;

    $scope.reset = function(){
        $scope.hasError = false;
        $scope.hasSuccess = false;
        $scope.message = "";
    };

    $scope.init = function() {

        $scope.regionID = null;
        $scope.showForm = false;
        $scope.userOutlet = {};
        if(!$scope.regionList){
            DashboardService.getOnlyRegion.query({}, {}).$promise.then(function(result) {
                $scope.regionList = result;
            });
        }

        if($scope.selectedUserID){
            $scope.bringUserOutlet();
        }
    };

    $scope.bringOutlet = function(regionID){

        DashboardService.getOutletRegionID.query({}, {regionID : regionID}).$promise.then(function(result) {
            $scope.outletList = result;
        });
    };


    $scope.getTypeHeadItem = function(term) {
        return  ApprovalService.getItemForTypeHead.query({}, {data : term}).$promise.then(function(result) {
            $scope.productList = result;
            return limitToFilter($scope.productList, 10);
        });
    };


    $scope.onSelectItem = function(item, model, label){
        $scope.selectedUserID =  item.userID;
        $scope.bringUserOutlet();
    };

    $scope.bringUserOutlet = function(){

        DashboardService.getUserOutletByUserID.query({}, {userID : $scope.selectedUserID}).$promise.then(function(result) {
            $scope.userOutletList = result;
            $scope.searchComplete = true;
        });

    };

    $scope.save = function(userOutlet){
        userOutlet.userID = $scope.selectedUserID;

        DashboardService.saveUserOutlet.query({}, userOutlet).$promise.then(function(result) {
            $scope.showSuccessMessage("Information Updated Successfully");
            $scope.init();
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

    $scope.add = function(){
        DashboardService.getAllOutlet.query({}, {}).$promise.then(function(result) {
            $scope.outletList = result;
            $scope.editObj = {};
            $scope.reset();
            $scope.showForm = true;
            $scope.searchComplete = true;
        });
    };

    $scope.delete = function (userOutlet, index){
        var searchData = {};
        searchData.entityID = userOutlet.userOutletID;
        DashboardService.deleteUserOutlet.query({}, searchData).$promise.then(function(result) {
            $scope.userOutletList.splice(index,1);
            $scope.showSuccessMessage("Information Updated Successfully");
        });
    };

    $scope.init();

});

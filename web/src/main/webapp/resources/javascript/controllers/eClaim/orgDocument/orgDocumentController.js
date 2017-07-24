/**
 * Created by raj on 5/21/2016.
 */


app.controller('OrgDocumentController', function($scope, $modal, $state, $filter, $stateParams, $http, $timeout, $location, ApprovalService) {

    $scope.hasError = false;
    $scope.hasSuccess = false;
    $scope.message = "";
    $scope.orgDocList = [];
    $scope.showForm = false;
    $scope.editObj = {};
    $scope.searchData = {};

    $scope.filename = "orgDocList";
    $scope.separator = ",";
    $scope.decimalSeparator = ".";
    $scope.orgDocumentExel = [];

    $scope.searchData = {};
    $scope.searchParam = {};



    if($stateParams.actionState == undefined || $stateParams.actionState == null){
        $state.go('root.home');
    }else{
        $scope.searchData.claimType = $stateParams.claimType;
        $scope.searchData.entityStatus = $stateParams.actionState;
    }

    $scope.init = function() {
        ApprovalService.bringApprovalDetailBySearchData.query({}, $scope.searchData ).$promise.then(function(result) {
            $scope.approvalData = result;
            $scope.searchParam.entityStatus = $scope.approvalData.actionStateCode;
            $scope.searchParam.entityName = $scope.approvalData.approvalStateCode;
            $scope.searchParam.entityType = $scope.approvalData.approvalUserType;
            $scope.search();
        });
    };

    //reloading the grid
    $scope.reloadList = false;
    $scope.refreshList = function () {
        $scope.reloadList = !$scope.reloadList;
        $scope.dataSourceConfig.params.refresh = $scope.reloadList;
    };


    $scope.search = function() {
        $scope.searchParam.startDate = $filter('date')($scope.startDate, "MMddyyyy");
        $scope.searchParam.endDate = $filter('date')($scope.endDate, "MMddyyyy");
        $scope.dataSourceConfig.params = angular.copy($scope.searchParam);
    };

    // column definition
    $scope.columnDefinition = [
        {columnHeaderDisplayName: 'Approved', templateUrl: 'approved_template',  width: '2em'},
        {columnHeaderDisplayName: 'Reference Number', template: '<strong>{{ formatClaimRunningNumber(item) }}</strong>'},
        {columnHeaderDisplayName: 'Staff Code', displayProperty: 'claimantStaffCode', sortKey: 'claimantStaffCode'},
        {columnHeaderDisplayName: 'Staff Name', displayProperty: 'claimantName'},
        {columnHeaderDisplayName: 'Category', displayProperty: 'categoryName', sortKey: 'categoryID'},
        {columnHeaderDisplayName: 'Approved Date', template: '<strong>{{item.approvedOn | date:"dd/MM/yy"}}</strong>'},
        {columnHeaderDisplayName: 'Submission Date', template: '<strong>{{item.updatedOn | date:"dd/MM/yy"}}</strong>'},
        {columnHeaderDisplayName: 'Amount', template: '<strong>{{  getAmount(item.resultList) }}</strong>'},
        {columnHeaderDisplayName: 'Detail', templateUrl: 'detail_template'},
        {columnHeaderDisplayName: 'Reason', templateUrl: 'reason_template', width: '15em'}
    ];


    //datasource configuration
    $scope.dataSourceConfig = {
        url: 'rest/originalDocument/bringOrgDocumentForApprover',
        method: "GET",
        params: {},
        paginationConfig: {
            response: {
                totalItems: 'count',
                itemsLocation: 'list'
            },

        }
    };

    $scope.setDataToMyList = function($success, $response) {
        $scope.orgDocList = $response.items;
        angular.forEach($scope.orgDocList, function (value, key) {
            value.isApproved = 1;
        });
    };

    $scope.print = function(){


        var searchData = {};
        searchData.claimFormDataList = $scope.orgDocList;
        ApprovalService.documentPrint.query({}, searchData).$promise.then(function(result) {
            window.open(result.imgName);
        });
    };






    $scope.getHeader = function () {return ["Ref Key", "Staff Name"]};

    $scope.documentCollected = function(){




        var modalData = {};
        modalData.modalTitle = "Document Collection Confirmation";
        modalData.modalBody = "Are You Sure You Collected all Selected Original Documents";
        modalData.button1 = true;
        modalData.button2 = true;
        modalData.button1Text = "Yes";
        modalData.button2Text = "No";

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

            var searchData = {};
            var finalClaimForm = []
            angular.forEach($scope.orgDocList, function (value, key) {
                if(value.isApproved == 1 || value.isApproved == -1){
                    value.isApproved = value.isApproved == 1 ? true : false;
                    finalClaimForm.push(value);
                }
            });
            searchData.claimFormDataList = finalClaimForm;
            searchData.approvedStatus =  $scope.approvalData.approvalStatus;
            searchData.nonApprovedStatus =  $scope.approvalData.rejectStatus;
            ApprovalService.documentCollected.query({}, searchData).$promise.then(function(result) {
                $scope.showSuccessMessage("Information saved successfully");
                $scope.refreshList();
            });
        });
    };


    $scope.formatClaimRunningNumber = function(claim){
        if(claim.createdOn){
            var d = new Date(claim.createdOn);
            var n = d.getFullYear().toString().substr(2,2);
            var displayString = n + "-";
            for(var i = claim.claimBulkID.toString().length; i< 6; i++){
                displayString +="0";
            }
            displayString +=claim.claimBulkID;
            return displayString;
        }
        return null;
    };





    $scope.getText = function(resultList, type){

        var result = $filter('filter')(resultList, {fieldType: type})[0];

        return result.fieldValue;
    };

    $scope.getAmount = function(resultList){
        var sum = 0;
        angular.forEach(resultList, function (value, key) {
            if(value.isAmount == 1){
                sum = sum + parseFloat(value.fieldValue);
            }
        });
        return sum.toFixed(2);
    };

    $scope.getAttachColumn = function(resultList, type){

        var result = $filter('filter')(resultList, {fieldType: type})[0];

        if(result){
            return result.imageContentList && result.imageContentList.length > 0;
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

    $scope.showDetailPopUp = function(claim){

        var modalInstance = $modal.open({
            templateUrl: 'resources/javascript/templates/eClaim/approval/claimDetailModal.html',
            controller: 'ClaimDetailModalController',
            backdrop: "static",
            windowClass: 'fade in ',
            resolve: {
                modalConfig: function () {
                    return claim.resultList;
                }
            }
        });
    };


    $scope.showImageInPopUP = function(data, type){


        var result = $filter('filter')(data, {fieldType: type})[0];

        var modalInstance = $modal.open({
            templateUrl: 'resources/javascript/templates/ImageModal.html',
            controller: 'ImageModalController',
            backdrop: "static",
            windowClass: 'fade in ',
            resolve: {
                modalConfig: function () {
                    return result.imageContentList;
                }
            }
        });

    };




    $scope.init();

});

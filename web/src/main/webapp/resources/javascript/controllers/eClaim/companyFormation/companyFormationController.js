/**
 * Created by raj on 3/28/2017.
 */

app.controller('CompanyFormationController', function($scope, $modal, $state, $stateParams, $http, $timeout, $location, CompanyFormationService, ContentDetailService) {

    $scope.hasError = false;
    $scope.hasSuccess = false;
    $scope.message = "";
    $scope.globalSetup = {};
    $scope.showForm = false;
    $scope.editObj = {};
    $scope.step = 1;

    $scope.searchData = {};


    $scope.formationMappingList = [];
    $scope.parentList = [];

    $scope.init = function() {
        $scope.hideMessage();
    };

    $scope.getLevelName = function (levelCode) {
        if(levelCode == 'DEPARTMENT'){
            return 'Department';
        }else if(levelCode ==  'LOCATION'){
            return 'Location';
        }else {
            return 'Cost Center'
        }
    };



    $scope.bringInfo = function () {

        $scope.hideMessage();
        if($scope.step == 1){
            CompanyFormationService.getSingleCompanyInfo.query({}, $scope.searchData).$promise.then(function(result) {
                $scope.contentList = result.contentList;
                $scope.parentList = result.parentList;
                $scope.step += 1;
            });
        }

    };



    $scope.save = function() {

        var valid = true;
        angular.forEach($scope.contentList, function (content, key) {
            if(!content.formationList || content.formationList.length == 0){
                valid = false;
            }
        });

        if(!valid){
            $scope.showErrorMessage("Please select each item(s)");
            return;
        }



        angular.forEach($scope.contentList, function (content, key) {
            var tempFormationList = [];
            angular.forEach(content.formationList, function (formation, key) {
                var temp = {itemID : content.contentDetailID, itemParentID : formation.contentDetailID == undefined ? formation.itemParentID : formation.contentDetailID};
                tempFormationList.push(temp);
            });
            content.formationList = [];
            content.formationList = tempFormationList;
        });

        $scope.searchData.contentList = $scope.contentList;
        CompanyFormationService.save.query({}, $scope.searchData).$promise.then(function(result) {
            $scope.step = 1;
            $scope.searchData.entityName = "";
            $scope.showSuccessMessage("Information Updated Successfully");
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

    $scope.hideMessage = function () {
        $scope.hasError = false;
        $scope.hasSuccess = false;
    };

    $scope.showDetailPopUp = function(claim){

        var modalInstance = $modal.open({
            templateUrl: 'resources/javascript/templates/hrApproval/claimDetailModal.html',
            controller: 'HrApprovalController.ClaimDetailPopUp',
            backdrop: "static",
            windowClass: 'fade in ',
            resolve: {
                modalConfig: function () {
                    return claim.resultList;
                }
            }
        });
        modalInstance.result.then(function(result) {
            $scope.showSuccessMessage("Information updated successfully");
            $scope.init();
        });

    };

    $scope.getClaimBulkDetail = function (userClaim){

        $scope.claimBulk = {};
        $scope.claimBulk = userClaim;
        $scope.markAllApprove(userClaim.claimFormList);
        $scope.singleView = true;

    };



    $scope.init();

});

/**
 * Created by raj on 4/26/2016.
 */

app.controller('UserUploadController', function($scope, $rootScope, $modal, $state, $stateParams, $http, $timeout, $location, $upload, UserUploadService, EchoCommonService) {

    $scope.hasError = false;
    $scope.hasSuccess = false;
    $scope.message = "";
    $scope.globalSetup = {};
    $scope.showForm = false;
    $scope.editObj = {};

    $scope.selectedCompanyID = null;

    $scope.init = function() {
        if($rootScope.userData.companyID > 0){
            $scope.selectedCompanyID = $rootScope.userData.companyID;
        }else{
            EchoCommonService.getAllCompany.query({}, {}).$promise.then(function(result) {
                $scope.companyList = result;
            });
        }

    };

    $scope.setCompany = function(companyID){
        $scope.selectedCompanyID = companyID;
    };

    $scope.fixProduction = function (){

        UserUploadService.fixProductionData.query({}, {}).$promise.then(function (result) {

            if(result.status){
                $scope.showSuccessMessage("System Upgraded Successfully");
            }else{
                $scope.showErrorMessage("ERROR : " + result.message);
            }
        });
    };


    $scope.onFileSelect = function($files, selectedCompanyID){

            $scope.file = $files[0];
            var extension = $scope.file.name.split('.').pop().toLowerCase();

            var model = {
                extension:extension,
                companyID:selectedCompanyID,
            };

            $scope.uploading = true;

            $upload.upload({
                url : 'rest/userUpload/upload',
                method: 'POST',
                data : model,
                file: $scope.file
            }).then(function(result) {
                if(result.data.status == false) {
                    $scope.uploading =false;
                    $scope.showErrorMessage(result.data.message);
                } else {
                    $scope.uploading =false;
                    $scope.showSuccessMessage("User uploaded successfully");
                }
            }, function(result) {
                $scope.uploading = false;
            }, function(evt) {

            });

    };


    $scope.onRegionSelect = function($files, selectedCompanyID){
        $scope.file = $files[0];
        var extension = $scope.file.name.split('.').pop().toLowerCase();

        var model = {
            extension:extension,
            companyID:selectedCompanyID,
        };

        $scope.uploading = true;

        $upload.upload({
            url : 'rest/userUpload/uploadRegion',
            method: 'POST',
            data : model,
            file: $scope.file
        }).then(function(result) {
            if(result.data.status == false) {
                $scope.uploading =false;
                $scope.showErrorMessage(result.data.message);
            } else {
                $scope.uploading =false;
                $scope.showSuccessMessage("User uploaded successfully");
            }
        }, function(result) {
            $scope.uploading = false;
        }, function(evt) {

        });
    };

    $scope.onOutletSelect = function($files, selectedCompanyID){
        $scope.file = $files[0];
        var extension = $scope.file.name.split('.').pop().toLowerCase();

        var model = {
            extension:extension,
            companyID:selectedCompanyID,
        };

        $scope.uploading = true;

        $upload.upload({
            url : 'rest/userUpload/uploadOutlet',
            method: 'POST',
            data : model,
            file: $scope.file
        }).then(function(result) {
            if(result.data.status == false) {
                $scope.uploading =false;
                $scope.showErrorMessage(result.data.message);
            } else {
                $scope.uploading =false;
                $scope.showSuccessMessage("User uploaded successfully");
            }
        }, function(result) {
            $scope.uploading = false;
        }, function(evt) {

        });
    };


    $scope.onUserOutletSelect = function($files, selectedCompanyID){
        $scope.file = $files[0];
        var extension = $scope.file.name.split('.').pop().toLowerCase();

        var model = {
            extension:extension,
            companyID:selectedCompanyID,
        };

        $scope.uploading = true;

        $upload.upload({
            url : 'rest/userUpload/uploadUserOutlet',
            method: 'POST',
            data : model,
            file: $scope.file
        }).then(function(result) {
            if(result.data.status == false) {
                $scope.uploading =false;
                $scope.showErrorMessage(result.data.message);
            } else {
                $scope.uploading =false;
                $scope.showSuccessMessage("User uploaded successfully");
            }
        }, function(result) {
            $scope.uploading = false;
        }, function(evt) {

        });
    };

    $scope.resetInputFile = function() {
        var elems = document.getElementsByTagName('input');
        for (var i = 0; i < elems.length; i++) {
            if (elems[i].type == 'file') {
                elems[i].value = null;
            }
        }
        $scope.attachment = {
            description : ''
        };
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





    $scope.init();

});



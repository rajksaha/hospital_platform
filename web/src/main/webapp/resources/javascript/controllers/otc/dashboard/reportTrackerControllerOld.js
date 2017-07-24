/**
 * Created by raj on 6/21/2016.
 */

app.controller('ReportTrackerController', function($scope, $rootScope, $state, $stateParams, $http, $timeout, $location, DashboardService) {

    $scope.hasError = false;
    $scope.hasSuccess = false;
    $scope.message = "";
    $scope.subCategory = {};
    $scope.regionList = [];
    $scope.showForm = false;
    $scope.editObj = {};




    $scope.init = function() {

        $scope.reportView = false;
        DashboardService.getAllRegion.query({}, {}).$promise.then(function(result) {
            $scope.regionList = result;
        });

    };

    $scope.bringOutletWithAvg = function(region){
        region.displayOutlet = !region.displayOutlet;
        if(region.displayOutlet && region.outletList == undefined){
            DashboardService.getOutletWitAvgReport.query({}, {regionID : region.regionID}).$promise.then(function(result) {
                region.outletList = result;
            });
        }
    };

    $scope.bringOutlet = function(regionID){
        DashboardService.getOutletRegionID.query({}, {regionID : regionID}).$promise.then(function(result) {
            $scope.inputOutletList = result;
        });
    };

    $scope.bringReportDetail = function(report){
        delete report.completenessAvg;

        DashboardService.getReportDetail.query({}, report).$promise.then(function(result) {
            $scope.reportData = result;
            $scope.reportView = true;
        },
        function(error) {
            $scope.showErrorMessage("Something went wrong, Please contact Your administrator.");
        });
    };


    $scope.init();

});

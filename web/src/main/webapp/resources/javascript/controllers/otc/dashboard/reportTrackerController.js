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


        DashboardService.getOnlyRegion.query({}, {}).$promise.then(function(result) {
            $scope.regionList = result;
        });



        var date = new Date();
        var m = date.getMonth() + 1;
        var y = date.getFullYear();


        $scope.buildYearSelector(y);
        $scope.monthBuilder(m);
    };

    $scope.buildYearSelector = function(year){
        $scope.yearList = [];
        var data = {value : year-1, data : year-1};
        $scope.yearList.push(data);
        var data = {value : year, data : year};
        $scope.yearList.push(data);
        $scope.year = year;

    };

    $scope.monthBuilder = function(month){

        $scope.monthList = [];
        $scope.monthList.push({data : "January", value : 1});
        $scope.monthList.push({data : "February", value : 2});
        $scope.monthList.push({data : "March", value : 3});
        $scope.monthList.push({data : "April", value : 4});
        $scope.monthList.push({data : "May", value : 5});
        $scope.monthList.push({data : "June", value : 6});
        $scope.monthList.push({data : "July", value : 7});
        $scope.monthList.push({data : "August", value : 8});
        $scope.monthList.push({data : "September", value : 9});
        $scope.monthList.push({data : "October", value : 10});
        $scope.monthList.push({data : "November", value : 11});
        $scope.monthList.push({data : "December", value : 12});
        $scope.month = month;


        //$scope.monthList = ["data : January, value : 1", "data : February, value : 2", "data : March, value : 3", "data : April", "data : May", "data : June", "data : July", "data : August", "data : September", "data : October", "data : November", "data : December"];
    };

    $scope.regionOnChange = function(regionID, entityName) {
        var searchData = {};
        searchData.entityID = regionID;
        searchData.entityName = entityName;
        searchData.startDate = new Date($scope.year, $scope.month -1, 5);
        DashboardService.getAllRegion.query({}, searchData).$promise.then(function(result) {
            if(entityName == "AM"){
                $scope.amProfileList = result;
            }else{
                $scope.rmeProfileList = result;
            }
        });

    };

    $scope.outletOnChange = function(ID) {
        var searchData = {};
        searchData.entityID = ID;
        searchData.entityName = "RME";
        searchData.startDate = new Date($scope.year, $scope.month -1, 5);
        DashboardService.getMtdByOutlet.query({}, searchData).$promise.then(function(result) {
            $scope.rmeOutletProfileList = result;
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
            $scope.outletList = result;
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

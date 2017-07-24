/**
 * Created by raj on 6/21/2016.
 */

app.controller('MasterReportController', function($scope, $rootScope, $state, $stateParams, $http, $timeout, $location, DashboardService) {

    $scope.hasError = false;
    $scope.hasSuccess = false;
    $scope.message = "";
    $scope.subCategory = {};
    $scope.regionList = [];
    $scope.showForm = false;
    $scope.editObj = {};
    $scope.outletList = [];
    $scope.outlet2List = [];
    $scope.regionID = null;
    $scope.tabNum = 1;




    $scope.init = function() {
        $scope.reportView = false;
        DashboardService.getWing.query({}, {}).$promise.then(function(result) {
            $scope.wingList = result;
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

    $scope.getValue = function(dataList, item){
        var value = 0;
        if(dataList){
            for(var index= 0; index < dataList.length; index++){
                if(dataList[index].fieldName == item){
                    value = dataList[index].fieldValue;
                    break;
                }
            }
        }
        return value;
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

    };

    $scope.tabSelected = function(tabNum){

        if(tabNum == 1){
            $scope.getMasterReportByRegion($scope.regionID);
        }else if(tabNum == 2){
            $scope.tabNum = 2;
            $scope.outletOnSubmissionChange($scope.regionID);
        }else if(tabNum == 3){
            $scope.tabNum = 3;
            $scope.bringOtcScoreReport($scope.regionID);
        }else if(tabNum == 4){
            $scope.tabNum = 4;
            $scope.bringOutletAnalysis($scope.regionID);
        }else if(tabNum == 5){
            $scope.tabNum = 5;
            $scope.bringOutletSummaryAnalysis($scope.regionID);
        }
    };


    $scope.bringRegion = function(wingID){
        DashboardService.getRegionByWing.query({}, {wingID : wingID}).$promise.then(function(result) {
            $scope.regionList = result;
        });
    };

    $scope.bringReportDetail = function(report){

        DashboardService.getReportDetail.query({}, report).$promise.then(function(result) {
            $scope.reportData = result;
            $scope.reportView = true;
        },
        function(error) {
            $scope.showErrorMessage("Something went wrong, Please contact Your administrator.");
        });
    };

    $scope.getMasterReportByRegion = function(regionID){
        var searchData = {};
        searchData.entityID = regionID;
        searchData.startDate = new Date($scope.year, $scope.month -1, 5);
        DashboardService.getMasterReportByRegion.query({}, searchData).$promise.then(function(result) {
            $scope.outletMasterList = result;
        });

    };

    $scope.outletOnSubmissionChange = function(regionID) {
        var searchData = {};
        searchData.entityID = regionID;
        searchData.startDate = new Date($scope.year, $scope.month -1, 5);
        DashboardService.getScoreByOutlet.query({}, searchData).$promise.then(function(result) {
            $scope.outletSubmissionList = result;
        });
    };

    $scope.bringOtcScoreReport = function(regionID) {
        var searchData = {};
        searchData.entityID = regionID;

        DashboardService.getNpsScoreMonthlyView.query({}, searchData).$promise.then(function(result) {
            $scope.outletScore = result;
        });
    };

    $scope.bringOutletAnalysis = function(regionID){
        var searchData = {};
        searchData.entityID = regionID;
        searchData.startDate = new Date($scope.year, $scope.month -1, 5);
        DashboardService.criticalAnalysisByOutlet.query({}, searchData).$promise.then(function(result) {
            $scope.analysisOutlet = result;
        });
    };

    $scope.bringOutletSummaryAnalysis = function(regionID){
        var searchData = {};
        searchData.entityID = regionID;
        searchData.startDate = new Date($scope.year, $scope.month -1, 5);
        DashboardService.criticalAnalysisByOutlet.query({}, searchData).$promise.then(function(result) {
            $scope.analysisSummaryOutlet = result;
        });
    };

    $scope.getNumberOf = function(criticalText, weaknessList){

        var num = 0;
        angular.forEach(weaknessList, function (weakness, key) {
            if(weakness.criticalArea == criticalText){
                num++;
            }
        });
        return num;
    };

    $scope.getSummaryNumberOf = function (criticalText,outletList){

        var num = 0;
        angular.forEach(outletList, function (outlet, key) {
            angular.forEach(outlet.weaknessList, function (weakness, key) {
                if (weakness.criticalArea == criticalText) {
                    num++;
                }
            });
        });
        return num;
    };


    $scope.init();

});



/**
 * Created by raj on 6/21/2016.
 */

app.controller('InputCompletenessController', function($scope, $rootScope, $state, $stateParams, $http, $timeout, $location, DashboardService) {

    $scope.hasError = false;
    $scope.hasSuccess = false;
    $scope.message = "";
    $scope.subCategory = {};
    $scope.regionList = [];
    $scope.showForm = false;
    $scope.editObj = {};




    $scope.init = function() {
        var searchData = {};
        $scope.reportView = false;
        DashboardService.getAllRegionForInput.query({}, searchData).$promise.then(function(result) {
            $scope.regionInputList = result;
        });

        var date = new Date();
        var m = date.getMonth() + 1;
        var y = date.getFullYear();


        $scope.buildYearSelector(y);
        $scope.monthBuilder(m);
    };

    $scope.bringData = function(){
        var searchData = {};
        searchData.startDate = new Date($scope.year, $scope.month -1, 5);
        DashboardService.getAllRegionForInput.query({}, searchData).$promise.then(function(result) {
            $scope.regionInputList = result;
        });
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

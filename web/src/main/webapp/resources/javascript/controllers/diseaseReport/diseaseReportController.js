app.controller('DiseaseReportController', function($scope, $rootScope, $state, $filter, $http, $timeout, $location, DiseaseReportService, limitToFilter) {




    $scope.init = function(){

    };

    $scope.onSelectDisease = function(item, model, label){

        DiseaseReportService.bringReportDetails.query({},  {diseaseID : item.id}).$promise.then(function(result) {
            $scope.diseaseReport = result;
        });
    };


    $scope.getDisease = function(term) {
        var field = "DISEASE";
        return  DiseaseReportService.getItemForTypeHead.query({}, {data : term, field :field}).$promise.then(function(result) {
            $scope.diagnosisNameData = result.diseaseList;
            return limitToFilter($scope.diagnosisNameData, 10);
        });
    };





    $scope.init();

});

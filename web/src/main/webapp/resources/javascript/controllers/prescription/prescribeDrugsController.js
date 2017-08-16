app.controller('PrescribeDrugsController', function($scope, $http, $modalInstance, limitToFilter, JsonService, drugData, PrescriptionService) {

    $scope.drugTypeList =[];
    $scope.drugNumOfDayList = JsonService.numberList;
    $scope.drugTimesADay = JsonService.timesADay;
    $scope.drugDayTypeList =[];
    $scope.drugsWhenList =[];
    $scope.drugAdviceTypeList =[];
    $scope.drugDoseList =[];

    $scope.drugPeriodicDoseList = [];
    $scope.enteredDrugDoseList = [];
    $scope.addByName = false;
    $scope.doseList = [];


    $scope.drugData = {};
    $scope.drugData.appointmentID = drugData.appointmentID;
    $scope.drugData.periodicList = [];

    var doseDataList = [{value : 1}, {value : 1}, {value : 1}]
    var period = {doseDataList : doseDataList, numOffDay : 7, durationType: 1};
    $scope.drugData.periodicList.push(period);

    $scope.drugData.drugTimeID = 3;
    PrescriptionService.bringDrugType.query({},{}).$promise.then(function(result) {
        $scope.drugTypeList = result;
        $scope.drugData.drugTypeID = $scope.drugTypeList[0].drugTypeID;
    });

    PrescriptionService.bringDrugWhenType.query({},{}).$promise.then(function(result) {
        $scope.drugWhatTypeList = result;
        $scope.drugData.drugWhenID = $scope.drugWhatTypeList[0].drugWhenTypeID;
    });

    PrescriptionService.bringDrugAdviceType.query({},{}).$promise.then(function(result) {
        $scope.drugAdviceTypeList = result;
    });

    PrescriptionService.bringDrugDayType.query({},{}).$promise.then(function(result) {
        $scope.drugDayTypeList = result;
    });

    $scope.doseChanger = function (change, doseDataList){

        angular.forEach(doseDataList, function(data, key) {
            var val = parseFloat(data.value);
            data.value = val + change;

        });

    };

    $scope.timeChanger = function (){

        var doseUnit = null;
        angular.forEach($scope.drugTypeList, function(type, key) {
            if(type.drugTypeID == $scope.drugData.drugTypeID){
                doseUnit = type.unit;
            }

        });

        $scope.drugData.periodicList[0].doseDataList = [];

        for(var index =0; index<$scope.drugData.drugTimeID; index++){
            var temp = {value : doseUnit};
            $scope.drugData.periodicList[0].doseDataList.push(temp);
        }
    };







    $scope.drugNameList = {};

    $scope.cancelDrug = function (){
        $modalInstance.close();
    };

    $scope.save = function () {
        if(validator.validateForm("#validateReq","#lblMsg_modal",null)) {
            delete $scope.drugData.drugName;
            delete $scope.drugData.drugStr;

            var dose = "";
            /*angular.forEach($scope.drugData.periodicList[0].doseDataList, function(data, key) {
                dose = dose + "+" +  parseFloat(data.value);

            });*/

            for(var index = 0; index < $scope.drugData.periodicList[0].doseDataList.length; index++){
                var data = $scope.drugData.periodicList[0].doseDataList[index];
                if(index == 0){
                    dose = parseFloat(data.value);
                }else{
                    dose = dose + "+" +  parseFloat(data.value);
                }
            }
            $scope.drugData.periodicList[0].dose = dose;
            delete $scope.drugData.periodicList[0].doseDataList;
            PrescriptionService.saveDrug.query({},$scope.drugData).$promise.then(function(result) {
                $modalInstance.close();
            });
        }else{
            $scope.error = true;
        }


    };

    $scope.getDrugName = function(term) {
        return  PrescriptionService.getItemForTypeHeadForDrugs.query({}, {data : term, field :$scope.drugData.drugTypeID}).$promise.then(function(result) {
            $scope.addByName = false;
            $scope.drugNameList = result;
            return limitToFilter($scope.drugNameList, 10);
        });
    };

    $scope.onSelectDrugName = function(item, model, label){
        $scope.drugData.drugID = item.drugID;
    };

});

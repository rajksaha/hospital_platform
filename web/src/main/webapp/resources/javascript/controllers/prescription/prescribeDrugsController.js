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




    $scope.drugNameList = {};

    $scope.cancelDrug = function (){
        $modalInstance.close();
    };


    /*$scope.bringPresCribedDrugs = function (){

        if(drugData.drugPrescribeID){

            $scope.drugData = {};
            $scope.drugData.drugName = drugData.drugName;
            $scope.drugData.drugPrescribeID = drugData.id;
            $scope.drugData.preiodicList = drugData.preiodicList;
            $scope.bringdrugsDayTypeList(false, drugData.drugTypeID , drugData.drugTimeID);
            $scope.bringdrugsWhatType(false, drugData.drugWhenID);
            $scope.bringdrugsAdviceType(false, drugData.drugAdviceID);

        }else{

            $scope.drugData.drugName = "";
            $scope.drugData.addMood = true;
            $scope.drugData.delDrug = false;
            $scope.drugData.editName = false;
            $scope.drugData.preiodicList = [];
            $scope.bringdrugsDayTypeList(true, 1 , 3);
            $scope.bringdrugsWhatType(true, null);
            $scope.bringdrugsAdviceType(true, null);
        }

    };

    $scope.bringdrugsDayTypeList = function (addMode, typeID, timeID){

        PrescriptionService.bringDrugDayType.query({},{}).$promise.then(function(result) {
            $scope.drugDayTypeList = result;

            if(addMode){
                var periodicData = {drugDayTypeList : $scope.drugDayTypeList, drugNumOfDayList : $scope.drugNumOfDayList, doseDataList: [] , numOfDay : 7, durationType : 1, dose: '' };
                $scope.drugData.preiodicList.push(periodicData);

                $scope.inItDrugsType(addMode, typeID, timeID, $scope.drugData.preiodicList);
            }else{

                angular.forEach($scope.drugData.preiodicList, function(value, key) {

                    value.drugDayTypeList = $scope.drugDayTypeList;
                    value.drugNumOfDayList = $scope.drugNumOfDayList;
                    value.doseDataList = [];
                });
                $scope.inItDrugsType(addMode, typeID, timeID, $scope.drugData.preiodicList);
            }
        });
    };

    $scope.inItDrugsType = function (addMode, selectedDrugTypeID, selectedTimesADay, preiodicList){

        angular.forEach($scope.drugtimesADay, function(value, key) {
            if(value.code == selectedTimesADay){
                $scope.drugData.drugTimeID = value.code;
            }
        });
        PrescriptionService.bringDrugType.query({},{}).$promise.then(function(result) {
            $scope.drugTypeList = result;

            angular.forEach($scope.drugTypeList, function(value, key) {
                if(value.drugTypeID == selectedDrugTypeID){
                    $scope.drugData.drugTimeID = value.code;
                    $scope.preiodicDoseHanleler(addMode, value.unit, preiodicList, selectedTimesADay);
                }
            });
        });
    };


    $scope.preiodicDoseHanleler = function (addMode, unit, preiodicList, selectedTimesADay){

        if(selectedTimesADay == -1){
            $scope.drugData.preodicValue = preiodicList.length;
            selectedTimesADay = 3;
        }

        angular.forEach(preiodicList, function(preiodicData, key) {
            $scope.doseHandeler(unit, preiodicData.doseDataList, selectedTimesADay, preiodicData.dose);

            angular.forEach(preiodicData.drugDayTypeList, function(value, key) {
                if(value.id == preiodicData.durationType){
                    preiodicData.durationDayType = value;
                }
            });

            angular.forEach(preiodicData.drugNumOfDayList, function(data, key) {
                if(data.value == preiodicData.numOfDay){
                    preiodicData.dataNumOFDay = data;
                }
            });

        });
    };

    $scope.doseHandeler = function (unit, doseDataList, selectedTimesADay, dose){

        var val = parseFloat(unit);
        if(dose != ''){
            $scope.enteredDrugDoseList = dose.split(' - ');
        }


        var sameAs = selectedTimesADay;
        if(sameAs == -2){
            selectedTimesADay = 1;
        }

        for(var i = 0; i< selectedTimesADay; i++){
            if($scope.enteredDrugDoseList.length > 0 && sameAs != -2){
                var data = {"value" : $scope.enteredDrugDoseList[i]};
                unit = $scope.enteredDrugDoseList[i];
            }else if($scope.enteredDrugDoseList.length == 0 && sameAs != -2){
                var data = {"value" : val};
                unit = val;
            }else if($scope.enteredDrugDoseList.length == 0 && sameAs == -2){
                var data = {"value" : '', "isSameAs" : true};
                unit = val;
            }else if($scope.enteredDrugDoseList.length > 0 && sameAs == -2){
                var data = {"value" : $scope.enteredDrugDoseList[i], "isSameAs" : true};
                unit = val;
            }

            doseDataList.push(data);
        }
        $scope.enteredDrugDoseList = [];
    };

    $scope.doseChanger = function (change, doseDataList){

        angular.forEach(doseDataList, function(data, key) {
            var val = parseFloat(data.value);
            data.value = val + change;

        });

    };

    $scope.timeChanger = function (addMode, drugType, selectedTimesADay, preiod){

        $scope.drugData.preiodicList = [];

        if(selectedTimesADay == -1){

            for(var i = 0; i < preiod; i++){

                var periodicData = {drugDayTypeList : $scope.drugDayTypeList, drugNumOfDayList : $scope.drugNumOfDayList, doseDataList: [] , numOfDay : 7, durationType : 1, dose: '' };
                $scope.drugData.preiodicList.push(periodicData);
            }

            $scope.drugData.preodicValue = preiod;

        }else{
            var periodicData = {drugDayTypeList : $scope.drugDayTypeList, drugNumOfDayList : $scope.drugNumOfDayList, doseDataList: [] , numOfDay : 7, durationType : 1,  dose: ''};
            $scope.drugData.preiodicList.push(periodicData);
        }


        $scope.inItDrugsType(addMode,$scope.drugData.drugTimeID, selectedTimesADay, $scope.drugData.preiodicList);

    };


    $scope.doseMaker = function (unit, numOfTime, change){

        var drugDoseList = [];

        var val = parseFloat(unit) + change;
        var data = {"value" : val};
        for(var i = 0; i< numOfTime; i++){
            if($scope.enteredDrugDoseList.length > 0){
                var data = {"value" : $scope.enteredDrugDoseList[i]};
                unit = $scope.enteredDrugDoseList[i];
            }else{
                var data = {"value" : val};
                unit = val;
            }

            drugDoseList.push(data);
        }
        $scope.enteredDrugDoseList = [];


        $scope.bringdrugsDayType(true , null, drugDoseList);
    };




    $scope.bringdrugsDayType = function (addMood, selectedDayTypeID, doseDataList){

        PrescriptionService.bringDrugDayType.query({appointmentID : $scope.appointmentID}).$promise.then(function(result) {
            $scope.drugDayTypeList = result;
            if(addMood){
                var drugDoseData = {drugDayTypeList : $scope.drugDayTypeList, drugNumOfDayList : $scope.drugNumOfDayList, drugDoseList: doseDataList};
                $scope.drugData.doseList.push(drugDoseData);
            }else{
                angular.forEach($scope.drugDayTypeList, function(value, key) {
                    if(value.id == selectedDayTypeID){
                        $scope.drugData.dayType = value;
                    }
                });
            }
        });

    };

    $scope.bringdrugsWhatType = function (addMood, selectedWhatTypeID){

        var dataString = "query=2";

        PrescriptionService.bringDrugWhenType.query({appointmentID : $scope.appointmentID}).$promise.then(function(result) {
            $scope.drugWhatTypeList= result;
            if(addMood){
                $scope.drugData.whatType = $scope.drugWhatTypeList[0];
            }else{
                angular.forEach($scope.drugWhatTypeList, function(value, key) {
                    if(value.id == selectedWhatTypeID){
                        $scope.drugData.whatType = value;
                    }
                });
            }
        });

    };

    $scope.bringdrugsAdviceType = function (addMood, selectedAdviceTypeID){


        PrescriptionService.bringDrugAdviceType.query({appointmentID : $scope.appointmentID}).$promise.then(function(result) {
            $scope.drugAdviceTypeList = result;
            if(addMood){
                $scope.drugData.adviceType = $scope.drugAdviceTypeList[0];
            }else{
                angular.forEach($scope.drugAdviceTypeList, function(value, key) {
                    if(value.drugAdviceID == selectedAdviceTypeID){
                        $scope.drugData.adviceType = value;
                    }
                });
            }
        });
    };

    $scope.saveDrug = function(isAnother) {

        if($scope.drugData.drugName) {
            $scope.prepareDrugSaveData(isAnother);
        }else{
            $scope.errorMessage = "Please Select Drug Name";
            $scope.error = true;
            $("#drugName").addClass('has-error');
        }


    };

    $scope.prepareDrugSaveData = function(isAnother){


        var drugType = $scope.drugData.drugType.drugTypeID;
        var drugName =  $scope.drugData.drugName;

        var drugTime = $scope.drugData.timesADay.code;

        var doseUnit = "";
        if($scope.drugData.optionalInitial != undefined && $scope.drugData.optionalInitial){
            doseUnit = $scope.drugData.drugType.optionalUnitInitial;
        }else{
            doseUnit = $scope.drugData.drugType.unitInitial;
        }

        var drugWhen = $scope.drugData.whatType.drugWhenTypeID;

        var drugAdvice = $scope.drugData.adviceType.drugAdviceID;


        var query = 6;
        var drugPrescribeID = 0;
        if(!$scope.drugData.addMood){
            query = 5;
            drugPrescribeID = $scope.drugData.drugPrescriptionID;
        }

        $scope.drugData.preiodicList

        if($scope.drugData.drugStr == undefined){
            $scope.drugData.drugStr = '';
        }
        var dataString = 'drugType='+ drugType +'&drugName='+ drugName +'&drugStr='+ $scope.drugData.drugStr + '&drugTime='+ drugTime +'&doseUnit='+ doseUnit + '&drugWhen='+ drugWhen +'&drugAdvice='+ drugAdvice+ '&drugPrescribeID='+ drugPrescribeID +'&query=' + query;

        $http({
            method: 'POST',
            url: "phpServices/drugs/drugsService.php",
            data: dataString,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (result) {
            if(drugPrescribeID == 0){
                drugPrescribeID = result;
            }
            angular.forEach($scope.drugData.preiodicList, function(preiodicData, key) {

                var drugDose = "";

                for(var i = 0;i < preiodicData.doseDataList.length; i++){
                    if(i == 0){
                        drugDose = preiodicData.doseDataList[i].value;
                    }else{
                        drugDose = drugDose + " - "+ preiodicData.doseDataList[i].value;
                    }
                }

                var durationType = preiodicData.durationDayType.id;

                var numOfDay = null;

                if(durationType < 4){
                    numOfDay = preiodicData.dataNumOFDay.value;
                }

                var dataString = "query=12" + '&drugPrescribeID=' + drugPrescribeID + '&dose=' + drugDose + '&numOfDay=' + numOfDay + '&durationType=' + durationType;

                $http({
                    method: 'POST',
                    url: "phpServices/drugs/drugsService.php",
                    data: dataString,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function (result) {


                });

            });

            if(isAnother){
                $scope.bringPresCribedDrugs();
            }else{
                $modalInstance.close();
            }


        });



    };*/



    /*$scope.deleteDrugFromDB = function(){

        var dataString = "query=10" + '&drugID=' + $scope.drugData.drugID;

        $http({
            method: 'POST',
            url: "phpServices/drugs/drugsService.php",
            data: dataString,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (result) {
            $scope.bringPresCribedDrugs();

        });

    };*/

    /*$scope.editDrugName = function(){


        var dataString = "query=11" + '&drugID=' + $scope.drugData.drugID + '&drugName=' + $scope.drugData.drugName;

        $http({
            method: 'POST',
            url: "phpServices/drugs/drugsService.php",
            data: dataString,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (result) {
            if(drugData.id){
                $modalInstance.close();
            }else{
                $scope.bringPresCribedDrugs();
            }


        });
    };*/







    $scope.getDrugName = function(term) {

        return  PrescriptionService.getItemForTypeHeadForDrugs.query({}, {data : term, field :$scope.drugData.drugTypeID}).$promise.then(function(result) {
            $scope.addByName = false;
            $scope.drugNameList = result;
            return limitToFilter($scope.drugNameList, 10);
        });

        // return $scope.products;
    };

    $scope.onSelectDrugName = function(item, model, label){
        $scope.drugData.drugID = item.drugID;
        //bring settings

        /*var dataString = "query=13" + '&drugID=' + $scope.drugData.drugID;

        $http({
            method: 'POST',
            url: "phpServices/drugs/drugsService.php",
            data: dataString,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (result) {
            if(result.length == undefined){
                $scope.doctorDrugData = result;
                $scope.drugData.preiodicList = $scope.doctorDrugData.preiodicList;
                $scope.bringdrugsDayTypeList(false, item.typeID , $scope.doctorDrugData.drugTimeID);
                $scope.bringdrugsWhatType(false, $scope.doctorDrugData.drugWhenID);
                $scope.bringdrugsAdviceType(false, $scope.doctorDrugData.drugAdviceID);
            }else{
                $scope.drugData.delDrug = false;
                $scope.drugData.preiodicList = [];
                $scope.bringdrugsDayTypeList(true, 1 , 3);
                $scope.bringdrugsWhatType(true, null);
                $scope.bringdrugsAdviceType(true, null);
            }
        });*/

        $scope.drugData.drugName = item.drugName;
        $scope.drugData.drugStr = item.strength;
        $scope.drugData.delDrug = true;
        $scope.drugData.editName = true;
    };


    //$scope.bringPresCribedDrugs();

    /*$scope.saveToDoctorDrugSetting = function(){


        var drugType = $scope.drugData.drugType.id;
        var drugName =  $scope.drugData.drugName;

        var drugTime = $scope.drugData.timesADay.code;

        var doseUnit = "";
        if($scope.drugData.optionalInitial != undefined && $scope.drugData.optionalInitial){
            doseUnit = $scope.drugData.drugType.optionalUnitInitial;
        }else{
            doseUnit = $scope.drugData.drugType.unitInitial;
        }

        var drugWhen = $scope.drugData.whatType.id;

        var drugAdvice = $scope.drugData.adviceType.drugAdviceID;


        var query = 14;

        if($scope.drugData.drugStr == undefined){
            $scope.drugData.drugStr = '';
        }

        var dataString = 'drugType='+ drugType +'&drugName='+ drugName +'&drugStr='+ $scope.drugData.drugStr + '&drugTime='+ drugTime +'&doseUnit='+ doseUnit + '&drugWhen='+ drugWhen +'&drugAdvice='+ drugAdvice +'&query=' + query;

        $http({
            method: 'POST',
            url: "phpServices/drugs/drugsService.php",
            data: dataString,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (result) {
            doctorDrugID = result;
            angular.forEach($scope.drugData.preiodicList, function(preiodicData, key) {

                var drugDose = "";

                for(var i = 0;i < preiodicData.doseDataList.length; i++){
                    if(i == 0){
                        drugDose = preiodicData.doseDataList[i].value;
                    }else{
                        drugDose = drugDose + " - "+ preiodicData.doseDataList[i].value;
                    }
                }

                var durationType = preiodicData.durationDayType.id;

                var numOfDay = null;

                if(durationType < 4){
                    numOfDay = preiodicData.dataNumOFDay.value;
                }

                var dataString = "query=15" + '&doctorDrugID=' + doctorDrugID + '&dose=' + drugDose + '&numOfDay=' + numOfDay + '&durationType=' + durationType;

                $http({
                    method: 'POST',
                    url: "phpServices/drugs/drugsService.php",
                    data: dataString,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function (result) {


                });

            });
        });
    }*/


});

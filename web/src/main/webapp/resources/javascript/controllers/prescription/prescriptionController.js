app.controller('PrescriptionController', function($scope, $http, $state, $modal, $rootScope, limitToFilter, $location, $filter, $window, JsonService, $upload, PrescriptionService, AppointmentService, $stateParams) {

    $(".echo_side_fixed_bar").addClass('collaspe_menu_side');

    $("#detailedDiv").css("min-height", $(window).height() - 120);
    $("#theDiv").css("min-height", $(window).height() - 200);

    $scope.menuDataList = [];
	$scope.patientData = {};
	$scope.doctorData = {};
	$scope.patientTypeList =[];
	$scope.appointmentData ={};
	$scope.patientStateList = [];
	
	$scope.refferedAdderData = {};
	
	$scope.prescribedDrugList = [];
	$scope.numberOfPrescribedDrugs = 0;
	
	$scope.prescribedInvData = [];
	$scope.numberOfInvAdded = 0;
	$scope.menuState = true;
	
	$scope.prescribedComplainData = [];
	
	$scope.prescribedVitalData = [];
	
	$scope.prescribedAdviceData = [];

	$scope.dayList = JsonService.numberList;
    $scope.dayTypeList = JsonService.drugDayTypeList;
    $scope.drugNumOfDayList = JsonService.numberList;

    $scope.init = function (){
        $scope.bringAppointmentInfo();
    };
	


    $scope.bringAppointmentInfo = function (){
        PrescriptionService.bringAppointment.query({appointmentID : $scope.appointmentID}).$promise.then(function(result) {
            $scope.appointmentData = result;
            $scope.bringDetailedInfo();
        });
    };

    $scope.bringDetailedInfo = function (){
        $scope.bringPrescribedDiagnosis($scope.appointmentData.appointmentID);
        $scope.bringPrescribedComplain($scope.appointmentData.appointmentID);
        $scope.bringPrescribedDrugs($scope.appointmentData.appointmentID);
        $scope.bringPrescribedInv($scope.appointmentData.appointmentID);
        //$scope.bringPrescribedAdvice($scope.appointmentData.appointmentID);
        //$scope.bringPrescribedVital($scope.appointmentData.appointmentID);
        //$scope.bringPrescribedComplain($scope.appointmentData.appointmentID);
        //$scope.bringPrescribedFamilyHistory($scope.appointmentData.appointmentID);
        //$scope.bringPrescribedPastHistory($scope.appointmentData.appointmentID);
        //$scope.bringPrescribedHistory($scope.appointmentData.appointmentID, $scope.appointmentData.patientID);
        //$scope.bringPrescribedDrugHistory($scope.appointmentData.appointmentID);
        //$scope.bringPrescribedRefferedDoctor($scope.appointmentData.appointmentID);
        //$scope.bringPrescribedComment($scope.appointmentData.appointmentID);
        $scope.bringPrescribedNextVisit($scope.appointmentData.appointmentID);
    };

    $scope.bringPrescribedDiagnosis = function (appointmentID){
        PrescriptionService.bringDiagnosis.query({appointmentID : $scope.appointmentID}).$promise.then(function(result) {
            $scope.diagnosisData = result;
        });
    };

    $scope.diagnosisData = {};
    $scope.performDiagnosis = function (diagnosisData) {
        diagnosisData.appointmentID = $scope.appointmentID;
        var modalInstance = $modal.open({
            templateUrl: 'resources/javascript/templates/prescription/diagnosis/diagnosis.html',
            windowClass: 'fade in',

            controller: 'PrescriptionController.PrescribeDiagnosisController',
            resolve: {
                diagnosisData: function () {
                    return diagnosisData;
                }
            },
            backdrop: 'static'
        });
        modalInstance.result.then(function(result) {
            $scope.bringPrescribedDiagnosis($scope.appointmentData.appointmentID);
        });
    };

    $scope.performInv = function () {

        var invData = $scope.appointmentData.appointmentID
        var modalInstance = $modal.open({
            templateUrl: 'resources/javascript/templates/prescription/inv/invModal.html',
            windowClass: 'fade in',

            controller: 'PrescribeInvController',
            resolve: {
                invData: function () {
                    return invData;
                }
            },
            backdrop: 'static'
        });
        modalInstance.result.then(function(result) {
            $scope.bringPrescribedInv($scope.appointmentData.appointmentID);
        });
    };

    //Compalin

    $scope.getComplainString = function (complain) {

        var data = complain.symptomName;

        if(complain.durationType < 5){
            data = data + " " + complain.durationNum + " " + JsonService.drugDayTypeList[complain.durationType].name
        }
        if(complain.durationType == 7){
            data = data + " " + JsonService.drugDayTypeList[complain.durationType].name
        }

        return data;
    };

    $scope.bringPrescribedComplain = function(appointmentID){
        PrescriptionService.bringComplain.query({appointmentID : $scope.appointmentID}).$promise.then(function(result) {
            $scope.prescribedComplainList = result;
        });
    };

    $scope.addCCToPrescription = function(){
        var complainData = {};
        complainData.appointmentID = $scope.appointmentID;
        var modalInstance = $modal.open({
            templateUrl: 'resources/javascript/templates/prescription/complain/complain.html',
            windowClass: 'fade in',

            controller: 'PrescriptionController.PrescribeComplainController',
            resolve: {
                complainData: function () {
                    return complainData;
                }
            },
            backdrop: 'static'
        });
        modalInstance.result.then(function(result) {
            $scope.bringPrescribedComplain($scope.appointmentData.appointmentID);
        });
    };

    $scope.editFromPrescription = function (complainData){


        var modalInstance = $modal.open({
            templateUrl: 'resources/javascript/templates/complain/complain.html',
            windowClass: 'fade in',

            controller: 'PrescriptionController.PrescribeComplainController',
            resolve: {
                complainData: function () {
                    return complainData;
                }
            },
            backdrop: 'static'
        });
        modalInstance.result.then(function(result) {
            $scope.bringPrescribedComplain($scope.appointmentData.appointmentID);
        });
    };

    $scope.fixNextVisit = function (){

        $scope.nextVisitData.needSaveButton = false;
        if($scope.nextVisitData.nextVisitType == 1) {
            $scope.nextVisitData.dateStr = $filter('date')($scope.nextVisitData.date, "MMddyyyy");
        }
        $scope.nextVisitData.appointmentID = $scope.appointmentID;
        delete $scope.nextVisitData.needSaveButton;
        PrescriptionService.saveNextVisit.query({}, $scope.nextVisitData).$promise.then(function(result) {
            $scope.prescribedComplainList = result;
        });
    };

    $scope.bringPrescribedNextVisit = function (appointmentID){
        PrescriptionService.bringNextVisit.query({appointmentID : appointmentID}).$promise.then(function(result) {
            $scope.nextVisitData = result;
        });
    };

    $scope.savePatientInfo = function(patientData){

        if(validator.validateForm("#validateReq","#lblMsg",null)) {
            //var dataString = 'name='+ patientData.name +'&age='+ patientData.age +'&address='+ patientData.address + '&sex=' + patientData.sex +'&phone='+ patientData.phone+ '&id='+ patientData.patientID +'&query=16';
            $scope.patientInfoEdit = false;

        }else{
            alert("Please Select all required fields properly");
        }

    };

    $scope.addDrugsToPrescription = function(){

        var drugData = {};
        drugData.appointmentID = $scope.appointmentData.appointmentID;
        var modalInstance = $modal.open({
            templateUrl: 'resources/javascript/templates/prescription/drug/drugModal.html',
            windowClass: 'fade in',

            controller: 'PrescribeDrugsController',
            resolve: {
                drugData: function () {
                    return drugData;
                }
            },
            backdrop: 'static'
        });
        modalInstance.result.then(function(result) {
            $scope.bringPrescribedDrugs($scope.appointmentData.appointmentID);
        });

    };

    $scope.bringPrescribedInv = function (appointmentID) {

        PrescriptionService.bringPrescribedInv.query({appointmentID : appointmentID}).$promise.then(function(result) {
            $scope.prescribedInvList = result;
        });
    };

    $scope.bringPrescribedDrugs = function (appointmentID){

        var dataString = "query=0" + '&appointmentID=' + appointmentID;

        PrescriptionService.bringPrescribedDrugs.query({appointmentID : appointmentID}).$promise.then(function(result) {
            $scope.prescribedDrugList = result;
        });
    };



    if($stateParams.appointmentID == undefined || $stateParams.appointmentID == null){
        $state.go('root.appointment');
    }else{
        $scope.appointmentID = $stateParams.appointmentID;
        $scope.init();
    }
	
});

app.controller('PrescriptionController.PrescribeDiagnosisController', function($scope, $http, $modalInstance, limitToFilter, $filter, diagnosisData, PrescriptionService) {

    $scope.diagnosisData = {};

    if(diagnosisData && diagnosisData.diagnosisID){
        $scope.diagnosisData = diagnosisData;
    }else{
        $scope.diagnosisData = {};
        $scope.diagnosisData.appointmentID = diagnosisData.appointmentID;
    }

    $scope.save = function(){
        if(validator.validateForm("#validateReq","#lblMsg_modal",null)) {
            PrescriptionService.saveDiagnosis.query({},  $scope.diagnosisData).$promise.then(function(result) {
                $modalInstance.close();
            });
        }else{
            $scope.error = true;
        }
    };

    $scope.cancel = function(){
        $modalInstance.dismiss('cancel');
    };

    $scope.onSelectDisease = function(item, model, label){
        $scope.diagnosisData.diseaseName = item.name;
    };


    $scope.getDisease = function(term) {
        var field = "DISEASE";
        return  PrescriptionService.getItemForTypeHead.query({}, {data : term, field :field}).$promise.then(function(result) {
            $scope.diagnosisNameData = result.diseaseList;
            return limitToFilter($scope.diagnosisNameData, 10);
        });
    };


});

app.controller('PrescriptionController.PrescribeComplainController', function($scope, $http, $modalInstance, JsonService, complainData, limitToFilter, PrescriptionService) {

    $scope.symptom = {};
    $scope.complainList = [];
    $scope.drugNumOfDayList = JsonService.numberList;
    $scope.drugDayTypeList = JsonService.drugDayTypeList;


    $scope.init = function(){
        if(complainData.complainID){
            $scope.populate(false, null);
        }else{
            $scope.populate(true, null);
        }

    };

    $scope.populate = function (addMood, selectedDayTypeID){

        if(addMood){
            var data = {"title": "Symptom 1","numOfDay" : $scope.drugNumOfDayList[1], "dayType" : $scope.drugDayTypeList[0].code,"note" : "","id" : null};
            $scope.complainList.push(data);
            data = {"title": "Symptom 2","numOfDay" : $scope.drugNumOfDayList[1], "dayType" : $scope.drugDayTypeList[0].code,"note" :"","id" : null};
            $scope.complainList.push(data);
            data = {"title": "Symptom 3","numOfDay" : $scope.drugNumOfDayList[1], "dayType" : $scope.drugDayTypeList[0].code,"note" :"","id" : null};
            $scope.complainList.push(data);
            data = {"title": "Symptom 4","numOfDay" : $scope.drugNumOfDayList[1], "dayType" : $scope.drugDayTypeList[0].code,"note" :"","id" : null};
            $scope.complainList.push(data);

        }else{

            $scope.complainData = {"title": "Symptom"};

            angular.forEach($scope.drugNumOfDayList, function(data, key) {
                if(data.value == complainData.durationNum){
                    $scope.complainData.numOfDay = data.value;
                }
            });

            angular.forEach($scope.drugDayTypeList, function(value, key) {
                if(value.code == complainData.durationType){
                    $scope.complainData.dayType = value.code;
                }
            });
            $scope.complainData.complainID = complainData.complainID;

            $scope.complainData.name = complainData.symptomName;

            $scope.complainList.push($scope.complainData);
        }

    };

    $scope.saveGroupOfComplain = function(){

        var entryFound = false;
        var int = 0;
        var complainList = [];
        for (int; int < $scope.complainList.length; int++) {
            var name = $scope.complainList[int].name;
            var noOfDay = $scope.complainList[int].numOfDay.value;
            var dayType = $scope.complainList[int].dayType;
            var note = $scope.complainList[int].note;
            var id = $scope.complainList[int].id;
            if(name){
                entryFound = true;
                if(dayType > 4){
                    noOfDay = 0;
                }

                var dataString = {'appointmentID' : complainData.appointmentID,'symptomName': name , 'durationNum' : noOfDay ,'durationType' :  dayType, 'detail' : note, 'complainID' : id};
                complainList.push(dataString);

            }

        }


        if(!entryFound){
            if($scope.complainList.length == 1){
                $scope.errorMessage = "Please Select Symptom Name";
                $scope.succcess = false;
                $scope.error = true;
            }else{
                $scope.errorMessage = "Please Select At-least One Symptom";
                $scope.succcess = false;
                $scope.error = true;
            }

        }else{
            var searchData = {};
            searchData.complainList = complainList;
            PrescriptionService.saveComplain.query({},  searchData).$promise.then(function(result) {
                $modalInstance.close();
            });
        }
    };


    $scope.cancelGroupOfComplain = function(){
        $modalInstance.dismiss('cancel');
    };

    $scope.onSelectSymptoms = function(item, model, label){
        //$scope.diagnosisData.diseaseName = item.name;
    };

    $scope.getSymptoms = function(term) {
        var field = "SYMPTOM";
        return  PrescriptionService.getItemForTypeHead.query({}, {data : term, field :field}).$promise.then(function(result) {
            $scope.symptoms = result.symptomList;
            return limitToFilter($scope.symptoms, 10);
        });
    };

    $scope.init();
});
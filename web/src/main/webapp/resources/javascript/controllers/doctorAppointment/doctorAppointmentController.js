app.controller('DoctorAppointmentController', function($scope, $rootScope, $state, $http, $timeout, $location, AppointmentService, $modal, limitToFilter, $filter) {

    $scope.hasError = false;
    $scope.hasSuccess = false;
    $scope.message = "";
    $scope.category = {};
    $scope.categoryList = [];
    $scope.showForm = false;
    $scope.editObj = {};


    //reloading the grid
    $scope.reloadList = false;
    $scope.refreshList = function () {
        $scope.reloadList = !$scope.reloadList;
        $scope.dataSourceConfig.params.refresh = $scope.reloadList;
    };
    var currentDate = new Date();

    $scope.searchParam = {};
    $scope.searchParam.appointmentDate = currentDate;
    $scope.search = function() {

        $scope.searchParam.appointmentStr = $filter('date')($scope.searchParam.appointmentDate, "MMddyyyy");
        $scope.dataSourceConfig.params = angular.copy($scope.searchParam);
    };

    // column definition
    $scope.columnDefinition = [
        {columnHeaderDisplayName: 'Doctor Name', displayProperty: 'doctorFirstName', sortKey: 'doctorFirstName'},
        {columnHeaderDisplayName: 'Patient Name', displayProperty : 'patientFirstName', sortKey: 'patientFirstName'},
        {columnHeaderDisplayName: 'Time',  displayProperty : 'appointmentTime', sortKey: 'appointmentTime'},
        {columnHeaderDisplayName: 'Patient Type', displayProperty : 'patientTypeToDoctor' , sortKey: 'patientTypeToDoctor'},
        {columnHeaderDisplayName: 'Appointment Type', template: '<strong>{{item.appointmentType  == 1 ? "Counseling" : "Report"}}</strong>' , sortKey: 'appointmentType'},
        {columnHeaderDisplayName: 'Action', templateUrl: 'action_template', width: '5em'}
    ];

    //datasource configuration
    $scope.dataSourceConfig = {
        url: 'rest/appointment/getByParam',
        method: "GET",
        params: {userType : 1},
        paginationConfig: {
            response: {
                totalItems: 'count',
                itemsLocation: 'list'
            }
        }
    };

    $scope.add = function () {

        var addAppointAdderData = {};
        addAppointAdderData.doctorID = $scope.userData.userID;

        var modalInstance = $modal.open({
            templateUrl: 'resources/javascript/templates/appointment/addNewPatient.html',
            windowClass: 'fade in',
            controller: 'AppointmentController.AddNewPatientController',
            resolve: {
                modalConfig: function () {
                    return addAppointAdderData;
                }
            },
            backdrop: 'static'
        });
        modalInstance.result.then(function(result) {
            $scope.refreshList();
            $scope.showSuccessMessage("Appointment added successfully");
        });
    };

    $scope.addAppFollowUP  = function (){

        var appointmentData = {};
        var currentDate = new Date();
        appointmentData.dateStr = $filter('date')(currentDate, "MMddyyyy");
        appointmentData.patientID = $scope.addAppointMentData.patientID;


        AppointmentService.createFollowUpAppointment.query({}, appointmentData).$promise.then(function(result) {
            $scope.addByCode = false;
            $scope.addByName = false;
            $scope.addByID = false;
            $scope.patientCode = "";
            $scope.patientName = "";
            $scope.patientPhone = "";
            $scope.bringAppointment();
        });
    };


    $scope.consult = function (item) {
        $state.go('root.prescription', {appointmentID : item.appointmentID});
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

    $scope.hideMessage = function(){
        $scope.hasError = false;
        $scope.hasSuccess = false;
    };

    $scope.edit = function(category){
        $scope.category = {};
        angular.copy(category, $scope.editObj);
        angular.copy(category, $scope.category);
        $scope.hideMessage();
        $scope.showForm = true;
    };


    $scope.reset = function(){
        angular.copy($scope.editObj, $scope.category);
        $scope.hideMessage();
        validator.hideError("#validationRequired");
    };


    $scope.cancel = function(){
        $scope.reset();
        $scope.showForm = false;
    };

    $scope.backToList = function() {
        $scope.cancel();
    };

});

app.controller('AppointmentController.AddNewPatientController', function($scope, $modalInstance, modalConfig, $http, AppointmentService, $filter, limitToFilter) {

    $scope.hstep = 1;
    $scope.mstep = 1;

    $scope.error = false;
    $scope.errorMessage = "";

    $scope.appointmentData = {};
    $scope.appointmentData.appointmentTime = new Date();

    $scope.getPatientList = function(userType, term) {
        return  AppointmentService.getItemForTypeHead.query({}, {userType : userType, field :term}).$promise.then(function(result) {
            $scope.patients = result;
            return limitToFilter($scope.patients, 10);
        });

    };

    $scope.onSelectItem = function(item, model, label , userType){
        if(userType == 1){
            $scope.appointmentData.doctorID = item.userID;
        }else{
            $scope.appointmentData.patientID = item.userID;
        }
    };

    $scope.createNewPatient = function (){

        if(validator.validateForm("#validateReq","#lblMsg_modal",null)) {
            $scope.appointmentData.dateStr = $filter('date')($scope.appointmentData.appointmentDate, "MMddyyyy");
            $scope.appointmentData.timeStr = $filter('date')($scope.appointmentData.appointmentTime, "HHmmss");
            delete $scope.appointmentData.appointmentTime;
            AppointmentService.createAppointment.query({}, $scope.appointmentData).$promise.then(function(result) {
                $modalInstance.close(result);
            });
        }else{
            $scope.error = true;
        }


    };

    $scope.cancelNewPatient = function (){
        $modalInstance.dismiss('cancel');
    };


});
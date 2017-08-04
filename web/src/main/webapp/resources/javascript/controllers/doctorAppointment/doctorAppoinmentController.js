app.controller('DoctorAppointmentController', function($scope, $http, $modal, $rootScope, limitToFilter, $location, $filter, AppointmentService, $state) {
	
	$scope.numberOfAppointment = 0;
 	$scope.limit = 10;
 	$scope.addMoreToLimit = 10;
 	$scope.appointmentList = [];
 	$scope.doctorData = {};
 	$scope.followUpSearch = false;
 	$scope.patientName = "";
 	$scope.addAppointMentData = {};
 	
 	
 	
    $scope.bringAppointment = function (){
    	
    	$scope.followUpSearch = false;
    	$scope.patientName = "";
    	$scope.addByName = false;

        var currentDate = new Date();

        var searchData = {};
        searchData.startDateStr = $filter('date')(currentDate, "MMddyyyy");
        AppointmentService.bringAppointment.query({}, searchData).$promise.then(function(result) {
            $scope.appointmentList = result;
            $scope.numberOfAppointment = $scope.appointmentList.length;
        });
    };
    
    $scope.addNewAppointment = function () {
    	
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
        	$scope.bringAppointment();
         });
    };
    
    $scope.showHelp = function(){    	
    	$scope.modalInstance = $modal.open({
			templateUrl: 'javascript/templates/header/helpMenuPopup.html',
            controller: 'appointmentController.InformationModalController',
            size: 'sm',
            resolve: {
            	modalConfig: function () {
            		var data = {};
            		data.title = "Help Desk";
                    return data;
                }
            }
		});
    };

    
    $scope.letsPrescribe = function (appointMentData){
        $state.go('root.prescription', {'appointmentID' : appointMentData.appointmentID});
    };
    
    $scope.getPatients = function(term) {
        
        var  dataString='data='+  term +'&query='+5;
        
        return $http({
            method: 'POST',
            url: "phpServices/appointment/appointmentHelper.php",
            data: dataString,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function(result) {
        	$scope.patients = result.data;
        	return limitToFilter($scope.patients, 10);
        });

        
       // return $scope.products;
      };
      
      $scope.onSelectNamePatient = function(item, model, label){
          $scope.addAppointMentData.patientID = item.userID;
    	  $scope.addByName = true;
      };
      $scope.onSelectPatientPhone = function(item, model, label){
          $scope.addAppointMentData.patientID = item.userID;
    	  $scope.addByPhone = true;
      };
      
      $scope.onSelectPatientCode = function(item, model, label){
    	  $scope.addAppointMentData.patientID = item.userID;
    	  $scope.addByID = true;
      };

    $scope.getPatients = function(term, field) {
        return  AppointmentService.getItemForTypeHead.query({}, {data : term, field :field}).$promise.then(function(result) {
            $scope.patients = result;
            return limitToFilter($scope.patients, 10);
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
     
     $scope.removeFromAppointment = function(appointmentID){
    	 
    	 var  dataString='appointmentID='+  appointmentID +'&query='+9;
         
    	 $http({
             method: 'POST',
             url: "phpServices/appointment/appointmentHelper.php",
             data: dataString,
             headers: {'Content-Type': 'application/x-www-form-urlencoded'}
         }).success(function (result) {
        	 $scope.bringAppointment();
         });
     };
     
     $scope.removeFromAppointmentList = function(appointmentID){
    	 
    	 var  dataString='appointmentID='+  appointmentID +'&query='+10;
         
    	 $http({
             method: 'POST',
             url: "phpServices/appointment/appointmentHelper.php",
             data: dataString,
             headers: {'Content-Type': 'application/x-www-form-urlencoded'}
         }).success(function (result) {
        	 $scope.bringAppointment();
         });
     };
    

	
	(function(){
    	$scope.bringAppointment();
    })()

	
});

app.controller('AppointmentController.InformationModalController', function($scope, $modalInstance) {
	
	$scope.title = "";
	$scope.message = "";
	
	$scope.onOkClicked = function() {
		$modalInstance.dismiss('cancel');
	};
	
	(function() {
		
		$scope.title = "Information"
		
		//$scope.message = modalConfig.message;
		
	})();
	
});

app.controller('AppointmentController.AddNewPatientController', function($scope, $modalInstance, modalConfig, $http, AppointmentService, $filter) {
	
	$scope.patientProfileData = {};
	$scope.error = false;
	$scope.errorMessage = "";
	$scope.patientProfileData.sex = "MALE";
	$scope.patientProfileData.phone = "";
	$scope.patientProfileData.address = "";

	$scope.appointmentData = {};
    $scope.appointmentData.doctorID = modalConfig.doctorID;
    $scope.appointmentData.patientProfileData = $scope.patientProfileData;
	
	$scope.createNewPatient = function (){
		
		if(validator.validateForm("#validateReq","#lblMsg_modal",null)) {
            var currentDate = new Date();
            $scope.appointmentData.dateStr = $filter('date')(currentDate, "MMddyyyy");
            AppointmentService.createAppointment.query({}, $scope.appointmentData).$promise.then(function(result) {
                $modalInstance.close(result);
            });
		}else{
			$scope.error = true;
		}
		

    }
	
	$scope.cancelNewPatient = function (){
		$modalInstance.dismiss('cancel');
	};
	
	
});
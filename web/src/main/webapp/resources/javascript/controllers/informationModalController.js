app.controller('InformationModalController', function($scope, $modalInstance, $timeout, modalConfig) {
	
	$scope.modalData = modalConfig;

	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};

	$scope.save = function() {
		$modalInstance.close(true);
	};

	$scope.action = function(data) {
		$modalInstance.close(data);
	};
	

});
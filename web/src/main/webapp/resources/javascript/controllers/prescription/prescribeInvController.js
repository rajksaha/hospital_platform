app.controller('PrescribeInvController', function($scope, $http, $modalInstance, limitToFilter, $filter, invData, PrescriptionService) {

    $scope.infoData = {};
    $scope.infoData.appointmentID = invData;

    $scope.save = function(){
        if(validator.validateForm("#validateReq","#lblMsg_modal",null)) {
            PrescriptionService.saveInfo.query({},  $scope.infoData).$promise.then(function(result) {
                $modalInstance.close();
            });
        }else{
            $scope.error = true;
        }
    };

    $scope.cancel = function(){
        $modalInstance.dismiss('cancel');
    };

    $scope.onSelectInv = function(item, model, label){
        $scope.infoData.itemID = item.id;
    };


    $scope.getInv = function(term) {
        var field = "INV";
        return  PrescriptionService.getItemForTypeHead.query({}, {data : term, field :field}).$promise.then(function(result) {
            $scope.diagnosisNameData = result.invList;
            return limitToFilter($scope.diagnosisNameData, 10);
        });
    };


});
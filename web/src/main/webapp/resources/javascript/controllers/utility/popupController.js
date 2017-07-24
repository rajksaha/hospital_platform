app.controller('PopupController', function($scope, $modalInstance, parentScope,title,message) {

    $scope.title = title;
    $scope.message = message;

    $scope.cancel = function (){
        $modalInstance.dismiss('cancel');
    };

    $scope.ok = function (){
        $modalInstance.close('ok');
    };




});




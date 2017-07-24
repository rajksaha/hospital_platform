/**
 * Created by raj on 11/18/2016.
 */

app.controller('ClaimDetailModalController', function($scope, $modalInstance, $timeout, $filter, modalConfig) {

    $scope.resultList = modalConfig;


    $scope.close = function (){
        $modalInstance.dismiss('cancel');
    };


});

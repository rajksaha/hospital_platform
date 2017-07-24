/**
 * Created by raj on 11/18/2016.
 */

app.controller('ImageModalController', function($scope, $modalInstance, $timeout, $filter, $rootScope, modalConfig,$sce) {

    $scope.images = modalConfig;

    $scope.currentImage = $scope.images[0];

    $scope.delete = function (currentImage){

        var res = confirm("Are you sure to delete?");
        if(res){
            $scope.images.splice( $.inArray(currentImage, $scope.images), 1 );
            $scope.currentImage = $scope.images[0];
        }else{
            return false;
        }
    };

    $scope.setCurrentImage = function(image) {
        $scope.currentImage = image;
        if(image.imgFormat == "pdf"){
            window.open(image.imgUrl);
        }else if(image.imgFormat == "csv" || image.imgFormat == "xlsx"){
            window.open(image.imgUrl);
        }
    };


    $scope.cancel = function (){
        $modalInstance.dismiss('cancel');
    };

});

app.controller('LoginController', function($scope,$rootScope, $state, $http, $timeout, $location,ApplicationService) {

    $scope.credentials = {};
    $scope.login = function () {
        if(validator.validateForm("#loginFormID",".validatorMsg",null)) {
            $scope.$emit('event:loginRequest', $scope.credentials.username, $scope.credentials.password, function() {
                ApplicationService.getAppData.query().$promise.then(function(result) {
                    $rootScope.userData = result.userData;
                    $rootScope.updateMode = false;
                    $state.go('root.home');
                });
            });
        }

    };

    $scope.slideImages = [];
    var data1 = {"contentURL":'resources/images/slides/slide1.jpg'};
    var data2 = {"contentURL":'resources/images/slides/slide2.jpg'};
    var data3 = {"contentURL":'resources/images/slides/slide3.jpg'};
    var data4 = {"contentURL":'resources/images/slides/slide4.jpg'};
    var data5 = {"contentURL":'resources/images/slides/slide5.jpg'};
    var data6 = {"contentURL":'resources/images/slides/slide6.jpg'};
    var data7 = {"contentURL":'resources/images/slides/slide7.jpg'};
    //$scope.slideImages = {"contentURL":'images/slides/slide1.jpg',"contentURL":'images/slides/slide1.jpg',"contentURL":'images/slides/slide1.jpg',"contentURL":'images/slides/slide1.jpg',"contentURL":'images/slides/slide1.jpg'};

    $scope.slideImages.push(data1);
    $scope.slideImages.push(data2);
    $scope.slideImages.push(data3);
    $scope.slideImages.push(data4);
    $scope.slideImages.push(data5);
    $scope.slideImages.push(data6);
    $scope.slideImages.push(data7);

    $timeout(function() {
        angular.element('#slides').superslides({
            play: 5000,
            animation: 'fade',
            pagination: true
        });
    }, 100);



    $scope.requestForLogin = function(){
        $rootScope.$broadcast('event:loginRequired');
    };

    $scope.forgetPassword = function(){
        $state.go('forgetPassword');
    };

    if($rootScope.suser && $rootScope.suser.userProfileId && $rootScope.suser.userProfileId > 0){
        $state.go('root.appointment');
    }

}); 
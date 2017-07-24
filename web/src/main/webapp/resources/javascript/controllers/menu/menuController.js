/**
 * Created by raj on 1/6/16.
 */

app.controller('MenuController', function($scope, $state, $rootScope, $http, $timeout, $location, $modal, ApprovalLevelService) {

    $scope.isCollapse = [];

    $scope.requestForLogin = function(){
        $state.go('home');
    };

    $scope.approvalLevelList = [];

    $scope.menuItem = "";

    $scope.showMenu = function(index){
        $scope.isCollapse[index] = !$scope.isCollapse[index];
    };

    $scope.init = function (){

            ApprovalLevelService.getAll.query({}, {} ).$promise.then(function(result) {
                $scope.approvalLevelList = result;

                $scope.initMenu($location.path());
            });
    };

    $scope.getApprovalLevelName = function(level){

        var temp = null;
        for(var i= 0;i<$scope.approvalLevelList.length;i++){
            if($scope.approvalLevelList[i].sortOrder == level){
                temp =  $scope.approvalLevelList[i].approvalState;
                break;
            }
        }

        return temp;
    };

    $scope.getActionStateCode = function(permissionCode){

        var temp = null;
        for(var i= 0;i<$scope.approvalLevelList.length;i++){
            if($scope.approvalLevelList[i].permissionCode == permissionCode){
                temp =  $scope.approvalLevelList[i].actionStateCode;
                break;
            }
        }

        return temp;

    };

    $scope.changeState = function (url, claimType, actionState){


        if($rootScope.updateMode){

            var modalData = {};
            modalData.modalTitle = "Information Not Saved";
            modalData.modalBody = "If you change data might lost";
            modalData.button1 = true;
            modalData.button2 = true;
            modalData.button1Text = "Change Page";
            modalData.button2Text = "Stay on this page";

            var modalInstance = $modal.open({
                templateUrl: 'resources/javascript/templates/informationModal.html',
                controller: 'InformationModalController',
                backdrop: "static",
                windowClass: 'fade in ',
                resolve: {
                    modalConfig: function () {
                        return modalData;
                    }
                }
            });

            modalInstance.result.then(function(result) {
                $rootScope.updateMode = false;
                $scope.changeView(url, claimType, actionState);
            });
        }else{
            $scope.changeView(url, claimType, actionState);
        }
    };

    $scope.changeView = function(url, claimType, actionState){

        if(claimType == null && actionState == null){
            $state.go(url);
        }else if(claimType != null && actionState == null){
            $state.go(url, {claimType : claimType});
        }else if(claimType !=null && actionState != null){
            var page = $scope.getActionStateCode(actionState);
            $state.go(url, {actionState : page, claimType : claimType});
        }

    };

    $scope.initMenu = function(stateName) {
        try{
            //stateName = stateName.split('.')[1];
            if($('a[href$="'+stateName+'"]') && $('a[href$="'+stateName+'"]').length > 0) {
                $('a[href$="'+stateName+'"]').addClass('echo-active');
                var angularAttr = $('a[href$="'+stateName+'"]').parent().attr('data-ng-show');
                var menuNumber = parseInt(angularAttr.substr(angularAttr.indexOf('[') + 1, angularAttr.length + 1 - angularAttr.indexOf(']')));
                $scope.showMenu(menuNumber);
            }
        } catch(e){
            console.error("Unable to expand left menu --> from menuController.js")
        }
    };



    $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams) {
        $rootScope.$emit('event:clearStatus');
        window.scrollTo(1, 1);
        var stateName = toState.name;
        if(stateName.indexOf('.') > 0) {
            //add active class
            stateName = stateName.split('.')[1];
            if($('a[href$="'+stateName+'"]') && $('a[href$="'+stateName+'"]').length > 0) {
                $('.echo-active').removeClass('echo-active');
                $('a[href$="'+stateName+'"]').addClass('echo-active');

                $scope.isCollapse = [];
                $scope.initMenu(stateName);
            }
        }
        $("html, body").animate({ scrollTop: 0 }, "fast");
    });




    $scope.init();



});

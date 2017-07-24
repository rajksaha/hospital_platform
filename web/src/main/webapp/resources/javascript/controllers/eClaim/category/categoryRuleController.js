app.controller('CategoryRuleController', function($scope, $rootScope, $state, $stateParams, $http, $filter, $timeout, $location, CategoryService, ContentDetailService) {

    $scope.hasError = false;
    $scope.hasSuccess = false;
    $scope.message = "";
    $scope.categoryRule = {};
    $scope.categoryRuleList = [];
    $scope.orderList = [];
    $scope.showForm = false;
    $scope.editObj = {};

    $scope.contentDetailList = [];


    if($stateParams.categoryID == undefined || $stateParams.categoryID == null){
        $state.go('root.category');
    }else{
        $scope.categoryID = $stateParams.categoryID;
    }

    $scope.init = function() {
        $scope.showForm = false;
        $scope.categoryRule = {};
        if($scope.categoryID){

            CategoryService.getCategoryByCategoryID.query({}, {categoryID: $scope.categoryID}).$promise.then(function(result) {
                $scope.categoryData = result;
            });

            CategoryService.getFieldByCategoryID.query({}, {categoryID: $scope.categoryID}).$promise.then(function(result) {
                $scope.categoryFieldList = result;

            });
            CategoryService.getSubCategoryTypeByCategoryID.query({}, {categoryID: $scope.categoryID}).$promise.then(function(result) {
                $scope.subCategoryTypeList = result;
            });
            CategoryService.getCategoryRuleByCategoryID.query({}, {categoryID: $scope.categoryID}).$promise.then(function(result) {
                $scope.categoryRuleList = result;

            });

            var contentDetail = {};
            contentDetail.entityType = "USERCATEGORY";


            ContentDetailService.getContent.query({}, contentDetail).$promise.then(function(result) {
                $scope.contentDetailList = result;

            });
        }
    };

    $scope.bringSubCategoryOption = function(subCategoryTypeID){

        CategoryService.getSubCategoryByType.query({}, {subCategoryTypeID: subCategoryTypeID}).$promise.then(function(result) {
            $scope.subCategoryList = result;
        });
    };

    $scope.displaySetting = function (catRule, id) {
        if(id == 4){
            catRule.ruleSettingList = [];
            var temp = {categoryFieldID : null};
            catRule.ruleSettingList.push(temp);
            var temp = {};
            catRule.ruleSettingList.push(temp);
        }
    };

    $scope.addCondition = function(categoryRule){
        if(categoryRule.applyToList == undefined){
            categoryRule.applyToList = [];
        }
        categoryRule.applyToList.push({});
    };

    $scope.changeApplyToSelector = function(selected){

        selected.uiResultList = $filter('filter')($scope.contentDetailList, {shortName: selected.levelName});

        /*angular.forEach(selected.uiResultList, function (value, key) {

            value.status = true;
        });*/

        //console.log(selected.resultList);
    };

    $scope.getText = function(val){
        if(val == 0){
            return "Text";
        }else if(val == 1){
            return "Number";
        }else{
            return "Date";
        }
    };

    $scope.getTextForRule = function(val){
        if(val == 0){
            return "Range";
        }else if(val == 1){
            return "Millage";
        }else if(val == 2){
            return "Duplicate Checking";
        }
    };

    $scope.getTextForApplyTo = function(val){
        if(val == 0){
            return "All user";
        }else if(val == 1){
            return "Confirmed User";
        }else if(val == 2){
            return "Non-confirmed User";
        }
    };

    $scope.getTextForLimit = function(val){
        if(val == 1){
            return "Per Reciept";
        }else if(val == 2){
            return "Per  Month";
        }else if(val == 3){
            return "Per  year";
        }else if(val == 4){
            return "Per Day";
        }
    };



    $scope.populateOrderList = function(add){

        $scope.orderList = [];
        if($scope.categoryRuleList && $scope.categoryRuleList.length > 0){
            for(var i = 0; i < $scope.categoryRuleList.length + add; i++){
                var temp = { 'value' : i +1, 'name' : i+1};
                $scope.orderList.push(temp);
            }
        }
    };

    $scope.save = function(categoryRule) {
        $scope.hideMessage();

        if(validator.validateForm("#validationRequired",".validatorMsg",null)) {
            $scope.processCategoryRuleData(categoryRule);
            CategoryService.saveCategoryRule.query({}, categoryRule ).$promise.then(function(result) {
                if(result && result.success) {
                    $scope.showSuccessMessage("Information saved successfully");
                    $scope.init();
                } else {
                    $scope.showErrorMessage(result.message);
                }
            });
        }
    };

    $scope.processCategoryRuleData = function (categoryRule){

        angular.forEach(categoryRule.applyToList, function (applyTo, key) {
            delete applyTo.status;
            applyTo.resultList = [];
            angular.forEach(applyTo.uiResultList, function (result, key) {

                if(applyTo.resultList == undefined){
                    applyTo.resultList = [];
                }
                if(result.status == null){
                    result.status = false;
                }
                var temp = {data : result.content, status : result.status};
                applyTo.resultList.push(temp);

            });
            delete applyTo.uiResultList;
        });
    };

    $scope.update = function(categoryRule){
        $scope.hideMessage();
        if(validator.validateForm("#validationRequired",".validatorMsg",null)) {
            $scope.processCategoryRuleData(categoryRule);
            CategoryService.updateCategoryRule.query({}, categoryRule ).$promise.then(function(result) {
                if(result && result.success) {
                    $scope.showSuccessMessage("Information updated successfully");
                    $scope.init();
                } else {
                    $scope.showErrorMessage(result.message);
                }
            });
        }
    };

    $scope.addMillage = function(categoryRule){
        categoryRule.ruleValueList.push({});
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

    $scope.edit = function(categoryRule){
        $scope.categoryRule = {};
        $scope.bringSubCategoryOption(categoryRule.subCategoryTypeID);
        angular.copy(categoryRule, $scope.editObj);
        angular.copy(categoryRule, $scope.categoryRule);




        angular.forEach($scope.categoryRule.applyToList, function (applyTo, key) {

            applyTo.uiResultList = applyTo.resultList;

            angular.forEach(applyTo.uiResultList, function (result, key) {

                result.content = result.data;
            });
        });
        $scope.hideMessage();
        $scope.populateOrderList(0);
        $scope.showForm = true;
    };

    $scope.delete = function(data, index){

        CategoryService.deleteCategoryRule.remove({categoryRuleID : data.categoryRuleID} ).$promise.then(function(result) {
            $scope.categoryRuleList.splice(index,1);
            $scope.showSuccessMessage("Information deleted successfully");
        });
    };

    $scope.selectAll = function(data){

        angular.forEach(data.uiResultList, function (value, key) {
            value.status = !data.status;
        });

        data.status = !data.status;
    };

    $scope.reset = function(){
        angular.copy($scope.editObj, $scope.categoryRule);
        $scope.hideMessage();
        validator.hideError("#validationRequired");
    };

    $scope.add = function(){
        $scope.editObj = {};
        $scope.reset();
        $scope.categoryRule = {};
        $scope.categoryRule.categoryID = $scope.categoryID;
        $scope.categoryRule.ruleValueList = [];
        $scope.categoryRule.applyToList = [];
        $scope.categoryRule.ruleValueList.push({});
        $scope.categoryRule.applyToList.push({});
        $scope.showForm = true;
    };

    $scope.deleteFromApplyList = function(index){

        $scope.categoryRule.applyToList.splice(index, 1);
        $scope.showSuccessMessage("Information deleted successfully");
    };

    $scope.deleteFromRuleValue = function(list, index){

        list.splice(index, 1);
    };

    $scope.cancel = function(){
        $scope.reset();
        $scope.showForm = false;
    };

    $scope.backToList = function() {
        $scope.cancel();
    };

    $scope.goToCategoryList = function() {
        $state.go('root.category');
    };

    $scope.init();

});
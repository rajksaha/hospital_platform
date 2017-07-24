app.service('ClaimValidationService', function ($resource, $filter, ClaimService) {


    return {

        checkForMillage : function(fieldData, claim, category){

            var searchData = {};
            searchData.claimFormDataList = category.claimBulkData.claimFormList;
            searchData.categoryID = category.categoryID;
            ClaimService.calculateMillageAmount.query({}, searchData).$promise.then(function (resultSearch) {
                category.claimBulkData.claimFormList = resultSearch.claimFormDataList;
            });
        },
        calculateSubTotal : function (claimFormList){

            var sum = 0;
            angular.forEach(claimFormList, function (claimForm, key) {
                if(!claimForm.isDeleted){
                    angular.forEach(claimForm.resultList, function (resultField, key) {
                        if(resultField.isAmount && resultField.fieldValue != undefined){
                            sum = sum + parseFloat(resultField.fieldValue);
                        }
                    });
                }
            });

            if(isNaN(sum)){
                sum = 0;
            }
            return sum.toFixed(2);
        },

        validateDate : function(fieldData, claimForm, claimApprovalLimit, modal){

            if(fieldData.key == 'utility.invDate'){
                return;
            }
            if(fieldData.key == "datemileage"){
                var result = $filter('filter')(claimForm.resultList, {key: "totalMillage"})[0];
                result.fieldValue = null;
            }
            var daysBetween = null;
            var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
            var firstDate = new Date(fieldData.fieldValue);
            var secondDate = new Date();

            var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));


            if(claimApprovalLimit < diffDays){

                var modalData = {};
                modalData.modalTitle = "Validation Error";
                modalData.modalBody = "You have exceeded the time line to make this claim";
                modalData.button1 = true;
                modalData.button1Text = "Ok";

                var modalInstance = modal.open({
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
                    fieldData.fieldValue = null;
                });
            }
        },
        disabled : function(date, mode, fieldData){

            if(fieldData.key == "dateWorkOnSun"){
                return ( mode === 'day' && ( date.getDay() === 1 || date.getDay() === 2 || date.getDay() === 3 || date.getDay() === 4 || date.getDay() === 5 || date.getDay() === 6 ) );
            }else{
                return false;
            }
        },
        checkForWarning : function(categoryList){

            var warningValid  = true;

            angular.forEach(categoryList, function (category, key) {
                if((category.claimBulkData != undefined || category.claimBulkData != null) && (category.claimBulkData.claimFormList != undefined || category.claimBulkData.claimFormList != null))
                angular.forEach(category.claimBulkData.claimFormList, function (claimForm, key) {
                    if(!claimForm.isDeleted){
                        angular.forEach(claimForm.resultList, function (catField, key) {
                            if(catField.hasWarning && !claimForm.isException){
                                warningValid = false;
                            }
                            if(catField.fieldType == 2){
                                catField.fieldValueStr = $filter('date')(catField.fieldValue, "yyyy-MM-dd");
                            }
                        });
                    }
                });
            });
            return warningValid;

        },
        checkItemValidation : function(categoryList){
            var itemFound  = false;
            angular.forEach(categoryList, function (caegory, key) {
                if(caegory.claimBulkData != null && caegory.claimBulkData.claimFormList != null){
                    angular.forEach(caegory.claimBulkData.claimFormList, function (claim, key) {
                        if(!claim.isDeleted){
                            itemFound = true;
                        }
                    });
                }
            });

            return itemFound;
        },
        checkValidAttachment : function(categoryList){

            var attachValid  = true;
            angular.forEach(categoryList, function (caegory, key) {
                if(caegory.claimBulkData != null && caegory.claimBulkData.claimFormList != null){
                    angular.forEach(caegory.claimBulkData.claimFormList, function (claim, key) {
                        if(!claim.isDeleted){
                            angular.forEach(claim.resultList, function (field, key) {
                                if(field.fieldType == 4 && field.isRequire){
                                    if(field.imageContentList == undefined || field.imageContentList.length == 0){
                                        field.hasError = true;
                                        attachValid = false;
                                    }
                                }
                            });
                        }
                    });
                }
            });

            return attachValid;
        },

        setDecimalPoint : function(fieldData, resultList){
            if(fieldData.key == "millageKm"){
                var result = $filter('filter')(resultList, {key: "totalMillage"})[0];
                result.fieldValue = "Calculated field ";
            }else if(fieldData.key == "handPhn.invoice"){

            }else if(fieldData.key == "uti.prev.bill" || fieldData.key == "uti.cur.bill"){
                var prev = $filter('filter')(resultList, {key: "uti.prev.bill"})[0];
                var cur = $filter('filter')(resultList, {key: "uti.cur.bill"})[0];
                if(prev.fieldValue && cur.fieldValue){
                    var result = $filter('filter')(resultList, {key: "uti.total.bill"})[0];
                     var sum = parseFloat(prev.fieldValue) + parseFloat(cur.fieldValue);
                    result.fieldValue = sum.toFixed(2);
                }
            }else{
                var val = fieldData.fieldValue.replace(".", "");
                fieldData.fieldValue = (val / 100).toFixed(2);
            }

        }

    }




});



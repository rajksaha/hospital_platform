'use strict';

app.filter('myCurrency', ['$filter', function ($filter) {
    return function(input) {
        if(typeof input === 'number') {
            input = parseFloat(input);

            if(input % 1 === 0) {
                input = input.toFixed(0);
            }
            else {
                input = input.toFixed(2);
            }

            return  input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        } else if(input != undefined || input != null){
            input = parseFloat(input);

            if(input % 1 === 0) {
                input = input.toFixed(0);
            }
            else {
                input = input.toFixed(2);
            }

            return   input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }else{
            return '0';
        }
    };
}]);
app.service('JsonService', function(){

    this.numberList = [];
    this.fractionNumberList = [];
    this.drugDayTypeList = [];

    var i = 1;
    while( i<31 ){
        var data = {"value" : i , "name" : i};
        this.fractionNumberList.push(data);
        i = i + 1;
    }

    var i = 1;
    while( i<31 ){
        var data = {"value" : i , "name" : i};
        this.numberList.push(data);
        i = i + 1;
    }


    this.timesADay = [
        {"code" : 1, "name" :'Once Daily'},
        {"code" : 1, "name" :'12 hourly'},
        {"code" : 3, "name" :'8 hourly'},
        {"code" : 4, "name" :'6 hourly'},
        {"code" : 6, "name" :'4 hourly'},
        {"code" : 8, "name" :'3 hourly'},
        {"code" : 12, "name" :'2hourly'},
        {"code" : -1, "name" :'Preiodic Dose'},
        {"code" : -2, "name" :'Same As'},
        {"code" : -3, "name" :'Empty Dose'}
    ];

    this.drugDayTypeList = [
        {"code" : "1", "name" :'Day'},
        {"code" : "2", "name" :'Week'},
        {"code" : "3", "name" :'Month'},
        {"code" : "4", "name" :'Year'},
        {"code" : "5", "name" :'Continue'}
    ];

});
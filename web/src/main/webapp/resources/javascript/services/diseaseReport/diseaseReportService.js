/**
 * Created by raj on 6/21/2016.
 */

app.service('DiseaseReportService', function ($resource) {
    return {

        bringReportDetails : $resource('rest/diseaseReport/bringReportDetails/diseaseID/:diseaseID', {}, {
            'query':  {
                method:'POST',
                params: {diseaseID : '@diseaseID'},
                isArray:false
            }
        }),
        getItemForTypeHead : $resource('rest/prescription/getItemForTypeHead/data/:data/field/:field', {}, {
            'query':  {
                method:'GET',
                params: {data : '@data', field : '@field'},
                isArray:false
            }
        })



    };
});
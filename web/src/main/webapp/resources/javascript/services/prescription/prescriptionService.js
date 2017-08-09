/**
 * Created by raj on 6/21/2016.
 */

app.service('PrescriptionService', function ($resource) {
    return {
        bringMenu : $resource('rest/prescription/bringMenu', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        bringDrugDayType : $resource('rest/drugs/bringDrugDayType', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        bringDrugType : $resource('rest/drugs/bringDrugType', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        bringDrugWhenType : $resource('rest/drugs/bringDrugWhenType', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        bringDrugAdviceType : $resource('rest/drugs/bringDrugAdviceType', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        bringAppointment : $resource('rest/prescription/bringAppointment/appointmentID/:appointmentID', {}, {
            'query':  {
                method:'POST',
                params: {appointmentID : '@appointmentID'},
                isArray:false
            }
        }),
        bringDiagnosis : $resource('rest/prescription/bringDiagnosis/appointmentID/:appointmentID', {}, {
            'query':  {
                method:'POST',
                params: {appointmentID : '@appointmentID'},
                isArray:false
            }
        }),
        bringPrescribedDrugs : $resource('rest/prescription/bringPrescribedDrugs/appointmentID/:appointmentID', {}, {
            'query':  {
                method:'POST',
                params: {appointmentID : '@appointmentID'},
                isArray:false
            }
        }),
        saveDiagnosis : $resource('rest/prescription/saveDiagnosis', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        bringNextVisit : $resource('rest/prescription/bringNextVisit/appointmentID/:appointmentID', {}, {
            'query':  {
                method:'POST',
                params: {appointmentID : '@appointmentID'},
                isArray:false
            }
        }),
        saveNextVisit : $resource('rest/prescription/saveNextVisit', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        bringComplain : $resource('rest/prescription/bringComplain/appointmentID/:appointmentID', {}, {
            'query':  {
                method:'POST',
                params: {appointmentID : '@appointmentID'},
                isArray:true
            }
        }),
        saveComplain : $resource('rest/prescription/saveComplain', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        getItemForTypeHead : $resource('rest/prescription/getItemForTypeHead/data/:data/field/:field', {}, {
            'query':  {
                method:'GET',
                params: {data : '@data', field : '@field'},
                isArray:false
            }
        }),
        getItemForTypeHeadForDrugs : $resource('rest/drugs/getItemForTypeHead/data/:data/field/:field', {}, {
            'query':  {
                method:'GET',
                params: {data : '@data', field : '@field'},
                isArray:true
            }
        })



    };
});
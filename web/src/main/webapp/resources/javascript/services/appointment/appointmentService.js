/**
 * Created by raj on 6/21/2016.
 */

app.service('AppointmentService', function ($resource) {
    return {

        createNewPatient : $resource('rest/appointment/createNewPatient', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        createAppointment : $resource('rest/appointment/createAppointment', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        createFollowUpAppointment : $resource('rest/appointment/createFollowUpAppointment', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        bringDoctorData : $resource('rest/appointment/bringDoctorData', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        bringAppointment : $resource('rest/appointment/bringAppointment', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        getItemForTypeHead : $resource('rest/appointment/getItemForTypeHead/data/:data/field/:field', {}, {
            'query':  {
                method:'GET',
                params: {data : '@data', field : '@field'},
                isArray:true
            }
        }),



    };
});
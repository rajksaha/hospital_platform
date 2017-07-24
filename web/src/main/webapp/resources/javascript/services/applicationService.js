/**
 * Created by raj on 1/6/16.
 */

app.service('ApplicationService', function ($resource) {
    return {

        getAppData : $resource('rest/application/data', {}, {
            'query':  {
                method:'GET',
                isArray:false
            }
        })

    };
});
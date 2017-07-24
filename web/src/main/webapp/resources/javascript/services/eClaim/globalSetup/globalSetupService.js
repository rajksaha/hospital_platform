/**
 * Created by raj on 4/26/2016.
 */
app.service('GlobalSetupService', function ($resource) {
    return {

        getData : $resource('rest/globalSetup/getData', {}, {
            'query':  {
                method:'GET',
                isArray:false
            }
        }),
        save: $resource('rest/globalSetup/save', {}, {
            'query': {
                method: 'POST'
            }
        }),
        update: $resource('rest/globalSetup/update', {}, {
            'query': {
                method: 'POST'
            }
        }),

    };
});


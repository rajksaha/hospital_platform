/**
 * Created by raj on 4/29/2016.
 */
app.service('ContentDetailService', function ($resource) {
    return {

        getContent : $resource('rest/contentDetail/getContent', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        save: $resource('rest/contentDetail/save', {}, {
            'query': {
                method: 'POST'
            }
        }),
        update: $resource('rest/contentDetail/update', {}, {
            'query': {
                method: 'POST'
            }
        }),

    };
});


/**
 * Created by raj on 3/28/2017.
 */

app.service('CompanyFormationService', function ($resource) {
    return {

        getSingleCompanyInfo : $resource('rest/companyFormation/getSingleLevelMapping', {}, {
            'query':  {
                method: 'POST',
                isArray:false
            }
        }),
        save: $resource('rest/companyFormation/save', {}, {
            'query': {
                method: 'POST'
            }
        }),
        update: $resource('rest/companyFormation/update', {}, {
            'query': {
                method: 'POST'
            }
        }),

    };
});

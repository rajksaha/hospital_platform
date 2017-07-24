/**
 * Created by raj on 6/1/2016.
 */

app.service('EchoCommonService', function ($resource) {
    return {


        // Module
        getAllModule : $resource('rest/module/getAllModule', {}, {
            'query':  {
                method:'GET',
                isArray:true
            }
        }),

        saveModule: $resource('rest/module/save', {}, {
            'query': {
                method: 'POST'
            }
        }),

        updateModule : $resource('rest/module/update', {}, {
            'query': {
                method  : 'POST'
            }
        }),

        deleteModule: $resource('rest/module/delete/:moduleID', {}, {
            'remove': {
                method: 'DELETE',
                params  : {moduleID: '@moduleID'}
            }
        }),

        //Company
        getAllCompany : $resource('rest/company/getAllCompany', {}, {
            'query':  {
                method:'GET',
                isArray:true
            }
        }),
        saveCompany: $resource('rest/company/save', {}, {
            'query': {
                method: 'POST'
            }
        }),

        updateCompany : $resource('rest/company/update', {}, {
            'query': {
                method  : 'POST'
            }
        }),

        deleteCompany: $resource('rest/company/delete/:companyID', {}, {
            'remove': {
                method: 'DELETE',
                params  : {companyID: '@companyID'}
            }
        }),

        //Company Module
        getAllCompanyModule : $resource('rest/companyModule/getAllCompanyModule', {}, {
            'query':  {
                method:'GET',
                isArray:true
            }
        }),
        saveCompanyModule: $resource('rest/companyModule/save', {}, {
            'query': {
                method: 'POST'
            }
        }),

        updateCompanyModule : $resource('rest/companyModule/update', {}, {
            'query': {
                method  : 'POST'
            }
        }),

        deleteCompanyModule: $resource('rest/companyModule/delete/:companyModuleID', {}, {
            'remove': {
                method: 'DELETE',
                params  : {companyModuleID: '@companyModuleID'}
            }
        })
    };
});
/**
 * Created by raj on 4/29/2016.
 */
app.service('EClaimReportService', function ($resource) {
    return {

        getSearchElements : $resource('rest/hrReport/getSearchElements', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        getChildContentInfo : $resource('rest/hrReport/getChildContentInfo', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        searchHRReport : $resource('rest/hrReport/searchHRReport', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        createExcelReport : $resource('rest/hrReport/createExcelReport', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        createHrPayrollReport : $resource('rest/hrReport/createHrPayrollReport', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        getItemForTypeHead : $resource('rest/hrReport/getItemForTypeHead/data/:data/field/:field', {}, {
            'query':  {
                method:'GET',
                params: {data : '@data', field : '@field'},
                isArray:true
            }
        })

    };
});


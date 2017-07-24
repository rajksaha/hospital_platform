/**
 * Created by raj on 4/26/2016.
 */
app.service('ApprovalLevelService', function ($resource) {
    return {

        getAll : $resource('rest/approvalLevel/getAll', {}, {
            'query':  {
                method:'GET',
                isArray:true
            }
        }),
        getPermission : $resource('rest/approvalLevel/getPermission', {}, {
            'query':  {
                method:'GET',
                isArray:true
            }
        }),
        getByClaimType : $resource('rest/approvalLevel/getByClaimType/claimType/:claimType', {}, {
            'query':  {
                method:'GET',
                params: {claimType : '@claimType'},
                isArray:true
            }
        }),
        save: $resource('rest/approvalLevel/save', {}, {
            'query': {
                method: 'POST'
            }
        }),
        update: $resource('rest/approvalLevel/update', {}, {
            'query': {
                method: 'POST'
            }
        }),
        delete : $resource('rest/approvalLevel/delete/:companyApprovalID', {}, {
            'remove':  {
                method:'DELETE',
                params: {companyApprovalID : '@companyApprovalID'},
            }
        })



    };
});


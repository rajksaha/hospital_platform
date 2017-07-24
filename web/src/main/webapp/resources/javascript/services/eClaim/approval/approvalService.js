/**
 * Created by raj on 4/16/2016.
 */

app.service('ApprovalService', function ($resource) {
    return {

        bringCategoryClaimListBySearchData : $resource('rest/claimApproval/bringCategoryClaimListBySearchData', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        bringProcessedClaimByCategory : $resource('rest/claimApproval/bringProcessedClaimByCategory', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        save: $resource('rest/claimApproval/save', {}, {
            'query': {
                method: 'POST'
            }
        }),
        approveByClaimBulk: $resource('rest/claimApproval/approveByClaimBulk', {}, {
            'query': {
                method: 'POST'
            }
        }),
        bringClaimListBySearchData: $resource('rest/claimApproval/bringClaimListBySearchData', {}, {
            'query': {
                method: 'POST',
                isArray:true
            }
        }),
        bringApprovalDetailBySearchData: $resource('rest/claimApproval/bringApprovalDetailBySearchData', {}, {
            'query': {
                method: 'POST',
                isArray:false
            }
        }),
        bringOrgDocumentForApprover: $resource('rest/originalDocument/bringOrgDocumentForApprover', {}, {
            'query': {
                method: 'POST',
                isArray:true
            }
        }),
        documentCollected: $resource('rest/originalDocument/documentCollected', {}, {
            'query': {
                method: 'POST',
                isArray:false
            }
        }),
        downloadApproval: $resource('rest/claimApproval/downloadApproval', {}, {
            'query': {
                method: 'POST',
                isArray:false
            }
        }),
        bringPendingDocument: $resource('rest/originalDocument/bringPendingDocument', {}, {
            'query': {
                method: 'GET',
                isArray:true
            }
        }),
        getNonTaggedTaxItems: $resource('rest/companyTax/getNonTaggedTaxItems', {}, {
            'query': {
                method: 'POST',
                isArray:true
            },
        }),
        getItemForTypeHead : $resource('rest/user/getItemForTypeHead/data/:data', {}, {
            'query':  {
                method:'GET',
                params: {data : '@data'},
                isArray:true
            }
        }),

    };
});

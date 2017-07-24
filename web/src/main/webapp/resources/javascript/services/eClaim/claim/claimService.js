app.service('ClaimService', function ($resource) {
    return {

        getAll : $resource('rest/claimBulk/getAll', {}, {
            'query':  {
                method:'GET',
                isArray:true
            }
        }),
        save: $resource('rest/claimBulk/save', {}, {
            'query': {
                method: 'POST'
            }
        }),

        update : $resource('rest/claimBulk/update', {}, {
            'query': {
                method  : 'POST',
                isArray : false
            }
        }),
        getClaimEventByClaimantID : $resource('rest/claimBulk/getClaimEventByClaimantID/claimantID/:claimantID', {}, {
            'query':  {
                method:'GET',
                params: {claimantID : '@claimantID'},
                isArray:true
            }
        }),
        getClaimBulkByStatus : $resource('rest/claimBulk/getClaimBulkByStatus/status/:status', {}, {
            'query':  {
                method:'GET',
                params: {status : '@status'},
                isArray:true
            }
        }),
        getClaimBulkBySearchData : $resource('rest/claimBulk/getClaimBulkBySearchData', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),

        getAllClaimForm : $resource('rest/categoryField/getAllClaimForm', {}, {
            'query':  {
                method:'GET',
                isArray:true
            }
        }),
        getAllCategoryRule : $resource('rest/categoryRule/getAllCategoryRule', {}, {
            'query':  {
                method:'GET',
                isArray:true
            }
        }),
        getCategoryRuleByCategoryID : $resource('rest/categoryRule/getCategoryRuleByCategoryID/categoryID/:categoryID', {}, {
            'query':  {
                method:'GET',
                params: {categoryID : '@categoryID'},
                isArray:true
            }
        }),
        getRuleByCategoryFieldID : $resource('rest/categoryRule/getRuleByCategoryFieldID/categoryFieldID/:categoryFieldID', {}, {
            'query':  {
                method:'GET',
                params: {categoryFieldID : '@categoryFieldID'},
                isArray:true
            }
        }),
        validateNonPerReceipt: $resource('rest/claimBulk/validateNonPerReceipt', {}, {
            'query': {
                method: 'POST',
                isArray:true
            }
        }),
        deleteClaimBulk : $resource('rest/claimBulk/delete/:claimBulkID', {}, {
            'remove':  {
                method:'DELETE',
                params: {claimBulkID : '@claimBulkID'},
            }
        }),
        delete : $resource('rest/claimBulk/deleteClaimForm/:claimFromID', {}, {
            'remove':  {
                method:'DELETE',
                params: {claimFromID : '@claimFromID'},
            }
        }),
        validateClaimForm: $resource('rest/claimBulk/validateClaimForm', {}, {
            'query': {
                method: 'POST',
                isArray:false
            }
        }),
        calculateMillageAmount: $resource('rest/claimBulk/calculateMillageAmount', {}, {
            'query': {
                method: 'POST',
                isArray:false
            }
        }),
    };
});
app.service('CategoryService', function ($resource) {
    return {

        getAll : $resource('rest/category/getAll', {}, {
            'query':  {
                method:'GET',
                isArray:true
            }
        }),
        getAllCategory : $resource('rest/category/getAllCategory', {}, {
            'query':  {
                method:'GET',
                isArray:true
            }
        }),

        save: $resource('rest/category/save', {}, {
            'query': {
                method: 'POST'
            }
        }),

        update : $resource('rest/category/update', {}, {
            'query': {
                method  : 'POST',
                isArray : false
            }
        }),
        getCategoryByCategoryID : $resource('rest/category/getCategoryByCategoryID/categoryID/:categoryID', {}, {
            'query':  {
                method:'GET',
                params: {categoryID : '@categoryID'},
                isArray:false
            }
        }),
        getCategoryByClaimType : $resource('rest/category/getCategoryByClaimType/claimType/:claimType', {}, {
            'query':  {
                method:'POST',
                params: {claimType : '@claimType'},
                isArray:true
            }
        }),
        getFieldByCategoryID : $resource('rest/categoryField/getFieldByCategoryID/categoryID/:categoryID', {}, {
            'query':  {
                method:'GET',
                params: {categoryID : '@categoryID'},
                isArray:true
            }
        }),
        getFieldWithSubCategoryByCategoryID : $resource('rest/categoryField/getFieldWithSubCategoryByCategoryID/categoryID/:categoryID', {}, {
            'query':  {
                method:'GET',
                params: {categoryID : '@categoryID'},
                isArray:true
            }
        }),
        getAllClaimFormByType : $resource('rest/claimBulk/getAllClaimFormByType/claimType/:claimType', {}, {
            'query':  {
                method:'GET',
                params: {claimType : '@claimType'},
                isArray:true
            }
        }),
        saveCategoryField: $resource('rest/categoryField/save', {}, {
            'query': {
                method: 'POST'
            }
        }),
        updateCategoryField: $resource('rest/categoryField/update', {}, {
            'query': {
                method: 'POST'
            }
        }),
        saveSubCategory: $resource('rest/subCategory/save', {}, {
            'query': {
                method: 'POST'
            }
        }),
        updateSubCategory: $resource('rest/subCategory/update', {}, {
            'query': {
                method: 'POST'
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
        saveCategoryRule: $resource('rest/categoryRule/save', {}, {
            'query': {
                method: 'POST'
            }
        }),
        updateCategoryRule: $resource('rest/categoryRule/update', {}, {
            'query': {
                method: 'POST'
            }
        }),
        getCategoryRuleBySearchData: $resource('rest/categoryRule/getCategoryRuleBySearchData', {}, {
            'query': {
                method: 'POST',
                isArray:true
            }
        }),
        deleteCategory: $resource('rest/category/delete/:categoryID', {}, {
            'remove': {
                method: 'DELETE',
                params  : {categoryID: '@categoryID'}
            }
        }),
        deleteCategoryRule : $resource('rest/categoryRule/delete/:categoryRuleID', {}, {
            'remove':  {
                method:'DELETE',
                params: {categoryRuleID : '@categoryRuleID'},
            }
        }),
        deleteCategoryField : $resource('rest/categoryField/delete/:categoryFieldID', {}, {
            'remove':  {
                method:'DELETE',
                params: {categoryFieldID : '@categoryFieldID'},
            }
        }),
        deleteSubCategory : $resource('rest/subCategory/delete/:subCategoryID', {}, {
            'remove':  {
                method:'DELETE',
                params: {subCategoryID : '@subCategoryID'},
            }
        }),
        saveSubCategoryType: $resource('rest/subCategoryType/save', {}, {
            'query': {
                method: 'POST'
            }
        }),
        updateSubCategoryType: $resource('rest/subCategoryType/update', {}, {
            'query': {
                method: 'POST'
            }
        }),
        deleteSubCategoryType : $resource('rest/subCategoryType/delete/:subCategoryTypeID', {}, {
            'remove':  {
                method:'DELETE',
                params: {subCategoryTypeID : '@subCategoryTypeID'},
            }
        }),
        getSubCategoryTypeByCategoryID : $resource('rest/subCategoryType/getSubCategoryTypeByCategoryID/categoryID/:categoryID', {}, {
            'query':  {
                method:'GET',
                params: {categoryID : '@categoryID'},
                isArray:true
            }
        }),
        getSubCategoryByType : $resource('rest/subCategory/getSubCategoryByType/subCategoryTypeID/:subCategoryTypeID', {}, {
            'query':  {
                method:'GET',
                params: {subCategoryTypeID : '@subCategoryTypeID'},
                isArray:true
            }
        }),
        getSubCategoryByCategoryID : $resource('rest/subCategory/getSubCategoryByCategoryID/categoryID/:categoryID', {}, {
            'query':  {
                method:'GET',
                params: {categoryID : '@categoryID'},
                isArray:true
            }
        })
    };
});
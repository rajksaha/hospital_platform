/**
 * Created by raj on 8/10/2016.
 */


app.service('CompanyTaxInfoService', function ($resource) {
    return {

        getNonTaggedTaxItems: $resource('rest/companyTax/getNonTaggedTaxItems', {}, {
            'query': {
                method: 'POST',
                isArray:true
            }
        }),
        getItemForTypeHead : $resource('rest/companyTax/getItemForTypeHead/data/:data/field/:field', {}, {
            'query':  {
                method:'GET',
                params: {data : '@data', field : '@field'},
                isArray:true
            }
        }),
        save: $resource('rest/companyTax/save', {}, {
            'query': {
                method: 'POST',
                isArray:false
            }
        }),

    };
});


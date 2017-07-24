/**
 * Created by raj on 6/21/2016.
 */

app.service('DashboardService', function ($resource) {
    return {

        getWing : $resource('rest/otcDashboard/getWing', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        getRegionByWing : $resource('rest/otcDashboard/getRegionByWing/wingID/:wingID', {}, {
            'query':  {
                method:'POST',
                params: {wingID : '@wingID'},
                isArray:true
            }
        }),
        getAllRegion : $resource('rest/otcDashboard/getAllRegion', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        getMtdByOutlet : $resource('rest/otcDashboard/getMtdByOutlet', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        getNpsScoreByOutlet : $resource('rest/otcDashboard/getNpsScoreByOutlet', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        getNpsVarianceByOutlet : $resource('rest/otcDashboard/getNpsVarianceByOutlet', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        getOnlyRegion : $resource('rest/otcDashboard/getOnlyRegion', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        getAllRegionForInput : $resource('rest/otcDashboard/getAllRegionForInput', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        getMasterReportByRegion : $resource('rest/otcDashboard/getMasterReportByRegion', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        getAllRegionForNps : $resource('rest/otcDashboard/getAllRegionForNps', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        getScoreByOutlet : $resource('rest/otcDashboard/getScoreByOutlet', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        getNpsScoreMonthlyView : $resource('rest/otcDashboard/getNpsScoreMonthlyView', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        criticalAnalysisByOutlet : $resource('rest/otcDashboard/criticalAnalysisByOutlet', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        getOutletWitAvgReport : $resource('rest/otcDashboard/getOutletWitAvgReport/regionID/:regionID', {}, {
            'query':  {
                method:'POST',
                params: {regionID : '@regionID'},
                isArray:true
            }
        }),
        getOutletRegionID : $resource('rest/otcDashboard/getOutletRegionID/regionID/:regionID', {}, {
            'query':  {
                method:'POST',
                params: {regionID : '@regionID'},
                isArray:true
            }
        }),
        getReportDetail: $resource('rest/otcDashboard/getReportDetail', {}, {
            'query': {
                method: 'POST',
                isArray:false
            }
        }),
        exportData: $resource('rest/otcDashboard/exportData', {}, {
            'query': {
                method: 'POST'
            }
        }),
        getUserOutletByUserID : $resource('rest/otcDashboard/getUserOutletByUserID/userID/:userID', {}, {
            'query':  {
                method:'POST',
                params: {userID : '@userID'},
                isArray:true
            }
        }),
        getAllOutlet : $resource('rest/otcDashboard/getAllOutlet', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        saveUserOutlet : $resource('rest/otcDashboard/saveUserOutlet', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        deleteUserOutlet : $resource('rest/otcDashboard/deleteUserOutlet', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        })


    };
});
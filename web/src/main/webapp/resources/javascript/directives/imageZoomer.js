app.directive('myDirective', function($templateCache,$compile) {
    return {
        restrict: 'A',
        scope:{
            template : "@",
            mydata : "=",
            mycallback:"&"
        },
        link: function(scope,element) {
            var template = $templateCache.get(scope.template);
            scope.values = scope.mydata;
            scope.doSomething = scope.mycallback;
            element.append($compile(template)(scope));
        }
    }
});
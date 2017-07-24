/**
 * Created by raj on 4/5/2017.
 */

app.directive('multiSelect', function() {

    function link(scope, element) {
        var options = {
            enableClickableOptGroups: true,
            onChange: function() {
                element.change();
            }
        };
        element.multiselect(options);
    }

    return {
        restrict: 'A',
        link: link
    };
});

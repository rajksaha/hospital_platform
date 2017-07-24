var router = {

    loadHash: function (hash) {
        if(window.location.hash == hash) {
            $(window).hashchange();
        }
        window.location.hash = hash;
    },

    private : {
        initHashChange: function () {
            // These two properties, set after jQuery and the hashchange event plugin are
            // loaded, only need to be used when document.domain is set (to fix the "access
            // denied" error in IE6/7).
            $.fn.hashchange.src = '';
            $.fn.hashchange.domain = document.domain;

            // Bind an event to window.onhashchange that
            $(window).hashchange(function () {
                var hash = location.hash.replace(/^#/, '');
                if (hash && hash.length > 0) {
                    router.private.renderUrl(hash);
                }
            });

            // Since the event is only triggered when the hash changes, we need to trigger
            // the event now, to handle the hash the page may have loaded with.
            $(window).hashchange();
        },

        bindMenuItems: function () {
            $('.echo_list a').on('click', function (event) {
                if(event.preventDefault) event.preventDefault();
                else event.returnValue = false;
                var url = $(this).attr('href');
                if(url == '#' || url == '' || url == undefined) return false;
                router.loadHash(url);
            });
        },

        renderUrl: function (url) {
            $.ajax({
                type: 'GET',
                url: url,
                async: true,
                success: function(data) {
                    $('#echo_body_container').html(data);
                }
            });
            app.selectMenuItem(url);
        }
    }

};

$(document).ready(function () {
    router.private.initHashChange();
    router.private.bindMenuItems();
});
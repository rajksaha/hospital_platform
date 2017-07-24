var layout = {

    initLayout: function () {
        if (window.outerWidth <= 450) {
            $(".echo_side_fixed_bar").addClass('collaspe_menu_side');
        }
        $(window).resize(function () {
            if (window.outerWidth <= 450) {
                $(".echo_side_fixed_bar").addClass('collaspe_menu_side');
            } else {
                $(".echo_side_fixed_bar").removeClass('collaspe_menu_side');
            }
        });

        $("html").click(function () {
            $(".echo_box_show").removeClass('show_hide');
        });

        $(document).on('click', ".echo_right_header li", function (event) {
            event.stopPropagation();
            if(!$(".echo_box_show", this).hasClass('show_hide')) {
                $(".echo_box_show").removeClass('show_hide');
            }
            $(".echo_box_show", this).toggleClass('show_hide');
        });

        $(document).on('click', ".echo_infos", function () {
            $('.echo_show_dropdown').not($(this).parent()).removeClass('echo_show_dropdown');
            $(this).parent().toggleClass('echo_show_dropdown');
        });

        $(document).on('click', ".echo_menu_collaspe", function () {
            $(".echo_side_fixed_bar").toggleClass('collaspe_menu_side');
        });
    }
};

$(document).ready(function () {
    layout.initLayout();
});
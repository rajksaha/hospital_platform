var app = {
    notificationModel: null,

    initNotification: function () {
        var popupSpan = "<div style='display:none;'></div>";
        app.notificationModel = $(popupSpan).kendoNotification({
            position: {top: 10, right: 10},
            autoHideAfter: 3500,
            templates: [{
                type: "success",
                template: $("#notificationSuccessTemplate").html()
            }, {
                type: "error",
                template: $("#notificationErrorTemplate").html()
            }, {
                type: "info",
                template: $("#notificationInfoTemplate").html()
            }]

        }).data("kendoNotification");
    },

    initEvents: function () {
        /*$(document).on('click', '.err-clear.button', function () {
            var $form = $(this).closest('form');
            var $field = $form.find('input, textarea, select'),
                $group = $form.find('.field');
            $field
                .each(function () {
                    var
                        $field = $(this),
                        $fieldGroup = $field.closest($group),
                        $prompt = $fieldGroup.find('.prompt.label'),
                        isError = $fieldGroup.hasClass('error');
                    if (isError) {
                        $fieldGroup.removeClass('error');
                        $prompt.remove();
                    }
                });
        });*/
    },

    setTitle: function (title) {
        $(document).attr('title', title);
    },

    getHeight: function () {
        return $(window).height();
    },

    loadJsFiles: function (urls) {
        if(!$.isArray(urls)) {
            urls = [urls];
        }
        $('#echo_script_container').html("");
        $.each(urls, function (i, v) {
            var s = document.createElement('script');
            s.type = 'text/javascript';
            s.async = true;
            s.src = v;
            document.getElementById('echo_script_container').appendChild(s);
        })
    },

    selectMenuItem: function (url) {
        if (!url.startsWith("#")) {
            url = "#" + url;
        }
        var element = $('.echo_side_menu_bar').find("a[href='" + url + "']");
        if (!element || element.length <= 0) return;
        $('.menu_active').removeClass('menu_active');
        $('.echo_show_dropdown').removeClass('echo_show_dropdown');
        element.closest('li').addClass('menu_active');
        element.closest('.echo_list').addClass('echo_show_dropdown');
    },

    // return a fully blank dataSource
    getBlankDataSource: function () {
        return new kendo.data.DataSource({data: []});
    },

    /* function returns object from grid row.
     */
    getSelectedObjectFromGrid: function (gridModel) {
        var obj = {};
        var row = gridModel.select();
        if (row.length == 1) {
            var data = gridModel.dataItem(row);
            if (data.fields) {  // for declared datasource
                $.each(data.fields, function (pName, pVal) {
                    obj[pName] = data.get(pName);
                });
            } else {    // for non-declared datasource
                obj = data;
            }
        }
        return obj;
    },

    isRowSelected: function (gridModel) {
        var rows = gridModel.select();
        var selectedRowSize = rows.length;
        return selectedRowSize > 0;
    },

    /* function returns specific 'cell value' of a row
     Used to check client side validation.
     */
    getSelectedValueFromGrid: function (gridModel, propertyName) {
        var row = gridModel.select();
        var data = gridModel.dataItem(row);
        var propertyValue = data.get(propertyName);
        return propertyValue;
    },

    // iterate over all of the inputs for the form
    trimFormValues: function (form) {
        $(':input', form).each(function () {
            var type = this.type.toLowerCase();
            var tag = this.tagName.toLowerCase();

            // for inputs and textareas
            if (type == 'text' || type == 'hidden' || tag == 'textarea') {
                this.value = $.trim(this.value);
            }
        });
    },

    showConfirmationModal: function (title, body, yesFunc, noFunc) {
        $('#echo_modal_header').html(title);
        $('#echo_modal_content').html(body);
        $('#echo_modal_yes_button').unbind('click');
        $('#echo_modal_no_button').unbind('click');
        if (typeof yesFunc == 'function') {
            $('#echo_modal_yes_button').click(yesFunc);
        }
        if (typeof noFunc == 'function') {
            $('#echo_modal_no_button').click(noFunc);
        }
        $('#echo_modal').modal('show');
    },

    showSuccessNotification: function (message) {
        if (message.length == 0) {
            return false;
        }
        app.notificationModel.show({message: message}, "success");
    },

    showErrorNotification: function (message) {
        if (message.length == 0) {
            return false;
        }
        app.notificationModel.show({message: message}, "error");
    },

    showInfoNotification: function (message) {
        if (message.length == 0) {
            return false;
        }
        app.notificationModel.show({message: message}, "info");
    },

    handleResponse: function (response) {
        if(response.success) {
            app.showSuccessNotification(response.message)
        } else if(response.info) {
            app.showInfoNotification(response.message)
        } else {
            app.showErrorNotification(response.message)
        }
    },

    handleSubmit: function (e, func) {
        if(e.preventDefault) e.preventDefault();
        else e.returnValue = false;
        if(typeof func == 'function') {
            func();
        }
        return false;
    },

    getFormValues: function(formSelector) {
        return $(formSelector).form('get values');
    }

};

$(document).ready(function () {
    app.initNotification();
    app.initEvents();
});
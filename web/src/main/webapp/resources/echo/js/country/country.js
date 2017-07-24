var country = {
    gridModel: null,
    dataSource: null,

    initView: function () {
        app.selectMenuItem('#country');
        app.setTitle("Echo Application - Country");
        country.initGrid();
    },
    initCreate: function () {
        country.initForm();
        app.selectMenuItem('#country');
        app.setTitle("Echo Application - Create Country");
    },
    initUpdate: function () {
        country.initForm();
        app.selectMenuItem('#country');
        app.setTitle("Echo Application - Update Country");
    },

    initDataSource: function () {
        country.dataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    url: "country/list",
                    dataType: "json",
                    type: "get"
                }
            },
            schema: {
                type: 'json',
                data: "model.list", total: "model.count",
                model: {
                    fields: {
                        id: {type: "number"},
                        name: {type: "string"},
                        code: {type: "string"},
                        isdCode: {type: "string"},
                        nationality: {type: "string"}
                    }
                },
                parse: function (data) {
                    return data;
                }
            },
            sort: {field: 'id', dir: 'desc'},
            pageSize: 20,
            serverPaging: true,
            serverFiltering: true,
            serverSorting: true
        });
    },

    initGrid: function () {
        country.initDataSource();
        $grid = $("#grid");
        $grid.kendoGrid({
            dataSource: country.dataSource,
            height: app.getHeight() - 135,
            selectable: true,
            sortable: true,
            resizable: true,
            reorderable: true,
            pageable: {
                refresh: false,
                pageSizes: [10, 20, 50],
                buttonCount: 4
            },
            columns: [
                {field: "name", title: "Name"},
                {field: "code", title: "Code"},
                {field: "isdCode", title: "ISD Code"},
                {field: "nationality", title: "Nationality"}
            ],
            filterable: {
                extra: false
            },
            toolbar: kendo.template($("#gridToolbar").html())
        });
        country.gridModel = $grid.data("kendoGrid");
    },

    resetGrid: function () {
        country.gridModel.dataSource.filter([]);
    },

    refreshGrid: function () {
        country.gridModel.dataSource.read();
    },

    confirmDelete: function () {
        if (!app.isRowSelected(country.gridModel)) {
            app.showErrorNotification("Please select one item to perform this action");
            return false;
        }
        app.showConfirmationModal("Delete Confirmation", "Are you sure you want to delete selected country?", country.deleteCountry);
    },

    deleteCountry: function () {
        var countryObj = app.getSelectedObjectFromGrid(country.gridModel);
        $.ajax({
            type: 'post',
            url: "country/delete?id=" + countryObj.id,
            dataType: 'json',
            success: function (response) {
                if(response.success) {
                    app.showSuccessNotification(response.message);
                    country.refreshGrid();
                } else {
                    app.showErrorNotification(response.message)
                }
            }
        });
    },

    editCountry: function () {
        if (!app.isRowSelected(country.gridModel)) {
            app.showErrorNotification("Please select one item to perform this action");
            return false;
        }
        var countryObj = app.getSelectedObjectFromGrid(country.gridModel);
        router.loadHash('#country/viewUpdate?id=' + countryObj.id)
    },

    initForm: function () {
        var $form = $('#country_form');
        $form.form({
            inline: true,
            onSuccess: function (e) {
                return app.handleSubmit(e, country.submitForm);
            },
            transition: 'drop',
            fields: {
                name: ['empty', 'maxLength[50]'],
                code: ['empty', 'maxLength[4]'],
                isdCode: ['empty', 'maxLength[10]']
            }
        });
    },

    cancel: function () {
        router.loadHash('#country');
    },

    submitForm: function () {
        var values = app.getFormValues('#country_form');
        if(values.id) {
            country.updateCountry(values);
        } else {
            country.createCountry(values);
        }
    },

    createCountry: function (values) {
        $.ajax({
            type: 'post',
            data: values,
            url: "country/create",
            dataType: 'json',
            success: function (response) {
                if(response.success) {
                    app.showSuccessNotification(response.message);
                    router.loadHash('#country')
                } else {
                    app.showErrorNotification(response.message)
                }
            }
        });
    },

    updateCountry: function (values) {
        $.ajax({
            type: 'post',
            data: values,
            url: "country/update",
            dataType: 'json',
            success: function (response) {
                if(response.success) {
                    app.showSuccessNotification(response.message);
                    router.loadHash('#country')
                } else {
                    app.showErrorNotification(response.message)
                }
            }
        });
    }
};

$(document).ready(function () {
    var identifier = $('#echo_page_identifier').val();
    if (identifier == 'view') country.initView();
    else if (identifier == 'create') country.initCreate();
    else if (identifier == 'update') country.initUpdate();
});
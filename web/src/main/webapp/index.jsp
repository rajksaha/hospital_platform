<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!doctype html>
<html lang="en" ng-app="echoApp" ng-app-root="web">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <link rel="icon" href="<c:url value="/resources/images/hos.png"/>" type="image/gif" sizes="16x16">
    <title>hospital</title>

    <%--bootstrap & jquery ui--%>
    <link href="<c:url value="/resources/javascript/lib/css/bootstrap.min.css"/>" type="text/css" rel="stylesheet" />
    <link href="<c:url value="/resources/javascript/lib/css/smt-bootstrap.css"/>" type="text/css" rel="stylesheet" />
    <link href="<c:url value="/resources/javascript/lib/css/custom-icon.css"/>" rel="stylesheet"/>
    <link href="<c:url value="/resources/javascript/lib/css/jquery-ui-1.11.0/jquery-ui.min.css"/>" rel="stylesheet"/>


    <link href="<c:url value="/resources/css/login.css"/>" rel="stylesheet"/>


    <!-- ng-table -->
    <link href="<c:url value="/resources/css/ngGallery.css"/>" rel="stylesheet"/>

    <!-- Animate.css -->
    <link href="<c:url value="/resources/javascript/lib/css/animate.css"/>" rel="stylesheet"/>
    <link href="<c:url value="/resources/javascript/lib/css/font-awesome.min.css"/>" type="text/css" rel="stylesheet" />

    <%--Application CSS--%>
    <link href="<c:url value="/resources/css/echo.css"/>" rel='stylesheet' />
    <link href="<c:url value="/resources/css/menu.css"/>" rel='stylesheet' />

    <!-- angular-block-ui -->
    <link href='<c:url value="/resources/javascript/lib/css/angular-block-ui/angular-block-ui.css" />' rel="stylesheet"/>

    <link href="<c:url value="/resources/javascript/lib/css/jquery.fileupload.css"/>" type="text/css" rel="stylesheet">

    <%--Adapt-Strap table--%>
    <link href="<c:url value="/resources/javascript/lib/javascript/adapt-strap/adapt-strap.min.css"/>" rel="stylesheet"/>


    <%--<link href="<c:url value="/resources/javascript/lib/css/imagePlugin/cropper.min.css"/>" rel="stylesheet">
    <link href="<c:url value="/resources/javascript/lib/css/imagePlugin/main.css"/>" rel="stylesheet">--%>

</head>

<body style="overflow: auto">
<div class="echo_up_fixed_portion">
    <div class="echo_header" ui-view="header"></div>
</div>

<div class="echo_bottom_compile_portion">
    <div ui-view="menu" class="echo_side_fixed_bar"></div>
    <div ui-view="status"></div>
    <div class="echo_body_portion" ui-view="container">
    </div>
</div>

<!-- Based on http://developer.yahoo.com/blogs/ydn/high-performance-sites-rule-6-move-scripts-bottom-7200.html -->
<!-- Load JS at the bottom -->


<!-- JQuery-UI -->
<script src="<c:url value="/resources/echo/js/common/jquery-3.1.1.min.js"/>" ></script>



<script type="text/javascript" src="<c:url value="/resources/javascript/lib/javascript/angular-file-upload/angular-file-upload-shim.min.js"/>"></script>

<!-- Angular -->
<script src="<c:url value="/resources/javascript/lib/javascript/angular-1.2.23/angular.js"/>"></script>

<!-- Angular modules -->
<script src="<c:url value="/resources/javascript/lib/javascript/angular-ui-modules-0.1.1/event/event.js"/>"></script>

<!-- Angular extension -->
<!-- Using angular-ui-router instead of angular-route-->
<script type="text/javascript" src="<c:url value="/resources/javascript/lib/javascript/ui-router-0.2.10/angular-ui-router.min.js"/>"></script>
<script type="text/javascript" src="<c:url value="/resources/javascript/lib/javascript/ui-bootstrap-0.12.0.js"/>"></script>
<script type="text/javascript" src="<c:url value="/resources/javascript/lib/javascript/ui-bootstrap-tpls-0.12.0.js"/>"></script>
<script type="text/javascript" src="<c:url value="/resources/javascript/lib/javascript/ng-table.min.js"/>"></script>
<script type="text/javascript" src="<c:url value="/resources/javascript/lib/javascript/ui-slider.js"/>"></script>
<script type="text/javascript" src="<c:url value="/resources/javascript/lib/javascript/ui-tinymce.js"/>"></script>
<script type="text/javascript" src="<c:url value="/resources/javascript/lib/javascript/angular-file-upload/angular-file-upload.min.js"/>"></script>



<!-- angular-block-ui -->
<script src="<c:url value="/resources/javascript/lib/javascript/angular-block-ui/angular-block-ui.js"/>"></script>

<!-- Arshaw Full Calendar -->
<script src="<c:url value="/resources/javascript/lib/javascript/moment.min.js"/>"></script>
<script src="<c:url value="/resources/javascript/lib/javascript/fullcalendar.custom.js"/>"></script>
<script src="<c:url value="/resources/javascript/lib/javascript/angular-calendar.js"/>"></script>

<!-- date formatter -->
<script src="<c:url value="/resources/javascript/lib/javascript/date.js"/>"></script>

<!-- ozLazyLoad - lazy loading -->
<script src="<c:url value="/resources/javascript/lib/javascript/ocLazyLoad.min.js"/>"></script>

<!-- Kaitair javascript/lib -->
<!-- core -->
<script src="<c:url value="/resources/javascript/app.js?v=1.0"/>"></script>
<script src="<c:url value="/resources/javascript/config.js?v=1.0"/>"></script>
<!-- listener, for login -->

<script src="<c:url value="/resources/javascript/listener.js"/>"></script>

<!-- Controllers -->
<%--<script src="<c:url value="/resources/javascript/controllers/attachment/attachmentController.js"/>"></script>--%>
<script src="<c:url value="/resources/javascript/controllers/utility/popupController.js"/>"></script>

<!-- Services -->
<script src="<c:url value="/resources/javascript/services/security/authenticationService.js"/>"></script>
<script src="<c:url value="/resources/javascript/services/applicationService.js"/>"></script>
<%--<script src="<c:url value="/resources/javascript/services/attachment/attachmentService.js"/>"></script>--%>

<!-- These are require by listener.js -->
<!-- <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script> -->


<!-- directives -->
<script src="<c:url value="/resources/javascript/directives/scroller.js"/>"></script>
<script src="<c:url value="/resources/javascript/directives/imageRepaint.js"/>"></script>
<script src="<c:url value="/resources/javascript/directives/imageZoomer.js"/>"></script>

<script src="<c:url value="/resources/javascript/directives/device-detector.js"/>"></script>
<script src="<c:url value="/resources/javascript/directives/re-tree.min.js"/>"></script>

<%--All Custom directives--%>
<script src="<c:url value="/resources/javascript/directives/enterButtonDirectives.js"/>"></script>

<%--Adapt-Strap table--%>
<script src="<c:url value="/resources/javascript/lib/javascript/adapt-strap/adapt-strap.js"/>"></script>
<script src="<c:url value="/resources/javascript/lib/javascript/adapt-strap/adapt-strap.tpl.js"/>"></script>

<script src="<c:url value="/resources/javascript/directives/echoConfirmation.js"/>"></script>
<script src="<c:url value="/resources/javascript/directives/multiselect.js"/>"></script>

<!-- <script src="javascript//javascript/ui-bootstrap-0.11.2/ui-bootstrap-tpls-0.11.2.min.js"></script> -->
<!-- filters -->
<script src="<c:url value="/resources/javascript/filters/common.js"/>"></script>
<script src="<c:url value="/resources/javascript/filters/currencyFilter.js"/>"></script>
<script src="<c:url value="/resources/javascript/filters/uniqueFilter.js"/>"></script>
<script src="<c:url value="/resources/javascript/controllers/informationModalController.js"/>"></script>
<script src="<c:url value="/resources/javascript/controllers/eClaim/common/attachmentController.js"/>"></script>
<script src="<c:url value="/resources/javascript/controllers/eClaim/common/claimDetailModalController.js"/>"></script>

<!-- Input Validator -->
<script type="text/javascript" src="<c:url value="/resources/javascript/inputValidator/inputValidator.js"/>"></script>
<script src="<c:url value="/resources/javascript/lib/javascript/angular-1.2.23/angular-resource.js"/>"></script>
<script src="<c:url value="/resources/javascript/lib/javascript/angular-1.2.23/angular-sanitize.js"/>"></script>
<script src="<c:url value="/resources/javascript/lib/javascript/angular-1.2.23/ng-cvs.js"/>"></script>
<script src="<c:url value="/resources/javascript/lib/javascript/angular-1.2.23/paging.js"/>"></script>
<script src="<c:url value="/resources/javascript/lib/javascript/ngGallery/ngGallery.js"/>"></script>
<script src="<c:url value="/resources/javascript/lib/javascript/FileSaver.js"/>"></script>



<%--Canvas plguins--%>
<link rel="stylesheet" type="text/css" href=""<c:url value="/resources/css/canvas/json-formatter.css"/>">
<script src="<c:url value="/resources/javascript/canvas/json-formatter.js"/>" type="text/javascript" charset="utf-8"></script>
<link rel="stylesheet" href="<c:url value="/resources/css/canvas/CanvasViewer.css"/>">
<link rel="stylesheet" href="<c:url value="/resources/css/canvas/style.css"/>">

<script src="<c:url value="/resources/javascript/canvas/tiff.min.js"/>" type="text/javascript" charset="utf-8"></script>
<script src="<c:url value="/resources/javascript/canvas/pdf.compat.js"/>" type="text/javascript" charset="utf-8"></script>
<script src="<c:url value="/resources/javascript/canvas/pdf.js"/>" type="text/javascript" charset="utf-8"></script>

<script src="<c:url value="/resources/javascript/canvas/FormatReader.js"/>" type="text/javascript" charset="utf-8"></script>
<script src="<c:url value="/resources/javascript/canvas/CanvasViewer.js"/>" type="text/javascript" charset="utf-8"></script>


<%--new layout--%>

<link rel="stylesheet" href="<c:url value="/resources/echo/css/application.css"/>">
<link rel="stylesheet" href="<c:url value="/resources/echo/library/google-font/source-sans-pro.css"/>">
<link rel="stylesheet" href="<c:url value="/resources/echo/library/font-awesome/css/font-awesome.min.css"/>">
<script src="<c:url value="/resources/echo/js/common/layout.js"/>" type="text/javascript" charset="utf-8"></script>

<link  rel='stylesheet' href=""<c:url value="/resources/css/superslides.css"/>" />
<script src="<c:url value="/resources/javascript/lib/jquery.superslides.js"/>"></script>

</body>
</html>

'use strict';

var httpHeaders;

var jsVersion = "?v=2";

// This will store the original URL before login sequence
var originalLocation = "/login";

app.config(function($stateProvider, $urlRouterProvider, $compileProvider, $controllerProvider, $filterProvider, $provide, $ocLazyLoadProvider, datepickerConfig, datepickerPopupConfig, blockUIConfigProvider) {


    // For any unmatched url, redirect to /login
    $urlRouterProvider.otherwise("/login");
    
    // datepicker hide week
    datepickerConfig.showWeeks = false;

    blockUIConfigProvider.requestFilter(function(config) {
        // If the request contains 'getItemForTypeHead' ...
        if(config.url.match(/getItemForTypeHead($|\/).*/)) {
            return false; // ... don't block it.
        }
    });

    var root = {
        name : 'root',
        url : '',
        abstract : true,
        views : {
            'header' : {
                templateUrl : 'resources/javascript/templates/header.html',
                controller : 'HeaderController'
            },
            'status' : {
                templateUrl : 'resources/javascript/templates/status.html',
                controller : 'MenuController'
            },
            'menu' : {
                templateUrl : 'resources/javascript/templates/menu/menu.html',
                controller : 'MenuController'
            }
        },
        resolve : {
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/controllers/header.js'  + jsVersion,
                            'resources/javascript/controllers/menu/menuController.js'  + jsVersion
                        ]
                    });
            }],
            loadMyService: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/services/eClaim/approvalLevel/approvalLevelService.js' + jsVersion, 'resources/javascript/services/user/userService.js' + jsVersion
                        ]
                    });
            }]
        }
    };

    var login = {
        name : 'login',
        url : '/login',
        views : {
            'container@' : {
                templateUrl : 'resources/javascript/templates/login/login.html',
                controller : 'LoginController'
            }
        },
        resolve : {
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
              // you can lazy load files for an existing module
              return $ocLazyLoad.load(
                {
                  name: 'echoApp',
                  files: [
                      'resources/javascript/controllers/login/loginController.js' + jsVersion,
                  ]
                });
            }],
            loadMyService: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                        ]
                    });
            }]
        }
    };

    var home = {
        name : 'root.home',
        url : '/home',
        views : {
            'container@' : {
                templateUrl : 'resources/javascript/templates/home/home.html',
                controller : 'HomeController'
            }
        },
        resolve : {
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/controllers/home/homeController.js' + jsVersion
                        ]
                    });
            }],
            loadMyService: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/services/user/userService.js' + jsVersion
                        ]
                    });
            }]
        }
    };


    var forgetPassword = {
        name : 'forgetPassword',
        url : '/forgetPassword',
        views : {
            'header' : {
                templateUrl : 'resources/javascript/templates/header.html',
                controller : 'HeaderController'
            },
            'container@' : {
                templateUrl : 'resources/javascript/templates/user/forgetPassword.html',
                controller : 'ForgetPasswordController'
            },
            'footer' : {
                templateUrl : 'resources/javascript/templates/footer.html',
                controller : 'FooterController'
            }
        },
        resolve : {
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/controllers/user/forgetPasswordController.js' + jsVersion,
                            'resources/javascript/controllers/footer.js'  + jsVersion,
                            'resources/javascript/controllers/header.js'  + jsVersion
                        ]
                    });
            }],
            loadMyService: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/services/user/userService.js' + jsVersion
                        ]
                    });
            }]
        }
    };

    var resetPassword = {
        name : 'resetPassword',
        url : '/resetPassword?key',
        views : {
            'header' : {
                templateUrl : 'resources/javascript/templates/header.html',
                controller : 'HeaderController'
            },
            'container@' : {
                templateUrl : 'resources/javascript/templates/user/resetPassword.html',
                controller : 'ResetPasswordController'
            },
            'footer' : {
                templateUrl : 'resources/javascript/templates/footer.html',
                controller : 'FooterController'
            }
        },
        resolve : {
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/controllers/user/resetPasswordController.js' + jsVersion,
                            'resources/javascript/controllers/footer.js'  + jsVersion,
                            'resources/javascript/controllers/header.js'  + jsVersion
                        ]
                    });
            }],
            loadMyService: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/services/user/userService.js' + jsVersion
                        ]
                    });
            }]
        }
    };

    var category = {
        name  : 'root.category',
        url   : '/category',
        views : {
            'container@' : {
                templateUrl : 'resources/javascript/templates/eClaim/category/category.html',
                controller : 'CategoryController'
            }
        },
        resolve : {
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/controllers/eClaim/category/categoryController.js' + jsVersion
                        ]
                    });
            }],
            loadMyService: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/services/eClaim/category/categoryService.js' + jsVersion
                        ]
                    });
            }]
        }
    };

    var categoryField = {
        name  : 'root.categoryField',
        url   : '/categoryField?categoryID',
        views : {
            'container@' : {
                templateUrl : 'resources/javascript/templates/eClaim/category/categoryField.html',
                controller : 'CategoryFieldController'
            }
        },
        resolve : {
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/controllers/eClaim/category/categoryFieldController.js' + jsVersion
                        ]
                    });
            }],
            loadMyService: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/services/eClaim/category/categoryService.js' + jsVersion
                        ]
                    });
            }]
        }
    };

    var categoryRule = {
        name  : 'root.categoryRule',
        url   : '/categoryRule?categoryID',
        views : {
            'container@' : {
                templateUrl : 'resources/javascript/templates/eClaim/category/categoryRule.html',
                controller : 'CategoryRuleController'
            }
        },
        resolve : {
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/controllers/eClaim/category/categoryRuleController.js' + jsVersion
                        ]
                    });
            }],
            loadMyService: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/services/eClaim/category/categoryService.js' + jsVersion,
                            'resources/javascript/services/eClaim/contentDetailService.js' + jsVersion
                        ]
                    });
            }]
        }
    };


    var subCategoryType = {
        name  : 'root.subCategoryType',
        url   : '/subCategoryType?categoryID',
        views : {
            'container@' : {
                templateUrl : 'resources/javascript/templates/eClaim/category/subCategoryType.html',
                controller : 'SubCategoryTypeController'
            }
        },
        resolve : {
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/controllers/eClaim/category/subCategoryTypeController.js' + jsVersion
                        ]
                    });
            }],
            loadMyService: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/services/eClaim/category/categoryService.js' + jsVersion
                        ]
                    });
            }]
        }
    };


    var subCategory = {
        name  : 'root.subCategory',
        url   : '/subCategory?subCategoryTypeID?categoryID',
        views : {
            'container@' : {
                templateUrl : 'resources/javascript/templates/eClaim/category/subCategory.html',
                controller : 'SubCategoryController'
            }
        },
        resolve : {
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/controllers/eClaim/category/subCategoryController.js' + jsVersion
                        ]
                    });
            }],
            loadMyService: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/services/eClaim/category/categoryService.js' + jsVersion
                        ]
                    });
            }]
        }
    };

    var claimForm = {
        name  : 'root.claimForm',
        url   : '/claimForm?claimType',
        views : {
            'container@' : {
                templateUrl : 'resources/javascript/templates/eClaim/claimForm/claimForm.html',
                controller : 'ClaimFormController'
            }
        },
        resolve : {
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/controllers/eClaim/claimForm/claimFormController.js' + jsVersion
                        ]
                    });
            }],
            loadMyService: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/services/eClaim/category/categoryService.js' + jsVersion, 'resources/javascript/services/eClaim/globalSetup/globalSetupService.js' + jsVersion,
                            'resources/javascript/services/eClaim/claim/claimService.js' + jsVersion, 'resources/javascript/services/eClaim/claim/claimValidationService.js' + jsVersion,
                            'resources/javascript/services/user/userService.js' + jsVersion
                        ]
                    });
            }]
        }
    };

    var claimFormSingle = {
        name  : 'root.claimFormSingle',
        url   : '/claimFormSingle',
        views : {
            'container@' : {
                templateUrl : 'resources/javascript/templates/eClaim/claimFormSingle/claimForm.html',
                controller : 'ClaimFormSingleController'
            }
        },
        resolve : {
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/controllers/eClaim/claimFormSingle/claimFormController.js' + jsVersion
                        ]
                    });
            }],
            loadMyService: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/services/eClaim/category/categoryService.js' + jsVersion,
                            'resources/javascript/services/eClaim/claim/claimService.js' + jsVersion
                        ]
                    });
            }]
        }
    };

    var claimList = {
        name  : 'root.claimList',
        url   : '/claimList?claimType',
        views : {
            'container@' : {
                templateUrl : 'resources/javascript/templates/eClaim/claimForm/claimList.html',
                controller : 'ClaimListController'
            }
        },
        resolve : {
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/controllers/eClaim/claimForm/claimListController.js' + jsVersion
                        ]
                    });
            }],
            loadMyService: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/services/eClaim/category/categoryService.js' + jsVersion, 'resources/javascript/services/eClaim/globalSetup/globalSetupService.js' + jsVersion,
                            'resources/javascript/services/eClaim/claim/claimService.js' + jsVersion, 'resources/javascript/services/eClaim/claim/claimValidationService.js' + jsVersion,
                            'resources/javascript/services/user/userService.js' + jsVersion, 'resources/javascript/services/eClaim/approvalLevel/approvalLevelService.js' + jsVersion
                        ]
                    });
            }]
        }
    };

    var adminClaimList = {
        name  : 'root.adminClaimList',
        url   : '/adminClaimList',
        views : {
            'container@' : {
                templateUrl : 'resources/javascript/templates/eClaim/claimForm/adminClaimList.html',
                controller : 'AdminClaimListController'
            }
        },
        resolve : {
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/controllers/eClaim/claimForm/adminClaimListController.js' + jsVersion
                        ]
                    });
            }],
            loadMyService: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/services/eClaim/category/categoryService.js' + jsVersion,
                            'resources/javascript/services/eClaim/claim/claimService.js' + jsVersion
                        ]
                    });
            }]
        }
    };

    var adminSetup = {
        name  : 'root.adminSetup',
        url   : '/adminSetup',
        views : {
            'container@' : {
                templateUrl : 'resources/javascript/templates/eClaim/adminSetup/adminSetup.html',
                controller : 'AdminSetupController'
            }
        },
        resolve : {
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/controllers/eClaim/adminSetup/adminSetupController.js' + jsVersion
                        ]
                    });
            }],
            loadMyService: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/services/eClaim/category/categoryService.js' + jsVersion, 'resources/javascript/services/eClaim/claim/claimService.js' + jsVersion
                        ]
                    });
            }]
        }
    };

    var approval = {
        name  : 'root.approval',
        url   : '/approval?claimType?actionState',
        views : {
            'container@' : {
                templateUrl : 'resources/javascript/templates/eClaim/approval/approval.html',
                controller : 'ApprovalController'
            }
        },
        resolve : {
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/controllers/eClaim/approval/approvalController.js' + jsVersion
                        ]
                    });
            }],
            loadMyService: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/services/eClaim/category/categoryService.js' + jsVersion, 'resources/javascript/services/eClaim/claim/claimService.js' + jsVersion,
                            'resources/javascript/services/eClaim/approval/approvalService.js' + jsVersion, 'resources/javascript/services/eClaim/approvalLevel/approvalLevelService.js' + jsVersion
                        ]
                    });
            }]
        }
    };

    var globalSetup = {
        name  : 'root.globalSetup',
        url   : '/globalSetup',
        views : {
            'container@' : {
                templateUrl : 'resources/javascript/templates/eClaim/globalSetup/globalSetup.html',
                controller : 'GlobalSetupController'
            }
        },
        resolve : {
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/controllers/eClaim/globalSetup/globalSetupController.js' + jsVersion
                        ]
                    });
            }],
            loadMyService: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/services/eClaim/globalSetup/globalSetupService.js' + jsVersion
                        ]
                    });
            }]
        }
    };

    var userUpload = {
        name  : 'root.userUpload',
        url   : '/userUpload',
        views : {
            'container@' : {
                templateUrl : 'resources/javascript/templates/eClaim/userUpload/userUpload.html',
                controller : 'UserUploadController'
            }
        },
        resolve : {
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/controllers/eClaim/userUpload/userUploadController.js' + jsVersion
                        ]
                    });
            }],
            loadMyService: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/services/eClaim/userUpload/userUploadService.js' + jsVersion, 'resources/javascript/services/echo/echoCommonService.js' + jsVersion
                        ]
                    });
            }]
        }
    };

    var user = {
        name  : 'root.user',
        url   : '/user',
        views : {
            'container@' : {
                templateUrl : 'resources/javascript/templates/user/user.html',
                controller : 'UserController'
            }
        },
        resolve : {
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/controllers/user/userController.js' + jsVersion
                        ]
                    });
            }],
            loadMyService: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/services/user/userService.js' + jsVersion, 'resources/javascript/services/user/userManagementService.js' + jsVersion, 'resources/javascript/services/echo/echoCommonService.js' + jsVersion, 'resources/javascript/services/eClaim/contentDetailService.js' + jsVersion
                        ]
                    });
            }]
        }
    };

    var userGroup = {
        name  : 'root.userGroup',
        url   : '/userGroup',
        views : {
            'container@' : {
                templateUrl : 'resources/javascript/templates/user/userGroup.html',
                controller : 'UserGroupController'
            }
        },
        resolve : {
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/controllers/user/userGroupController.js' + jsVersion
                        ]
                    });
            }],
            loadMyService: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/services/user/userManagementService.js' + jsVersion, 'resources/javascript/services/echo/echoCommonService.js' + jsVersion
                        ]
                    });
            }]
        }
    };

    var groupPermission = {
        name  : 'root.groupPermission',
        url   : '/groupPermission',
        views : {
            'container@' : {
                templateUrl : 'resources/javascript/templates/user/groupPermission.html',
                controller : 'GroupPermissionController'
            }
        },
        resolve : {
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/controllers/user/groupPermissionController.js' + jsVersion
                        ]
                    });
            }],
            loadMyService: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/services/user/userManagementService.js'  + jsVersion,'resources/javascript/services/echo/echoCommonService.js' + jsVersion
                        ]
                    });
            }]
        }
    };


    var module = {
        name  : 'root.module',
        url   : '/module',
        views : {
            'container@' : {
                templateUrl : 'resources/javascript/templates/echo/module/module.html',
                controller : 'ModuleController'
            }
        },
        resolve : {
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/controllers/echo/module/moduleController.js' + jsVersion
                        ]
                    });
            }],
            loadMyService: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/services/echo/echoCommonService.js' + jsVersion, 'resources/javascript/services/otc/dashboard/dashboardService.js' + jsVersion
                        ]
                    });
            }]
        }
    };

    var company = {
        name  : 'root.company',
        url   : '/company',
        views : {
            'container@' : {
                templateUrl : 'resources/javascript/templates/echo/company/company.html',
                controller : 'CompanyController'
            }
        },
        resolve : {
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/controllers/echo/company/companyController.js' + jsVersion
                        ]
                    });
            }],
            loadMyService: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/services/echo/echoCommonService.js' + jsVersion
                        ]
                    });
            }]
        }
    };

    var companyModule = {
        name  : 'root.companyModule',
        url   : '/companyModule',
        views : {
            'container@' : {
                templateUrl : 'resources/javascript/templates/echo/companyModule/companyModule.html',
                controller : 'CompanyModuleController'
            }
        },
        resolve : {
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/controllers/echo/companyModule/companyModuleController.js' + jsVersion
                        ]
                    });
            }],
            loadMyService: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/services/echo/echoCommonService.js' + jsVersion
                        ]
                    });
            }]
        }
    };

    var approvalLevel = {
        name  : 'root.approvalLevel',
        url   : '/approvalLevel',
        views : {
            'container@' : {
                templateUrl : 'resources/javascript/templates/eClaim/approvalLevel/approvalLevel.html',
                controller : 'ApprovalLevelController'
            }
        },
        resolve : {
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/controllers/eClaim/approvalLevel/approvalLevelController.js' + jsVersion
                        ]
                    });
            }],
            loadMyService: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/services/eClaim/approvalLevel/approvalLevelService.js' + jsVersion
                        ]
                    });
            }]
        }
    };

    var companyFormation = {
        name  : 'root.companyFormation',
        url   : '/companyFormation',
        views : {
            'container@' : {
                templateUrl : 'resources/javascript/templates/eClaim/companyFormation/companyFormation.html',
                controller : 'CompanyFormationController'
            }
        },
        resolve : {
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/controllers/eClaim/companyFormation/companyFormationController.js' + jsVersion
                        ]
                    });
            }],
            loadMyService: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/services/eClaim/contentDetailService.js' + jsVersion, 'resources/javascript/services/eClaim/companyFormation/companyFormationService.js' + jsVersion
                        ]
                    });
            }]
        }
    };

    var pendingOriginal = {
        name  : 'root.pendingOriginal',
        url   : '/pendingOriginal',
        views : {
            'container@' : {
                templateUrl : 'resources/javascript/templates/eClaim/orgDocument/pendingDocument.html',
                controller : 'PendingDocumentController'
            }
        },
        resolve : {
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/controllers/eClaim/orgDocument/pendingDocumentController.js' + jsVersion
                        ]
                    });
            }],
            loadMyService: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/services/eClaim/approval/approvalService.js' + jsVersion, 'resources/javascript/services/eClaim/approvalLevel/approvalLevelService.js' + jsVersion
                        ]
                    });
            }]
        }
    };

    var eClaimReport = {
        name  : 'root.eClaimReport',
        url   : '/eClaimReport?claimType',
        views : {
            'container@' : {
                templateUrl : 'resources/javascript/templates/eClaim/report/eClaimReport.html',
                controller : 'EClaimReportController'
            }
        },
        resolve : {
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/controllers/eClaim/report/eClaimReportController.js' + jsVersion
                        ]
                    });
            }],
            loadMyService: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/services/eClaim/report/eClaimReportService.js' + jsVersion
                        ]
                    });
            }]
        }
    };




    var masterReport = {
        name  : 'root.masterReport',
        url   : '/masterReport',
        views : {
            'container@' : {
                templateUrl : 'resources/javascript/templates/otc/dashboard/masterReport.html',
                controller : 'MasterReportController'
            }
        },
        resolve : {
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/controllers/otc/dashboard/masterReportController.js' + jsVersion
                        ]
                    });
            }],
            loadMyService: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/services/otc/dashboard/dashboardService.js' + jsVersion
                        ]
                    });
            }]
        }
    };


    var reportTracker = {
        name  : 'root.reportTracker',
        url   : '/reportTracker',
        views : {
            'container@' : {
                templateUrl : 'resources/javascript/templates/otc/dashboard/reportTracker.html',
                controller : 'ReportTrackerController'
            }
        },
        resolve : {
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/controllers/otc/dashboard/reportTrackerController.js' + jsVersion
                        ]
                    });
            }],
            loadMyService: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/services/otc/dashboard/dashboardService.js' + jsVersion
                        ]
                    });
            }]
        }
    };

    var inputCompleteness = {
        name  : 'root.inputCompleteness',
        url   : '/inputCompleteness',
        views : {
            'container@' : {
                templateUrl : 'resources/javascript/templates/otc/dashboard/inputCompleteness.html',
                controller : 'InputCompletenessController'
            }
        },
        resolve : {
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/controllers/otc/dashboard/inputCompletenessController.js' + jsVersion
                        ]
                    });
            }],
            loadMyService: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/services/otc/dashboard/dashboardService.js' + jsVersion
                        ]
                    });
            }]
        }
    };

    var npsScore = {
        name  : 'root.npsScore',
        url   : '/npsScore',
        views : {
            'container@' : {
                templateUrl : 'resources/javascript/templates/otc/dashboard/npsScore.html',
                controller : 'NpsScoreController'
            }
        },
        resolve : {
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/controllers/otc/dashboard/npsScoreController.js' + jsVersion
                        ]
                    });
            }],
            loadMyService: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/services/otc/dashboard/dashboardService.js' + jsVersion
                        ]
                    });
            }]
        }
    };


    var companyTax = {
        name  : 'root.companyTax',
        url   : '/companyTax',
        views : {
            'container@' : {
                templateUrl : 'resources/javascript/templates/eClaim/companyTax/companyTax.html',
                controller : 'CompanyTaxController'
            }
        },
        resolve : {
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/controllers/eClaim/companyTax/companyTaxController.js' + jsVersion
                        ]
                    });
            }],
            loadMyService: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/services/eClaim/companyTax/companyTaxService.js' + jsVersion
                        ]
                    });
            }]
        }
    };


    var viewClaim = {
        name  : 'root.viewClaim',
        url   : '/viewClaim?claimType',
        views : {
            'container@' : {
                templateUrl : 'resources/javascript/templates/eClaim/adminSetup/viewClaim.html',
                controller : 'ViewClaimController'
            }
        },
        resolve : {
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/controllers/eClaim/adminSetup/viewClaimController.js' + jsVersion
                        ]
                    });
            }],
            loadMyService: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/services/eClaim/approval/approvalService.js' + jsVersion, 'resources/javascript/services/eClaim/approvalLevel/approvalLevelService.js' + jsVersion
                        ]
                    });
            }]
        }
    };

    var userOutlet = {
        name  : 'root.userOutlet',
        url   : '/userOutlet',
        views : {
            'container@' : {
                templateUrl : 'resources/javascript/templates/otc/userOutlet/userOutlet.html',
                controller : 'UserOutletController'
            }
        },
        resolve : {
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/controllers/otc/userOutlet/userOutletController.js' + jsVersion
                        ]
                    });
            }],
            loadMyService: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/services/eClaim/approval/approvalService.js' + jsVersion, 'resources/javascript/services/otc/dashboard/dashboardService.js' + jsVersion
                        ]
                    });
            }]
        }
    };

    var approvalOnBehalf = {
        name  : 'root.approvalOnBehalf',
        url   : '/approvalOnBehalf?claimType',
        views : {
        'container@' : {
            templateUrl : 'resources/javascript/templates/eClaim/approvalOnBehalf/approvalOnBehalf.html',
                controller : 'ApprovalOnBehalfController'
        }
    },
    resolve : {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load(
                {
                    name: 'echoApp',
                    files: [
                        'resources/javascript/controllers/eClaim/approvalOnBehalf/approvalOnBehalfController.js' + jsVersion
                    ]
                });
        }],
            loadMyService: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load(
                {
                    name: 'echoApp',
                    files: [
                        'resources/javascript/services/eClaim/approval/approvalService.js' + jsVersion, 'resources/javascript/services/eClaim/approvalLevel/approvalLevelService.js' + jsVersion, 'resources/javascript/services/eClaim/companyTax/companyTaxService.js' + jsVersion
                    ]
                });
        }]
    }
    };



    $stateProvider
        .state(root)
        .state(login)
        .state(home)
        .state(forgetPassword)
        .state(resetPassword)
        .state(category)
        .state(categoryField)
        .state(categoryRule)
        .state(subCategoryType)
        .state(subCategory)
        .state(adminSetup)
        .state(claimList)
        .state(adminClaimList)
        .state(claimForm)
        .state(claimFormSingle)
        .state(approval)
        .state(globalSetup)
        .state(userUpload)
        .state(user)
        .state(groupPermission)
        .state(userGroup)
        .state(module)
        .state(company)
        .state(companyModule)
        .state(approvalLevel)
        .state(companyFormation)
        .state(pendingOriginal)
        .state(eClaimReport)
        .state(inputCompleteness)
        .state(reportTracker)
        .state(npsScore)
        .state(companyTax)
        .state(viewClaim)
        .state(masterReport)
        .state(approvalOnBehalf)
        .state(userOutlet);

    //set debug:true if need ocLazyLoad log
	$ocLazyLoadProvider.config({debug:false, events:true});
	
});

app.config(function ($httpProvider) {
    //configure $http to view a login whenever a 401 unauthorized response arrives
    //$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    $httpProvider.responseInterceptors.push(function ($rootScope, $q, blockUI) {
        return function (promise) {
            return promise.then(
                //success -> don't intercept
                function (response) {
                    return response;
                },
                //error -> if 401 save the request and broadcast an event
                function (response) {
                    blockUI.stop();
                    if (response.status === 401) {
                        // Set the message why is unauthorized
                        $rootScope.warn = true;
                        $rootScope.warnMessage = response.data.message;

                        var deferred = $q.defer(),
                            req = {
                                config: response.config,
                                deferred: deferred
                            };
                        $rootScope.requests401.push(req);
                        //Hide and remove all open dialog.
                        $('.modal-backdrop').hide();
                        $(".modal").remove();
                        $rootScope.$broadcast('event:loginRequired');
                        return deferred.promise;
                    }
                    if (response.status === 403) {
                        // Set the message why is forbidden
                        $rootScope.warn = true;
                        $rootScope.warnMessage = response.data.message;

                        var deferred = $q.defer(),
                            req = {
                                config: response.config,
                                deferred: deferred
                            };
                        //Hide and remove all open dialog.
                        $('.modal-backdrop').hide();
                        $(".modal").remove();
                        return deferred.promise;
                    }
                    return $q.reject(response);
                }
            );
        };
    });
    httpHeaders = $httpProvider.defaults.headers;
});

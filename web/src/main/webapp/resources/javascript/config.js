'use strict';

var httpHeaders;

var jsVersion = "?v=13";

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

    var doctor = {
        name  : 'root.doctor',
        url   : '/doctor',
        views : {
            'container@' : {
                templateUrl : 'resources/javascript/templates/doctor/doctor.html',
                controller : 'DoctorController'
            }
        },
        resolve : {
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/controllers/doctor/doctorController.js' + jsVersion
                        ]
                    });
            }],
            loadMyService: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/services/user/userService.js' + jsVersion,
                            'resources/javascript/services/user/userManagementService.js' + jsVersion,
                            'resources/javascript/services/echo/echoCommonService.js' + jsVersion,
                            'resources/javascript/services/eClaim/contentDetailService.js' + jsVersion
                        ]
                    });
            }]
        }
    };

    var patient = {
        name  : 'root.patient',
        url   : '/patient',
        views : {
            'container@' : {
                templateUrl : 'resources/javascript/templates/patient/patient.html',
                controller : 'PatientController'
            }
        },
        resolve : {
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/controllers/patient/patientController.js' + jsVersion
                        ]
                    });
            }],
            loadMyService: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/services/user/userService.js' + jsVersion,
                            'resources/javascript/services/user/userManagementService.js' + jsVersion,
                            'resources/javascript/services/echo/echoCommonService.js' + jsVersion,
                            'resources/javascript/services/eClaim/contentDetailService.js' + jsVersion
                        ]
                    });
            }]
        }
    };

    var appointment = {
        name  : 'root.appointment',
        url   : '/appointment',
        views : {
            'container@' : {
                templateUrl : 'resources/javascript/templates/appointment/appointment.html',
                controller : 'AppointmentController'
            }
        },
        resolve : {
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/controllers/appointment/appointmentController.js' + jsVersion
                        ]
                    });
            }],
            loadMyService: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/services/appointment/appointmentService.js' + jsVersion
                        ]
                    });
            }]
        }
    };

    var doctorAppointment = {
        name  : 'root.doctorAppointment',
        url   : '/doctorAppointment',
        views : {
            'container@' : {
                templateUrl : 'resources/javascript/templates/doctorAppointment/doctorAppointment.html',
                controller : 'DoctorAppointmentController'
            }
        },
        resolve : {
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/controllers/doctorAppointment/doctorAppointmentController.js' + jsVersion
                        ]
                    });
            }],
            loadMyService: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/services/appointment/appointmentService.js' + jsVersion
                        ]
                    });
            }]
        }
    };

    var prescription = {
        name : 'root.prescription',
        url : '/prescription?appointmentID',
        views : {
            'container@' : {
                templateUrl : 'resources/javascript/templates/prescription/prescription.html',
                controller : 'PrescriptionController'
            }
        },
        resolve : {
            loadMyService: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: ['resources/javascript/services/jsonService.js' + jsVersion,
                            'resources/javascript/services/appointment/appointmentService.js' + jsVersion,
                            'resources/javascript/services/prescription/prescriptionService.js' + jsVersion
                        ]
                    });
            }],
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load(
                    {
                        name: 'echoApp',
                        files: [
                            'resources/javascript/controllers/prescription/prescriptionController.js' + jsVersion,
                            'resources/javascript/controllers/prescription/prescribeDrugsController.js' + jsVersion,
                            'resources/javascript/controllers/prescription/prescribeInvController.js' + jsVersion
                        ]
                    });
            }]

        }
    };

    var drugs = {
        name : 'root.drugs',
        url : '/drugs',
        views : {
            'container@' : {
                templateUrl : 'resources/javascript/templates/drugs/drugs.html',
                controller : 'PrescribeDrugsController'
            }
        },
        resolve : {
            loadMyService: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(
                    {
                        name: 'doctorPlatform',
                        files: ['resources/javascript/services/jsonService.js' + jsVersion]
                    });
            }],
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load(
                    {
                        name: 'doctorPlatform',
                        files: ['resources/javascript/controllers/drugs/drugs.js' ]
                    });
            }]
        }
    };

    var inv = {
        name : 'root.inv',
        url : '/inv',
        views : {
            'container@' : {
                templateUrl : 'resources/javascript/templates/inv/inv.html',
                controller : 'PrescribeInvController'
            }
        },
        resolve : {
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load(
                    {
                        name: 'doctorPlatform',
                        files: ['resources/javascript/controllers/inv/inv.js' ]
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
        .state(globalSetup)
        .state(userUpload)
        .state(user)
        .state(groupPermission)
        .state(userGroup)
        .state(module)
        .state(company)
        .state(companyModule)
        .state(doctor)
        .state(patient)
        .state(appointment)
        .state(doctorAppointment)
        .state(prescription)

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

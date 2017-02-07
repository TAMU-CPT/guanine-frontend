window._ = require('lodash');
require('angular');
require('angular-route');
require('restangular');
require('angular-resource');
require('angular-material');
require('angular-material-icons');
require('angular-aria');
require('angular-gravatar');
require('angular-material-data-table');
require('angular-messages');
require('angular-animate');
require('jquery');
require('ngstorage');
require('angular-jwt');
require('../css/main.scss');
var Raven = require('raven-js');

Raven
    .config('https://5300df7cc5aa4af2a2571f94fd50a610@cptgnome.tamu.edu/9')
    .addPlugin(require('raven-js/plugins/angular'), angular)
    .install();

var guanineApp = angular.module('guanineApp', [
    'ngRaven',
    'ngRoute',
    'restangular',
    'ngMdIcons',
    'ngMaterial',
    'ui.gravatar',
    'ngMessages',
    'ngAnimate',
    'md.data.table',
    'ngStorage' // https://github.com/gsklee/ngStorage
]);


guanineApp.config(['$routeProvider', '$httpProvider', '$mdThemingProvider', 'gravatarServiceProvider', 'RestangularProvider', 'DRF_URL',
    function($routeProvider, $httpProvider, $mdThemingProvider, gravatarServiceProvider, RestangularProvider, DRF_URL) {
        gravatarServiceProvider.defaults = {
          size     : 100,
          "default": 'mm'  // Mystery man as default for missing avatars
        };
        gravatarServiceProvider.secure = true;
        gravatarServiceProvider.protocol = 'my-protocol';

        $mdThemingProvider.definePalette('myPalette', {
            '50': 'd7f4ef',
            '100': 'c4eee7',
            '200': 'b334aa',
            '300': 'b334ab',
            '400': 'b334ac',
            '500': '34b3a0',
            '600': '288a7c',
            '700': 'b334ae',
            '800': 'b334af',
            '900': 'b334a1',
            'A100': 'b334a2',
            'A200': 'b334a3',
            'A400': 'b334a4',
            'A700': 'b334a5',
            'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                                // on this palette should be dark or light

            'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
             '200', '300', '400', 'A100'],
            'contrastLightColors': undefined    // could also specify this if default was 'dark'
        });
        $mdThemingProvider.theme('default')
            .primaryPalette('myPalette')

        $routeProvider.
            when('/courses/:courseID', {
                title: "Course",
                templateUrl: 'partials/course-detail.html',
                controller: 'CourseDetailCtrl'
            }).
            when('/courses/', {
                title: "Course List",
                templateUrl: 'partials/course-list.html',
                controller: 'CourseListCtrl'
            }).
            when('/courses/:courseID/assessment/:quizID/regrade', {
                title: "Regrade Assessment",
                templateUrl: 'partials/regrade.html',
                controller: 'QuizRegradeCtrl'
            }).
            when('/courses/:courseID/assessment/:quizID', {
                title: "Assessment",
                templateUrl: 'partials/assessment-detail.html',
                controller: 'QuizDetailCtrl'
            }).
            when('/courses/:courseID/students/:studentID', {
                title: "Student Detail",
                templateUrl: 'partials/student-detail.html',
                controller: 'StudentDetailCtrl'
            }).
            when('/login', {
                title: "Login",
                templateUrl: 'partials/login.html',
                controller: 'LoginCtrl'
            }).
            when('/logout', {
                title: "Logout",
                templateUrl: 'partials/login.html',
                controller: 'LogOutCtrl'
            }).
            when('/', {
                title: "Home",
                templateUrl: 'partials/home.html',
                controller: 'HomeCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });

            //function loginRequired($q, $location, $localStorage) {
                //var deferred = $q.defer();
                //if ($localStorage.jwtToken) {
                    //deferred.resolve();
                //} else {
                    //$location.path('/login');
                //}
                //return deferred.promise;
            //};
        RestangularProvider.setBaseUrl(DRF_URL);
        RestangularProvider.setRequestSuffix('/');
        RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
            var extractedData;
            // .. to look for getList operations
            if (operation === "getList") {
            // .. and handle the data and meta data
                extractedData = data.results;
                extractedData.meta = {
                    'count': data.count,
                    'next': data.next,
                    'previous': data.previous
                }
            } else {
                extractedData = data;
            }
            return extractedData;
        });

        $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {
            return {
               'request': function (config) {
                   config.headers = config.headers || {};
                   if ($localStorage.jwtToken) {
                       config.headers.Authorization = 'JWT ' + $localStorage.jwtToken;
                   }
                   return config;
               },
               'responseError': function (response) {
                   console.log('Failed with', response.status, 'status');
                   if (response.status == 401 || response.status == 403 || response.status == 400 || response.status == 500) {
                       console.log("Bad authentication");
                       //$location.path('/login');
                   } else if (response.status == -1){
                       console.log("Backend server unavailable");
                   }
                   return $q.reject(response);
               }
           };
        }]);
}]);

require('./directives.js')(guanineApp);
require('./factory.js')(guanineApp);
require('./filter.js')(guanineApp);
require('./service.js')(guanineApp);
require('./const.js')(guanineApp);
require('./ctrl/course/list.js')(guanineApp);
require('./ctrl/course/detail.js')(guanineApp);
//require('./ctrl/student/list.js')(guanineApp);
require('./ctrl/student/detail.js')(guanineApp);
require('./ctrl/nav.js')(guanineApp);
require('./ctrl/login.js')(guanineApp);
require('./ctrl/logout.js')(guanineApp);
require('./ctrl/home.js')(guanineApp);
require('./ctrl/quiz/detail.js')(guanineApp);
require('./ctrl/quiz/regrade.js')(guanineApp);

guanineApp.run(['$rootScope', function($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);

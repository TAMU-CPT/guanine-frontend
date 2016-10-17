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
require('ns-popover');
var moment = require('moment');

var guanineApp = angular.module('guanineApp', [
    'ngRoute',
    'restangular',
    'ngMdIcons',
    'ngMaterial',
    'ui.gravatar',
    'ngMessages',
    'ngAnimate',
    'md.data.table',
    'nsPopover',
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
            '50': 'b334af',
            '100': 'b334af',
            '200': 'b334af',
            '300': 'b334af',
            '400': 'b334af',
            '500': '34b3a0',
            '600': 'b334af',
            '700': 'b334af',
            '800': 'b334af',
            '900': 'b334af',
            'A100': 'b334af',
            'A200': 'b334af',
            'A400': 'b334af',
            'A700': 'b334af',
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
                templateUrl: 'partials/course-detail.html',
                controller: 'CourseDetailCtrl'
            }).
            //when('/students', {
                //templateUrl: 'partials/student-list.html',
                //controller: 'StudentListCtrl'
            //}).
            //when('/students/:studentID', {
                //templateUrl: 'partials/student-detail.html',
                //controller: 'StudentDetailCtrl'
            //}).
            when('/login', {
                templateUrl: 'partials/login.html',
                controller: 'LoginCtrl'
            }).
            when('/logout', {
                templateUrl: 'partials/login.html',
                controller: 'LogOutCtrl'
            }).
            //when('/help', {
                //templateUrl: 'partials/help.html',
                //controller: 'HelpCtrl'
            //}).
            when('/', {
                templateUrl: 'partials/course-list.html',
                controller: 'CourseListCtrl'
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
                       console.log('bad');
                       //$location.path('/login');
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
//require('./ctrl/student/detail.js')(guanineApp);
require('./ctrl/nav.js')(guanineApp);
require('./ctrl/login.js')(guanineApp);
require('./ctrl/logout.js')(guanineApp);
//require('./ctrl/help.js')(guanineApp);

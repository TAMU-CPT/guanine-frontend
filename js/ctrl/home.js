var jwt_decode = require('jwt-decode');

export default function(guanineApp) {
    guanineApp.controller('HomeCtrl', ['$scope', '$localStorage', '$location', 'Restangular', '$mdLoginToast', '$http', 'DRF_URL',
        function($scope, $localStorage, $location, Restangular, $mdLoginToast, $http, DRF_URL) {
            if ($scope.nav.userData.username) {
                $location.path('/courses/');
            }

            $scope.saveData = function() {
                $scope.userData = {
                    'username':$scope.prof.email,
                    'password':$scope.prof.pw1,
                }
                Restangular.all('users').post({
                    username: $scope.prof.email,
                    email: $scope.prof.email,
                    password: $scope.prof.pw1,
                })
                .then(function(course) {
                    $http.post(DRF_URL + 'api-token-auth/', $scope.userData)
                        .success(function(data) {
                            $localStorage.jwtToken = data.token;
                            $localStorage.jwtData = jwt_decode(data.token);
                            $scope.nav.userData = $localStorage.jwtData;
                            $mdLoginToast.show('Success');
                            $location.path('/courses');
                        })
                        .error(function() {
                            $mdLoginToast.show('Something went wrong.');
                        });
                }, function() {
                    $mdLoginToast.show('Something went wrong.');
                });
            };
    }]);
}

export default function(guanineApp) {
    guanineApp.controller('HomeCtrl', ['$scope', '$localStorage', '$location',
        function($scope, $localStorage, $location) {
            if ($scope.nav.userData.username) {
                $location.path('/courses/');
            }
    }]);
}

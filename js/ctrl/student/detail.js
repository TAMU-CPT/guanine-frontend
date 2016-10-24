export default function(guanineApp) {
    guanineApp.controller('StudentDetailCtrl', ['$scope', 'Restangular', '$location', '$routeParams',
        function($scope, Restangular, $location, $routeParams) {
            Restangular.one('students', $routeParams.studentID).get().then(function(data) {
                $scope.student = data;
            });
    }]);
}

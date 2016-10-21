export default function(guanineApp) {
    guanineApp.controller('CourseDetailCtrl', ['$scope', 'Restangular', '$location', '$routeParams',
        function($scope, Restangular, $location, $routeParams) {
            Restangular.one('courses', $routeParams.courseID).get().then(function(data) {
                $scope.course = data;
            });
    }]);
}

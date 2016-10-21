export default function(guanineApp) {
    guanineApp.controller('CourseDetailCtrl', ['$scope', 'Restangular', '$location', '$routeParams',
        function($scope, Restangular, $location, $routeParams) {
            Restangular.one('courses', $routeParams.courseID).get().then(function(data) {
                $scope.course = data;
            });

            $scope.options = {
                limitSelect: true,
                pageSelect: true
            };

            $scope.query = {
                limit: 5,
                page: 1,
                order: 'name',
            };
    }]);
}

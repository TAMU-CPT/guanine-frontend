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
                limit: 10,
                page: 1,
                order: 'name',
            };

            // go to student detail
            $scope.go = function(id) {
                $location.path('/students/' + id);
            };
    }]);
}

var moment = require('moment');

export default function(guanineApp) {
    guanineApp.controller('CourseDetailCtrl', ['$scope', 'Restangular', '$location', '$routeParams',
        function($scope, Restangular, $location, $routeParams) {
            Restangular.one('courses', $routeParams.courseID).get().then(function(data) {
                $scope.course = data;
                $scope.date_progress = $scope.find_date_progress();
                $scope.start_date = moment($scope.course.start_date).format('MM/DD/YYYY');
                $scope.end_date = moment($scope.course.end_date).format('MM/DD/YYYY');
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

            // determine calendar progress
            $scope.find_date_progress = function() {
                var begin = moment($scope.course.start_date).format('x');
                var end = moment($scope.course.end_date).format('x');
                var now = moment().format('x');
                return (now-begin)/(end-begin)*100;
            };
    }]);
}

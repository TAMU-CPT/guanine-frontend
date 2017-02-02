var moment = require('moment');

export default function(guanineApp) {
    guanineApp.controller('StudentDetailCtrl', ['$scope', 'Restangular', '$location', '$routeParams', '$filter',
        function($scope, Restangular, $location, $routeParams, $filter) {
            Restangular.one('students', $routeParams.studentID).get().then(function(data) {
                $scope.student = data;
            });

            $scope.ordering="assessment__title";

            $scope.updateData = function(page) {
                if(!isNaN(parseInt(page))){
                    $scope.query.page = page;
                }
                $scope.query.ordering = $scope.ordering;
                $scope.promise = Restangular.all('results').getList($scope.query).then(function(data) {
                    $scope.results = data;
                    $scope.results.map(function(r) { r.notes = $filter('notes_filter')(r.notes); })
                });
            };

            $scope.options = {
                limitSelect: true,
                pageSelect: true
            };

            $scope.query = {
                limit: 50,
                page: 1,
                student: $routeParams.studentID,
                assessment__course: $routeParams.courseID,
                ordering: $scope.ordering,
            };

            $scope.updateData(1);

            $scope.date_format = function(date) {
                return moment(date).format('MM/DD/YYYY');
            };
    }]);
}

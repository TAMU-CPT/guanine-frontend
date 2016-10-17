export default function(guanineApp) {
    guanineApp.controller('CourseListCtrl', ['$scope', 'Restangular', '$location',
        function($scope, Restangular, $location) {
            $scope.go = function(id) {
                $location.path('/courses/' + id);
            };

            $scope.ordering="name";

            $scope.updateData = function(page) {
                if(!isNaN(parseInt(page))){
                    $scope.query.page = page;
                }
                $scope.query.ordering = $scope.ordering;
                $scope.promise = Restangular.all('courses').getList($scope.query).then(function(data) {
                    $scope.courses = data;
                });
            };

            $scope.options = {
                limitSelect: true,
                pageSelect: true
            };

            $scope.query = {
                limit: 5,
                page: 1,
                ordering: $scope.ordering,
            };

            $scope.updateData(1);
    }]);
}

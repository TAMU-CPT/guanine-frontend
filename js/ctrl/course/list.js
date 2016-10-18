export default function(guanineApp) {
    guanineApp.controller('CourseListCtrl', ['$scope', 'Restangular', '$location',
        function($scope, Restangular, $location) {
            $scope.course = {}
            $scope.students = []

            Restangular.all('courses').getList($scope.query).then(function(data) {
                $scope.courses = data;
            });

            $scope.make_table = function() {
                $scope.students = []
                var rows = $scope.course.table.split("\n");
                for (var row in rows) {
                    var temp = {};
                    temp.name = rows[row].split("\t")[0]
                    temp.email = rows[row].split("\t")[1]
                    $scope.students.push(temp);
                }
                $scope.show_table = true;
                $scope.updateData(1);
            };

            $scope.data_subset = function() {
                return $scope.students.slice($scope.query.page*5-5, $scope.query.page*5);
            };

            $scope.go = function(id) {
                $location.path('/courses/' + id);
            };

            $scope.updateData = function(page) {
                if(!isNaN(parseInt(page))){
                    $scope.query.page = page;
                }
                $scope.cur_students = $scope.data_subset();
            };

            $scope.options = {
                limitSelect: true,
                pageSelect: true
            };

            $scope.query = {
                limit: 5,
                page: 1,
            };
    }]);
}

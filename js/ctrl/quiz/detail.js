var moment = require('moment');

export default function(guanineApp) {
    guanineApp.controller('QuizDetailCtrl', ['$scope', 'Restangular', '$location', '$routeParams', '$mdDialog',
        function($scope, Restangular, $location, $routeParams, $mdDialog) {

            Restangular.one('assessments', $routeParams.quizID).get().then(function(data) {
                $scope.data = data;
                $scope.unique_students = $scope.data.result_set.map(function(x){ return x.student.id; }).filter(function (x, i, a) {
                    return a.indexOf(x) == i;
                }).length;
                $scope.total_students = $scope.data.course_info.students.length;
                $scope.date_progress = $scope.find_date_progress();
            });

            $scope.options = {
                limitSelect: true,
                pageSelect: true
            };

            $scope.query = {
                limit: 10,
                page: 1,
                order: 'student.name',
            };

            $scope.find_date_progress = function() {
                if ($scope.data.start_date && $scope.data.end_date) {
                    var begin = moment($scope.data.start_date).format('x');
                    var end = moment($scope.data.end_date).format('x');
                    var now = moment().format('x');
                    return (now - begin) / (end - begin) * 100;
                }
            };

            $scope.popup_api_key = {
                show: function(ev) {
                    $mdDialog.show({
                        contentElement: "#popup_api_key",
                        parent: angular.element(document.body),
                        clickOutsideToClose: true,
                    });
                },

                cancel: function() {
                    $mdDialog.cancel();
                }
            }

    }]);
}


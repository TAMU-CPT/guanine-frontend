var moment = require('moment');

export default function(guanineApp) {
    guanineApp.controller('QuizDetailCtrl', ['$scope', 'Restangular', '$location', '$routeParams', '$mdDialog',
        function($scope, Restangular, $location, $routeParams, $mdDialog) {
            console.log($routeParams);

            Restangular.one('assessments', $routeParams.quizID).get().then(function(data) {
                $scope.data = data;
                $scope.unique_students = $scope.data.result_set.map(function(x){ return x.student.id; }).length;
                $scope.total_students = $scope.data.course.students.length;

                // minDate/maxDate for min and max dates for assessments
                $scope.minDate = moment($scope.data.start_date).toDate();
                $scope.maxDate = moment($scope.data.end_date).toDate();
                $scope.date_progress = $scope.find_date_progress();
                $scope.start_date = moment($scope.data.start_date).format('MM/DD/YYYY');
                $scope.end_date = moment($scope.data.end_date).format('MM/DD/YYYY');
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

            $scope.find_date_progress = function() {
                var begin = moment($scope.data.start_date).format('x');
                var end = moment($scope.data.end_date).format('x');
                var now = moment().format('x');
                return (now - begin) / (end - begin) * 100;
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


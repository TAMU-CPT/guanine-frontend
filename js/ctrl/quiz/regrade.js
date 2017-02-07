export default function(guanineApp) {
    guanineApp.controller('QuizRegradeCtrl', ['$scope', 'Restangular', '$location', '$routeParams', '$mdDialog', '$filter',
        function($scope, Restangular, $location, $routeParams, $mdDialog, $filter) {

            Restangular.one('assessments', $routeParams.quizID).get().then(function(data) {
                $scope.data = data;
            });

			$scope.new_answers = [
				{question_number: 1, replace: "0"},
				{question_number: 2, replace: "0"},
				{question_number: 3, replace: "0"},
				{question_number: 4, replace: "0"},
				{question_number: 5, replace: "0"},
			]

			$scope.regrade = function(){
                Restangular.all('regrade').post({
					assessment: $routeParams.quizID,
					new_answers: $scope.new_answers,
                });
				$location.path('/courses/' + $routeParams.courseID + '/assessment/' + $routeParams.quizID);
			}



    }]);
}


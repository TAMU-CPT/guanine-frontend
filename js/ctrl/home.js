export default function(guanineApp) {
    guanineApp.controller('HomeCtrl', ['$scope','$location',
        function($scope, $location) {
            $scope.home = [
                {
                    title: "GUANINE",
                    url: "#/about",
                    description: "Welcome to GUANINE!",
                    button_title: "Get excited!",
                },
                {
                    title: "Courses",
                    url: "#/courses",
                    description: "Browse courses",
                },
            ];
    }]);
}

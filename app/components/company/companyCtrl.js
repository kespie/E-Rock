angular.module('eRockControllers').controller('companyCtrl', function ($scope) {
    $scope.message = 'test';
});

angular.module('eRockControllers').controller('lineChartCompanyCtrl', function ($scope) {
    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['Series A', 'Series B'];
    $scope.data = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
    ];
    $scope.onClick = function (points, evt) {
        console.log(points, evt);
    };
});

angular.module('eRockControllers').controller('pieChartCompanyCtrl', function ($scope) {
    $scope.labels = ["Very satisfied", "Somewhat satisfied", "Dissatisfied"];
    $scope.data = [300, 500, 100];
});

angular.module('eRockControllers').controller('barChartCompanyCtrl', function ($scope) {
    $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    $scope.series = ['Series A', 'Series B'];

    $scope.data = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
    ];
});
angular.module('eRockControllers').controller('personalCtrl', function ($scope) {
    $scope.labels = ["Week 16", " Week 17", "Week 18", "Week 19", "Week 20", "Week 21", "Week 22"];
    $scope.series = ['Value (M€)'];
    $scope.data = [
        [65, 59, 80, 81, 56, 55, 40]
    ];
});

angular.module('eRockControllers').controller('radialGaugeCtrl', function ($scope) {
    $scope.value = 76;
    $scope.upperLimit = 100;
    $scope.lowerLimit = 0;
    $scope.unit = "%";
    $scope.precision = 0;
    $scope.ranges = [
        {
            min: 0,
            max: 20,
            color: '#E57373'
        },
        {
            min: 20,
            max: 40,
            color: '#FFB74D'
        },
        {
            min: 40,
            max: 60,
            color: '#FFF176'
        },
        {
            min: 60,
            max: 80,
            color: '#AED581'
        },
        {
            min: 80,
            max: 100,
            color: '#81C784'
        }
    ];
});

angular.module('eRockControllers').controller('barChartCtrl', function ($scope) {
    $scope.labels = ['Project A', 'Project B', 'Project C'];
    $scope.series = ['Series A'];

    $scope.data = [
        [65, 59, 80]
    ];
});

angular.module('eRockControllers').controller('urgentTasksCtrl', function ($scope) {
    $scope.tableHeaders = [ 'task', 'prio', 'dd'];

    $scope.tableContent = [
        { task: 'Declaration B', prio: 'High', dd: '5 hours' },
        { task: 'Business Case A', prio: 'High', dd: '2 days' },
        { task: 'Update eRock', prio: 'High', dd: '1 week' },
        { task: 'Check contract C', prio: 'Medium', dd: '2 weeks' },
        { task: 'Request holiday', prio: 'Low', dd: '3 weeks' }
    ];
});

angular.module('eRockControllers').controller('radialGaugeTwoCtrl', function ($scope) {
    $scope.value = 3;
    $scope.upperLimit = 10;
    $scope.lowerLimit = 0;
    $scope.unit = "";
    $scope.precision = 0;
    $scope.ranges = [
        {
            min: 0,
            max: 2,
            color: '#81C784'
        },
        {
            min: 2,
            max: 4,
            color: '#AED581'
        },
        {
            min: 4,
            max: 6,
            color: '#FFF176'
        },
        {
            min: 6,
            max: 8,
            color: '#FFB74D'
        },
        {
            min: 8,
            max: 10,
            color: '#E57373'
        }
    ];
});


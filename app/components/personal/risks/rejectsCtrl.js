angular.module('eRockControllers').controller('rejectsCtrl', function ($scope) {
    $scope.width = 450;
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

angular.module('eRockControllers').controller('rejectsBarChartCtrl', function ($scope) {
    $scope.labels = ["Week 16", " Week 17", "Week 18", "Week 19", "Week 20", "Week 21", "Week 22"];
    $scope.series = ['Hours'];
    $scope.data = [
        [7, 5, 6, 4, 3, 2, 5]
    ];
});

angular.module('eRockControllers').controller('rejectsTableCtrl', function ($scope) {
    $scope.tableHeaders = [ 'Role/Organization', 'Value (%)', 'Holder'];
    $scope.tableContent = [
        { task: 'Head Manufacturing', prio: 25, dd: 'Martijn Weekenstroo' },
        { task: 'Manufacturing assistant', prio: 15, dd: 'Eelco Bosklopper' }
    ];
});
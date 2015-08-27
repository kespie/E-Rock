angular.module('eRockControllers').controller('navigationCtrl', function ($scope) {
    $scope.items = [
        {
            name: "Menu Item 1",
            link: "#main1",
            submenu: []
        },
        {
            name: "Menu Item 2",
            link: "#main2",
            submenu: null
        },
        {
            name: "Menu Item 3",
            link: "#main3",
            submenu: [
                {
                    name: "Sub Item 1",
                    link: "#sub1"
                },
                {
                    name: "Sub Item 2",
                    link: "#sub2"
                }
            ]
        }
    ];
});

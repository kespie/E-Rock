'use strict';

/* App Module */

var eRockApp = angular.module('eRockApp', [
    'ui.router',
    'eRockControllers'
]);

eRockApp.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider

        .state('personal', {
            url: '/personal',
            templateUrl: 'components/personal/personal.html',
            controller:'personalCtrl'
        })

        .state('personal.my-projects', {
            url: '/my-projects',
            parent:'personal',
            templateUrl: 'shared/projects/my-projects.html',
            controller:'myProjectsCtrl'
        })

        .state('company', {
            url: '/company',
            views: {
                // the main template will be placed here (relatively named)
                '': { templateUrl: 'components/company/company.html' },

                // the child views will be defined here (absolutely named)
                'columnOne@company': {
                    template: 'Look I am a column!'
                },

                // for column two, we'll define a separate controller
                'columnTwo@company': {
                    templateUrl: 'shared/table-data/table-data.html',
                    controller:'table-dataCtrl'
                }
            }
        });

    $urlRouterProvider.otherwise('/personal');

    $locationProvider.html5Mode(true); //verwijderd vieze hashtag van URL

});

eRockApp.controller("navigationCtrl", ['$scope', function($scope){
    $scope.items = [
        {
            name: 'Personal view',
            link: 'personal',
            submenu: [
                {
                    name: "Sub Item 1",
                    link: "#sub1"
                },
                {
                    name: 'My Projects',
                    link: 'personal.my-projects'
                }
            ]
        },
        {
            name: 'Company view',
            link: 'company',
            submenu: null
        }
    ];
}]);
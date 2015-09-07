'use strict';

/* App Module */

var eRockApp = angular.module('eRockApp', [
    'ui.router',
    'eRockControllers',
    'chart.js',
    'ngRadialGauge',
    'ncy-angular-breadcrumb'
]);

eRockApp.config(function($stateProvider, $urlRouterProvider, $locationProvider, $uiViewScrollProvider) {
    $stateProvider

        // Personal pages
        .state('personal', {
            url: '/personal',
            ncyBreadcrumb: {
                label: 'Personal'
            },
            views: {
                '': {
                    templateUrl: 'components/personal/personal.html',
                    controller:'personalCtrl'
                },
                'lineChart@personal':{
                    templateUrl:'shared/charts/lineChart.html'
                },
                'radialGauge@personal':{
                    templateUrl:'shared/charts/radialGaugeChart.html',
                    controller:'radialGaugeCtrl'
                },
                'barChart@personal':{
                    templateUrl:'shared/charts/barChart.html',
                    controller:'barChartCtrl'
                },
                'urgentTasks@personal':{
                    templateUrl:'shared/tables/tableBlock.html',
                    controller:'urgentTasksCtrl'
                },
                'radialGaugeTwo@personal':{
                    templateUrl:'shared/charts/radialGaugeChart.html',
                    controller:'radialGaugeTwoCtrl'
                }
            }
        })
        .state('personal.projects', {
            url: '/projects',
            templateUrl: 'components/personal/projects/projects.html',
            controller:'projectsCtrl',
            parent: 'personal',
            ncyBreadcrumb: {
                label: 'Projects'
            }
        })
        .state('personal.risks', {
            url: '/risks',
            templateUrl: 'components/personal/risks/risks.html',
            controller:'risksCtrl',
            parent: 'personal',
            ncyBreadcrumb: {
                label: 'Risks'
            }
        })

        // Company pages
        .state('company', {
            url: '/company',
            ncyBreadcrumb: {
                label: 'Company'
            },
            views: {
                '': {
                    controller:'companyCtrl',
                    templateUrl: 'components/company/company.html'
                },
                'lineChart@company':{
                    templateUrl:'shared/charts/lineChart.html',
                    controller:'lineChartCompanyCtrl'
                },
                'pieChart@company':{
                    templateUrl:'shared/charts/pieChart.html',
                    controller:'pieChartCompanyCtrl'
                },
                'barCharts@company':{
                    templateUrl: 'shared/charts/barChart.html',
                    controller:'barChartCompanyCtrl'
                }
            }
        });

    $urlRouterProvider.otherwise('/personal'); // Catchall route
    $locationProvider.html5Mode(true); // Verwijderd vieze hashtag van URL
    $uiViewScrollProvider.useAnchorScroll(); // Zorgt ervoor dat je de menu items niet reageren als anchors. Oftewel als je op een knop drukt dan scrollt ie helemaal naar boven ipv dat je midden op de pagina begint.
});

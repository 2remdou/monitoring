/**
 * Created by mdoutoure on 10/07/2015.
 */

app.config(['$routeProvider',function($routeProvider){
    $routeProvider
        .when('/unites',{
            templateUrl: 'client/js/view/unite.html',
            controller: 'UniteController'
        })
        .when('/hotes',{
            templateUrl: 'client/js/view/hote.html',
            controller: 'HoteController'
        })
        .when('/type-indicateurs',{
            templateUrl : 'client/js/view/typeIndicateur.html',
            controller: 'TypeIndicateurController'
        })
        .when('/indicateurs',{
            templateUrl : 'client/js/view/indicateur.html',
            controller: 'IndicateurController'
        })
        .when('/detail-indicateurs',{
            templateUrl : 'client/js/view/detailIndicateur.html',
            controller: 'DetailIndicateurController'
        })
        .otherwise({redirectTo:'/'});
}]);
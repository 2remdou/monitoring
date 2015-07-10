/**
 * Created by delphinsagno on 15/03/15.
 */

var app = angular.module('app',[
    'restangular',
    'ngRoute',
    'checklist-model'
]);





function intercepError(Restangular,$rootScope){
    Restangular.setErrorInterceptor(function(response, deferred, responseHandler){
        var m = [];

        if(response.data){
            angular.forEach(response.data.errors.errors,function(value){
                m.push(value);
            });
            $rootScope.$broadcast('showMessage',{
                messages : m,
                typeAlert: "danger"
            })
        }
    });
}

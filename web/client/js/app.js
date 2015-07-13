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
            if(response.data.message){
                m.push(response.data.message);
            }
            if(response.data.errors){
                angular.forEach(response.data.errors.errors,function(value){
                    m.push(value);
                });
            }

        }
        if(m.length===0)
        {
            m.push('Ouuppss! quelsques choses a été cassé !!!!!');
            console.log(m);
        }
        $rootScope.$broadcast('showMessage',{
            messages : m,
            typeAlert: "danger"
        });

    });
}

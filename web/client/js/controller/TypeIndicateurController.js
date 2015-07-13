/**
 * Created by Toure on 21/03/15.
 */
app.controller('TypeIndicateurController',['$scope','Restangular','$rootScope','TypeIndicateurs',
    function($scope,Restangular,$rootScope,TypeIndicateurs){
        intercepError(Restangular,$rootScope);

        $rootScope.$broadcast('hideMessage') ;

        $rootScope.loading=true;
        TypeIndicateurs.getList().then(function(typeIndicateurs){
            $scope.typeIndicateurs = typeIndicateurs;
            if(typeIndicateurs.length===0){
                $rootScope.$broadcast('showMessage',
                    {messages:["Aucun type indicateur pour le moment"],
                        typeAlert:"info"
                    }) ;
            }
            $rootScope.loading=false;
            //$rootScope.$broadcast('onShowMessage');
        });

        $scope.newTypeIndicateur = {};
        $scope.saveTypeIndicateur = function(){
            if($scope.method === "PUT"){
                $scope.newTypeIndicateur.put().then(function(typeInd){
                    $scope.newTypeIndicateur = {};
                    $rootScope.$broadcast('showMessage',
                        {messages:["Modification effectuée"],
                            typeAlert:"success"
                        }) ;
                });
                $scope.method = "POST";
            }
            else{
                TypeIndicateurs.post($scope.newTypeIndicateur).then(function(u){
                    $scope.typeIndicateurs.push($scope.newTypeIndicateur);
                    $scope.newTypeIndicateur = {};
                    $rootScope.$broadcast('showMessage',{
                        messages:["Enregistrement effectué"],
                        typeAlert:"success"
                    });
                });
            }

        };

        $scope.editTypeIndicateur = function(typeIndicateur){
            $scope.newTypeIndicateur = typeIndicateur;
            $scope.method = "PUT"
        };

        $scope.deleteTypeIndicateur = function(typeIndicateur){
            $scope.typeIndicateur=typeIndicateur;
            typeIndicateur.remove().then(function(u){
                $rootScope.$broadcast('showMessage',{
                    messages:["Suppression effectuée"],
                    typeAlert:"success"
                });
                var index = $scope.typeIndicateurs.indexOf(typeIndicateur);
                if(index>-1) $scope.typeIndicateurs.splice(index,1);
            });
        }

        $scope.annuler = function(){
            $scope.method = "POST";
            $scope.newIndicateur={};
        }

    }]);
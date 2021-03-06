/**
 * Created by delphinsagno on 15/03/15.
 */
app.controller('UniteController',['$scope','Restangular','$rootScope','Unites',
    function($scope,Restangular,$rootScope,Unites){
        intercepError(Restangular,$rootScope);
        $rootScope.$broadcast('hideMessage') ;
        $rootScope.loading=true;
        Unites.getList().then(function(unites){
                $scope.unites = unites;
                if(unites.length===0){
                    $rootScope.$broadcast('showMessage',
                        {messages:["Aucune données pour le moment"],
                            typeAlert:"info"
                        }) ;
                }
                $rootScope.loading=false;
                //$rootScope.$broadcast('onShowMessage');
            });

        $scope.newUnite = {};
        $scope.saveUnite = function(){
            if($scope.method === "PUT"){
                console.log($scope.newUnite);
                $scope.newUnite.put().then(function(u){
                    $scope.newUnite = {};
                    $rootScope.$broadcast('showMessage',
                        {messages:["Modification effectuée"],
                            typeAlert:"success"
                    }) ;
                });
                $scope.method = "POST";
            }
            else{
                Unites.post($scope.newUnite).then(function(u){
                    $scope.unites.push($scope.newUnite);
                    $scope.newUnite = {};
                    $rootScope.$broadcast('showMessage',{
                        messages:["Enregistrement effectué"],
                        typeAlert:"success"
                    });
                });
            }

        };

        $scope.editUnite = function(unite){
            $scope.newUnite = unite;
            $scope.method = "PUT"
        };

        $scope.deleteUnite = function(unite){
            $scope.unite=unite;
            console.log($scope.unite);
            unite.remove().then(function(u){
                $rootScope.$broadcast('showMessage',{
                    messages:["Suppression effectuée"],
                    typeAlert:"success"
                });
                var index = $scope.unites.indexOf(unite);
                if(index> -1) $scope.unites.splice(index,1);

            });
        }

        $scope.annuler = function(){
            $scope.method = "POST";
            $scope.newUnite={};
        }

    }]);

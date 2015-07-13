/**
 * Created by delphinsagno on 15/03/15.
 */
app.controller('IndicateurController',['$scope','Restangular','$rootScope','Indicateurs','TypeIndicateurs','Unites',
    function($scope,Restangular,$rootScope,Indicateurs,TypeIndicateurs,Unites){
                intercepError(Restangular,$rootScope);

                $rootScope.$broadcast('hideMessage') ;
                $scope.all = function(){
                    $rootScope.loading=true;
                        Indicateurs.getList().then(function(indicateurs){
                            $scope.indicateurs = indicateurs;
                            if(indicateurs.length===0){
                                $rootScope.$broadcast('showMessage',
                                    {messages:["Aucun indicateur pour le moment"],
                                        typeAlert:"info"
                                    }) ;
                            }
                            $rootScope.loading=false;
                        });
                };

                $scope.all();

                TypeIndicateurs.getList().then(function(typeIndicateurs){
                    $scope.typeIndicateurs = typeIndicateurs;
                });


                Unites.getList().then(function(unites){
                    $scope.unites = unites;
                })

                $scope.newIndicateur = {};
                $scope.saveIndicateur = function(){
                    var ind = Restangular.copy($scope.newIndicateur);
                    if(!controlFields()) return;
                    if($scope.method === "PUT"){
                        $scope.newIndicateur.put().then(function(values){
                            $rootScope.$broadcast('showMessage',
                                {messages:["Modification effectuée"],
                                    typeAlert:"success"
                            }) ;
                        });
                        $scope.method = "POST";
                    }
                    else{
                        Indicateurs.post(ind).then(function(values){
                           $scope.all();
                           $scope.indicateurs.push($scope.newIndicateur);
                           $scope.newIndicateur = {};
                           $rootScope.$broadcast('showMessage',{
                               messages:["Enregistrement effectué"],
                               typeAlert:"success"
                           });

                       });
                    }

                };

                $scope.editIndicateur = function(index){
                    $scope.newIndicateur = {};
                    $scope.newIndicateur = $scope.indicateurs[index];
                    $scope.method = "PUT"
                };

                $scope.deleteIndicateur = function(indicateur){
                    $scope.indicateur=indicateur;
                    indicateur.remove().then(function(u){
                        $rootScope.$broadcast('showMessage',{
                            messages:["Suppression effectuée"],
                            typeAlert:"success"
                        });
                        var index = $scope.indicateurs.indexOf(indicateur);
                        if(index>-1) $scope.indicateurs.splice(index,1);
                    });
                };

                $scope.annuler = function(){
                    $scope.method = "POST";
                    $scope.newIndicateur={};
                }

                function controlFields(){
                    if(!$scope.newIndicateur.typeIndicateur){
                        $rootScope.$broadcast('showMessage',{
                            messages:["Veuillez selectionner un type indicateur"],
                            typeAlert:"danger"
                        });
                        return false;
                    }
                    return true;
                }

                function formatIndicateur(){
                    var indicateurs = [];
                    angular.forEach($scope.indicateurs,function(indicateur){
                            angular.forEach(indicateur.hotes,function(hote){
                                indicateur.hote=hote;
                                indicateurs.push(indicateur);
                                console.log(hote);
                                indicateur.hote={};
                            })
                    });
                    $scope.indicateurs = indicateurs;
                }
}]);
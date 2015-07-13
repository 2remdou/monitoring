/**
 * Created by delphinsagno on 15/03/15.
 */
app.controller('DetailIndicateurController',['$scope','Restangular','$rootScope','Indicateurs','DetailIndicateurs','dateFilter',
    function($scope,Restangular,$rootScope,Indicateurs,DetailIndicateurs,dateFilter){
                intercepError(Restangular,$rootScope);
                $rootScope.$broadcast('hideMessage') ;
                $scope.all = function(){
                    $rootScope.loading=true;
                    DetailIndicateurs.getList().then(function(details){
                        $scope.details = details;
                        if(details.length===0){
                            $rootScope.$broadcast('showMessage',
                                {messages:["Aucun detail pour le moment"],
                                    typeAlert:"info"
                                }) ;
                        }
                        $rootScope.loading=false;

                    });
                }

                $scope.all();

        Indicateurs.getList().then(function(indicateurs){
                    $scope.indicateurs = indicateurs;
                });

                $scope.newDetail = {};
                $scope.saveDetail = function(){
                    if(!controlFields()) return;
                    if($scope.method === "PUT"){
                        $scope.newIndicateur.put().then(function(values){
                            $scope.newIndicateur = {};
                            $rootScope.$broadcast('showMessage',
                                {messages:["Modification effectuée"],
                                    typeAlert:"success"
                            }) ;
                        });
                        $scope.method = "POST";
                    }
                    else{
                        $scope.newDetail.dateDetail = dateFilter($scope.newDetail.dateDetail,'yyyy-M-d h:mm:ss');
                       //uniteFactory.one($scope.newDetail.unite.id).one(getRoute('get_indicateurs'),$scope.newDetail.indicateur.id).post('details',$scope.newDetail)
                        DetailIndicateurs.post($scope.newDetail).then(function(values){
                           $scope.details.push($scope.newDetail);
                           $scope.newDetail = {};
                           $rootScope.$broadcast('showMessage',{
                               messages:["Enregistrement effectué"],
                               typeAlert:"success"
                           });

                       });
                    }

                };

                $scope.editDetail = function(detail){
                    detail.dateDetail = dateFilter(detail.dateDetail,'yyyy-M-d h:mm:ss');
                    //detail.dateDetail = dateFilter(detail.dateDetail,'yyyy-d-M h:mm:ss');
                    $scope.newDetail = detail.dateDetail;
                    $scope.method = "PUT"
                };

                $scope.deleteDetail = function(indicateur){
                    $scope.indicateur=indicateur;
                    indicateur.remove().then(function(u){
                        $rootScope.$broadcast('showMessage',{
                            messages:["Suppression effectuée"],
                            typeAlert:"success"
                        });
                        var index = $scope.indicateurs.indexOf(indicateur);
                        if(index>-1) $scope.indicateurs.splice(index,1);
                    });
                }


                function controlFields(){
                    if(!$scope.newDetail.indicateur){
                        $rootScope.$broadcast('showMessage',{
                            messages:["Veuillez selectionner un indicateur"],
                            typeAlert:"danger"
                        });
                        return false;
                    }
                    if(!$scope.newDetail.valeur){
                        $rootScope.$broadcast('showMessage',{
                            messages:["Veuillez fournir une valeur"],
                            typeAlert:"danger"
                        });
                        return false;
                    }

                    if(!$scope.newDetail.dateDetail){
                        $rootScope.$broadcast('showMessage',{
                            messages:["Veuillez fournir une date"],
                            typeAlert:"danger"
                        });
                        return false;
                    }

                    return true;
                }



    }]);
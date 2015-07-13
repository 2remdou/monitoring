app.config(function(RestangularProvider){
    RestangularProvider.setBaseUrl('app_dev.php/api/');
    RestangularProvider.setRequestInterceptor(function(elem, operation,path) {
        if(path.substr(0,path.length-1)==='/'){
            path = path.substr(0,path.length-1);//supprimer le / à la fin
        }
        if (operation === "put" || operation === "post") {
            copyElem = angular.copy(elem);
            delete elem.id;
            if(path === "indicateurs"){
                delete elem.typeIndicateur;
                delete  elem.unite;

                elem.typeIndicateur = copyElem.typeIndicateur.id;
                elem.unite = copyElem.unite.id;
            }
            else if(path === "type-indicateurs"){
                delete  elem.indicateur;

                elem.indicateur = copyElem.indicateur.id;
            }

        }
        return elem;
    });
});


var app = angular.module('starter.services', ['ionic']);

app.factory('JSON', function($q, $http) {
  // Might use a resource here that returns a JSON array
   var deferred = $q.defer();

    return {
        all: function() {
            // return $resource;
            return 'teste';

        },
        remove: function(chat) {
            chats.splice(chats.indexOf(chat), 1);
        },
        get: function(chatId) {
            for (var i = 0; i < chats.length; i++) {
                if (chats[i].id === parseInt(chatId)) {
                    return chats[i];
                }
            }
          return null;
        },
        conteudo: function(){
            var registros = [];
            var req = {
                async: false,
                method: 'POST',
                url: 'http://www.aplicativos.dreamhosters.com/mmgpApp/app-conteudo',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                // data: { test: 'test' }
            }

            $http(req)
                .then(function(res){
                    $.each(res.data, function( key, values ){
                        $.each(values, function( index, val ){
                            if( val.categoria_id == "31" ){
                                registros.push(val);
                            }
                        });
                    });
                    deferred.resolve(registros);
                }, function(data){
                    console.log("error");
                    console.log(data);
                });
            return deferred.promise;
        },
        conteudoEvento: function(cat_id, evento_id){
            var registro = [];
            var req = {
                async: false,
                method: 'POST',
                url: 'http://www.aplicativos.dreamhosters.com/mmgpApp/app-conteudo',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                // data: { test: 'test' }
            }

            $http(req)
                .then(function(res){
                    $.each(res.data, function( key, values ){
                        $.each(values, function( index, val ){
                            if( (val.categoria_id == cat_id) && (val.id == evento_id) ){
                                registro = val;
                            }
                        });
                    });
                    deferred.resolve(registro);
                }, function(data){
                    console.log("error");
                    console.log(data);
                });
            return deferred.promise;
        },
        galeria: function(cat_id, evento_id){
            var galeria = [];
            var req = {
                async: false,
                method: 'POST',
                url: 'http://www.aplicativos.dreamhosters.com/mmgpApp/app-conteudo',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                // data: { test: 'test' }
            }

            $http(req)
                .then(function(res){
                    $.each(res.data, function( key, values ){
                        $.each(values, function( index, val ){
                            if( (val.categoria_id == cat_id) && (val.id == evento_id) ){
                                galeria = val.galeria;
                            }
                        });
                    });
                    deferred.resolve(galeria);
                }, function(data){
                    console.log("error");
                    console.log(data);
                });
            return deferred.promise;
        }
    };
});

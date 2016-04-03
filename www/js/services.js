var app = angular.module('starter.services', ['ionic']);

app.factory('JSON', function($q, $http) {
  // Might use a resource here that returns a JSON array
  /*
  *
  * Constants >>>
  */
  var root = "http://www.aplicativos.dreamhosters.com/mmgpApp/";
  /*
  *
  * <<< Constants
  */
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
            var deferredContent = $q.defer();
            var eventos = [];
            var req = {
                // async: false,
                method: 'POST',
                url: root+'app-conteudo',
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
                                eventos.push(val);
                            }
                        });
                    });
                    deferredContent.resolve(eventos);
                }, function(data){
                    console.log("error");
                    console.log(data);
                });
            return deferredContent.promise;
        },
        conteudoEvento: function(cat_id, evento_id){
            var deferredEvento = $q.defer();
            var evento = [];
            var req = {
                // async: false,
                method: 'POST',
                url: root+'app-conteudo',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                // data: { test: 'test' }
            }

            $http(req)
                .then(function(res){
                    $.each(res.data, function( key, values ){
                        $.each(values, function( index, enventoSelecionado ){
                            if( (enventoSelecionado.categoria_id == cat_id) && (enventoSelecionado.id == evento_id) ){
                                deferredEvento.resolve(enventoSelecionado);
                            }
                        });
                    });
                }, function(data){
                    console.log("error");
                    console.log(data);
                });
            return deferredEvento.promise;
        },
        galeria: function(cat_id, evento_id){
            var deferredGaleria = $q.defer();
            var galeria = [];
            var req = {
                // async: false,
                method: 'POST',
                url: root+'app-conteudo',
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
                                deferredGaleria.resolve(val.galeria);
                            }
                        });
                    });
                }, function(data){
                    console.log("error");
                    console.log(data);
                });
            return deferredGaleria.promise;
        }
    };
});

var App = angular.module('mensagensApp', ['ngResource', 'ngScrollbars']);

App.controller('mensagensCtrl', function($scope, $resource){

  var Mensagem = $resource('/api/mensagens/:_id/:nome/:texto',
    {
      _id:'@_id',
      nome:'@nome',
      texto:'@texto'
    },
    {
    'update': { method:'PUT'}
  });

  $scope.config = {
    autoHideScrollbar: false,
    theme: 'light',
    advanced:{
        updateOnContentResize: true
    },
        setHeight: 400,
        scrollInertia: 0
    };


  $scope.mensagens = [];
  $scope.mensagem = {};

  $scope.iniciar = function(){
    Mensagem.query(function(msgs){
      $scope.mensagens = msgs;
    });
  };
  $scope.iniciar();

  $scope.editarMensagem = function($event, mensagem){
    $event.preventDefault();
    $scope.mensagem._id = mensagem._id;
    $scope.mensagem.nome = mensagem.nome;
    $scope.mensagem.texto = mensagem.texto;
  };

  $scope.cancelarMensagem = function($event){
    $event.preventDefault();
    $scope.mensagem = {};
  }

  $scope.salvarMensagem = function($event, mensagem){
    $event.preventDefault();
    if(mensagem._id){
      Mensagem.update({_id: mensagem._id, nome: mensagem.nome, texto: mensagem.texto});
      angular.forEach($scope.mensagens, function(msg, key) {
        if(msg._id === mensagem._id){
          msg.nome = mensagem.nome;
          msg.texto = mensagem.texto;
          $scope.mensagem = {};
        }
      });
    }else{
      Mensagem.save({nome:mensagem.nome, texto:mensagem.texto}, function(data){
        $scope.mensagens.push(mensagem);
        $scope.mensagem = {};
      });
    }
  };

  $scope.deletarMensagem = function($event, mensagem){
    $event.preventDefault();
    console.log(mensagem._id);
    Mensagem.remove({_id: mensagem._id});
    var index = $scope.mensagens.indexOf(mensagem);
    $scope.mensagens.splice(index, 1);
  };

});

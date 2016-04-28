
var App = angular.module('convidadosApp', ['ngResource'])

App.controller('convidadosCtrl', function($scope, $resource){

  var Convidado = $resource('http://casamentoigorerayane.heroku.com/api/convidados', null, {
    'update': { method:'PUT'}
  });

  $scope.mostrarTabela = false;
  $scope.convidados = [];
  $scope.convidado = {};

  $scope.iniciar = function(){
    Convidado.query(function(convs){
      $scope.convidados = convs;
      $scope.mostrarTabela = true;
    });
  }

  $scope.iniciar();

  $scope.salvarConvidado = function($event, convidado){
    $event.preventDefault();
    //ALTERACAO
    if(convidado._id){
      Convidado.update({_id: convidado._id, nome: convidado.nome});
      angular.forEach($scope.convidados, function(conv, key) {
        if(conv._id === convidado._id){
          conv.nome = convidado.nome;
          $scope.convidado = {};
        }
      });
    }else{
      //CRIACAO
      Convidado.save({nome:convidado.nome}, function(data){
        $scope.convidados.push(convidado);
        $scope.convidado = {};
      });
    }
  };

  $scope.editarConvidado = function($event, convidado){
    $event.preventDefault();
    $scope.convidado.nome = convidado.nome;
    $scope.convidado._id = convidado._id;
  };

  $scope.deletarConvidado = function($event, convidado){
    $event.preventDefault()
    console.log(convidado._id);
    var Convi = $resource('http://casamentoigorerayane.heroku.com/api/convidados/:_id', {_id:'@_id'});
    Convi.remove({_id: convidado._id});
    var index = $scope.convidados.indexOf(convidado);
    $scope.convidados.splice(index, 1);
  };

});

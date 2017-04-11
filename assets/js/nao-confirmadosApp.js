var App = angular.module('naoConfirmadosApp', ['ngResource']);

App.controller('naoConfirmadosCtrl', function($scope, $resource){

  var Convidado = $resource('/api/convidados/');

  $scope.mostrarTabela = false;
  $scope.convidados = [];
  $scope.convidado = {};

  $scope.iniciar = function(){
    Convidado.query(function(convs){
      for(var i=0; i<convs.length; i++){
        if(convs[i].confirmado !== true){
          if(convs[i].confirmado !== false){
            convs[i].semResposta = true;
          }
          $scope.convidados.push(convs[i]);
        }

      }
      $scope.mostrarTabela = true;
    });
  };

  $scope.iniciar();
});

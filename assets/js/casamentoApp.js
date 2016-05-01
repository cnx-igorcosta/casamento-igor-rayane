var App = angular.module('casamentoApp', ['ngResource', 'autocomplete']);

App.controller('confirmacaoCtrl', function($scope, $resource){

  var Convidado = $resource('/api/convidados', null, {
    'update': { method:'PUT'},
    'get' : { method: 'GET', isArray:true}
  });

  $scope.nomes = [];
  $scope.convidados = [];
  $scope.respostaEnviada = undefined;
  $scope.mostrarTabela = false;
  $scope.isLoading = false;

  $scope.iniciar = function(){
    Convidado.query(function(convs){
      for(var i=0; i<convs.length; i++){
        $scope.nomes.push(convs[i].nome);
      }
    });
  }
  $scope.iniciar();

  $scope.buscarConvidado = function(nome, $event){
    $event.preventDefault();
    $scope.isLoading = true;
    $scope.mostrarTabela = false;
    $scope.convidados = [];
    $scope.respostaEnviada = undefined;

    var query = {nome : nome};

    var Convi = $resource('/api/convidados/:nome', {nome:'@nome'},{
      'get' : { method: 'GET', isArray:true}
    });
    Convi.get({nome:nome}, function(convs) {
      for(var i=0; i<convs.length; i++){
        $scope.convidados.push(convs[i]);
      }
      $scope.mostrarTabela = true;
      $scope.isLoading = false;
    });
  };

  $scope.confirmarPresenca = function($event, convidado, confirma){
    $event.preventDefault();
    Convidado.update({_id: convidado._id, confirmado: confirma});
    convidado.confirmado = confirma;
  };

  $scope.mostrarStatus = function(convidado){
    if(convidado.confirmado != undefined){
      $scope.respostaEnviada = true;
      return true;
    }
    return false;
  }

  $scope.cancelar = function($event){
    $event.preventDefault();
    $scope.convidados = [];
    $scope.mostrarTabela = false;
    $scope.nome = '';
  }
});

App.controller('muralCtrl', function($scope, $resource){

  var Mensagem = $resource('/api/mensagens', null, {
    'get' : { method: 'GET', isArray:true}
  });

  $scope.mensagem = {};
  $scope.mensagens = [];

  $scope.iniciarMensagem = function(){
    Mensagem.query(function(convs){
      $scope.mensagens = convs;
      // for(var i=0; i<msgs.length; i++){
      //   $scope.nomes.push(convs[i].nome);
      // }
    });
  }
  $scope.iniciarMensagem();

  $scope.hasMensagem = function(){
    return $scope.mensagens.length > 0;
  }

  $scope.enviarMensagem = function($event, mensagem){
    $event.preventDefault();
    //CRIACAO
    Mensagem.save($scope.mensagem, function(data){
      $scope.mensagens.splice(0, 0, mensagem);
      // $scope.mensagens.push(mensagem);
      $scope.mensagem = {};
    });
  }
});

/*angular.module('casamentoApp', [])*/
App.directive('autoComplete', function($timeout) {
      return function(scope, iElement, iAttrs) {
              $(iElement).autocomplete({
                  source: scope[iAttrs.uiItems],
                  select: function() {
                      $timeout(function() {
                        iElement.trigger('input');
                      }, 0);
                  }
              });
      };
  });

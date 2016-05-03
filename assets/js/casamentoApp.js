var App = angular.module('casamentoApp', ['ngResource', 'autocomplete', 'ngScrollbars']);

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

  $scope.mensagem = {};
  $scope.mensagens = [];
  $scope.camposObrigatorios = false;
  $scope.showFormMural = false;

  $scope.showMural = function($event){
    $event.preventDefault();
    $scope.camposObrigatorio = false;
    $scope.showFormMural = true;
  }

  $scope.iniciarMensagem = function(){
    Mensagem.query(function(msgs){
      $scope.mensagens = msgs;
    });
  }
  $scope.iniciarMensagem();

  $scope.hasMensagem = function(){
    return $scope.mensagens.length > 0;
  }

  $scope.salvarMensagem = function($event, mensagem){
    $event.preventDefault();
    $scope.camposObrigatorios = false;
    //UPDATE
    if(camposPreenchidos(mensagem)){
      if(mensagem._id){
        Mensagem.update({_id: mensagem._id, nome: mensagem.nome, texto: mensagem.texto});
        angular.forEach($scope.mensagens, function(msg, key) {
          if(msg._id === mensagem._id){
            msg.nome = mensagem.nome;
            msg.texto = mensagem.texto;
            $scope.mensagem = {};
          }
        });
      //SAVE
      }else{
          Mensagem.save({nome:mensagem.nome, texto:mensagem.texto}, function(msg){
            $scope.mensagens.splice(0, 0, mensagem);
            mensagem._id = msg._id;
            mensagem.data = msg.createdAt;
            $scope.mensagem = {};
          });
      }
    }else{
      $scope.camposObrigatorios = true;
    }
  };

  function camposPreenchidos(mensagem){
    return (mensagem.nome && mensagem.texto)
  }

  $scope.cancelarMensagem = function($event){
    $event.preventDefault();
    $scope.camposObrigatorio = false;
    $scope.showFormMural = false;
    $scope.mensagem = {};
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

angular.module('configuration', [])
.constant('API_END_POINT','/api/')
.constant('HOST','localhost:8080');
// angular.module('services',['configuration','ngResource'])
//        .factory('Convidado',['ngResource','API_END_POINT'],function($resource, API_END_POINT){
//            return $resource(API_END_POINT + 'convidados');
//        });

// var App = angular.module('casamentoApp', ['Convidado'])
var App = angular.module('casamentoApp', ['ngResource', 'autocomplete']);
                //  .factory('Convidado',['ngResource','API_END_POINT'],
                //       function($resource, API_END_POINT){
                //          return $resource(API_END_POINT + 'convidados');
                //       });

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

  // $scope.listaDefault = [];
  // $scope.listaDefault.push({nome:'Igor Gabriel', confirmado: null});
  // $scope.listaDefault.push({nome:'Rayane Simões', confirmado: null});
  // $scope.listaDefault.push({nome:'Sandra Barros', confirmado: null});
  // $scope.listaDefault.push({nome:'Sandra Pereira', confirmado: null});
  //
  //
  // $scope.naoEncontrado = false;
  //
  //
  // $scope.salvar = function($event){
  //   $event.preventDefault();
  //   $scope.convidados[0];
  // }
  //
  // $scope.cancelar = function($event){
  //   $event.preventDefault();
  //   $scope.convidados = [];
  //   $scope.mostrarTabela = false;
  //   $scope.nome = '';
  // }
  //
  //
  //
  // function buscar(nome){
  //   $scope.convidados = [];
  //   for(var index = 0; index < $scope.listaDefault.length; index++){
  //     var value = $scope.listaDefault[index];
  //     if(angular.lowercase(value.nome) === angular.lowercase(nome)){
  //       $scope.convidados.push(value);
  //     }
  //     $scope.naoEncontrado = !$scope.convidados.length;
  //     $scope.mostrarTabela = $scope.convidados.length;
  //   }
  // }
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


// App.factory('Convidado',['ngResource','API_END_POINT'],
//   function($resource, API_END_POINT){
//      return $resource(API_END_POINT + 'convidados');
//    });
// angular.module('configuration', [])
// .constant('API_END_POINT','/api/')
// .constant('HOST','localhost:8080');
// // angular.module('services',['configuration','ngResource'])
// //        .factory('Convidado',['ngResource','API_END_POINT'],function($resource, API_END_POINT){
// //            return $resource(API_END_POINT + 'convidados');
// //        });
//
// // var App = angular.module('casamentoApp', ['Convidado'])
// var App = angular.module('casamentoApp', ['ngResource'])
//                 //  .factory('Convidado',['ngResource','API_END_POINT'],
//                 //       function($resource, API_END_POINT){
//                 //          return $resource(API_END_POINT + 'convidados');
//                 //       });
//
// App.controller('confirmacaoCtrl', function($scope, $resource){
//
//   var Convidado = $resource('http://localhost:8080/api/convidados');
//
//   $scope.nomes = ['Ajin'];
//
//   $scope.iniciar = function(){
//     $scope.nomes = [];
//     Convidado.query(function(convs){
//       angular.forEach(convs, function(conv, key) {
//         $scope.nomes.push(conv.nome);
//       });
//     });
//   }
//   $scope.iniciar();
//
//
//
//   $scope.convidados = [];
//
//   $scope.listaDefault = [];
//   $scope.listaDefault.push({nome:'Igor Gabriel', confirmado: null});
//   $scope.listaDefault.push({nome:'Rayane Simões', confirmado: null});
//   $scope.listaDefault.push({nome:'Sandra Barros', confirmado: null});
//   $scope.listaDefault.push({nome:'Sandra Pereira', confirmado: null});
//
//   $scope.isLoading = false;
//   $scope.naoEncontrado = false;
//
//   $scope.buscarConvidado = function(nome, $event){
//     $event.preventDefault();
//     $scope.isLoading = true;
//     $scope.mostrarTabela = false;
//
//     buscar(nome);
//
//     $scope.isLoading = false;
//   };
//
//   $scope.salvar = function($event){
//     $event.preventDefault();
//     $scope.convidados[0];
//   }
//
//   $scope.cancelar = function($event){
//     $event.preventDefault();
//     $scope.convidados = [];
//     $scope.mostrarTabela = false;
//     $scope.nome = '';
//   }
//
//
//
//   function buscar(nome){
//     $scope.convidados = [];
//     for(var index = 0; index < $scope.listaDefault.length; index++){
//       var value = $scope.listaDefault[index];
//       if(angular.lowercase(value.nome) === angular.lowercase(nome)){
//         $scope.convidados.push(value);
//       }
//       $scope.naoEncontrado = !$scope.convidados.length;
//       $scope.mostrarTabela = $scope.convidados.length;
//     }
//   }
// });
//
// App.directive('autoComplete', function($timeout) {
//       return function(scope, iElement, iAttrs) {
//               $(iElement).autocomplete({
//                   source: scope[iAttrs.uiItems],
//                   select: function() {
//                       $timeout(function() {
//                         iElement.trigger('input');
//                       }, 0);
//                   }
//               });
//       };
//   });
//
//
// // App.factory('Convidado',['ngResource','API_END_POINT'],
// //   function($resource, API_END_POINT){
// //      return $resource(API_END_POINT + 'convidados');
// //    });

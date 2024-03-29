var express = require('express');
var bodyParser  = require('body-parser');
var convidadoRoute = require('./convidadoRoute');
var mensagemRoute = require('./mensagemRoute');

module.exports = function(app){

  // configure app to use bodyParser()
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  var router = express.Router();
  app.use('/api', router);

  // middleware to use for all requests
  router.use(function(req, res, next) {
      // do logging
      next(); // make sure we go to the next routes and don't stop here
  });

convidadoRoute(router);
mensagemRoute(router);

  // router.route('/convidados/:nome')
  //
  //   //GET
  //   .get(function(req, res){
  //     var query = {};
  //     if(req.params.nome){
  //         query =  {'nome' : new RegExp(req.params.nome, 'i')};
  //     }
  //     console.log(query);
  //     Convidado.find(query, function(err, convidados) {
  //       if (err)
  //         console.log(err);
  //       else{
  //         res.send(JSON.stringify(convidados));
  //       }
  //     });
  //   });
  //
  // router.route('/convidados')
  //
  //   //GET
  //   .get(function(req, res){
  //     var query = {};
  //     Convidado.find({}, function(err, convidados) {
  //       if (err)
  //         console.log(err);
  //       else{
  //         res.send(JSON.stringify(convidados));
  //       }
  //     });
  //   })
  //
  //   //POST
  //   .post(function(req, res){
  //     var conv = new Convidado({
  //       nome: req.body.nome
  //     });
  //     conv.save(function(err){
  //       if (err)
  //         res.send(err);
  //       res.json({ message: 'Convidado created!' });
  //     });
  //   })
  //
  //   //PUT
  //   .put(function(req, res){
  //       Convidado.findOne({_id:req.body._id}, function(err, conv){
  //         if(err)
  //           res.send(err);
  //         var update = {};
  //         if(req.body.nome){
  //             update.nome = req.body.nome;
  //         }
  //         if(req.body.confirmado != undefined){
  //           update.confirmado = req.body.confirmado
  //         }
  //           Convidado.update({_id:req.body._id}, update, function(err){
  //           if(err)
  //             res.send(err);
  //           res.json({ message: 'Convidado updated!' });
  //         });
  //
  //       })
  //   });
  //
  //   router.route('/convidados/:_id')
  //   //DELETE
  //   .delete(function(req, res){
  //     Convidado.remove({
  //           _id: req.params._id
  //       }, function(err, conv) {
  //           if (err)
  //               res.send(err);
  //           res.json({ message: 'Successfully deleted' });
  //       });
  //   });
};

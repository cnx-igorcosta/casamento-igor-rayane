var express = require('express');
var bodyParser  = require('body-parser');
var connection = require('../config/database.js');
var Mensagem = require('../models/mensagem');

module.exports = function(router){

router.route('/mensagens/')
//GET
.get(function(req, res){
  var query = {};
  Mensagem.find({}).sort({createdAt: -1})
    .exec(function(err, mensagens) {
            if (err)
            console.log(err);
            else{
              var retorno = [];
              for(var i=0; i<mensagens.length; i++){
                var msg = {
                  _id: mensagens[i]._id,
                  nome: mensagens[i].nome,
                  texto: mensagens[i].texto
                }
                retorno.push(msg);
              }
              res.send(JSON.stringify(retorno));
            }
    });
  });
  //POST
  router.route('/mensagens/:_id/:nome/')
  .post(function(req, res){
    var msg = new Mensagem({
      nome: req.body.nome,
      texto: req.body.texto
    });
    msg.save(function(err){
      if (err)
        res.send(err);
      res.json({ message: 'Mensagem created!' });
    });
  });
  //PUT
  router.route('/mensagens/:_id/:nome/:texto')
  .put(function(req, res){
      Mensagem.findOne({_id:req.body._id}, function(err, conv){
        if(err)
          res.send(err);
        var update = {};
        if(req.body.nome){
            update.nome = req.body.nome;
        }
        if(req.body.texto){
          update.texto = req.body.texto
        }
          Mensagem.update({_id:req.body._id}, update, function(err){
          if(err)
            res.send(err);
          res.json({ message: 'Mensagem updated!' });
        });

      })
  });
  //DELETE
  router.route('/mensagens/:_id')
  .delete(function(req, res){
    Mensagem.remove({
          _id: req.params._id
      }, function(err, conv) {
          if (err)
              res.send(err);
          res.json({ message: 'Successfully deleted' });
      });
  });
};

var express = require('express');
var app = express();
// var bodyParser  = require('body-parser');
var connection = require('./app/config/database.js');
// var Convidado = require('./app/models/convidado');
// var routes = require('./app/routes/route');
var defaultRoute = require('./app/routes/defaultRoute');

//conexão com banco
var uri = process.env.MONGODB_URI || 'mongodb://localhost/casamento-app';
connection.connect(uri);

//STATIC SOURCES'mongodb://localhost/rpgmanager'
app.use('/assets', express.static('assets'));
app.use('/images', express.static('images'));
app.use('/musics', express.static('musics'));
var favicon = require('serve-favicon');
app.use(favicon(__dirname + '/images/favicon.png'));

//DEFINE PAGES
app.get('/', function(req, res){
    res.sendFile('index.html', { root: __dirname  } );
});
app.get('/controle-convidados', function(req, res){
    res.sendFile('./pages/convidados.html', { root: __dirname  } );
});
app.get('/controle-mensagens', function(req, res){
    res.sendFile('./pages/mensagens.html', { root: __dirname  } );
});

defaultRoute(app);

// START THE SERVER
// =============================================================================
var port = process.env.PORT || 8080;
var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('my app is listening at http://%s:%s', host, port);
});

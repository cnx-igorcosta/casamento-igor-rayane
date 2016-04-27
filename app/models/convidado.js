var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var convidadoSchema = new Schema({
  nome : {type : String, index: {unique: true}},
  confirmado: {type: Boolean}
});

var Convidado = mongoose.model('Convidado', convidadoSchema);

module.exports = Convidado;

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mensgemSchema = new Schema({
  nome : {type : String},
  texto: {type: String}
},
{
    timestamps: true
});

var Mensagem = mongoose.model('Mensagem', mensgemSchema);

module.exports = Mensagem;

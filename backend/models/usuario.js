const mongoose = require("mongoose");

const usuarioSchema = mongoose.Schema({
  usuario: { type: String, required: true },
  senha: { type: String, required: true },
  nome: { type: String, required: true },
  dataNascimento: { type: String, required: true },
  identidadeGenero: { type: String, required: true },
  telefone: { type: String, required: true },
  mensagens: [{ anonimato: Boolean, texto: String}],
});

module.exports = mongoose.model("Usuario", usuarioSchema);

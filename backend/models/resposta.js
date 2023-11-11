const mongoose = require("mongoose");

const respostaSchema = mongoose.Schema({
  mensagem: { type: String, required: true },
  enviadoPor: { type: String, required: true },
  resposta: [{ ajudante: String, texto: String}],
});

module.exports = mongoose.model("Resposta", respostaSchema);

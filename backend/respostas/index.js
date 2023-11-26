const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const mongoose = require("mongoose");
const Resposta = require("../models/resposta");

mongoose
  .connect(
    "mongodb+srv://admin:admin123456@cluster0.ganbwc9.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Conexão OK");
  })
  .catch(() => {
    console.log("Conexão NOK");
  });


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/respostas", (req, res, next) => {
  const resposta = new Resposta({
    mensagem: req.body.mensagem,
    enviadoPor: req.body.enviadoPor,
    resposta: req.body.resposta,
    idMensagem: req.body.idMensagem,
    anonimato: req.body.anonimato
  });
  resposta.save();
  console.log(resposta);
  res.status(201).json({ mensagem: "Resposta enviada com sucesso!" });
});

app.get("/api/respostas", (req, res, next) => {
  Resposta.find().then((documents) => {
    res.status(200).json({
      mensagem: "Tudo OK",
      respostas: documents,
    });
  });
});

app.listen(4000, () => {
    console.log('Respostas. Porta 4000');
});

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const mongoose = require("mongoose");
const Usuario = require("../models/usuario");

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

app.post("/api/usuarios", (req, res, next) => {
  const usuario = new Usuario({
    usuario: req.body.usuario,
    senha: req.body.senha,
    nome: req.body.nome,
    dataNascimento: req.body.dataNascimento,
    identidadeGenero: req.body.identidadeGenero,
    telefone: req.body.telefone
  });
  usuario.save();
  console.log(usuario);
  res.status(201).json({ mensagem: "Usuário cadastrado com sucesso!" });
});

app.get("/api/usuarios", (req, res, next) => {
  Usuario.find().then((documents) => {
    const usuariosFiltrados = documents.filter(document => document.identidadeGenero);
    res.status(200).json({
      mensagem: "Tudo OK",
      usuarios: usuariosFiltrados,
    });
  });
});

app.get("/api/usuarios/:user", (req, res, next) => {
  Usuario.findOne({ user: req.params.user }).then((resultado) => {
    console.log(resultado);
    res.status(200).json({
      mensagem: "Usuário encontrado",
      usuarios: resultado,
    });
  });
});

app.put("/api/usuarios/:usuario", (req, res, next) => {
  Usuario.updateOne(
    { usuario: req.params.usuario }, // <-- find stage
    {
      $set: {
        nome: req.body.nome,
        dataNascimento: req.body.dataNascimento,
        telefone: req.body.telefone,
        usuario: req.body.usuario,
        identidadeGenero: req.body.identidadeGenero,
        senha: req.body.senha,
        mensagens: req.body.mensagens
      },
    }
  ).then((result) => {
    res.status(200).json({ message: "Usuário alterado com sucesso!" });
  });
});

app.listen(9000, () => {
    console.log('Usuários. Porta 9000');
});

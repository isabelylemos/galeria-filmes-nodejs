import express from "express";
import multer from "multer";
import connection from "./config/sequelize-config.js";
import galeria from "./models/galeriaFilmes.js"

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

connection
  .authenticate()
  .then(() => {
    console.log("Conexão com o banco de dados feita com sucesso!");
  })
  .catch((error) => {
    console.log(error);
  });

connection
  .query("CREATE DATABASE IF NOT EXISTS galeriaFilmes;")
  .then(() => {
    console.log("O banco de dados está criado.");
  })
  .catch((error) => {
    console.log(error);
  });

const upload = multer({ dest: "public/uploads/" });

app.get("/", (req, res) => {
    galeria.findAll().then((filme) => {
      res.render("index", {
        filme: filme,
      });
    });
  });
  
  app.post("/upload", upload.single("file"), (req, res) => {
    const titulo = req.body.titulo;
    const ano = req.body.ano;
    const file = req.file.filename;
    galeria.create({
      titulo: titulo,
      ano: ano,
      file: file
    });
    res.redirect("/");
  });
  
  const port = 8080;
  app.listen(port, (error) => {
    if (error) {
      console.log(`Ocorreu um erro! ${error}`);
    } else {
      console.log(`Servidor iniciado com sucesso em: http://localhost:${port}`);
    }
  });
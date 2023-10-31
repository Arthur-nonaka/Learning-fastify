const fastify = require("fastify")();
const fs = require("fs");
const cron = require("node-cron");

function addAluno() {
  fs.readFile("dados.json", "utf-8", (err, data) => {
    if (err) {
      console.log("Falha ao ler o arquivo JSON");
    } else {
      let dados = JSON.parse(data);
      const aluno = {
        nome: "Arthur",
        idade: 17,
        cidade: "Regente Feijo",
      };

      dados.turma.alunos.push(aluno);
      fs.writeFile("dados.json", JSON.stringify(dados, null, 2), (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Aluno adicionado");
        }
      });
    }
  });
}

fastify.get("/", (req, res) => {
  res.send({ hello: "world" });
});

fastify.get("/read", (req, res) => {
  fs.readFile("dados.json", "utf-8", (err, data) => {
    if (err) {
      res.code(500).send({ erro: "Falha ao ler o arquivo JSON" });
    } else {
      res.send(JSON.parse(data));
    }
  });
});

fastify.listen({ port: 3006 }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  } else {
    console.log("Server running 👍 => http://localhost:3006");
  }
});

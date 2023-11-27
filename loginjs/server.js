const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'seu_usuario_mysql',
  password: 'sua_senha_mysql',
  database: 'seu_banco_de_dados'
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
  } else {
    console.log('Conectado ao MySQL');
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/register', (req, res) => {
  const { fullName, address, cep, password } = req.body;

  // Insira os dados do usuário na tabela 'users'
  const sql = 'INSERT INTO users (full_name, address, cep, password) VALUES (?, ?, ?, ?)';
  db.query(sql, [fullName, address, cep, password], (err, result) => {
    if (err) {
      console.error('Erro ao cadastrar usuário:', err);
      res.status(500).send('Erro ao cadastrar usuário.');
    } else {
      console.log('Usuário cadastrado com sucesso!');
      res.status(201).send('Usuário cadastrado com sucesso!');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
});

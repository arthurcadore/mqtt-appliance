const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'database',
  user: 'yourUser',
  password: 'Your#Password',
  database: 'currentTS'
});

connection.connect((error) => {
  if (error) {
    console.error('Erro ao conectar ao banco de dados: ' + error.message);
  } else {
    console.log('Conexão bem-sucedida ao banco de dados.');
  }
});

module.exports = connection;


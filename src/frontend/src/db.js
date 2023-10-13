const mysql = require('mysql2');

function createConnection() {
  const connection = mysql.createConnection({
    host: 'database',
    user: 'yourUser',
    password: 'Your#Password',
    database: 'currentTS'
  });

  connection.connect((error) => {
    if (error) {
      console.error('Erro ao conectar ao banco de dados: ' + error.message);
      // Se ocorrer um erro na conexão, tenta reconectar a cada 1 segundo
      setTimeout(() => {
        createConnection();
      }, 1000);
    } else {
      console.log('Conexão bem-sucedida ao banco de dados.');
    }
  });

  // Adiciona um evento de erro para evitar que o programa pare devido a erros não tratados
  connection.on('error', (err) => {
    console.error('Erro no banco de dados: ' + err.message);
    // Se ocorrer um erro na conexão, tenta reconectar a cada 1 segundo
    setTimeout(() => {
      createConnection();
    }, 1000);
  });

  return connection;
}

const connection = createConnection();

module.exports = connection;


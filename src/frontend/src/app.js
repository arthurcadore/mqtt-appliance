const express = require('express');
const connection = require('./db'); // Importa a conexão com o banco de dados
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  // Consulta para a tabela 'luminosidade'
  const queryLuminosidade = 'SELECT * FROM currentTS.luminosidade';

  // Consulta para a tabela 'temperatura'
  const queryTemperatura = 'SELECT * FROM currentTS.temperatura';

  // Executar a consulta para luminosidade
  connection.query(queryLuminosidade, (errorLuminosidade, resultsLuminosidade) => {
    if (errorLuminosidade) {
      console.error('Erro ao executar a consulta de luminosidade: ' + errorLuminosidade.message);
      res.status(500).send('Erro interno do servidor');
      return;
    }

    // Executar a consulta para temperatura
    connection.query(queryTemperatura, (errorTemperatura, resultsTemperatura) => {
      if (errorTemperatura) {
        console.error('Erro ao executar a consulta de temperatura: ' + errorTemperatura.message);
        res.status(500).send('Erro interno do servidor');
        return;
      }

      const temperaturaData = resultsTemperatura;
      const luminosidadeData = resultsLuminosidade;
      res.render('index', { temperaturaData, luminosidadeData });
    });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});


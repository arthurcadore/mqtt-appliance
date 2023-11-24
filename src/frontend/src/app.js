const express = require('express');
const connection = require('./db'); // Importa a conexão com o banco de dados
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

// Rota principal
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

      // Converter mensagens em valores numéricos
      const temperaturaData = resultsTemperatura.map(item => {
        return {
          ...item,
          mensagem: parseFloat(item.mensagem) // Converte a mensagem para número
        };
      });

      const luminosidadeData = resultsLuminosidade.map(item => {
        return {
          ...item,
          mensagem: parseFloat(item.mensagem) // Converte a mensagem para número
        };
      });

      res.render('index', { temperaturaData, luminosidadeData });
    });
  });
});

// Rota para fornecer dados de temperatura
app.get('/dados/temperatura', (req, res) => {
  const queryTemperatura = 'SELECT * FROM currentTS.temperatura';

  connection.query(queryTemperatura, (error, results) => {
    if (error) {
      console.error('Erro ao executar a consulta de temperatura: ' + error.message);
      res.status(500).json({ error: 'Erro interno do servidor' });
      return;
    }

    // Converter mensagens em valores numéricos
    const temperaturaData = results.map(item => {
      return {
        ...item,
        mensagem: parseFloat(item.mensagem) // Converte a mensagem para número
      };
    });

    res.json(temperaturaData);
  });
});

// Rota para fornecer dados de luminosidade
app.get('/dados/luminosidade', (req, res) => {
  const queryLuminosidade = 'SELECT * FROM currentTS.luminosidade';

  connection.query(queryLuminosidade, (error, results) => {
    if (error) {
      console.error('Erro ao executar a consulta de luminosidade: ' + error.message);
      res.status(500).json({ error: 'Erro interno do servidor' });
      return;
    }

    // Converter mensagens em valores numéricos
    const luminosidadeData = results.map(item => {
      return {
        ...item,
        mensagem: parseFloat(item.mensagem) // Converte a mensagem para número
      };
    });

    res.json(luminosidadeData);
  });
});

// Rota para fornecer dados de corrente 
app.get('/dados/corrente', (req, res) => {
  const queryCorrente = 'SELECT * FROM currentTS.corrente';

  connection.query(queryCorrente, (error, results) => {
    if (error) {
      console.error('Erro ao executar a consulta de corrente: ' + error.message);
      res.status(500).json({ error: 'Erro interno do servidor' });
      return;
    }

    // Converter mensagens em valores numéricos
    const correnteData = results.map(item => {
      return {
        ...item,
        mensagem: parseFloat(item.mensagem) // Converte a mensagem para número
      };
    });

    res.json(correnteData);
  });
});

// Rota para controlar rele do ar condicionado (releac)
// 0 para desligar e 1 para ligar o ar condicionado, na table releac
// utiliza-se o PUT para escrever 1 ou 0 no banco de dados. 
app.put('/releac/:status', (req, res) => {
  const status = req.params.status;
  const queryReleac = `UPDATE currentTS.releac SET status = ${status}`;

  connection.query(queryReleac, (error, results) => {
    if (error) {
      console.error('Erro ao executar a consulta de releac: ' + error.message);
      res.status(500).json({ error: 'Erro interno do servidor' });
      return;
    }

    res.json({ status });
  });
});

// Rota para controlar rele da lampada (relelamp)
// 0 para desligar e 1 para ligar a lampada, na table relelamp
// utiliza-se o PUT para escrever 1 ou 0 no banco de dados.
app.put('/relelamp/:status', (req, res) => {
  const status = req.params.status;
  const queryRelelamp = `UPDATE currentTS.relelamp SET status = ${status}`;

  connection.query(queryRelelamp, (error, results) => {
    if (error) {
      console.error('Erro ao executar a consulta de relelamp: ' + error.message);
      res.status(500).json({ error: 'Erro interno do servidor' });
      return;
    }

    res.json({ status });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});


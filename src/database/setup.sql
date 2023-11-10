-- Authors: Arthur Cadore M. Barcella
--          Deivid Fortinato Frederico
--          Matheus Pires Salazar
--          Rhenzo Hideki S. Kajikawa
-- PJI2 - Projeto Integrador 2 IFSC-SJ

-- Utiliza o banco de dados 'currentTS'
USE currentTS;

-- Cria uma tabela 'temperatura' para armazenar os dados de temperatura
CREATE TABLE temperatura (
            id INT AUTO_INCREMENT PRIMARY KEY,
            mensagem TEXT,
            data_insercao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cria uma tabela 'luminosidade' para armazenar os dados de luminosidade
CREATE TABLE luminosidade (
            id INT AUTO_INCREMENT PRIMARY KEY,
            mensagem TEXT,
            data_insercao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cria uma tabela 'correnteac' para armazenar os dados de corrente do ar condicionado
CREATE TABLE correnteac (
            id INT AUTO_INCREMENT PRIMARY KEY,
            mensagem TEXT,
            data_insercao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cria uma tabela 'releac' para armazenar os dados rele do ar condicionado
CREATE TABLE releac (
            mensagem TEXT,
            data_insercao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cria uma tabela 'relelamp' para armazenar os dados rele das lampadas
CREATE TABLE relelamp (
            mensagem TEXT,
            data_insercao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


--Cria um novo usuário
CREATE USER 'yourUser'@'%' IDENTIFIED BY 'Your#Password';

--Concede o usuário todos os privilégios
GRANT ALL PRIVILEGES ON currentTS.* TO 'yourUser'@'%';

-- Atualiza os privilégios
FLUSH PRIVILEGES;

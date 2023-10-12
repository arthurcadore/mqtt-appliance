USE currentTS;

CREATE TABLE temperatura (
            id INT AUTO_INCREMENT PRIMARY KEY,
            mensagem TEXT,
            data_insercao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE luminosidade (
            id INT AUTO_INCREMENT PRIMARY KEY,
            mensagem TEXT,
            data_insercao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE USER 'yourUser'@'%' IDENTIFIED BY 'Your#Password';

GRANT ALL PRIVILEGES ON currentTS.* TO 'yourUser'@'%';

FLUSH PRIVILEGES;

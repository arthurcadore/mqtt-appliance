# Authors: Arthur Cadore M. Barcella
#          Deivid Fortinato Frederico
#          Matheus Pires Salazar
#          Rhenzo Hideki S. Kajikawa
# PJI2 - Projeto Integrador 2 IFSC-SJ

FROM mysql:8.0.34

# Configurações do banco de dados
ENV MYSQL_DATABASE currentTS
ENV MYSQL_ROOT_PASSWORD cadore@dbmqtt

# Copia o script SQL para inicializar o banco de dados
COPY ./setup.sql /docker-entrypoint-initdb.d/


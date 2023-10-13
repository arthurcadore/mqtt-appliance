# Use a imagem Alpine 3.18 como a imagem base
FROM alpine:3.18

# Atualize o sistema e instale o Node.js e npm
RUN apk add --update nodejs npm

# Crie um diretório de trabalho dentro do contêiner
WORKDIR /project

# Copie todo o conteúdo da pasta ../src/ para o diretório de trabalho do contêiner (/project)

COPY ./src/ /project/

# Instale as dependências usando npm
RUN npm install mysql2 express mysql ejs

# Comando para iniciar a aplicação quando o contêiner for iniciado
CMD ["node", "app.js"]


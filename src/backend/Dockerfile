# Use a imagem customizada como a imagem base
FROM arthurcadore/stdprojects:base_image

# Crie um diretório de trabalho dentro do contêiner
WORKDIR /project

# Copie todo o conteúdo da pasta MQTTBroker para o diretório de trabalho do contêiner (/project)
COPY ./MqttBroker/ /project/

# Especifique o comando CMD como uma string JSON no formato de array
CMD ["/project/gradlew","bootRun"]


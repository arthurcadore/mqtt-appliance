# Authors: Arthur Cadore M. Barcella
#          Deivid Fortinato Frederico
#          Matheus Pires Salazar
#          Rhenzo Hideki S. Kajikawa
# PJI2 - Projeto Integrador 2 IFSC-SJ

#Usa a imagem base do caminho passado
FROM arthurcadore/python_interpreter:mqtt

# Copie o script para o diretório raiz do contêiner
COPY ./scripts/connectorMQTT2DB.py /connectorMQTT2DB.py

# Comando padrão a ser executado quando o contêiner for iniciado
CMD ["python3", "connectorMQTT2DB.py"]


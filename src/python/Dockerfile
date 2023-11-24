FROM arthurcadore/python_interpreter:mqtt

RUN pip install schedule

# Copie o script para o diretório raiz do contêiner
COPY ./scripts/connectorMQTT2DB.py /connectorMQTT2DB.py

# Comando padrão a ser executado quando o contêiner for iniciado
CMD ["python3", "connectorMQTT2DB.py"]


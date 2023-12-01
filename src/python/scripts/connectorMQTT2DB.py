import mysql.connector
import paho.mqtt.client as mqtt
import time
import schedule

db_host = "database"
db_user = "yourUser"
db_password = "Your#Password"
db_database = "currentTS"

mqtt_broker = "mosquitto"
mqtt_port = 1883
mqtt_luminosity_topic = "luminosidade"
mqtt_temperature_topic = "temperatura"
mqtt_current_topic = "corrente"
mqtt_releac_topic = "releac"
mqtt_relelamp_topic = "relelamp"

def on_message(client, userdata, message):
    mensagem = message.payload.decode("utf-8")
    print(f"Mensagem recebida: {mensagem}")

    try:
        connection = mysql.connector.connect(
            host=db_host,
            user=db_user,
            password=db_password,
            database=db_database
        )

        cursor = connection.cursor()

        # Inserir mensagem no banco de dados
        if message.topic == mqtt_luminosity_topic:
            insert_query = "INSERT INTO luminosidade (mensagem) VALUES (%s)"
        elif message.topic == mqtt_temperature_topic:
            insert_query = "INSERT INTO temperatura (mensagem) VALUES (%s)"
        elif message.topic == mqtt_current_topic:
            insert_query = "INSERT INTO corrente (mensagem) VALUES (%s)"
        else:
            print("Tópico não reconhecido. Dados não foram salvos no banco de dados.")
            return

        cursor.execute(insert_query, (mensagem,))
        connection.commit()

        print("Mensagem salva no banco de dados.")

    except mysql.connector.Error as error:
        print(f"Erro ao conectar ao banco de dados: {error}")

    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

def publish_releac_value(client):
    try:
        connection = mysql.connector.connect(
            host=db_host,
            user=db_user,
            password=db_password,
            database=db_database
        )

        cursor = connection.cursor()

        # Obter valor da coluna "mensagem" da tabela "releac"
        select_query = "SELECT mensagem FROM releac ORDER BY id DESC LIMIT 1"
        cursor.execute(select_query)
        result = cursor.fetchone()

        if result:
            releac_message = result[0]
            client.publish(mqtt_releac_topic, releac_message)
            print(f"Mensagem publicada no tópico {mqtt_releac_topic}: {releac_message}")

    except mysql.connector.Error as error:
        print(f"Erro ao conectar ao banco de dados: {error}")

    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

def publish_relelamp_value(client):
    try:
        connection = mysql.connector.connect(
            host=db_host,
            user=db_user,
            password=db_password,
            database=db_database
        )

        cursor = connection.cursor()

        # Obter valor da coluna "mensagem" da tabela "relelamp"
        select_query = "SELECT mensagem FROM relelamp ORDER BY id DESC LIMIT 1"
        cursor.execute(select_query)
        result = cursor.fetchone()

        if result:
            relelamp_message = result[0]
            client.publish(mqtt_relelamp_topic, relelamp_message)
            print(f"Mensagem publicada no tópico {mqtt_relelamp_topic}: {relelamp_message}")

    except mysql.connector.Error as error:
        print(f"Erro ao conectar ao banco de dados: {error}")

    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

# Configurar o cliente MQTT
client = mqtt.Client()
client.on_message = on_message

# Conectar ao broker MQTT
client.connect(mqtt_broker, mqtt_port, 60)
client.subscribe(mqtt_luminosity_topic)
client.subscribe(mqtt_temperature_topic)
client.subscribe(mqtt_current_topic)

# Agendar a publicação periódica no tópico "releac" a cada segundo
schedule.every(1).seconds.do(publish_releac_value, client)

# Agendar a publicação periódica no tópico "relelamp" a cada segundo
schedule.every(1).seconds.do(publish_relelamp_value, client)

# Iniciar o loop para escutar mensagens e executar as tarefas agendadas
while True:
    client.loop_start()
    schedule.run_pending()
    time.sleep(1)

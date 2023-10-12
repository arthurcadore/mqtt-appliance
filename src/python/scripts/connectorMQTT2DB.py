import mysql.connector
import paho.mqtt.client as mqtt

db_host = "database"
db_user = "pythonConnector"
db_password = "Python@connect123"
db_database = "currentTS"

mqtt_broker = "mosquitto"
mqtt_port = 1883
mqtt_luminosity_topic = "luminosidade"
mqtt_temperature_topic = "temperatura"

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

        if message.topic == mqtt_luminosity_topic:
            insert_query = "INSERT INTO luminosidade (mensagem) VALUES (%s)"
        elif message.topic == mqtt_temperature_topic:
            insert_query = "INSERT INTO temperatura (mensagem) VALUES (%s)"
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

# Configurar o cliente MQTT
client = mqtt.Client()
client.on_message = on_message

# Conectar ao broker MQTT
client.connect(mqtt_broker, mqtt_port, 60)
client.subscribe(mqtt_luminosity_topic)
client.subscribe(mqtt_temperature_topic)

# Iniciar o loop para escutar mensagens
client.loop_forever()


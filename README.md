# MQTT (Mosquitto) with MySQL DB and Frontend Board Appliance

This project uses Docker Containers to host MQTT Broker and integration with MySQL DB with Frontend App. 
Follow the steps below to set up and run the application after pulling the latest changes from this respository.

Prerequisites
Before you begin, ensure you have the following installed on your system:

- Git version 2.34.1
- Docker version 24.0.6, build ed223bc
- Docker Compose version v2.21.0

---

For Getting Started clone the repository:

Copy code below: 

```
git clone https://github.com/arthurcadore/mqttBroker
```
Navigate to the project directory:
```
cd ./mqttBroker
```

Run the command below to start docker-compose file: 

```
docker compose up -d  & 
```
The "-d" flag runs the containers in detached mode, meaning they will run in the background.

The "&" character creates a process id for the command inputed in, with means that the container will not stop when you close the terminal. 

---

Publishing messages into the application:
Once the containers are up and running, you can publish and store to the topics configured in Mosquitto Dockerfile.

For example, to publish a message in `temperatura` and `luminosidade` (default) topic, use the command below: 

```
mosquitto_pub -h <MQTT_SERVER> -p <MQTT_port> -t temperatura -m "22"
mosquitto_pub -h <MQTT_SERVER> -p <MQTT_port> -t lumunosidade -m "3000"
```

To use `mosquito_pub` command remeber to install the repectively applications on your system. 

---

Once the messages was recived by the server, the listener python script collect then and store it in MySQL database. 

To access the database, use a mysql manager tool as HediSQL or dbeaver and the credetials configured in setup.sql file. 

---

To stop the running container, use the following command:

```
docker-compose down
```

This command stops and removes the containers, networks, and volumes defined in the docker-compose.yml file.

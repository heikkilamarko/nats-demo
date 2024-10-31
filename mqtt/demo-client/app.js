import mqtt from 'mqtt';

const client = mqtt.connect(process.env.MQTT_BROKER_URL, {
	clientId: 'mqttjs01',
	username: process.env.MQTT_USERNAME,
	password: process.env.MQTT_PASSWORD,
	clean: false
});

client.on('connect', () => client.subscribe('demo/#', { qos: 0 }));

client.on('message', (topic, message) => {
	console.log(`${topic}: ${message.toString()}`);
});

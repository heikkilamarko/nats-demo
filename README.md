# NATS Demo

## Docker Compose

To start the services using Docker Compose, run the following command:

```bash
docker compose up --build -d
```

| Service         | Address                     |
| --------------- | --------------------------- |
| Demo UI         | http://localhost:8080       |
| NATS Monitoring | http://localhost:8080/nats/ |

## NATS CLI

### Publish Messages

```bash
# Publish 100 messages at 5-second intervals
nats pub demo.messages "hello {{.Count}}" --count 100 --sleep 5s
```

### Query Connected Users

```bash
# For all users
nats req demo.ping "" --replies 0

# For one user
nats req demo.ping "" --replies 1

# For three users
nats req demo.ping "" --replies 3
```

### UI Configuration

#### Change Theme

```bash
# Set theme to light mode
nats kv put demo_kv theme "light"

# Set theme to dark mode
nats kv put demo_kv theme "dark"
```

#### Change Title

```bash
# Set a new UI title
nats kv put demo_kv title "New Title"
```

#### Display KV Entries

```bash
# Show all key-value entries in the demo_kv store with values
nats kv ls demo_kv --verbose --display-value
```

## MQTT

To send messages to the `demo/messages` topic, use [MQTT Explorer](https://mqtt-explorer.com/) or any other MQTT client.

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
| Grafana         | http://localhost:3000       |

## NATS CLI

### Create NATS Context

```bash
# Create a context for the demo account
nats context save --user admin --password S3c_r3t demo

# Create a context for the sys account
nats context save --user sysadmin --password S3c_r3t sys

# Select the demo context
nats context select demo

# List all contexts
nats context ls
```

### Query Connected Users

```bash
# For all users
nats request demo.ping "" --replies 0

# For one user
nats request demo.ping "" --replies 1
```

### UI Configuration

#### Change Theme

```bash
# Set theme to light mode
nats kv put demo theme "light"

# Set theme to dark mode
nats kv put demo theme "dark"
```

#### Change Title

```bash
# Set a new UI title
nats kv put demo title "New Title"
```

#### Display KV Entries

```bash
# Show all key-value entries in the demo bucket with values
nats kv ls demo --verbose --display-value
```

## MQTT

### Publish Messages

To publish messages to the `demo/messages` topic, use [MQTT Explorer](https://mqtt-explorer.com/) or any other MQTT client.

Example JSON message:

```json
{
  "user": "MQTT Client",
  "text": "demo message"
}
```

### Subscribe to Messages

To subscribe to messages on the `demo/messages` topic, use [MQTT Explorer](https://mqtt-explorer.com/) or any other MQTT client.

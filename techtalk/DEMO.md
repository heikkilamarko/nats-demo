# NATS Demo

![Demo](demo.svg)

## NATS Server

```bash
nats-server -c demo.conf
```

## Subject-Based Messaging & Core NATS

https://docs.nats.io/nats-concepts/subjects

https://docs.nats.io/nats-concepts/core-nats

### Publish-Subscribe

```bash
nats sub demo.messages
```

```bash
nats pub demo.messages "hello world"
```

```bash
nats sub "demo.*.messages"
```

```bash
nats pub demo.en.messages "hello world"
```

```bash
nats pub demo.fi.messages "hei maailma"
```

```bash
nats sub "demo.>"
```

```bash
nats sub ">"
```

### Queue Groups

```bash
nats sub "demo.>" --queue demo
```

```bash
nats pub demo.messages "hello world"
```

### Request-Reply

```bash
nats reply demo.service "instance 1: pong"
```

```bash
nats reply demo.service "instance 2: pong"
```

```bash
nats request demo.service "ping"
```

```bash
nats reply "demo.weather.*" --command "curl -s wttr.in/{{2}}?0q"
```

```bash
nats request demo.weather.helsinki "" --raw
```

```bash
nats request demo.weather.london "" --raw
```

## JetStream

https://docs.nats.io/nats-concepts/jetstream

### Streams

```bash
nats stream add messages
```

| Configuration    | Value        |
| ---------------- | ------------ |
| Subjects         | `messages.>` |
| Retention Policy | `Limits`     |

```bash
nats stream add jobs
```

| Configuration    | Value        |
| ---------------- | ------------ |
| Subjects         | `jobs.>`     |
| Retention Policy | `Work Queue` |

```bash
nats stream ls
```

```bash
nats pub messages.demo "demo message {{.Count}}" --count 1000
```

```bash
nats pub jobs.demo "demo job {{.Count}}" --count 100
```

```bash
watch nats stream ls
```

### Consumers

```bash
nats consumer add messages messages
```

```bash
nats consumer add jobs jobs
```

```bash
nats consumer report
```

```bash
nats consumer next messages messages --count 10
```

```bash
nats consumer next jobs jobs --count 10
```

## Key-Value Store

https://docs.nats.io/nats-concepts/jetstream/key-value-store

```bash
nats kv add demo
```

```bash
nats kv put demo log_level "INFO"
```

```bash
nats kv put demo theme "dark"
```

```bash
nats kv ls
```

```bash
nats kv ls demo --verbose --display-value
```

```bash
nats kv watch demo
```

```bash
nats kv put demo log_level "WARN"
```

```bash
nats kv rm demo theme
```

## Object Store

https://docs.nats.io/nats-concepts/jetstream/obj_store

```bash
nats object add demo
```

```bash
echo "Lorem ipsum dolor sit amet" > lorem_ipsum.txt
```

```bash
nats object put demo lorem_ipsum.txt
```

```bash
nats object ls
```

```bash
nats object ls demo
```

```bash
nats object get demo lorem_ipsum.txt
```

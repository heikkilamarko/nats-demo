# Demo

## NATS Server

```bash
nats-server -c demo.conf
```

## Core NATS

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
nats pub demo.fi.messages "hei maailma"
```

```bash
nats sub "demo.>"
```

```bash
nats pub demo.en.messages "hello world"
nats pub demo.fi.messages "hei maailma"
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
nats reply demo.greeter "hello world"
nats reply demo.greeter "hei maailma"
```

```bash
nats request demo.greeter "hi"
```

## JetStream

### Streams

```bash
nats stream add messages
# Subjects:         "messages.>"
# Retention Policy: "Limits"
```

```bash
nats stream add jobs
# Subjects:         "jobs.>"
# Retention Policy: "Work Queue"
```

```bash
nats stream ls
```

```bash
nats pub messages.en "hello world {{.Count}}" --count 1000
nats pub messages.fi "hei maailma {{.Count}}" --count 1000
```

```bash
nats pub jobs.demo "demo job {{.Count}}" --count 100
```

```bash
nats stream ls
```

```bash
nats stream view messages
```

```bash
nats stream -h
```

```bash
watch nats stream ls
```

### Consumers

```bash
nats consumer add messages messages_con
```

```bash
nats consumer add jobs jobs_con
```

```bash
nats consumer report messages
nats consumer report jobs
```

```bash
nats consumer next messages messages_con  --count 10
```

```bash
nats consumer next jobs jobs_con --count 10
```

## Key-Value Store

```bash
nats kv -h
```

```bash
nats kv add demo_bucket
```

```bash
nats kv ls
```

```bash
nats kv put demo_bucket log_level "INFO"
nats kv put demo_bucket theme "dark"
```

```bash
nats kv ls demo_bucket --verbose --display-value
```

```bash
nats kv get demo_bucket log_level
```

```bash
nats kv rm demo_bucket theme
```

```bash
nats kv watch demo_bucket
```

```bash
nats kv put demo_bucket theme "light"
```

## Object Store

```bash
nats object -h
```

```bash
nats object add demo_bucket
```

```bash
nats object ls
```

```bash
echo "Lorem ipsum dolor sit amet" > lorem_ipsum.txt
```

```bash
nats object put demo_bucket lorem_ipsum.txt
```

```bash
nats object ls demo_bucket
```

```bash
nats object get demo_bucket lorem_ipsum.txt --output lorem_ipsum.get.txt
```

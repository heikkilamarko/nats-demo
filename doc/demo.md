# Demo

## NATS Server

```bash
 nats-server -js -sd nats_data
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
nats pub demo.a.messages "hello world"
nats pub demo.b.messages "hello world"
```

```bash
nats sub "demo.*.messages.>"
```

```bash
nats pub demo.a.messages.x.y.z "hello world"
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
nats reply demo.greeter "hello world 1"
nats reply demo.greeter "hello world 2"
```

```bash
nats request demo.greeter "hi"
```

```bash
nats reply demo.greeter "hello world 1" --queue reply1
nats reply demo.greeter "hello world 2" --queue reply2
```

```bash
nats request demo.greeter "hi"
nats request demo.greeter "hi" --replies 0
```

## JetStream

### Streams

```bash
nats stream add messages_str
# subjects: "demo.messages.>"
```

```bash
nats stream ls
```

```bash
nats pub demo.messages.a "message {{.Count}}" --count 1000
nats pub demo.messages.b "message {{.Count}}" --count 1000
```

```bash
nats stream subjects messages_str
```

```bash
 nats stream info messages_str
```

```bash
 nats stream view messages_str
```

```bash
nats stream -h
```

### Consumers

```bash
nats con add messages_str messages_con1
```

```bash
nats con next messages_str messages_con1
```

```bash
nats con info messages_str messages_con1
```

```bash
nats stream ls
```

```bash
nats con add messages_str messages_con2 --defaults
```

```bash
nats con ls messages_str
```

```bash
nats con next messages_str messages_con2
```

```bash
nats stream add messages_wq_str
# subjects:         "demo.wqmessages.>"
# retention policy: "Work Queue"
```

```bash
nats pub demo.wqmessages.a "message {{.Count}}" --count 100
```

```bash
nats stream ls
```

```bash
nats con add messages_wq_str messages_wq_con --defaults
```

```bash
watch nats stream ls
```

```bash
nats con next messages_wq_str messages_wq_con
nats con next messages_wq_str messages_wq_con --count 100
```

## Key-Value Store

```bash
nats kv -h
```

```bash
nats kv ls
```

```bash
nats kv add demo_kv
```

```bash
nats kv put demo_kv theme "dark"
nats kv put demo_kv title "demo title"
```

```bash
nats kv ls demo_kv -v --display-value
```

```bash
nats kv get demo_kv theme
```

```bash
nats kv rm demo_kv title
```

```bash
nats kv watch demo_kv
```

```bash
nats kv put demo_kv theme "light"
```

```bash
nats kv put demo_kv title "demo title"
```

## Object Store

```bash
nats object -h
```

```bash
nats object add demo_obj
```

```bash
nats object ls
```

```bash
echo "demo file" > demo.txt
```

```bash
nats object put demo_obj demo.txt
```

```bash
nats object ls demo_obj
```

```bash
nats object get demo_obj demo.txt --output demo_out.txt
```

## WebSocket

See the root `README.md`

## MQTT

See the root `README.md`

# NATS - The Edge & Cloud Native Messaging System

NATS is a simple, secure and high performance open source connective technology built for the ever increasingly hyper-connected world. It is a single technology that enables applications to securely communicate across any combination of cloud vendors, on-premise, edge, web and mobile, and devices. NATS is a Cloud Native Computing Foundation (CNCF) incubating project.

NATS is being used globally by thousands of companies, spanning use-cases including microservices, edge computing, mobile, IoT and can be used to augment or replace traditional messaging.

## What is NATS

- [Official Website](https://nats.io/)
- [Cloud Native Computing Foundation (CNCF) Incubating Project](https://www.cncf.io/projects/nats/)
- [Developed by Synadia](https://www.synadia.com/)
- [Apache License 2.0](https://github.com/nats-io/nats-server/blob/main/LICENSE)
- [Overview](https://docs.nats.io/nats-concepts/overview)
- [What is NATS](https://docs.nats.io/nats-concepts/what-is-nats)
- [Compare NATS](https://docs.nats.io/nats-concepts/overview/compare-nats)

## Installing a NATS

- [NATS Server](https://docs.nats.io/running-a-nats-service/introduction/installation)
- [NATS CLI](https://docs.nats.io/using-nats/nats-tools/nats_cli)

## Configuring NATS Server

- [Configuring NATS Server](https://docs.nats.io/running-a-nats-service/configuration)

## Developing with NATS

- [Developing with NATS](https://docs.nats.io/using-nats/developer)
- [NATS by Example](https://natsbyexample.com/)

## NATS Server

```bash
nats-server -c demo.conf
```

## Subject-Based Messaging

https://docs.nats.io/nats-concepts/subjects

## Core NATS

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
nats pub demo.en.messages "hello world"
```

```bash
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
```

```bash
nats reply demo.greeter "hei maailma"
```

```bash
nats request demo.greeter "hi"
```

## JetStream

https://docs.nats.io/nats-concepts/jetstream

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
```

```bash
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
```

```bash
nats consumer report jobs
```

```bash
nats consumer next messages messages_con  --count 10
```

```bash
nats consumer next jobs jobs_con --count 10
```

## Key-Value Store

https://docs.nats.io/nats-concepts/jetstream/key-value-store

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
```

```bash
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

https://docs.nats.io/nats-concepts/jetstream/obj_store

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

## Server Topologies

- [Clustering](https://docs.nats.io/running-a-nats-service/configuration/clustering)
- [Super-cluster with Gateways](https://docs.nats.io/running-a-nats-service/configuration/gateways)
- [Leaf Nodes](https://docs.nats.io/running-a-nats-service/configuration/leafnodes)

## Securing NATS

- [Security](https://docs.nats.io/nats-concepts/security)
- [Authentication](https://docs.nats.io/running-a-nats-service/configuration/securing_nats/auth_intro)
- [Authorization](https://docs.nats.io/running-a-nats-service/configuration/securing_nats/authorization)
- [Auth Callout](https://docs.nats.io/running-a-nats-service/configuration/securing_nats/auth_callout)
- [Multi Tenancy using Accounts](https://docs.nats.io/running-a-nats-service/configuration/securing_nats/accounts)

## MQTT

- https://docs.nats.io/running-a-nats-service/configuration/mqtt

## WebSocket

- https://docs.nats.io/running-a-nats-service/configuration/websocket

## Monitoring

- https://docs.nats.io/running-a-nats-service/nats_admin/monitoring

## Subject Mapping and Partitioning

https://docs.nats.io/nats-concepts/subject_mapping

- Simple mappings
- Subject token reordering
- Dropping subject tokens
- Splitting and slicing tokens
- Weighted mappings
  - For A/B testing
  - Canary releases
  - Traffic shaping in testing
  - Artificial loss
- Cluster scoped mappings
- Subject mapping and transforms in streams

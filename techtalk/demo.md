# NATS

- Messaging system / Connective technology
- Designed for increasingly hyper-connected world
- Open source, Apache License 2.0
- Cloud Native Computing Foundation (CNCF) incubating project
- Widely adopted
  - Used globally by thousands of companies
  - Use cases: microservices, stream processing, edge computing, web, mobile, IoT...
  - 200M+ downloads
  - 1000+ contributors
  - SDKs available for all major programming languages (Go, Rust, C, .NET, Java, JavaScript, Python...)
- Developed by Synadia
  - Synadia has a NATS-as-a-Service offering
    - Synadia Cloud: A global, multi-cloud NATS platform with an admin portal and API, fully managed by Synadia.
    - Synadia Platform: NATS packaged with enterprise-grade features, available as a fully managed service by Synadia or for self-hosting.
- Simple
  - All features in a ~15MB single binary executable
  - No runtime dependencies
- High performance
- Secure
- Multi-tenant (accounts)
- Runs everywhere
  - On-prem
  - Edge
  - Cloud
  - Containers
  - Mobile
  - Devices
  - ...

## Features

- Subject-based addressing
- Payload-agnotic
- Core NATS
  - Publish-Subscribe
  - Request-Reply
  - Queue Groups
- JetStream (the persistence layer on top of Core NATS)
  - Streams
  - Work Queues
  - Key-Value Store
  - Object Store
- Supported protocols
  - TCP (Standard NATS)
  - MQTT 3.1.1
  - WebSocket
- Multi-Tenant (Accounts)
- Security
  - TLS
  - Token
  - Username / Password (plain text or bcrypted passwords)
  - NKeys (highly secure public-key signature system based on Ed25519)
  - Decentralized JWT authentication/authorization
    - Zero trust security
    - Roles: Operator, Account, User
  - Auth Callout (use any IAM solution: OAuth, LDAP, SAML, Microsoft Entra, Keycloak, ZITADEL...)
- Server topologies
  - Single-node NATS Server
  - Clustering
  - Super Clusters with Gateway connections
  - Leaf Nodes (useful in IoT and edge scenarios)
- Monitoring
  - NATS Server provides a lightweight HTTP server on a dedicated monitoring port
  - Prometheus NATS Exporter

## NATS CLI

The best way to begin learning NATS is by using the NATS CLI.

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

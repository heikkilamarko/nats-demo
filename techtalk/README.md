# NATS

## Overview

- Messaging system and connective technology

- Open source, Apache License 2.0

- Cloud Native Computing Foundation (CNCF) incubating project

- Developed by Synadia

  - Synadia also offers NATS-as-a-Service solutions, including **Synadia Cloud** and **Synadia Platform**.

- Known for its robustness, simplicity, and ease of use

- Versatile: can replace many commonly used technologies with a single solution.

  | Category                            | Technologies                                                     |
  | ----------------------------------- | ---------------------------------------------------------------- |
  | Traditional Messaging               | RabbitMQ, Azure Service Bus, Google Cloud Pub/Sub, AWS SNS & SQS |
  | Data Streaming                      | Kafka, Azure Event Hubs, RabbitMQ Streams                        |
  | WebSocket Servers                   | Centrifugo, Azure Web PubSub, Azure SignalR Service              |
  | MQTT 3.1.1 Brokers                  | HiveMQ MQTT Broker                                               |
  | Key-Value Stores                    | Redis, Memcached                                                 |
  | Object Stores                       | MinIO, S3, Azure Blob Storage, Google Cloud Storage              |
  | App Configuration & Feature Toggles | Consul, LaunchDarkly, Azure App Configuration                    |
  | Service Mesh                        | Envoy, Istio                                                     |

- Lightweight

  - All features in a 18MB single binary
  - No runtime dependencies

- Runs everywhere (on-prem, edge, cloud, containers, mobile, devices, etc.)

- High performance

- Secure

- Truly Multi-tenant

- Scales from a single NATS server to multi-cloud superclusters and leaf nodes

- Official SDKs available for all major programming languages (Go, Rust, C, .NET, Java, JavaScript, Python, etc.)

- Widely adopted

  - Used globally by thousands of companies
  - Use cases: microservices, stream processing, edge computing, web, mobile, IoT, etc.
  - 1000+ GitHub contributors
  - 9000+ Slack members
  - 300M+ Docker pulls

## Technology

- Subject-based addressing

- Location-transparent

- Geo-aware

- Payload-agnostic

- Message headers

- Supported protocols

  - TCP (Standard NATS)
  - WebSocket
  - MQTT 3.1.1 with Sparkplug B compatibility

- Core NATS

  - At-most-once delivery
  - No persistence
  - Publish-Subscribe
  - Request-Reply
  - Queue Groups

- JetStream

  - Persistence layer on top of Core NATS
    - File storage
    - Memory storage
  - At-least-once and exactly-once delivery
  - Streams
  - Consumers
    - Durable (persisted server-side, identified by name, shareable across clients for load balancing)
    - Ephemeral (not persisted, created at subscription time, deleted when the subscription is closed)
  - Advisories can be used to implement functionalities such as dead-letter queues (DLQ).
  - Disaster recovery
    - Automatic (from intact quorum nodes)
    - Manual (backup & restore)

- Key-Value Store

  - Built on top of JetStream
  - Buckets
  - Keys
  - Allows configuring the number of historical values to retain per key.
  - Supports watching a bucket or key to receive real-time change notifications.
  - Provides atomic create and update operations for implementing features like distributed locking and concurrency control.

- Object Store

  - Built on top of JetStream
  - Buckets
  - Keys
  - Allows storing and retrieving files of any size by associating them with a path or file name as the key.
  - Supports watching a bucket to receive real-time change notifications.

- Server topologies

  - Single NATS server
  - Clustering
  - Superclusters (cluster of clusters) with gateway connections
  - Leaf Nodes (useful in IoT and edge scenarios)

- Multi-tenancy using Accounts

  - Accounts are secure, isolated messaging contexts that enable multi-tenancy in NATS.
  - Messaging between accounts is enabled by exporting and importing subject spaces.

- Security

  - TLS
  - Token authentication
  - Username/Password (plain text or bcrypt-hashed passwords)
  - NKeys (highly secure public-key signature system based on Ed25519)
  - Decentralized JWT authentication/authorization
    - Zero-trust security
    - Roles: Operator, Account, User
  - Auth Callout (use any IAM solution, e.g., OAuth, LDAP, Microsoft Entra ID, Keycloak, ZITADEL, etc.)
  - Encryption at rest

- Monitoring

  - NATS Server provides an HTTP monitoring endpoint.
  - Prometheus NATS Exporter
  - NATS Surveyor

## NATS CLI

https://docs.nats.io/using-nats/nats-tools/nats_cli

The best way to begin learning NATS is by using the NATS CLI.

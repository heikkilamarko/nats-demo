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

## Server Topologies

- [Clustering](https://docs.nats.io/running-a-nats-service/configuration/clustering)
- [Super-cluster with Gateways](https://docs.nats.io/running-a-nats-service/configuration/gateways)
- [Leaf Nodes](https://docs.nats.io/running-a-nats-service/configuration/leafnodes)

## Developing with NATS

- [Developing with NATS](https://docs.nats.io/using-nats/developer)
- [NATS by Example](https://natsbyexample.com/)

## Core NATS

https://docs.nats.io/nats-concepts/core-nats

- Subject-Based Messaging
- Publish-Subscribe
- Request-Reply
- Queue Groups

## JetStream

https://docs.nats.io/nats-concepts/jetstream

- Streams
- Source and Mirror Streams
- Consumers
- Headers
- Key/Value Store
- Object Store

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

## MQTT

- https://docs.nats.io/running-a-nats-service/configuration/mqtt

## WebSocket

- https://docs.nats.io/running-a-nats-service/configuration/websocket

## Monitoring

- https://docs.nats.io/running-a-nats-service/nats_admin/monitoring

## Securing NATS

- [Security](https://docs.nats.io/nats-concepts/security)
- [Authentication](https://docs.nats.io/running-a-nats-service/configuration/securing_nats/auth_intro)
- [Authorization](https://docs.nats.io/running-a-nats-service/configuration/securing_nats/authorization)
- [Auth Callout](https://docs.nats.io/running-a-nats-service/configuration/securing_nats/auth_callout)
- [Multi Tenancy using Accounts](https://docs.nats.io/running-a-nats-service/configuration/securing_nats/accounts)

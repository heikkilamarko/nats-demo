# Azure

```bash
az acr login -n <container_registry_name>
```

## Build UI Container Image

To build the UI container image, navigate to the `ui` directory and execute the following commands:

```bash
cd ui

docker build --platform linux/amd64 -t <container_registry_name>.azurecr.io/ui:v1 .

docker push <container_registry_name>.azurecr.io/ui:v1
```

## Build NATS Container Image

To build the NATS container image, navigate to the `nats` directory and execute the following commands:

```bash
cd nats

docker build --platform linux/amd64 -t <container_registry_name>.azurecr.io/nats:v1 .

docker push <container_registry_name>.azurecr.io/nats:v1
```

## Build NATS Box Container Image

To build the NATS Box container image, use the following commands:

```bash
docker pull --platform linux/amd64 natsio/nats-box

docker tag natsio/nats-box <container_registry_name>.azurecr.io/nats-box:v1

docker push <container_registry_name>.azurecr.io/nats-box:v1
```

## Connect to NATS Box Container in Azure Container App

To connect to the NATS Box container in your Azure Container App, run the following command:

```bash
az containerapp exec --resource-group <resource_group_name> --name <container_app_name> --container <container_name> --command "/bin/sh"
```

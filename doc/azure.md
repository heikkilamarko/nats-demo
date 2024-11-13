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

## Connect to a Container in Azure Container App

To connect to a container in your Azure Container App, run the following command:

```bash
az containerapp exec --resource-group <resource_group_name> --name <container_app_name> --container <container_name> --command "/bin/sh"
```

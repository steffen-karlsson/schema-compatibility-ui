![Schemax](app/public/banner.png)

**Versatile, fast and lightweight web UI for validating schema compatibility levels in Confluent Schema Registry.**

## Description

This application serves as a versatile web user interface. It is designed to validate schema compatibility levels,
primarily focusing on the Confluent Schema Registry.

The application is characterized by its speed, ensuring quick responses and efficient operations. This makes it an ideal
tool for developers and teams working in fast-paced environments.

Despite its comprehensive functionality, the application remains lightweight. It does not consume
excessive system resources, ensuring that it can run smoothly even on systems with limited capabilities.

In addition to the Confluent Schema Registry, the application is also compatible with other schema registries. This
broad compatibility makes it a flexible tool that can be integrated into a variety of development workflows.

![Example](example.png)

## Build

```bash
./mvnw -B -ntp versions:set -DnewVersion=<version>
```

Execute unit tests:

```bash
 ./mvnw clean install
```

Build without tests:

```bash
 ./mvnw clean install -DskipTests -Pbuild-docker
```

Build with tests:

```bash
 ./mvnw clean install -Pdocker-build
```

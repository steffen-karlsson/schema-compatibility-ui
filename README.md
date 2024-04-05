# UI for Schema Registry to validate compatibility

Versatile, fast and lightweight web UI for validating schema compatibility levels in Confluent Schema Registry.

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

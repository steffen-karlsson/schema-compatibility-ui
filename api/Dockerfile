FROM openjdk:17-alpine

EXPOSE 8080
WORKDIR /app

COPY target/schemax-*.jar /app/api.jar

ENTRYPOINT ["java", "-jar", "api.jar"]

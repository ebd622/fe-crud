#FROM openjdk:8-jdk-alpine
FROM openjdk:11
#RUN addgroup -S spring && adduser -S spring -G spring
#USER spring:spring
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} gateway-app.jar
ENTRYPOINT ["java","-jar","/gateway-app.jar"]
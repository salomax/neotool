
FROM gradle:8.10.2-jdk21 AS build
WORKDIR /home/gradle/project
# Build context is the Gradle root (service/), so copy everything
COPY . /home/gradle/project
# Build only the :app module to produce the fat JAR
RUN gradle :app:clean :app:build -x test

FROM eclipse-temurin:21-jre
WORKDIR /app
# Copy the specific fat JAR that Micronaut creates
COPY --from=build /home/gradle/project/app/build/libs/app-all.jar /app/service.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/service.jar"]

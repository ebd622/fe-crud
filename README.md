# fe-crud

## Product-API-mock
This is [wiremock](http://wiremock.org/)-based stub for the Product FE-application.

Run Wiremock:
```
docker run --rm -d -p 9090:8080 -p 8443:8443 --name wiremock_demo \
  -v $PWD/product-api-mock:/home/wiremock \
  rodolpheche/wiremock:2.25.1
```

Get all products
```
curl -i localhost:9090/api/v1/products
```
Create a new product
```
curl -i -X POST -d \
'{"name":"bike","description":"Brand: Gazelle","price":"100"}' \
localhost:9090/api/v1/products
```
Update an exising product
```
curl -i -X PUT -d \
'{"id":"1","name":"bike","description":"Brand: Gazelle","price":"100"}' \
localhost:9090/api/v1/products
```

Delete a product by ID:
```
curl -i -X DELETE -d \
'{"id":"1"}' \
localhost:9090/api/v1/products
```

## Gateway
It is a simple routing (reverse-proxy) based on Netflix Zuul edge service library.

There are different ways to run the gateway:
- Run a jar-file;
- Run in a container

(Before running a `gateway` make sure that `wiremock_demo` container is up and running)
### Run a jar:
```
java -jar target/routing-and-filtering-gateway-0.0.1-SNAPSHOT.jar
```
Hit a GET-request to the gateway:
```
curl -i localhost:8080/products
```
### Run a docker container
Build a docker image:
```
docker build -t ebd622/gateway-docker .
```
Run a container:
```
docker run --rm -d -p 8080:8080 --name gateway ebd622/gateway-docker
```
## Run both with a docker-compose
```
docker-compose up
```

```
docker-compose down
```



## Resources
https://spring.io/guides/gs/routing-and-filtering/

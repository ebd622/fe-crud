# fe-crud
[![(CI) NodeJS with Webpack](https://github.com/ebd622/fe-crud/actions/workflows/ci-webpack.yml/badge.svg)](https://github.com/ebd622/fe-crud/actions/workflows/ci-webpack.yml)
[![(CD) NodeJS with Webpack](https://github.com/ebd622/fe-crud/actions/workflows/cd-webpack.yml/badge.svg)](https://github.com/ebd622/fe-crud/actions/workflows/cd-webpack.yml)
## TOC
* [Product-API-mock](#product-api-mock)
   * [Happy flows](#happy-flows)
   * [Errors](#errors)
* [Gateway](#gateway)
   * [Run a jar](#run-a-jar)
   * [Run in a docker container](#run-in-a-docker-container)
   * [Happy flows via gateway](#happy-flows-via-gateway)
   * [Errors via gateway](#errors-via-gateway)
* [crud-app](#crud-app)
* [Run both servises with a docker-compose](#run-both-servises-with-a-docker-compose)
* [Resources](#resources)

## Product-API-mock
This is [wiremock](http://wiremock.org/)-based stub for the Product FE-application.

Run Wiremock:
```
docker run --rm -d -p 9090:8080 -p 8443:8443 --name wiremock_demo \
  -v $PWD/product-api-mock:/home/wiremock \
  rodolpheche/wiremock:2.25.1 \
  -global-response-templating  
```
or
```
docker run --rm  -d -p 9090:8080 -p 8443:8443 --name wiremock_demo \
  -v $PWD/product-api-mock:/home/wiremock \
  wiremock/wiremock \
  -global-response-templating  
```
In both cases a docker container will be created and run. The only difference is a docker image. 

In the second example the [wiremock-docker](https://github.com/wiremock/wiremock-docker) is used.

Use `global-response-templating` for enabling response templating

### Happy flows
Get all products
```
curl -i localhost:9090/api/v1/products
```
Create a new product
```
curl -i -X POST -H 'Content-Type: application/json' -d \
'{"name":"bike","description":"Brand: Gazelle","price":"100"}' \
localhost:9090/api/v1/products
```
Update an exising product
```
curl -i -X PUT -d \
'{"id":"1","name":"bicycle","description":"Brand: Gazelle","price":"100"}' \
localhost:9090/api/v1/products
```

Delete a product by ID:
```
curl -i -X DELETE -d \
'{"id":"1"}' \
localhost:9090/api/v1/products
```
### Errors
Bad request: id is not correct
```
curl -i -X PUT -d \
'{"id":"a","name":"bike","description":"Brand: Gazelle","price":"100"}' \
localhost:9090/api/v1/products
```

Server error 
```
curl -i -X POST -d \
'{"name":"bike-error","description":"Brand: Gazelle","price":"100"}' \
localhost:9090/api/v1/products
```

Time out
```
curl -i -X POST -d \
'{"name":"bike-timeout","description":"Brand: Gazelle","price":"100"}' \
localhost:9090/api/v1/products
```

## Gateway
It is a simple routing (reverse-proxy) based on [Netflix Zuul](https://github.com/Netflix/zuul) edge service library.

There are different ways to run the gateway:
- Run a jar-file;
- Run in a container

(Before running a `gateway` make sure that `wiremock_demo` container is up and running)
### Run a jar
```
java -jar gateway/target/routing-and-filtering-gateway-0.0.1-SNAPSHOT.jar

```
`API_HOST` is used specified a host name. Default value is localhost. The value can be also passed as a parameter:
```
java -jar gateway/target/routing-and-filtering-gateway-0.0.1-SNAPSHOT.jar --API_HOST=localhost
```
`API_HOST=wiremock_host` is used for creating a docker image.

Another othion is to run it as a spring-boot:
```
mvn spring-boot:run
```

### Run in a docker container
Build a docker image:
```
docker build -t ebd622/gateway-docker .
```
Run a container:
```
docker run --rm -d -p 8080:8080 --link wiremock_demo:wiremock_host --name gateway ebd622/gateway-docker
```
This will create and run the container `gateway`. This will also link `gateway` to the container `wiremock_demo`. 

The option `--link wiremock_demo:wiremock_host` will create a host `wiremock_host` and will map the container `wiremock_demo` to the host. We can see this when look into `/etc/hosts` in the container `gateway`:
```
docker exec -it gateway bash

root@b29203928178:/# cat /etc/hosts
127.0.0.1	localhost
::1	localhost ip6-localhost ip6-loopback
fe00::0	ip6-localnet
ff00::0	ip6-mcastprefix
ff02::1	ip6-allnodes
ff02::2	ip6-allrouters
172.17.0.2	wiremock_host 08d47cb3b6e6 wiremock_demo
172.17.0.3	b29203928178
```
After starting up the gateway, it will expose APIs via the port 8080.
Try our the following requests via the gateway. When running a gateway in a docker container the 
following examples need ro tun in a docker-host.

#### Happy flows via gateway:
```
curl -i localhost:8080/products
```
```
curl -i -X POST \
-H 'Content-Type: application/json' \
-d '{"name":"bike","description":"Brand: Gazelle","price":"100"}' \
localhost:8080/products
```
```
curl -i -X PUT \
-H 'Content-Type: application/json' \
-d '{"id":"1","name":"bike","description":"Brand: Gazelle","price":"100"}' \
localhost:8080/products
```
```
curl -i -X DELETE \
-H 'Content-Type: application/json' \
-d '{"id":"1"}' \
localhost:8080/products
```

#### Errors via gateway:
Bad request: id is not correct
```
curl -i -X PUT \
-H 'Content-Type: application/json' \
-d '{"id":"a","name":"bike","description":"Brand: Gazelle","price":"100"}' \
localhost:8080/products
```
Server error:
```
curl -i -X POST \
-H 'Content-Type: application/json' \
-d '{"name":"bike-error","description":"Brand: Gazelle","price":"100"}' \
localhost:8080/products
```

Timeout error:
```
curl -i -X POST \
-H 'Content-Type: application/json' \
-d '{"name":"bike-timeout","description":"Brand: Gazelle","price":"100"}' \
localhost:8080/products
```

## crud-app
The Angular app can be dockerzed and run in a container. Here are some steps how to do this.

Create an image:
```
docker build -t ebd622/crud-app-docker .
```
Run created image in a container:
```
docker run -d -p 8080:80 ebd622/crud-app-docker:latest
```

## Run both servises with a docker-compose
It is also possible to run both `mock` and `gateway` with docker-compose command.

Build and run contatiners:
```
docker-compose up -d
```
Stop containers:
```
docker-compose down
```



## Resources
* [Routing and Filtering](https://spring.io/guides/gs/routing-and-filtering/)
* [Netflix Zuul](https://github.com/Netflix/zuul)
* [How To Dockerize an Angular Application with Nginx](https://www.indellient.com/blog/how-to-dockerize-an-angular-application-with-nginx)
* [Bootstrap css](https://getbootstrap.com/docs/3.4/css/)
* [Bootstrap editor](https://angrytools.com/bootstrap/editor/)
* [Bootstrap table examples](https://examples.bootstrap-table.com/)
* [Handlebars templates](https://handlebarsjs.com/)
* [How to setup a Docker Nginx reverse proxy](https://www.theserverside.com/blog/Coffee-Talk-Java-News-Stories-and-Opinions/Docker-Nginx-reverse-proxy-setup-example)
* [Configure a Docker Nginx Reverse Proxy Image and Container](https://youtu.be/ZmH1L1QeNHk)
* [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware)

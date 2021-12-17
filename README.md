# fe-crud

## Mock
This is [wiremock]-based stub for the FE-application.

Run Wiremock:
```
docker run --rm -d -p 9090:8080 -p 8443:8443 --name wiremock_demo \
  -v $PWD/mock:/home/wiremock \
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

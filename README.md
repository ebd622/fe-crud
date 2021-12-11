# fe-crud

Run Wiremock:
```
docker run --rm -d -p 9090:8080 -p 8443:8443 --name wiremock_demo \
  -v $PWD:/home/wiremock \
  rodolpheche/wiremock:2.25.1
```

Get products
```
curl localhost:9090/api/v1/products
```

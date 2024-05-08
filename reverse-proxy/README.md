# Reverse proxy
This is Nginx-based reverse proxy server
TODO

## Configure and run
### Configure
#### 1. Download and run the official Nginx image from Docker Hub:
```
docker run -d --name nginx-base -p 80:80 nginx:latest
```
#### 2. Copy the Nginx config file from Docker container
```
docker cp nginx-base:/etc/nginx/conf.d/default.conf ~/tmp/default.conf
```

Add config
```
    location /v1/products {
        proxy_pass http://host.docker.internal:3000/v1/products;
    }
```

### Run a container
```
docker start nginx-base
```
## Resources
* [How to setup a Docker Nginx reverse proxy server example](https://www.theserverside.com/blog/Coffee-Talk-Java-News-Stories-and-Opinions/Docker-Nginx-reverse-proxy-setup-example)


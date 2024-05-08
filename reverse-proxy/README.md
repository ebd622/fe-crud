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

#### 3. Edit default.conf to add a path amd and port in a docker-host where Nginx should route requests
In this example all request coming to Nginx path `/v1/products` will be forwarded to a port `3000` in a docker-host (host.docker.internal)
```
    location /v1/products {
        proxy_pass http://host.docker.internal:3000/v1/products;
    }
```
After adding, your default.conf will look like this
```
server {
    listen       80;
    listen  [::]:80;
    server_name  localhost;

    #access_log  /var/log/nginx/host.access.log  main;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }

    location /v1/products {
        proxy_pass http://host.docker.internal:3000/v1/products;
    }
    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
```


### Run a container
```
docker start nginx-base
```
## Resources
* [How to setup a Docker Nginx reverse proxy server example](https://www.theserverside.com/blog/Coffee-Talk-Java-News-Stories-and-Opinions/Docker-Nginx-reverse-proxy-setup-example)


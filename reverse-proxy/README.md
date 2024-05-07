# Reverse proxy
This is Nginx-based reverse proxy server
TODO

## Configure and run

Add config
```
    location /v1/products {
        proxy_pass http://host.docker.internal:3000/v1/products;
    }
```
## Resources
* [How to setup a Docker Nginx reverse proxy server example](https://www.theserverside.com/blog/Coffee-Talk-Java-News-Stories-and-Opinions/Docker-Nginx-reverse-proxy-setup-example)


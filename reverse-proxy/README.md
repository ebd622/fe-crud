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
* [Install express](https://expressjs.com/en/starter/installing.html)

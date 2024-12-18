# Express-API 
This is a product APIs examples, based on Express server.

TODO

## Run server
```
node products-api.js
```

## Run server with proxy
Use the following products-api.js:
```
const express = require('express');
const path = require('path');
const app = express();
const { createProxyMiddleware } = require('http-proxy-middleware');
const port = process.env.PORT || 4200;


// Reverse proxy for APIs
const exampleProxy = createProxyMiddleware({
  target: 'http://localhost:3000/api/v1', // target host with the same base path
  changeOrigin: true, // needed for virtual hosted sites
});
app.use('/api/v1', exampleProxy);


// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'browser')));

// Handle all other routes by serving the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'browser/index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
});
```
It will also required `http-proxy-middleware`
```
npm install http-proxy-middleware
```


## Resources
* [Install express](https://expressjs.com/en/starter/installing.html)
* [Routing](https://expressjs.com/en/guide/routing.html)

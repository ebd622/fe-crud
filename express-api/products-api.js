const express = require('express')
const app = express()
const port = 3000

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//Default list of products which supposed to be retrieved from BD
const products = [
  { id: 1, naam: 'Monitor', merk: `Samsung`, voorraad: 20, price:120.1},
  { id: 2, naam: 'Monitor', merk: `Accer`, voorraad: 25, price:150.5},
  { id: 3, naam: 'Mac', merk: `Apple`, voorraad: 15, price:1150.15},
  { id: 4, naam: 'PC', merk: `Dell`, voorraad: 34, price:1000.25},
];

//--- HTTP GET: Fetch list of products
 app.get('/v1/products', (req, res) => {
  //Get all products from DB

  //res.send('Hello World!')
  //res.json({msg: 'Hello'})
  res.json(products)
})

//--- HTTP POST: Add a new product
app.post('/v1/products', (req, res) => {
  const product = req.body;

  // Perform any necessary validation or processing

  // Example response
  const newProduct = {
    id: products.length +1
  };

  products.push(product)
  res.json(newProduct);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

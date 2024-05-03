const express = require('express')
const app = express()
const port = 3000

app.get('/v1/', (req, res) => {

  const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Bob Johnson' }
  ];
  //res.send('Hello World!')
  //res.json({msg: 'Hello'})
  res.json(users)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

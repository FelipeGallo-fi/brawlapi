const express = require('express')
const app = express()
const port = 3000
app.use(express.json())

let personajes = [
  {
    id: 1,
    nombre: 'Goku',
    poder: 9000
  },
  {
    id: 2,
    nombre: 'Vegeta',
    poder: 8000
  }
]

app.get('/api/v1/personajes', (req, res) => {
  res.status(200).json(personajes);
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const app = express();
const port = 3000;

const prisma = new PrismaClient();

app.use(express.json());

app.get('/api/v1/personajes', async (req, res) => {
  const personajes = await prisma.personaje.findMany();
  res.status(200).json(personajes);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = prisma;
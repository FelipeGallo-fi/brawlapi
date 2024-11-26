const express = require('express');
const { PrismaClient } = require('@prisma/client');
const app = express();
const port = 3000;

const prisma = new PrismaClient();

app.use(express.json());

app.get('/api/v1/inicio', async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany();
    res.status(200).json(usuarios); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/v1/usuarios', async (req, res) => {
  const { nombre, region, edad, copas, brawlerFav, monedas } = req.body;
  try {
    const usuario = await prisma.usuario.create({
      data: {
        nombre,
        region,
        edad,
        copas,
        brawlerFav,
        monedas
      }
    });
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/v1/usuarios/:id', async (req, res) => {
  const {id}  = req.params;
  try {
    const usuario = await prisma.usuario.findUnique({
      where: {
        id: parseInt(id)
      }
    });
    if (usuario != undefined) {
      res.status(200).json(usuario);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/v1/usuarios/:id', async (req, res) => {
  const {id}  = req.params;
  try {
    const usuario = await prisma.usuario.delete({
      where: {
        id: parseInt(id)
      }
    });
    res.status(200).json({usuario: usuario, mensaje: 'Usuario eliminado'});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = prisma;
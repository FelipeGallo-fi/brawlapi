const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors'); 
const app = express();
const port = 3000;

const prisma = new PrismaClient();
module.exports = prisma;
app.use(express.json());
app.use(cors());

//Home

app.get('/api/v1/usuarios', async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany();
    res.status(200).json(usuarios); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//USUARIOS (falta update)

//usuarios create

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

//usuarios update

app.put('/api/v1/usuario/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, region, edad, copas, brawlerFav, monedas } = req.body;
  try {
    const usuarioActualizado = await prisma.usuario.update({
      where: {
        id: parseInt(id)
      },
      data: {
        nombre: nombre,
        region: region,
        edad: edad,
        copas: copas,
        brawlerFav: brawlerFav,
        monedas: monedas
      }
    });
    res.status(200).json(usuarioActualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//usuarios read

app.get('/api/v1/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await prisma.usuario.findUnique({
      where: {
        id: parseInt(id)
      }
    });
    if (usuario) {
      res.status(200).json(usuario);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//usaurios delete

app.delete('/api/v1/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.usuario.delete({
      where: {
        id: parseInt(id)
      }
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//BRAWLERS (falta update)

//brawlers read

app.get('/api/v1/brawlers', async (req, res) => {
  try {
    const brawlers = await prisma.brawler.findMany();
    res.status(200).json(brawlers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//brawlers create

app.post('/api/v1/brawlers', async (req, res) => {
  const brawlers = req.body;
  try {
    const createdBrawlers = await prisma.brawler.createMany({
      data: brawlers,
      skipDuplicates: true
    });
    res.status(201).json(createdBrawlers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//brawlers update

app.put('/api/v1/brawler/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, tipo, rareza, descripcion, ataque, super: superPower, starPower, gadget} = req.body;
  try {
    const updatedBrawler = await prisma.brawler.update({
      where: {
        id: parseInt(id)
      },
      data: {
        nombre: nombre,
        tipo: tipo,
        rareza: rareza,
        descripcion: descripcion,
        ataque: ataque,
        super: superPower,
        starPower: starPower,
        gadget: gadget
      }
    });
    res.status(200).json(updatedBrawler);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//brawlers read

app.get('/api/v1/brawler/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const brawler = await prisma.brawler.findUnique({
      where: {
        id: parseInt(id, 10)
      }
    });
    if (brawler) {
      res.status(200).json(brawler);
    } else {
      res.status(404).json({ error: 'Brawler no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//brawlers update
app.put('/api/v1/brawlers/:id', async (req, res) => {
  const { id } = req.params;
  const { tipo, rareza, descripcion, ataque, super: superPower, starPower, gadget } = req.body;
  try {
    const updatedBrawler = await prisma.brawler.update({
      where: { id: parseInt(id, 10) },
      data: { tipo, rareza, descripcion, ataque, super: superPower, starPower, gadget }
    });
    res.json(updatedBrawler);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//Borrar brawler

app.delete('/api/v1/brawler/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const brawlerEliminado = await prisma.brawler.delete({
      where: {
        id: parseInt(id, 10) 
      }
    });
    res.status(204).json(brawlerEliminado);
  } catch (error) {
    console.error('Error eliminando brawler:', error);
    res.status(500).json({ error: error.message });
  }
});




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
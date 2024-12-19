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

  if (typeof nombre !== 'string' || nombre.trim() === '') {
    return res.status(400).json({ error: 'El nombre debe ser una cadena de texto no vacía' });
  }

  if (typeof region !== 'string' || region.trim() === '') {
    return res.status(400).json({ error: 'La región debe ser una cadena de texto no vacía' });
  }

  if (!Number.isInteger(edad) || edad <= 0) {
    return res.status(400).json({ error: 'La edad debe ser un número entero positivo' });
  }


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

  if (isNaN(parseInt(id))) {
    return res.status(400).json({ error: 'ID inválido, debe ser un número' });
  }

  const usuarioViejo = await prisma.usuario.findUnique({
    where:{id: parseInt(id)}
  })

  try {
    const usuarioActualizado = await prisma.usuario.update({
      where: { id: parseInt(id) },
      data: {
        nombre: nombre || usuarioViejo.nombre,
        region: region || usuarioViejo.region,
        edad: edad || usuarioViejo.edad,
        copas: Math.max(0, usuarioViejo.copas + (copas || 0)),
        brawlerFav: brawlerFav || usuarioViejo.brawlerFav,
        monedas: Math.max(0, usuarioViejo.monedas + (monedas || 0))
      }
    });

    res.status(200).json(usuarioActualizado);
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


//usuarios read

app.get('/api/v1/usuario/:id', async (req, res) => {
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

app.delete('/api/v1/usuario/:id', async (req, res) => {
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
app.put('/api/v1/brawler/:id', async (req, res) => {
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


// Obtener todas las batallas
app.get('/api/v1/batallas', async (req, res) => {
  try {
    const batallas = await prisma.batalla.findMany({
      include: {
        usuario: true,
        brawler: true
      }
    });
    res.status(200).json(batallas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear una nueva batalla

app.post('/api/v1/batallas', async (req, res) => {
  const { fecha, usuarioId, brawlerNombre, resultado } = req.body;
  try {

    const usuario = await prisma.usuario.findUnique({
      where: {
        id: usuarioId
      }
    });

    if(!usuario) {
      return res.status(404).json({ error: 'El id de ese usuario no encontrado' });
    }

    const brawler = await prisma.brawler.findUnique({
      where: {
        nombre: brawlerNombre
      }
    });

    if (!brawler) {
      return res.status(404).json({ error: 'Brawler no encontrado' });
    }

    if(resultado !== "Victoria" && resultado !== "Derrota"){
      return res.status(404).json({error: "Resultado de la batalla no valido"});
    }

    const batalla = await prisma.batalla.create({
      data: {
        fecha: new Date(fecha),
        usuarioId: usuarioId,
        brawlerId: brawler.id,
        resultado: resultado
      }
    });

    res.status(201).json(batalla);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener una batalla por ID

app.get('/api/v1/batalla/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const batalla = await prisma.batalla.findUnique({
      where: { id: parseInt(id, 10) },
      include: {
        usuario: true,
        brawler: true
      }
    });
    if (!batalla) {
      return res.status(404).json({ error: 'Batalla no encontrada' });
    }
    res.status(200).json(batalla);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar una batalla

app.put('/api/v1/batalla/:id', async (req, res) => {
  const { id } = req.params;
  const { fecha, usuarioId, brawlerNombre, resultado } = req.body;
  try {

    const usuario = await prisma.usuario.findUnique({
      where: {
        id: usuarioId
      }
    });

    if(!usuario) {
      return res.status(404).json({ error: 'El id de ese usuario no encontrado' });
    }

    const brawler = await prisma.brawler.findUnique({
      where: {
        nombre: brawlerNombre
      }
    });

    if (!brawler) {
      return res.status(404).json({ error: 'Brawler no encontrado' });
    }

    if(resultado !== "Victoria" && resultado !== "Derrota"){
      return res.status(404).json({error: "Resultado de la batalla no valido"});
    }

    const batallaVieja = await prisma.batalla.findUnique({
      where:{
        id : parseInt(id)
      }
    })

  try {
    const batallaActualizada = await prisma.batalla.update({
      where: { id: parseInt(id) },
      data: {
        fecha: fecha ? new Date(fecha) : batallaVieja.fecha,
        usuarioId: usuarioId || batallaVieja.usuarioId,
        brawlerId: brawler.id || batallaVieja.brawlerId,
        resultado: resultado || batallaVieja.resultado,
      }
    });
    res.status(200).json({ success: true, batallaActualizada });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
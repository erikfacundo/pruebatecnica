// Archivo: server.js
const express = require('express');
const bodyParser = require('body-parser');
const { Button } = require('./models');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Obtener todos los botones
app.get('/buttons', async (req, res) => {
  try {
    const buttons = await Button.findAll();
    res.json(buttons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los botones' });
  }
});

// Crear un nuevo botón
app.post('/buttons', async (req, res) => {
  try {
    const { count } = req.body;
    const newButton = await Button.create({ count });
    res.json(newButton);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el botón' });
  }
});

// Actualizar la cantidad de veces que se apretó un botón
app.put('/buttons/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const button = await Button.findByPk(id);

    if (!button) {
      return res.status(404).json({ error: 'Botón no encontrado' });
    }

    await button.update({ count: button.count + 1 });
    res.json(button);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el botón' });
  }
});

// Eliminar un botón
app.delete('/buttons/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const button = await Button.findByPk(id);

    if (!button) {
      return res.status(404).json({ error: 'Botón no encontrado' });
    }

    await button.destroy();
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el botón' });
  }
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});

const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres', 'postgres', '1234', {
  dialect: 'postgres',
  host: 'localhost',
});

const Button = sequelize.define('buttons', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  count: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

sequelize.sync()
  .then(() => {
    console.log('Tablas sincronizadas correctamente');
  })
  .catch((error) => {
    console.error('Error al sincronizar las tablas:', error);
  });

// Código adicional para insertar un nuevo botón
Button.create({
  count: 0,
  createdAt: new Date('2023-07-05 10:57:10.151 +00:00'),
  updatedAt: new Date('2023-07-05 10:57:10.151 +00:00'),
})
  .then((newButton) => {
    console.log('Nuevo botón creado:', newButton.toJSON());
  })
  .catch((error) => {
    console.error('Error al crear el botón:', error);
  });

module.exports = { Button };

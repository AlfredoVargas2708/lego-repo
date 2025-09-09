const { DataTypes } = require("sequelize");
const { sequelize } = require("./connection");

const Lego = sequelize.define(
  "Lego",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    pieza: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    lego: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    task: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    set: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    esta_pedido: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    esta_completo: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    esta_reemplazado: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    tableName: "lego",
  }
);

module.exports = { Lego };

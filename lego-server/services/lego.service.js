const { Lego } = require("../sequelize/lego.model");
const { sequelize } = require("../sequelize/connection");

const getAll = async (offset, limit) => {
  return await Lego.findAndCountAll({
    order: [["pieza", "ASC"]],
    raw: true,
    offset,
    limit
  });
};

const getColumns = async () => {
  return await Lego.describe();
};

const getSearchOptions = async (column) => {
  return await Lego.findAll({
    distinct: true,
    attributes: [
      [sequelize.fn("DISTINCT", sequelize.col(column)), column],
    ],
    raw: true
  })
}

const getLegosByFilter = async (column, value, offset, limit) => {
  return await Lego.findAndCountAll({
    order: [["pieza", "ASC"]],
    where: {
      [column]: value
    },
    offset,
    limit
  })
}

const editLego = async (lego, id) => {
  await Lego.update(lego, {
    where: {
      id
    }
  })
}

const addLego = async (lego) => {
  return await Lego.create(lego)
}

const deleteLego = async (id) => {
  await Lego.destroy({
    where: {
      id
    }
  })
}

module.exports = {
  getAll,
  getColumns,
  getSearchOptions,
  getLegosByFilter,
  editLego,
  addLego,
  deleteLego
};

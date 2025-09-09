const { sequelize } = require("../sequelize/connection");
const { Lego } = require("../sequelize/lego.model");

const getAll = async () => {
  return await Lego.findAll({
    order: [["id", "ASC"]],
  });
};

const getColumns = async () => {
  return await Lego.describe();
};

const getFilterOptions = async (column) => {
  return await Lego.findAll({
    attributes: [[sequelize.fn("DISTINCT", sequelize.col(column)), column]],
    order: [[column, "ASC"]],
    raw: true,
  });
};

const getLegosByValue = async (column, value, limit, offset) => {
  return await Lego.findAndCountAll({
    where: {
      [column]: value,
    },
    order: [["id", "ASC"]],
    limit,
    offset,
    raw: true
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
  getFilterOptions,
  getLegosByValue,
  editLego,
  addLego,
  deleteLego
};

const { Lego } = require("../sequelize/lego.model");

const getAll = async (offset, limit) => {
  return await Lego.findAndCountAll({
    order: [["id", "ASC"]],
    raw: true,
    offset,
    limit
  });
};

const getColumns = async () => {
  return await Lego.describe();
};

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
  editLego,
  addLego,
  deleteLego
};

const { getImages } = require("../images/getImages");
const legoService = require("../services/lego.service");

const getColumns = async (req, res) => {
  try {
    const columns = await legoService.getColumns();
    res.status(200).send(columns);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    let { page, limit } = req.query;
    let offset = (page - 1) * limit;

    let legos = await legoService.getAll(offset, limit);

    let legoCodes = legos.rows.reduce((acc, value) => {
      if(!acc[value.lego]) {
        acc[value.lego] = value.lego;
      }
      return acc;
    }, {});

    let pieceCodes = legos.rows.reduce((acc, value) => {
      if(!acc[value.pieza]) {
        acc[value.pieza] = value.pieza;
      }
      return acc;
    }, {});
    
    let images = await getImages(Object.values(legoCodes), Object.values(pieceCodes));
    res.status(200).send({ legos: legos.rows, images });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

const editLego = async (req, res) => {
  try {
    let lego = req.body;

    let { id, ...fields } = lego;

    await legoService.editLego(fields, id);
    let images = await getImages([lego.lego], [lego.pieza]);
    res.status(200).send({ lego, images });
    
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
}

const addLego = async (req, res) => {
  try {
    let lego = req.body;
    await legoService.addLego(lego);
    let images = await getImages([lego.lego], [lego.pieza]);
    res.status(200).send({ lego, images });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
}

const deleteLego = async (req, res) => {
  try {
    let { id } = req.params;
    await legoService.deleteLego(id);
    res.status(200).send({ id });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
}

module.exports = {
  getColumns,
  getAll,
  editLego,
  addLego,
  deleteLego
};

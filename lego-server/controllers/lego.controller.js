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
    const legos = await legoService.getAll();
    res.status(200).send(legos);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

const getFilterOptions = async (req, res) => {
  try {
    let { column, value } = req.query;
    let filterOptions = await legoService.getFilterOptions(column);
    filterOptions = filterOptions.filter((option) => option[column]);
    res
      .status(200)
      .send(
        filterOptions.filter((option) =>
          option[column].toString().toLowerCase().includes(value.toLowerCase())
        )
      );
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

const getLegosByValue = async (req, res) => {
  try {
    let { column, value, limit, page } = req.query;
    let offset = (page - 1) * limit;
    let legos = await legoService.getLegosByValue(column, value, limit, offset);

    let legoCodes = legos.rows.reduce((acc, value) => {
      if(!acc.includes(value.lego)) {
        acc.push(value.lego);
      }
      return acc;
    }, []);
    let pieceCodes = legos.rows.reduce((acc, value) => {
      if(!acc.includes(value.pieza)) {
        acc.push(value.pieza);
      }
      return acc;
    }, []);

    let images = await getImages(legoCodes, pieceCodes);
    res
      .status(200)
      .send({
        legos: legos.rows,
        pagination: {
          totalRecords: legos.count,
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil(legos.count / limit),
        },
        images: images
      });
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
  getFilterOptions,
  getLegosByValue,
  editLego,
  addLego,
  deleteLego
};

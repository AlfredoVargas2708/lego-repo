const { getColumns, getAll, getSearchOptions, editLego, addLego, deleteLego, getLegosByFilter } = require("../controllers/lego.controller");

const router = require("express").Router();

router.get("/columns", (req, res) => getColumns(req, res));
router.get("/", (req, res) => getAll(req, res));
router.get("/search-options", (req, res) => getSearchOptions(req, res));
router.get("/filter", (req, res) => getLegosByFilter(req, res));
router.put("/:id", (req, res) => editLego(req, res));
router.post("/", (req, res) => addLego(req, res));
router.delete("/:id", (req, res) => deleteLego(req, res));

module.exports = router;

const { getColumns, getAll, getFilterOptions, getLegosByValue, editLego, addLego, deleteLego } = require("../controllers/lego.controller");

const router = require("express").Router();

router.get("/columns", (req, res) => getColumns(req, res));
router.get("/", (req, res) => getAll(req, res));
router.get("/filter-options", (req, res) => getFilterOptions(req, res));
router.get("/legos", (req, res) => getLegosByValue(req, res));
router.put("/", (req, res) => editLego(req, res));
router.post("/", (req, res) => addLego(req, res));
router.delete("/:id", (req, res) => deleteLego(req, res));

module.exports = router;

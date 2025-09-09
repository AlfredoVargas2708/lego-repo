const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const apiRouter = require("./routes/lego.routes");

app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
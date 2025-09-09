const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

const sequelize = new Sequelize(
  "postgres://avnadmin:AVNS_9B64iOfRKisdfi3EVBE@legos-avg072023-72d1.d.aivencloud.com:24755/legos",
  {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: true, // fuerza a validar el certificado
        ca: fs.readFileSync(path.join(__dirname, "ca.pem")).toString(),
      },
    },
  }
);

module.exports = { sequelize };

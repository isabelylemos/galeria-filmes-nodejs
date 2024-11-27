import sequelize from "sequelize";
import connection from "../config/sequelize-config.js";

const filme = connection.define("filmes", {
    file: {
      type: sequelize.STRING,
      allowNull: false,
    },
    titulo: {
        type: sequelize.STRING,
        allowNull: false,
    },
    ano: {
        type: sequelize.INTEGER,
        allowNull: false,
    }
  });
  
  filme.sync({ force: false });
  export default filme;
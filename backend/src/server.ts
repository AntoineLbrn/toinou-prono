import "reflect-metadata";
import app from './app';
import { PORT } from './consts';
import { createConnection } from "typeorm";
import connectionOptions from "./ormconfig";

createConnection(connectionOptions)
  .then(async (connection) => {
    console.log(`connected to database ${connection.options.database}`)
    app.listen(PORT);
    console.log(`Server listening on port ${PORT}`)
})
  .catch((error) => console.log(error));
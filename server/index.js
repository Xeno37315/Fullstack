import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import colors from "colors";

import gameActions from "./controllers/game_actions.js";
import accountActions from "./controllers/account_actions.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const port = process.env.PORT;

app.use("/api", gameActions);
app.use("/api/account", accountActions);

mongoose
  .connect(process.env.MONGO_URL)
  .then((results) => {
    app.listen(port, () => {
      console.log(`[SERVER STARTED VIA PORT ${port}]`.bold.yellow);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });

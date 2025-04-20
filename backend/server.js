const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    dbName: "RoamSphere",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas with RoamSphere");
  })
  .catch(err => {
    console.error("Connection to MongoDB Atlas failed!", err);
  });

const port = 3000;

const server = app.listen(port, () => {
  console.log("App running on port 3000.");
});

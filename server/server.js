const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require('./Config/db')
const bodyParser = require("body-parser");
const {readdirSync} = require("fs");
require("dotenv").config();

//middleware
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "20mb" }));

//db
connectDB()

readdirSync("./Routes").map((r) => app.use("/api", require("./Routes/" + r)));
const port = process.env.PORT;
app.listen(port, () => console.log(`Server on port ${port}`));

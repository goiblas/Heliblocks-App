const express = require("express");
const cors = require("cors");
const api = require("./../routes/api");
const app = express();

app.use(cors({ origin: true }));
app.use("/", api.router);

exports.api = app;

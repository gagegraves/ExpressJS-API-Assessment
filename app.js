const path = require('path');

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const express = require("express");
const cors = require("cors");

const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");

const postsRouter = require("./posts_api/posts.router");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/ping", (req, res) => {
  res.json({success: "true"});
});

app.use("/posts", postsRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;

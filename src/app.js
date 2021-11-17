const express = require("express");
const app = express();
const cors = require("cors");

const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");
const postsRouter = require("./posts_api/posts.router");

//cors lets server decide which origins are allowed to access the server
app.use(cors());
app.use(express.json());

//ping test to make sure server is up and running
app.get("/ping", (req, res) => {
  res.json({success: "true"});
});

//routes for /post, this layout makes adding more routes easy
app.use("/posts", postsRouter);


//error handlers in ./errors/
app.use(notFound);
app.use(errorHandler);

module.exports = app;

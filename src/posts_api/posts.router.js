const router = require("express").Router({ mergeParams: true });
const controller = require("./posts.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

//method not allowed is an error handler that will be called
// if a HTML method is not accepted in our route
router.route("/").get(controller.getPosts).all(methodNotAllowed);

module.exports = router;
const router = require("express").Router({ mergeParams: true });
const controller = require("./posts.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/").get(controller.getPosts).all(methodNotAllowed);

module.exports = router;
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./posts.service");
const sortData = require("../utils/sortPosts");

//middleware to confirm only proper query parameters are accepted
function validateQuery(req, res, next) {
  const { query } = req;
  const VALID_QUERIES = ["tags", "sortBy", "direction"];
  const VALID_SORTS = ["id", "likes", "popularity", "reads"];
  const VALID_DIRECTIONS = ["asc", "desc"];

  //if any queries are invalid, return 400
  for (const field in query) {
    if (!VALID_QUERIES.includes(field)) {
      return next({
        status: 400,
        message: `Invalid query parameter: '${field}'`,
      });
    }
  }
  //if tag query is missing, return 400
  if (!query.tags) {
    return next({
      status: 400,
      message: "Tags parameter is required.",
    });
  }
  //if sortBy query is invalid, return 400
  if (query.sortBy) {
    if (!VALID_SORTS.includes(query.sortBy)) {
      return next({
        status: 400,
        message: `Invalid sortBy parameter: '${query.sortBy}'`,
      });
    }
  }
  //if direction query is invalid, return 400
  if (query.direction) {
    if (!VALID_DIRECTIONS.includes(query.direction)) {
      return next({
        status: 400,
        message: `Invalid direction parameter: '${query.direction}'`,
      });
    }
  }

  next();
}

async function getPosts(req, res, next) {
  const { tags, sortBy, direction } = req.query;
  const apiResponse = await service.getPostsByTag(tags);
  const result = sortData(apiResponse, sortBy, direction);
  res.json(result);
}

module.exports = {
  getPosts: [asyncErrorBoundary(validateQuery), asyncErrorBoundary(getPosts)],
};

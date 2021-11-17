const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./posts.service");
const sortData = require("../utils/sortPosts");

//middleware to validate our url query params
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
        message: `invalid query parameter: '${field}'`,
      });
    }
  }
  //if 'tags' query is missing, return 400
  if (!query.tags) {
    return next({
      status: 400,
      message: "tags parameter is required.",
    });
  }
  //if sortBy query is invalid, return 400
  if (query.sortBy) {
    if (!VALID_SORTS.includes(query.sortBy)) {
      return next({
        status: 400,
        message: `invalid sortBy parameter: '${query.sortBy}'`,
      });
    }
  }
  //if direction query is invalid, return 400
  if (query.direction) {
    if (!VALID_DIRECTIONS.includes(query.direction)) {
      return next({
        status: 400,
        message: `invalid direction parameter: '${query.direction}'`,
      });
    }
  }

  next();
}

//sends request to service for data, then sorts and returns it based on query params
async function getPosts(req, res, next) {
  const { tags, sortBy, direction } = req.query;
  //api call
  const apiResponse = await service.getPostsByTag(tags);
  //sort function in ../utils/sortPosts.js
  const result = sortData(apiResponse, sortBy, direction);
  res.status(200).json(result);
}

module.exports = {
  getPosts: [asyncErrorBoundary(validateQuery), asyncErrorBoundary(getPosts)],
};

const axios = require("axios");
const API_BASE_URL = "https://api.hatchways.io/assessment/blog";

//api call to grab posts by tag, which are then further sorted (if necessary) in the controller
async function getPostsByTag(tags) {
  //empty array to hold posts from api calls
  let posts = [];
  //tags is an array of tags to be used to map promises
  const tagArr = tags.split(",");
  //map through tags array and make an array of promises
  const requests = tagArr.map((tag) => {
    const url = `${API_BASE_URL}/posts?tag=${tag}`;
    return axios.get(url);
  });
  //perform concurrent api calls
  try {
    const result = await Promise.all(requests);
    //map through results and push posts to posts array
    result.map((item) => {
      posts = [...posts, ...item.data.posts];
    });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }

  return { posts: posts };
}

module.exports = {
  getPostsByTag,
};

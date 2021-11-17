/**
 * 
 * @param {*} data is the data object containing all the posts
 * @param {*} sortType is the type to sort by
 * @param {*} direction is either asc or desc 
 * @returns sorted posts in data object
 */

function sortData(data, sortType, direction) {
  if (sortType) {
      //switch case to sort posts
    switch (sortType) {
      case "id":
        data.posts.sort((var1, var2) => var1.id - var2.id);
        break;
      case "likes":
        data.posts.sort((var1, var2) => var1.likes - var2.likes);
        break;
      case "popularity":
        data.posts.sort((var1, var2) => var1.popularity - var2.popularity);
        break;
      case "reads":
        data.posts.sort((var1, var2) => var1.reads - var2.reads);
        break;
    }
  }
  //reverse posts if direction is descending
  if (direction === "desc") {
    data.posts.reverse();
  }
  //remove duplicate posts
  for (let i = 1; i < data.posts.length; i++) {
    if (data.posts[i].id === data.posts[i - 1].id) {
      data.posts.splice(i, 1);
    }
  }
  return data;
}

module.exports = sortData;

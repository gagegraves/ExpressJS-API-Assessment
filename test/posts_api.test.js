const request = require("supertest");
const app = require("../src/app");
const expect = require("chai").expect;

describe("posts_api calls", () => {
  it("should return results by tag", async () => {
    const expected = await request(app).get("/posts?tags=tech");

    expect(expected).to.be.a("object");
    expect(expected.status).to.equal(200);

    //loop through returned posts to validate matching tags
    for (const post in expected.body.posts) {
      expect(expected.body.posts[post].tags).to.satisfy(() => {
        if (expected.body.posts[post].tags.includes("tech")) {
          return true;
        } else {
          return false;
        }
      });
    }
  });
  it("should return results with more than 1 tag", async () => {
    const expected = await request(app).get("/posts?tags=tech,science");

    expect(expected).to.be.a("object");
    expect(expected.status).to.equal(200);
    expect(expected.body.posts).to.be.a("array");

    //loop through returned posts to validate matching tags
    for (const post in expected.body.posts) {
      expect(expected.body.posts[post].tags).to.satisfy(() => {
        if (
          expected.body.posts[post].tags.includes("tech") ||
          expected.body.posts[post].tags.includes("science")
        ) {
          return true;
        } else {
          return false;
        }
      });
    }
  });
  it("should return sorted results", async () => {
    const expected = await request(app).get("/posts?tags=tech&sortBy=likes");

    expect(expected).to.be.a("object");
    expect(expected.status).to.equal(200);
    expect(expected.body.posts).to.be.a("array");

    //loop through returned posts to validate that they are properrly sorted by likes
    for (let i = 1; i < expected.body.posts.length; i++) {
      expect(expected.body.posts[i].likes).to.be.greaterThanOrEqual(
        expected.body.posts[i - 1].likes
      );
    }
  });
  it("should return results in correct direction", async () => {
    const expected = await request(app).get(
      "/posts?tags=tech&sortBy=likes&direction=desc"
    );

    expect(expected).to.be.a("object");
    expect(expected.status).to.equal(200);
    expect(expected.body.posts).to.be.a("array");

    //loop through returned posts to validate that they are properrly sorted by likes
    for (let i = 0; i < expected.body.posts.length - 1; i++) {
      expect(expected.body.posts[i].likes).to.be.greaterThanOrEqual(
        expected.body.posts[i + 1].likes
      );
    }
  });
});

describe("posts_api validation", () => {
  it("should return status 200 for /ping", () => {
    return request(app)
      .get("/ping")
      .then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.success).to.include("true");
      });
  });
  it("should return status 400 if there is no 'tags' query parameter", () => {
    return request(app)
      .get("/posts")
      .then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body.error).to.include("tags");
      });
  });
  it("should return 400 if there are any invalid queries", () => {
    return request(app)
      .get("/posts?tags=tech&sortBy=likes&direction=asc&invalid=true")
      .then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body.error).to.include("invalid");
      });
  });
  it("should return 400 if there are any invalid query parameters", () => {
    return request(app)
      .get("/posts?tags=tech&sortBy=rating&direction=up")
      .then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body.error).to.include("invalid");
      });
  });
});

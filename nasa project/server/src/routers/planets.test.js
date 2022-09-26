const { app } = require("../app");
const request = require("supertest");

describe("test get /planets", () => {
  test("it should be response with 200 success", async () => {
    await request(app)
      .get("/planets")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});



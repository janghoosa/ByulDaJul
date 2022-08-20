const UserController = require("../controllers/UserController");
const app = require("../app")
const request = require("supertest");
require('iconv-lite').encodingExists('foo')

describe("hello test", () => {
  it("hello test", async () => {
    const response = await request(app).get("/")
    expect(true).toBe(true)
  })
})

describe("Test /apis/user", () => {
  it("getUserList() Test", async () => {
    const response = await request(app).get("/apis/user")
    expect(response.statusCode).toBe(200);
  })
})

// describe("Test /apis/user", () => {
//   it("getUserList() Test", async (done) => {
//     const response = await request(app).get("/apis/user"); //리퀘스트 요청
//     console.log(response);
//     expect(response.statusCode).toBe(200);
//     done();
//   });
// });


const { ping } = require("./utils");

const { expect } = require("chai");

describe("ping Route", () => {
  it("pongs the ping", () => {
    expect(ping()).to.equal("pong");
  });
});


const test = require("node:test");
const assert = require("node:assert/strict");
const server = require("./app");

test("homepage returns the DevOps demo page", async () => {
  const response = await fetch(
    `http://127.0.0.1:${server.address().port}/`
  );

  const body = await response.text();

  assert.equal(response.status, 200);
  assert.match(body, /Hello from Node\.js!/);
});

test("health endpoint returns ok", async () => {
  const response = await fetch(
    `http://127.0.0.1:${server.address().port}/health`
  );

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: "ok" });
});

test.after(() => {
  return new Promise((resolve, reject) => {
    if (!server.listening) {
      resolve();
      return;
    }

    server.close((err) => {
      if (err) reject(err);
      else resolve();
    });
  });
});

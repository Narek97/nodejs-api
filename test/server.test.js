'use strict';
const assert = require('node:assert/strict');
const test = require('node:test');
const app = require('../src/server');

async function withServer(fn) {
  const server = app.listen(0, '127.0.0.1');
  try {
    await new Promise(resolve => server.once('listening', resolve));
    await fn(`http://127.0.0.1:${server.address().port}`);
  } finally {
    await new Promise((resolve, reject) => server.close(err => err ? reject(err) : resolve()));
  }
}

test('/health returns 200', async () => {
  await withServer(async base => {
    const response = await fetch(`${base}/health`);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { status: 'healthy' });
  });
});

test('/ does not expose secret values', async () => {
  await withServer(async base => {
    const response = await fetch(`${base}/`);
    const body = await response.json();
    assert.equal(response.status, 200);
    assert.equal(body.service, 'nodejs-api');
    assert.equal(Object.hasOwn(body, 'apiToken'), false);
    assert.equal(Object.hasOwn(body, 'password'), false);
  });
});

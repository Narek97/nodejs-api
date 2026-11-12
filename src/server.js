'use strict';

const http = require('node:http');

const port = Number(process.env.PORT || 5001);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('PORT must be an integer between 1 and 65535');
}

const app = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  if (req.method === 'GET' && req.url === '/health') {
    res.writeHead(200);
    return res.end(JSON.stringify({ status: 'healthy' }));
  }
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200);
    return res.end(JSON.stringify({
      service: 'nodejs-api',
      environment: process.env.ENV || 'local',
      logLevel: process.env.LOG_LEVEL || 'INFO',
      trinoConfigured: Boolean(process.env.TRINO_HOST),
      apiTokenConfigured: Boolean(process.env.API_TOKEN),
      databasePasswordConfigured: Boolean(process.env.DB_PASSWORD)
    }));
  }
  res.writeHead(404);
  return res.end(JSON.stringify({ error: 'Not found' }));
});

if (require.main === module) {
  app.listen(port, '0.0.0.0', () => {
    console.log(`nodejs-api listening on ${port}`);
  });
}

module.exports = app;

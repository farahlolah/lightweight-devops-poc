const express = require('express');
const client = require('prom-client');
const app = express();
const port = 3001;
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();
const httpRequestsTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Total HTTP requests',
  labelNames: ['method', 'route']
});
app.use((req, res, next) => {
  res.on('finish', () => {
    httpRequestsTotal.inc({ method: req.method, route: req.route.path || req.path });
  });
  next();
});
app.get('/', (req, res) => res.send('Hello World from Lightweight DevOps PoC!'));
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});
app.listen(port, () => console.log(`App listening on port ${port}`));

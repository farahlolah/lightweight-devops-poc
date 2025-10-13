const express = require('express');
const client = require('prom-client');
const app = express();
const port = process.env.PORT || 3001;

// Prometheus metrics setup
const register = new client.Registry();
client.collectDefaultMetrics({ register });
const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route'],
  registers: [register]
});
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    httpRequestDuration.observe(req.method, req.route?.path || req.path, duration);
  });
  next();
});

app.get('/', (req, res) => res.send('Hello World from Lightweight DevOps PoC!'));
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.listen(port, () => console.log(App listening on port ));

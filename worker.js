// worker.js
require('dotenv').config();
const { Worker } = require('bullmq');
const Redis = require('ioredis');
const executarCompra = require('./services/hotmartBot'); // Ou onde estiver

const connection = new Redis(process.env.REDIS_URL);

new Worker('cartoes', async job => {
  console.log("🎯 Executando compra da fila...");
  await executarCompra(job.data);
}, {
  connection,
  concurrency: 100 // executa 5 em paralelo
});

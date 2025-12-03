// worker.js
require('dotenv').config();
const { Worker } = require('bullmq');
const Redis = require('ioredis');
const executarCompra = require('./services/hotmartBot');

const connection = new Redis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null,   // 👈 mesmo ajuste aqui
});

new Worker('cartoes', async job => {
  console.log("🎯 Executando compra da fila...");
  await executarCompra(job.data);
}, {
  connection,
  concurrency: 100
});

console.log("👹 Worker iniciado e ouvindo a fila 'cartoes'...");

// Mantém o processo vivo
setInterval(() => {}, 1000 * 60 * 10);

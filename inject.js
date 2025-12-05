const { Queue } = require('bullmq');
const IORedis = require('ioredis');
require('dotenv').config();

const connection = new IORedis(process.env.REDIS_URL);
const queue = new Queue('cartoes', { connection });

queue.add('processarCompra', {
  email: 'bruno.oliveira.br@gmail.com',
  emailConfirm: 'bruno.oliveira.br@gmail.com',
  nome: 'Bruno Oliveira',
  numero: '5246742059827758',
  validade: '0831',
  cvv: '775',
  nomeCartao: 'THIERRE VIEIRA GOMES'
});

console.log("🔥 Job infernal enfiado na fila com sucesso.");

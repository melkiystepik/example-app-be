const express = require('express');
const { createClient } = require('redis');
const config = require('config');
const cors = require('cors');

const {
  url: redisUrl,
  db: redisDb,
  prefix: redisPrefix
} = config.get('redis');

const appPort = config.get('app.port');

const app = express();

let redisClient;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello!, this is example backend');
});

app.get('/redis/save', async (req, res) => {
  const redisKey = req.query.key;
  const redisValue = req.query.value;

  if (!redisKey) {
    throw new Error('No `key` provided, try to add it to query');
  }

  if (!redisValue) {
    throw new Error('No `value` provided, try to add it to query');
  }

  await redisClient.set(`${redisPrefix}${redisKey}`, redisValue);

  res.status(200).json({
    ok: 1,
  });
});

app.get('/redis/get', async (req, res) => {
  const redisKey = req.query.key;

  if (!redisKey) {
    throw new Error('No `key` provided, try to add it to query');
  }

  const value = await redisClient.get(`${redisPrefix}${redisKey}`);

  res.status(200).json({
    ok: 1,
    data: value,
  });
});

app.get('/app-name', async (req, res) => {
  res.status(200).json({
    ok: 1,
    data: config.get('app.name'),
  });
});

(async () => {
  const redisClient1 = await createClient({
    url: redisUrl,
    database: redisDb,
  })
    .on('error', err => console.log('Redis Client Error', err))
    .connect();

  redisClient = redisClient1;

  app.listen(appPort, async () => {
    console.log(`Example app listening on port ${appPort}`);
  })
})()

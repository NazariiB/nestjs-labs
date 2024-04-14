import express from "express";
import knex from 'knex';
import Kafka from 'node-rdkafka';
import cors from 'cors';

const config = {
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'kafka_data',
  },
};

const knexClient = knex.knex(config);

const app = express();
app.use(cors());

app.get("/data", async (req, res) => {
  const data = await knexClient
    .select('kpiName',
      'value',
      'dataType',
      'periodTime',
      'startDate',
      'endDate',
      'kpiId',
      'collectionFrequency')
    .from('data');

  res.send(data);
  return;
});

app.listen(8080, () => {
  const consumer = new Kafka.KafkaConsumer({
    'group.id': 'kafka',
    'metadata.broker.list': 'localhost:9092',
  }, {});

  consumer.connect();

  consumer.on('ready', () => {
    console.log('processing...');

    consumer.subscribe(['test']);
    consumer.consume();
  }).on('data', async (data) => {
    const dataToInsert = data.value.toString().split(',');

    const newEntity = {
      kpiName: dataToInsert[0],
      value: dataToInsert[1],
      dataType: dataToInsert[2],
      periodTime: dataToInsert[3],
      startDate: dataToInsert[4],
      endDate: dataToInsert[5],
      kpiId: dataToInsert[6],
      collectionFrequency: dataToInsert[7],
    };

    await knexClient('data').insert(newEntity);
  });

  console.log(`Server is running on port 8080.`);
});

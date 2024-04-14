import Kafka from 'node-rdkafka';
import fs from 'fs';

export class KafkaSafe {
  safeData(data) {
    const stream = Kafka.Producer.createWriteStream({
      'metadata.broker.list': 'localhost:9092'
    }, {}, {
      topic: 'test'
    });

    stream.on('error', (err) => {
      console.error('Error in our kafka stream');
      console.error(err);
    });

    stream.write(Buffer.from(data, 'utf-8'));
    stream.close();

    fs.appendFileSync('./src/data/kpi-prifsma.csv', '\n' + data);
  }
}

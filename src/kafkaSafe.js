import Kafka from 'node-rdkafka';
import eventType from './eventType.js';

export class KafkaSafe {

  stream = Kafka.Producer.createWriteStream({
    'metadata.broker.list': 'localhost:9092'
  }, {}, {
    topic: 'test'
  });

  safeData(data) {
    this.stream.on('error', (err) => {
      console.error('Error in our kafka stream');
      console.error(err);
    });

    const category = getRandomAnimal();
    const noise = getRandomNoise(category);
    const event = { category, noise: `${counter++}` };
    stream.cork();
    stream.write(Buffer.from(data, 'utf-8'));
    stream.uncork();
  }
}

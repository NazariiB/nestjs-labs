import Kafka from 'node-rdkafka';
import eventType from './eventType.js';


export class KafkaReader {
  consumer = new Kafka.KafkaConsumer({
    'group.id': 'kafka',
    'metadata.broker.list': 'localhost:9092',
    'enable.auto.commit': false,
  }, {'auto.commit.enable': false, 'enable.auto.commit': false});

  readData() {
    
    this.consumer.connect();
    
    return new Promise((resolver => {
      this.consumer.on('ready', () => {
        console.log('consumer ready..')
        this.consumer.subscribe(['test']);
        
        this.consumer.consume();
        
      }).on('data', function(data) {
        console.log(`received message: ${eventType.fromBuffer(data.value)}`);
        const data = eventType.fromBuffer(data.value);
        return resolver(data);
      });
    }));
  } 
}

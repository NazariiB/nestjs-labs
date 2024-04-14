import readline from 'node:readline';
import { Reader } from './reader.js';
import { FileReader } from './fileReader.js';
import { KafkaReader } from './kafkaRead.js';
import { KafkaSafe } from './kafkaSafe.js';

const main = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  let text = '';

  const reader = new Reader();
  const fileReader = new FileReader();
  const kafkaReader = new KafkaReader();
  const kafkaSafe = new KafkaSafe();

  const waitForInput = () => {
    rl.question(`read/add data (r/a)?`, async inputFirst => {
      if (inputFirst === 'e') {
        rl.close();
        return;
      } else if (inputFirst === 'r') {
        rl.question(`read from file or kafka(f/k)?`, async input => {
          text = input;
          if (input === 'e') {
            rl.close();
            return;
          } else if (input === 'k') {
            reader.setReader(kafkaReader);
            const data = await reader.read();
          } else if (input === 'f') {
            reader.setReader(fileReader);
            const data = await reader.read();
            console.log(data);
          }
          waitForInput();
        });
      } else if (inputFirst === 'a') {
        rl.question(`input data in a row`, async newData => {
          kafkaSafe.safeData(newData);
        });
      }
      waitForInput();
    })
  };

  waitForInput();
}

main();
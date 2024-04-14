import readline from 'node:readline';
import { Reader } from './reader.js';
import { FileReader } from './fileReader.js';
import { ServerReader } from './serverReader.js';
import { KafkaSafe } from './kafkaSafe.js';

const main = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  let text = '';

  const reader = new Reader();
  const fileReader = new FileReader();
  const serverReader = new ServerReader();
  const kafkaSafe = new KafkaSafe();

  const waitForInput = () => {
    rl.question(`read/add data (r/a)?`, async inputFirst => {
      if (inputFirst === 'e') {
        rl.close();
        return;
      } else if (inputFirst === 'r') {
        rl.question(`read from file or server(f/s)?`, async input => {
          text = input;
          if (input === 'e') {
            rl.close();
            return;
          } else if (input === 's') {
            reader.setReader(serverReader);
            const data = await reader.read();
            console.log(data);
          } else if (input === 'f') {
            reader.setReader(fileReader);
            const data = await reader.read();
            console.log(data);
          }
          waitForInput();
        });
      } else if (inputFirst === 'a') {
        rl.question(`input data in a row\n`, async newData => {
          kafkaSafe.safeData(newData);
          waitForInput();
        });
      }
      waitForInput();
    })
  };

  waitForInput();
}

main();

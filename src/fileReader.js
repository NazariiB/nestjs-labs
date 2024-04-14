import fs from 'fs';

export class FileReader {
  readData() {
    let text = fs.readFileSync(`./src/data/kpi-prifsma.csv`, 'utf-8');
    text = text.replaceAll('"', '').split('\n');
    const fields = text[0].split(',');
    text.shift();

    const data = [];
    let message = '';
    message += fields.join(' | ') + '\n';
    message += text.map(el => {
      const values = el.split(',');
      return values.map(it => {
        if (it.length > 20)
          return it.slice(0, 20) + '...';
        return it;
      }).join(' | ');
    }).join('\n');

    return new Promise((resolver) => resolver(message));
  }
}
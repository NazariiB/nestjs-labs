import axios from 'axios';

export class ServerReader {
  async readData() {
    const res = await axios.get('http://localhost:8080/data');

    return res.data.map(el => {
      const message = [];
      for (let i in el) {
        message.push(el[i]);
      }
      return message.join(' | ');
    }).join('\n');
  }
}

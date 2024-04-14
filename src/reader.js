export class Reader {
  reader;

  async read() {
    return await this.reader.readData();
  }

  setReader(reader) {
    this.reader = reader;
  }
}
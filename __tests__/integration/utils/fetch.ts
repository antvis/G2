import * as path from 'path';
import { promises as fs } from 'fs';

export async function fetch(url: string) {
  return createResponse(path.resolve('__tests__', url));
}

function createResponse(url: string) {
  return {
    ok: true,
    status: 200,
    async text() {
      return fs.readFile(url, { encoding: 'utf-8' });
    },
    async json() {
      return JSON.parse(await this.text());
    },
  };
}

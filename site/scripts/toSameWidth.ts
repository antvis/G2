import * as fs from 'fs';
import { readFileSync } from 'fs';

function process(path: string) {
  // read all files in the directory
  const files = fs.readdirSync(path);
  const match = /title: [\S]+ - [\S]+/;
  const available = files.reduce((acc, file) => {
    // if file name ends with .zh.md
    if (file.endsWith('.zh.md')) {
      const content = readFileSync(`${path}/${file}`, 'utf-8');
      const title = content.match(match)?.[0].split(': ')[1];
      if (title) acc.push({ file, title });
    }
    return acc;
  }, []);
  // read all available files
  const titles = available.map(({ title }) => title);
  const finalTitles = toSameWidth(titles);
  console.log(finalTitles);
}

function toSameWidth(words: string[]): string[] {
  const maxWidth = Math.max(...words.map((w) => w.split(' - ')[0].length));
  return words.map((w) => {
    const [word, definition] = w.split(' - ');
    return `${word.padEnd(maxWidth)} - ${definition}`;
  });
}

process('../docs/api/mark');

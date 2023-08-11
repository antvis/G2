import * as path from 'path';
import * as fs from 'fs';

const folders = [
  'corelib/dist/assets/',
  'litelib/dist/assets',
  'stdlib/dist/assets',
];

const data = folders.flatMap((name) => {
  const dirs = fs.readdirSync(name);
  const raw = dirs.find(
    (d) => d.startsWith('index') && d.split('.').pop() !== 'gz',
  );
  const gzip = dirs.find(
    (d) => d.startsWith('index') && d.split('.').pop() === 'gz',
  );
  const lib = name.split('/')[0];
  return [
    {
      lib,
      size: fs.statSync(path.resolve(name, raw)).size,
      type: 'raw',
    },
    {
      lib,
      size: fs.statSync(path.resolve(name, gzip)).size,
      type: 'gzip',
    },
  ];
});

fs.writeFileSync('./size.json', JSON.stringify(data), { encoding: 'utf-8' });

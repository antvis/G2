import fs from 'fs';
import path from 'path';
import cors from 'cors';
import express from 'express';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const reportsPath = './reports';

const now = () => {
  const currentdate = new Date();
  const datetime =
    currentdate.getFullYear() +
    '-' +
    (currentdate.getMonth() + 1) +
    '-' +
    currentdate.getDate();
  return datetime;
};

function toCSV(arr: any[]) {
  const head = Object.keys(arr[0]);
  const csv =
    head.join(',') +
    '\n' +
    arr.map((item) => Object.values(item).join(',')).join('\n');
  return csv;
}

app.get('/', (req, res) => {
  res.send('Connection established');
});

app.listen(3000, () => {
  console.log('Server listening on port 3000!');
});

app.post('/report', async (req, res) => {
  const { name, data } = req.body;
  const filePath = path.join(reportsPath, name + '-' + now() + '.json');
  const csvPath = filePath.replace('.json', '.csv');
  // fs.writeFileSync(filePath, JSON.stringify(data));
  fs.writeFileSync(csvPath, toCSV(data));
  res.json({ success: true });
});

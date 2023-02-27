import fs from 'fs';
import cors from 'cors';
import path from 'path';
import express from 'express';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const reportsPath = './reports';

const now = () => {
  var currentdate = new Date();
  var datetime =
    currentdate.getFullYear() +
    '-' +
    (currentdate.getMonth() + 1) +
    '-' +
    currentdate.getDate() +
    '_' +
    currentdate.getHours() +
    ':' +
    currentdate.getMinutes() +
    ':' +
    currentdate.getSeconds();
  return datetime;
};

app.get('/', (req, res) => {
  res.send('Connection established');
});

app.listen(3000, () => {
  console.log('Server listening on port 3000!');
});

app.post('/report', async (req, res) => {
  const { name, data } = req.body;
  const filePath = path.join(reportsPath, name + '-' + now() + '.json');
  fs.writeFileSync(filePath, JSON.stringify(data));
  res.json({ success: true });
});

import { flatten } from '@antv/util';

const X = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const Beijing = [8.4, 7.5, 13, 16.2, 22, 24, 25.9, 29, 26.9, 20.8, 17.5, 13.2];
const Tokyo = [7.0, 7.32, 12.7, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6];
const London = [3.9, 5.2, 11.7, 13.5, 14.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8];

export const cityTemperature = flatten(
  X.map((x, i) => [
    {
      month: x,
      city: 'Beijing',
      temperature: Beijing[i],
    },
    {
      month: x,
      city: 'Tokyo',
      temperature: Tokyo[i],
    },
    {
      month: x,
      city: 'London',
      temperature: London[i],
    },
  ])
);

import { getCoordinate } from '@antv/coord';
import Point from '../../../../src/geometry/point';
import { getTheme } from '../../../../src/theme/';
import { createCanvas, createDiv, removeDom } from '../../../util/dom';

import 'jest-extended';
import { createScale } from '../../../util/scale';

const CartesianCoordinate = getCoordinate('rect');
const Theme = getTheme('default');

describe('Point', () => {
  const div = createDiv();
  const canvas = createCanvas({
    container: div,
    width: 300,
    height: 300,
  });
  const rectCoord = new CartesianCoordinate({
    start: { x: 0, y: 300 },
    end: { x: 300, y: 0 },
  });

  it('draw point', () => {
    fetch('https://gw.alipayobjects.com/os/antfincdn/eC54sJH8Fy/large-line.json')
      .then((data) => data.json())
      .then((data) => {
        const scales = {
          date: createScale('date', data),
          value: createScale('value', data),
          type: createScale('type', data, { type: 'cat' }),
        };
        const point = new Point({
          data,
          scales,
          container: canvas.addGroup(),
          coordinate: rectCoord,
        });

        point.position('date*value').color('type');
        point.init({
          theme: Theme,
        });
        const startTime = Date.now();
        console.time(`paint ${data.length} points`);
        point.paint();
        console.timeEnd(`paint ${data.length} points`);
        const endTime = Date.now();
        canvas.draw();

        // 6万条数据，正常的话在 1100ms 左右
        expect(endTime - startTime).not.toBeGreaterThan(5000);
      });
  });

  afterAll(() => {
    canvas.destroy();
    removeDom(div);
  });
});

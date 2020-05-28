import { getCoordinate } from '@antv/coord';
import Heatmap from '../../../src/geometry/heatmap';
import { getTheme } from '../../../src/theme/';
import { createScaleByField } from '../../../src/util/scale';
import { HEATMAP } from '../../util/data';
import { createCanvas, createDiv, removeDom } from '../../util/dom';


const RectCoordinate = getCoordinate('rect');
const Theme = getTheme('default');

describe('Heatmap', () => {
  const div = createDiv();
  const canvas = createCanvas({
    container: div,
  });

  const gScale = createScaleByField('g', HEATMAP);
  const lScale = createScaleByField('l', HEATMAP);
  const tmpScale = createScaleByField('tmp', HEATMAP);

  const coord = new RectCoordinate({
    start: { x: 0, y: 400 },
    end: { x: 400, y: 0 },
  });

  let heatmap;

  it('constructor', () => {
    heatmap = new Heatmap({
      data: HEATMAP,
      container: canvas.addGroup(),
      scales: {
        g: gScale,
        l: lScale,
        tmp: tmpScale,
      },
      coordinate: coord,
    });

    expect(heatmap.type).toBe('heatmap');
  });

  it('paint', () => {
    heatmap.position('g*l')
      .color('tmp', '#F51D27-#FA541C-#FF8C12-#FFC838-#FAFFA8-#80FF73-#12CCCC-#1890FF-#6E32C2');
    heatmap.init({
      theme: Theme,
    });
    heatmap.paint();

    expect(heatmap.container.getCount()).toBe(1);
    expect(heatmap.container.getFirst().get('type')).toBe('image');
  });

  it('clear', () => {
    heatmap.clear();

    expect(heatmap.container.getCount()).toBe(0);
    expect(heatmap.paletteCache).toEqual({});
  });

  afterAll(() => {
    canvas.destroy();
    removeDom(div);
  });
});

import { Chart } from '../../../src';
import { createNodeGCanvas } from '../../integration/utils/createNodeGCanvas';

describe('chart api and options', () => {
  it('chart.options({...}) should create node instance from spec.', () => {
    const chart = new Chart({
      canvas: createNodeGCanvas(640, 480),
    });

    chart.options({
      type: 'interval',
      data: [
        { genre: 'Sports', sold: 275 },
        { genre: 'Strategy', sold: 115 },
        { genre: 'Action', sold: 120 },
        { genre: 'Shooter', sold: 350 },
        { genre: 'Other', sold: 150 },
      ],
      encode: {
        x: 'genre',
        y: 'sold',
      },
    });

    expect(chart.getNodeByType('view')).toBeDefined();
    expect(chart.getNodeByType('interval')).toBeDefined();
  });

  it('chart.options({...}) should bubble view options', () => {
    const chart = new Chart({
      canvas: createNodeGCanvas(640, 480),
    });

    chart.options({
      type: 'interval',
      width: 100,
      height: 100,
      padding: 10,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 10,
      paddingTop: 10,
      inset: 10,
      insetLeft: 10,
      insetRight: 10,
      insetTop: 10,
      insetBottom: 10,
      margin: 10,
      marginLeft: 10,
      marginRight: 10,
      marginTop: 10,
      marginBottom: 10,
      autoFit: true,
      theme: 'light',
    });

    expect(chart.options()).toEqual({
      type: 'view',
      width: 100,
      height: 100,
      padding: 10,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 10,
      paddingTop: 10,
      inset: 10,
      insetLeft: 10,
      insetRight: 10,
      insetTop: 10,
      insetBottom: 10,
      margin: 10,
      marginLeft: 10,
      marginRight: 10,
      marginTop: 10,
      marginBottom: 10,
      autoFit: true,
      theme: 'light',
      children: [{ type: 'interval' }],
    });
  });

  it('chart.options({...}) should create nested node tree from spec.', () => {
    const chart = new Chart({
      canvas: createNodeGCanvas(640, 480),
    });
    const options = {
      type: 'spaceFlex',
      flex: [1, 2],
      children: [
        {
          type: 'spaceLayer',
          children: [
            {
              type: 'view',
              children: [
                { type: 'interval', data: [2, 3, 4] },
                { type: 'point' },
              ],
            },
          ],
        },
        { type: 'interval', data: [1, 2, 3] },
      ],
    };

    chart.options(options);

    expect(chart.options()).toEqual(options);
    expect(chart.getNodeByType('point').type).toBe('point');
  });

  it('chart.options({...} should update mark.', () => {
    const chart = new Chart({
      canvas: createNodeGCanvas(640, 480),
    });

    chart.options({
      type: 'interval',
    });

    chart.options({
      data: [1, 2, 3],
    });

    expect(chart.options()).toEqual({
      type: 'view',
      children: [
        {
          type: 'interval',
          data: [1, 2, 3],
        },
      ],
    });
  });

  it('chart.options({...}) should update view.', () => {
    const chart = new Chart({
      canvas: createNodeGCanvas(640, 480),
    });

    chart.options({
      type: 'view',
    });

    chart.options({
      data: [1, 2, 3],
    });

    expect(chart.options()).toEqual({
      type: 'view',
      data: [1, 2, 3],
    });
  });

  it('chart.options({...}) should update composition.', () => {
    const chart = new Chart({
      canvas: createNodeGCanvas(640, 480),
      autoFit: true,
      padding: 10,
    });

    chart.options({
      type: 'spaceFlex',
      padding: 20,
      children: [{ type: 'interval', data: [1, 2, 3] }],
    });

    expect(chart.options()).toEqual({
      type: 'spaceFlex',
      autoFit: true,
      padding: 20,
      children: [{ type: 'interval', data: [1, 2, 3] }],
    });
  });

  it('chart.options({...}) should update node with same height and index.', () => {
    const chart = new Chart({
      canvas: createNodeGCanvas(640, 480),
    });

    chart.options({
      type: 'view',
      children: [{ type: 'interval' }],
    });

    chart.options({
      children: [{ data: [1, 2, 3] }],
    });

    expect(chart.getNodeByType('interval').value.data).toEqual([1, 2, 3]);
  });

  it('chart.options({...}) should update nested node tree.', () => {
    const chart = new Chart({
      canvas: createNodeGCanvas(640, 480),
    });

    chart.options({
      type: 'spaceFlex',
      flex: [1, 2],
      children: [
        {
          type: 'spaceLayer',
          children: [
            {
              type: 'view',
              children: [
                { type: 'interval', data: [2, 3, 4] },
                { type: 'point' },
              ],
            },
          ],
        },
        { type: 'interval', data: [1, 2, 3] },
      ],
    });

    chart.options({
      flex: [2, 3, 4],
      children: [
        { children: [{ children: [{}, { data: [1, 2, 3] }] }] },
        { data: [2, 3, 4], scale: { x: { nice: true } } },
      ],
    });

    expect(chart.options()).toEqual({
      type: 'spaceFlex',
      flex: [2, 3, 4],
      children: [
        {
          type: 'spaceLayer',
          children: [
            {
              type: 'view',
              children: [
                { type: 'interval', data: [2, 3, 4] },
                { type: 'point', data: [1, 2, 3] },
              ],
            },
          ],
        },
        { type: 'interval', data: [2, 3, 4], scale: { x: { nice: true } } },
      ],
    });
  });

  it('chart.options({...}) should transform node.', () => {
    const chart = new Chart({
      canvas: createNodeGCanvas(640, 480),
    });

    chart.options({
      type: 'view',
      children: [
        { type: 'interval', scale: { x: { nice: true } }, data: [1, 2, 3] },
      ],
    });

    chart.options({
      type: 'view',
      children: [{ type: 'line', data: [4, 5, 6] }],
    });

    const line = chart.getNodeByType('line');
    expect(line.type).toBe('line');
    expect(line.value).toEqual({ data: [4, 5, 6] });
  });

  it('chart.options({...}) should update node tree specified by API.', () => {
    const chart = new Chart({
      canvas: createNodeGCanvas(640, 480),
    });

    const interval = chart.interval().data([1, 2, 3]);

    chart.options({
      type: 'view',
      children: [{ data: [2, 3, 4] }],
    });

    expect(interval.data()).toEqual([2, 3, 4]);
  });

  it('chart.options({...}) should remove node.', () => {
    const chart = new Chart({
      canvas: createNodeGCanvas(640, 480),
    });

    chart.options({
      type: 'view',
      children: [{ type: 'line' }, { type: 'point' }],
    });

    chart.options({
      type: 'view',
      children: [{ type: 'line' }],
    });

    expect(chart.options()).toEqual({
      type: 'view',
      children: [{ type: 'line' }],
    });
  });
});

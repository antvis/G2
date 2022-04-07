import { WordCloud } from '../../../src/transform';

describe('WordCloud', () => {
  const data = 'Hello, welcome to visit @antv/g2'
    .split(' ')
    .map((d) => ({ text: d, value: parseInt(`${Math.random() * 10}`) }));

  it('WordCloud({ ... }) support callback', async () => {
    const common = (row) => {
      expect(typeof row.text).toBe('string');
      expect(typeof row.value).toBe('number');
    };
    const font = (row) => {
      common(row);
      return 'font-test';
    };
    const fontWeight = (row): any => {
      common(row);
      return 'fontWeight-test';
    };
    const fontSize = (row) => {
      common(row);
      return 11;
    };
    const rotate = (row) => {
      common(row);
      return 22;
    };
    const padding = (row) => {
      common(row);
      return 33;
    };
    const spiral = (size: [number, number]) => {
      expect(size.length).toBe(2);
      const e = size[0] / size[1];
      return function (t: number) {
        expect(typeof t).toBe('number');
        return [e * (t *= 0.1) * Math.cos(t), t * Math.sin(t)];
      };
    };

    const result = await WordCloud({
      font,
      fontWeight,
      fontSize,
      rotate,
      padding,
      spiral,
    })(data);
    const firstRow = result[0];
    expect(typeof firstRow.x).toBe('number');
    expect(typeof firstRow.y).toBe('number');
    expect(firstRow.hasText).toBe(true);
    expect(firstRow.font).toBe('font-test');
    expect(firstRow.weight).toBe('fontWeight-test');
    expect(firstRow.size).toBe(11);
    expect(firstRow.rotate).toBe(22);
    expect(firstRow.padding).toBe(33);
  });

  it('WordCloud({ rotate: ... })', async () => {
    let result = await WordCloud({
      rotate: (d) => (d.text === 'welcome' ? 45 : 0),
      fontSize: 12,
    })(data);
    result = result.filter((d) => !!d.text);
    expect(result.length).toBe(data.length);
    expect(
      result.every((d) =>
        d.text === 'welcome' ? d.rotate === 45 : d.rotate === 0,
      ),
    ).toBe(true);

    result = await WordCloud({ rotate: 30 })(data);
    result = result.filter((d) => !!d.text);
    expect(result.every((d) => d.rotate === 30)).toBe(true);
  });

  it('WordCloud({ size: [...] })', async () => {
    const result = await WordCloud({ size: [0, 0] })(data);
    // append two tags
    expect(result.length).toBe(2);
    expect(result[0].opacity).toBe(0);
    expect(result[1].opacity).toBe(0);
  });
});

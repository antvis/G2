import { WordCloud } from '../../../src/data';
import {
  normalizeFontSize,
  processImageMask,
} from '../../../src/data/wordCloud';

describe.skip('WordCloud', () => {
  it('WordCloud({ ... })', () => {});
  const data = 'Hello, welcome to visit @antv/g2'
    .split(' ')
    .map((d) => ({ text: d, value: parseInt(`${Math.random() * 10}`) }));

  it('WordCloud({ ... }) supports callback', async () => {
    function common(cb) {
      return (row) => {
        expect(typeof row.text).toBe('string');
        expect(typeof row.value).toBe('number');
        return cb(row);
      };
    }

    const spiral = (size: [number, number]) => {
      expect(size.length).toBe(2);
      const e = size[0] / size[1];
      return function (t: number) {
        expect(typeof t).toBe('number');
        return [e * (t *= 0.1) * Math.cos(t), t * Math.sin(t)];
      };
    };

    const result = await WordCloud({
      font: common(() => 'font-test'),
      fontWeight: common(() => 'fontWeight-test'),
      fontSize: common(() => 11),
      rotate: common(() => 22),
      padding: common(() => 33),
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
    let r = result.filter((d) => !!d.text);
    expect(r.length).toBe(data.length);
    expect(
      r.every((d) => (d.text === 'welcome' ? d.rotate === 45 : d.rotate === 0)),
    ).toBe(true);

    result = await WordCloud({ rotate: 30 })(data);
    r = result.filter((d) => !!d.text);
    expect(r.every((d) => d.rotate === 30)).toBe(true);
  });

  it('WordCloud({ size: [...] })', async () => {
    const result = await WordCloud({ size: [0, 0] })(data);
    // append two tags
    expect(result.length).toBe(2);
    expect(result[0].opacity).toBe(0);
    expect(result[1].opacity).toBe(0);
  });

  it('WordCloud({ fontSize: ... }) supports `number`, `number[]` and `function`', async () => {
    let result = await WordCloud({ fontSize: 12 })(data);
    expect(result.filter((d) => !!d.text).every((d) => d.size === 12)).toBe(
      true,
    );
    result = await WordCloud({ fontSize: [12, 20] })(data);
    expect(
      result.filter((d) => !!d.text).every((d) => d.size >= 12 || d.size <= 20),
    ).toBe(true);
    result = await WordCloud({ fontSize: () => 20 })(data);
    expect(result.filter((d) => !!d.text).every((d) => d.size === 20)).toBe(
      true,
    );
  });
});

describe.skip('Utils of wordCloud transform', () => {
  it('normalizeFontSize', () => {
    const f1: any = normalizeFontSize(10);
    expect(f1()).toBe(10);

    const foo = () => 10;
    const f2 = normalizeFontSize(foo);
    expect(f2).toBe(foo);

    const data = [
      { value: 1 },
      { value: 2 },
      { value: 3 },
      { value: 4 },
      { value: 5 },
    ];
    const f3: any = normalizeFontSize([10, 20], [10, 10]);
    data.forEach((v) => {
      expect(f3(v)).toBe(15);
    });

    const f4: any = normalizeFontSize([10, 20]);
    data.forEach((v) => {
      expect(f4(v)).toBe(15);
    });

    const f5: any = normalizeFontSize([10, 20], [1, 5]);
    data.forEach((v) => {
      expect(f5(v) >= 10 && f5(v) <= 20).toBe(true);
    });
  });

  it('processImageMask, HTMLImageElement', async () => {
    const image = new Image();

    const img = await processImageMask(image);
    expect(img).toBe(image);
  });

  it('processImageMask with url, error', async () => {
    // invalid url
    const url = 'something';
    let img;

    try {
      img = await processImageMask(url);
      expect(img).toBe(undefined);
    } catch (img) {
      expect(img).toBe(undefined);
    }
  });

  it('processImageMask with invalid value', async () => {
    const url = {} as any;
    let img;

    try {
      img = await processImageMask(url);
      expect(img).toBe(undefined);
    } catch (img) {
      expect(img).toBe(undefined);
    }
  });

  it('processImageMask, base64', async () => {
    const base64 =
      'https://gw.alipayobjects.com/zos/antfincdn/p9NgY1Nl%26R/5a81b665-7513-4ebe-a311-25350175b6de.png';

    const img = await processImageMask(base64);
    expect(img instanceof HTMLImageElement).toBe(true);
  });
});

import { EMA } from '../../../src/data';

describe('EMA', () => {
  it('EMA({...}) returns a function  that is used to exponentially smooth the data', async () => {
    const transform = EMA({ alpha: 0.6, field: 'y' });
    const data = [
      { x: 1, y: 2 },
      { x: 4, y: 5 },
      { x: 5, y: 8 },
    ];
    const r = await transform(data);
    r.forEach((d, i) => {
      if (i > 0) {
        expect(d.y).not.toBe(data[i].y);
      } else {
        expect(d.y).toBe(data[i].y);
      }
      expect(d.x).toBe(data[i].x);
    });
  });

  it('The "field" field determines the smoothed data', () => {
    const transform = EMA({ alpha: 0.6, field: 'x' });
    const data = [
      { x: 1, y: 2 },
      { x: 4, y: 5 },
      { x: 5, y: 8 },
    ];
    const r = transform(data);
    r.forEach((d, i) => {
      if (i > 0) {
        expect(d.x).not.toBe(data[i].x);
      } else {
        expect(d.x).toBe(data[i].x);
      }
      expect(d.y).toBe(data[i].y);
    });
  });

  it('The as field will avoid overwriting the original data', () => {
    const transform = EMA({ alpha: 0.6, field: 'y', as: 'smooth' });
    const data = [
      { x: 1, y: 2 },
      { x: 4, y: 5 },
      { x: 5, y: 8 },
    ];
    const r = transform(data);
    expect(r).toEqual([
      {
        x: 1,
        y: 2,
        smooth: 2,
      },
      {
        x: 4,
        y: 5,
        smooth: 3.2,
      },
      {
        x: 5,
        y: 8,
        smooth: 5.12,
      },
    ]);
  });

  it('should handle missing field values', function () {
    const data = [{ x: 1 }, { y: 2 }, { y: 3 }, { x: 4 }];
    const result = EMA({ field: 'y' })(data);
    expect(result[0].y).toBe(undefined);
    expect(result[1].y).not.toBe(undefined);
    expect(result[2].y).not.toBe(undefined);
    expect(result[3].y).toBe(undefined);
  });

  it('should handle missing alpha value', function () {
    const data = [{ y: 1 }, { y: 2 }, { y: 3 }];
    const r = EMA({ field: 'y' })(data);
    r.forEach((d, i) => {
      if (i > 0) {
        expect(d.y).not.toBe(data[i].y);
      } else {
        expect(d.y).toBe(data[i].y);
      }
    });
  });
  it('The value of alpha should be greater than zero and less than one', function () {
    const data = [{ y: 1 }, { y: 2 }, { y: 3 }];
    let alpha = 1.1;
    expect(() => EMA({ field: 'y', alpha })(data)).toThrowError();

    alpha = -0.1;
    expect(() => EMA({ field: 'y', alpha })(data)).toThrowError();
  });

  it('Returns an empty array if entered', function () {
    const data = [];
    const result = EMA({ field: 'y' })(data);
    expect(result).toEqual([]);
  });
});

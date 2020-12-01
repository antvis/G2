import { getEllipsisText, measureTextWidth } from '../../../src/util/text';

const FONT = { fontSize: 10, fontFamily: 'serif' };

describe('measure-text', () => {
  it('measureTextWidth', () => {
    expect(measureTextWidth('蚂蚁')).toEqual(measureTextWidth('蚂') + measureTextWidth('蚁'));

    expect(measureTextWidth('蚂蚁', FONT)).toBe(20);
    expect(measureTextWidth('东...', FONT)).toBeLessThan(measureTextWidth('东北', FONT));
  });

  it('change font', () => {
    const newFont = { ...FONT, fontSize: 20 };
    expect(measureTextWidth('hello', newFont)).not.toEqual(measureTextWidth('hello', FONT));
  });

  it('getEllipsisText', () => {
    expect(getEllipsisText('蚂蚁是一个什么公司了？', 54, FONT).endsWith('...')).toEqual(true);
    expect(getEllipsisText('蚂蚁是一个什么公司了？', 44, FONT)).toEqual('蚂蚁是...');
    expect(getEllipsisText('hello', 50, FONT)).toEqual('hello');

    // measureTextWidth('东北') = 20
    expect(getEllipsisText('东北', 19, FONT)).toEqual('东...');
    expect(getEllipsisText('东北', 20, FONT)).toEqual('东北');

    expect(getEllipsisText('东北东北东北东北东北东北东北东北东北东北', 199, FONT)).toBe(
      '东北东北东北东北东北东北东北东北东北东...'
    );
    expect(getEllipsisText('东北东北东北东北东北东北东北东北东北东北', 200, FONT)).toBe(
      '东北东北东北东北东北东北东北东北东北东北'
    );
  });

  it('area getEllipsisText', () => {
    expect(getEllipsisText('city', 24, FONT)).toBe('city');
  });
});

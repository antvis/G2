import { expect } from 'chai';
import { splitData } from '../../../../src/element/util/split-data';

describe('splitData function', () => {
  it('data is empty', () => {
    expect(splitData([])).to.be.empty;
  });

  it('connectNulls is true', () => {
    const data = [
      { x: 1, y: 10 },
      { x: 2, y: null },
      { x: 4, y: 90 },
      { x: 8, y: 12 },
      { x: 9, y: 34 },
    ];
    const result = splitData(data, true, 'y');
    expect(result).to.eql([ [
      { x: 1, y: 10 },
      { x: 4, y: 90 },
      { x: 8, y: 12 },
      { x: 9, y: 34 },
    ] ]);
  });

  it('connectNulls is false', () => {
    const data = [
      { x: 1, y: 10, _origin: { x: 1, y: 10 } },
      { x: 2, _origin: { x: 2 } },
      { x: 4, y: [ null ], _origin: { x: 4, y: [ null ]} },
      { x: 8, y: 12, _origin: { x: 8, y: 12 } },
      { x: 9, y: 34, _origin: { x: 9, y: 34 } },
    ];
    const result = splitData(data, false, 'y');
    expect(result).to.eql([
      [ { x: 1, y: 10, _origin: { x: 1, y: 10 } } ],
      [
        { x: 8, y: 12, _origin: { x: 8, y: 12 } },
        { x: 9, y: 34, _origin: { x: 9, y: 34 } },
      ],
    ]);
  });
});

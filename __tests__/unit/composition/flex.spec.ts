import { Flex } from '../../../src/composition';

describe('composition', () => {
  it('Flex({...}) should propagate data', () => {
    const composition = Flex();
    const options = {
      type: 'flex',
      width: 400,
      height: 300,
      data: [1, 2, 3],
      children: [{ data: [2, 3, 4], scale: undefined }, { scale: undefined }],
    };
    expect(composition(options).map((d) => d.data)).toEqual([
      [2, 3, 4],
      [1, 2, 3],
    ]);
  });

  it('Flex({...}) should ignore children callback', () => {
    const composition = Flex();
    const options = {
      type: 'flex',
      width: 400,
      height: 300,
      data: [1, 2, 3],
      children: () => {},
    };
    expect(composition(options)).toEqual([]);
  });

  it('Flex({...}) should split space domain in horizontal direction by default', () => {
    const composition = Flex();
    const options = {
      type: 'flex',
      width: 400,
      height: 300,
      data: [1, 2, 3],
      children: [{}, {}, {}, {}],
    };
    expect(composition(options)).toEqual([
      { y: 0, x: 0, width: 100, height: 300, data: [1, 2, 3] },
      { y: 0, x: 100, width: 100, height: 300, data: [1, 2, 3] },
      { y: 0, x: 200, width: 100, height: 300, data: [1, 2, 3] },
      { y: 0, x: 300, width: 100, height: 300, data: [1, 2, 3] },
    ]);
  });

  it('Flex({...}) should split space domain in vertical direction by default', () => {
    const composition = Flex();
    const options = {
      type: 'flex',
      direction: 'col',
      width: 400,
      height: 300,
      data: [1, 2, 3],
      children: [{}, {}, {}],
    };
    expect(composition(options)).toEqual([
      { y: 0, x: 0, width: 400, height: 100, data: [1, 2, 3] },
      { y: 100, x: 0, width: 400, height: 100, data: [1, 2, 3] },
      { y: 200, x: 0, width: 400, height: 100, data: [1, 2, 3] },
    ]);
  });

  it('Flex({...}) should split calc main size by flex', () => {
    const composition = Flex();
    const options = {
      type: 'flex',
      width: 400,
      height: 300,
      data: [1, 2, 3],
      flex: [1, 2, 1],
      children: [{}, {}, {}],
    };
    expect(composition(options)).toEqual([
      { y: 0, x: 0, width: 100, height: 300, data: [1, 2, 3] },
      { y: 0, x: 100, width: 200, height: 300, data: [1, 2, 3] },
      { y: 0, x: 300, width: 100, height: 300, data: [1, 2, 3] },
    ]);
  });

  it('Flex({...}) should accept padding options', () => {
    const composition = Flex();
    const options = {
      type: 'flex',
      width: 400,
      height: 300,
      data: [1, 2, 3],
      padding: 50,
      children: [{}, {}, {}],
    };
    expect(composition(options)).toEqual([
      { y: 0, x: 0, width: 100, height: 300, data: [1, 2, 3] },
      { y: 0, x: 150, width: 100, height: 300, data: [1, 2, 3] },
      { y: 0, x: 300, width: 100, height: 300, data: [1, 2, 3] },
    ]);
  });

  it('Flex({...}) should accept x and y options', () => {
    const composition = Flex();
    const options = {
      type: 'flex',
      direction: 'col',
      x: 100,
      y: 100,
      width: 400,
      height: 300,
      data: [1, 2, 3],
      children: [{}, {}, {}],
    };
    expect(composition(options)).toEqual([
      { y: 100, x: 100, width: 400, height: 100, data: [1, 2, 3] },
      { y: 200, x: 100, width: 400, height: 100, data: [1, 2, 3] },
      { y: 300, x: 100, width: 400, height: 100, data: [1, 2, 3] },
    ]);
  });
});

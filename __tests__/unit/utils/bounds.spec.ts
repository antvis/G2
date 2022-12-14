import { isInBounds, isOverflow, isOverlap } from '../../../src/utils/bounds';

describe('bounds', () => {
  it('isInBounds should return whether point in bounds', () => {
    expect(
      isInBounds(
        [10, 10],
        [
          [0, 0],
          [20, 20],
        ],
      ),
    ).toBe(true);
    expect(
      isInBounds(
        [30, 10],
        [
          [0, 0],
          [20, 20],
        ],
      ),
    ).toBe(false);
  });

  it('isOverflow should return whether bounds in another bounds', () => {
    expect(
      isOverflow(
        [
          [0, 0],
          [20, 20],
        ],
        [
          [0, 0],
          [20, 20],
        ],
      ),
    ).toBe(false);
    expect(
      isOverflow(
        [
          [2, 2],
          [18, 18],
        ],
        [
          [0, 0],
          [20, 20],
        ],
      ),
    ).toBe(false);
    expect(
      isOverflow(
        [
          [0, 0],
          [21, 21],
        ],
        [
          [0, 0],
          [20, 20],
        ],
      ),
    ).toBe(true);
  });

  it('isOverlap sshould return whether bounds overlap with another bounds', () => {
    expect(
      isOverlap(
        [
          [0, 0],
          [21, 21],
        ],
        [
          [0, 0],
          [20, 20],
        ],
      ),
    ).toBe(true);

    expect(
      isOverlap(
        [
          [0, 0],
          [1, 1],
        ],
        [
          [2, 2],
          [20, 20],
        ],
      ),
    ).toBe(false);
  });
});

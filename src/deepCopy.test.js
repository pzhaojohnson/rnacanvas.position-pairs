import { deepCopy } from './deepCopy';

describe('deepCopy function', () => {
  it('creates a new array', () => {
    let pairs = [[1, 2], [3, 4], [5, 6]];

    expect(deepCopy(pairs)).not.toBe(pairs);
  });

  it('creates new position pairs', () => {
    let pairs = [[9, 1], [2, 8], [3, 7], [4, 6]];

    deepCopy(pairs).forEach(pr => {
      expect(pairs.includes(pr)).toBeFalsy();
    });
  });

  it('maintains values', () => {
    let pairs = [[112, 5], [8, 21], [30, 52], [1, 9], [2, 88]];

    expect(deepCopy(pairs)).toStrictEqual([[112, 5], [8, 21], [30, 52], [1, 9], [2, 88]]);
  });

  test('an empty array of position pairs', () => {
    expect(deepCopy([])).toStrictEqual([]);
  });
});

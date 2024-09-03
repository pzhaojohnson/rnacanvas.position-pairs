import { deepCopy } from './deepCopy';

describe('`deepCopy()` function', () => {
  test('copying a position pair', () => {
    let pair = [57, 81];
    let pairCopy = deepCopy(pair);

    expect(pairCopy).toStrictEqual([57, 81]);
    expect(pairCopy).not.toBe(pair);
  });

  describe('copying arrays of position pairs', () => {
    it('creates a new array', () => {
      let pairs = [[1, 2], [3, 4], [5, 6]];

      expect(deepCopy(pairs)).not.toBe(pairs);
    });

    it('creates new position pair tuples', () => {
      let pairs = [[9, 1], [2, 8], [3, 7], [4, 6]];

      deepCopy(pairs).forEach(pr => {
        expect(pairs.includes(pr)).toBeFalsy();
      });
    });

    it('copies the paired positions', () => {
      let pairs = [[112, 5], [8, 21], [30, 52], [1, 9], [2, 88]];

      expect(deepCopy(pairs)).toStrictEqual([[112, 5], [8, 21], [30, 52], [1, 9], [2, 88]]);
    });

    test('an empty array of position pairs', () => {
      expect(deepCopy([])).toStrictEqual([]);
    });

    test('an array containing one position pair', () => {
      let pairs = [[5, 29]];

      expect(deepCopy(pairs)).toStrictEqual([[5, 29]]);
    });
  });
});

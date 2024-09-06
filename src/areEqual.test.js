import { areEqual } from './areEqual';

describe('`areEqual()` function', () => {
  test('some pairs that are equal', () => {
    expect(areEqual([11, 25], [11, 25])).toBe(true);
    expect(areEqual([11, 25], [25, 11])).toBe(true);
  });

  test('some pairs that are not equal', () => {
    expect(areEqual([2, 30], [3, 29])).toBe(false);

    expect(areEqual([11, 16], [11, 17])).toBe(false);
    expect(areEqual([11, 16], [12, 16])).toBe(false);
    expect(areEqual([11, 15], [11, 16])).toBe(false);
    expect(areEqual([10, 16], [11, 16])).toBe(false);
  });

  test('a position paired with itself', () => {
    expect(areEqual([11, 11], [11, 11])).toBe(true);

    expect(areEqual([11, 11], [12, 12])).toBe(false);
    expect(areEqual([11, 15], [11, 11])).toBe(false);
  });

  it('does not modify the input pairs at all', () => {
    // are unsorted
    let pair1 = [17, 3];
    let pair2 = [18, 5];

    areEqual(pair1, pair2);

    expect(pair1).toStrictEqual([17, 3]);
    expect(pair2).toStrictEqual([18, 5]);
  });
});

import { areCrossing } from './areCrossing';

describe('`areCrossing()` function', () => {
  test('some pairs that are crossing', () => {
    expect(areCrossing([20, 40], [30, 50])).toBe(true);
    expect(areCrossing([20, 40], [50, 30])).toBe(true);

    expect(areCrossing([25, 27], [24, 26])).toBe(true);
    expect(areCrossing([27, 25], [24, 26])).toBe(true);

    expect(areCrossing([27, 25], [26, 24])).toBe(true);
  });

  test('some pairs that are not crossing', () => {
    expect(areCrossing([12, 31], [13, 30])).toBe(false);
    expect(areCrossing([12, 31], [30, 13])).toBe(false);
    expect(areCrossing([31, 12], [13, 30])).toBe(false);
    expect(areCrossing([31, 12], [30, 13])).toBe(false);

    // two pairs that are equal
    expect(areCrossing([12, 31], [12, 31])).toBe(false);
    expect(areCrossing([12, 31], [31, 12])).toBe(false);

    // a position paired with itself
    expect(areCrossing([8, 10], [9, 9])).toBe(false);
  });
});

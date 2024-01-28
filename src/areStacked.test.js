import { areStacked } from './areStacked';

describe('areStacked function', () => {
  test('are stacked and pair 1 encloses pair 2', () => {
    expect(areStacked([5, 60], [6, 59])).toBe(true);

    // varying the order of positions within the two pairs
    expect(areStacked([60, 5], [6, 59])).toBe(true);
    expect(areStacked([5, 60], [59, 6])).toBe(true);
    expect(areStacked([60, 5], [59, 6])).toBe(true);
  });

  test('are stacked and pair 2 encloses pair 1', () => {
    expect(areStacked([85, 121], [84, 122])).toBe(true);

    // varying the order of positions within the two pairs
    expect(areStacked([121, 85], [84, 122])).toBe(true);
    expect(areStacked([85, 121], [122, 84])).toBe(true);
    expect(areStacked([121, 85], [122, 84])).toBe(true);
  });

  test('the upstream positions of the two pairs are not stacked', () => {
    expect(areStacked([119, 352], [117, 353])).toBe(false);

    // varying the order of positions within the two pairs
    expect(areStacked([352, 119], [117, 353])).toBe(false);
    expect(areStacked([119, 352], [353, 117])).toBe(false);
    expect(areStacked([352, 119], [353, 117])).toBe(false);
  });

  test('the downstream positions of the two pairs are not stacked', () => {
    expect(areStacked([198, 267], [199, 265])).toBe(false);

    // varying the order of positions within the two pairs
    expect(areStacked([267, 198], [199, 265])).toBe(false);
    expect(areStacked([198, 267], [265, 199])).toBe(false);
    expect(areStacked([267, 198], [265, 199])).toBe(false);
  });

  test('two pseudoknotted pairs with neighboring positions', () => {
    expect(areStacked([50, 225], [51, 226])).toBe(false);

    // varying the order of positions within the two pairs
    expect(areStacked([225, 50], [51, 226])).toBe(false);
    expect(areStacked([50, 225], [226, 51])).toBe(false);
    expect(areStacked([225, 50], [226, 51])).toBe(false);
  });
});

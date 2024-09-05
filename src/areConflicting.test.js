import { areConflicting } from './areConflicting';

describe('`areConflicting()` function', () => {
  test('some pairs that are conflicting', () => {
    // conflict in regards to position 54
    expect(areConflicting([54, 103], [54, 105])).toBe(true);
    expect(areConflicting([54, 103], [105, 54])).toBe(true);

    // conflict in regards to postiion 86
    expect(areConflicting([23, 86], [28, 86])).toBe(true);
    expect(areConflicting([23, 86], [86, 28])).toBe(true);
  });

  test('two pairs that do not share any positions', () => {
    expect(areConflicting([27, 83], [34, 56])).toBe(false);
  });

  test('two pairs that are equal', () => {
    expect(areConflicting([8, 31], [8, 31])).toBe(false);
    expect(areConflicting([8, 31], [31, 8])).toBe(false);
  });

  test('a position paired with itself', () => {
    expect(areConflicting([9, 9], [9, 20])).toBe(true);
    expect(areConflicting([9, 9], [20, 9])).toBe(true);
    expect(areConflicting([9, 20], [9, 9])).toBe(true);
    expect(areConflicting([20, 9], [9, 9])).toBe(true);

    expect(areConflicting([9, 9], [9, 9])).toBe(false);
  });
});

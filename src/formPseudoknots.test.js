import { formPseudoknots } from './formPseudoknots';

describe('`formPseudoknots()` function', () => {
  test('an empty array of pairs', () => {
    let pairs = [];

    expect(formPseudoknots(pairs)).toBe(false);
  });

  test('an array containing just one pair', () => {
    let pairs = [[6, 31]];

    expect(formPseudoknots(pairs)).toBe(false);
  });

  test('an array containing five unknotted pairs', () => {
    // some pairs are unsorted
    let pairs = [[8, 2], [36, 15], [16, 35], [20, 30], [21, 29]];

    expect(formPseudoknots(pairs)).toBe(false);
  });

  test('an H-type pseudoknot', () => {
    let pairs = [
      [3, 24], [4, 23], [5, 22], [6, 21],
      [9, 35], [10, 34], [11, 33], [12, 32],
    ];

    expect(formPseudoknots(pairs)).toBe(true);
  });

  test('a pseudoknot spanning multiple stems', () => {
    let pairs = [
      [2, 100], [3, 99], [4, 98],
      [15, 83], [16, 82], [17, 81],
      [40, 61], [41, 60], [42, 59],
      [73, 92], [74, 91], [75, 90],
    ];

    expect(formPseudoknots(pairs)).toBe(true);
  });

  test('a position paired with itself', () => {
    let pairs = [
      [5, 25], [6, 24], [7, 23], [8, 22],
    ];

    // a position paired with itself
    pairs.push([9, 9]);

    expect(formPseudoknots(pairs)).toBe(false);

    // add a pseudoknot
    pairs.push([10, 33], [11, 32], [12, 31]);

    expect(formPseudoknots(pairs)).toBe(true);
  });
});

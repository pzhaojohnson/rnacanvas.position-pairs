import { knotless } from './knotless';

import { sorted } from './sorted';

describe('`knotless()` function', () => {
  test('an empty array of pairs', () => {
    let pairs = [];

    expect(knotless(pairs)).toStrictEqual([]);
  });

  test('an array containing just one pair', () => {
    let pairs = [[16, 35]];

    expect(knotless(pairs)).toStrictEqual([[16, 35]]);
  });

  test('a relatively complex structure with no pseudoknots', () => {
    let pairs = [
      [17, 40], [18, 39], [19, 38],
      [23, 34], [24, 33], [25, 32], [26, 31],
      [50, 71], [51, 70], [52, 69],
    ];

    expect(sorted(knotless(pairs))).toStrictEqual([
      [17, 40], [18, 39], [19, 38],
      [23, 34], [24, 33], [25, 32], [26, 31],
      [50, 71], [51, 70], [52, 69],
    ]);
  });

  test('a structure with multiple pseudoknots', () => {
    let pairs = [
      [7, 19], [8, 18], [9, 17],
      [12, 25], [13, 24],
      [31, 100], [32, 99], [33, 98], [34, 97],
      [50, 62], [51, 61], [52, 60],
      [41, 56], [42, 55], [43, 54], [44, 53],
    ];

    expect(sorted(knotless(pairs))).toStrictEqual([
      [7, 19], [8, 18], [9, 17],
      [31, 100], [32, 99], [33, 98], [34, 97],
      [50, 62], [51, 61], [52, 60],
    ]);
  });

  test('unsorted pairs', () => {
    let pairs = [
      [8, 18], [9, 17], [60, 52], [12, 25], [13, 24], [31, 100], [19, 7], [99, 32], [33, 98], [44, 53], [34, 97], [51, 61], [41, 56], [50, 62], [55, 42], [43, 54],
    ];

    expect(sorted(knotless(pairs))).toStrictEqual([
      [7, 19], [8, 18], [9, 17],
      [31, 100], [32, 99], [33, 98], [34, 97],
      [50, 62], [51, 61], [52, 60],
    ]);
  });

  test('a position paired with itself', () => {
    let pairs = [
      [7, 19], [8, 18], [9, 17],
      [10, 10],
      [12, 25], [13, 24],
      [31, 100], [32, 99], [33, 98], [34, 97],
      [50, 62], [51, 61], [52, 60],
      [41, 56], [42, 55], [43, 54], [44, 53],
    ];

    expect(sorted(knotless(pairs))).toStrictEqual([
      [7, 19], [8, 18], [9, 17],
      [10, 10],
      [31, 100], [32, 99], [33, 98], [34, 97],
      [50, 62], [51, 61], [52, 60],
    ]);
  });

  it('does not modify the input array of pairs', () => {
    let pairs = [
      [7, 19], [8, 18], [9, 17],
      [12, 25], [13, 24],
      [31, 100], [32, 99], [33, 98], [34, 97],
      [50, 62], [51, 61], [52, 60],
      [41, 56], [42, 55], [43, 54], [44, 53],
    ];

    knotless(pairs);

    expect(pairs).toStrictEqual([
      [7, 19], [8, 18], [9, 17],
      [12, 25], [13, 24],
      [31, 100], [32, 99], [33, 98], [34, 97],
      [50, 62], [51, 61], [52, 60],
      [41, 56], [42, 55], [43, 54], [44, 53],
    ]);
  });

  it('creates and returns an entirely new array of pairs', () => {
    let pairs = [
      [17, 40], [18, 39], [19, 38],
      [23, 34], [24, 33], [25, 32], [26, 31],
      [50, 71], [51, 70], [52, 69],
    ];

    let knotlessPairs = knotless(pairs);

    expect(sorted(knotlessPairs)).toStrictEqual(pairs);

    expect(knotlessPairs).not.toBe(pairs);

    knotlessPairs.forEach(pr => expect(pairs.includes(pr)).toBeFalsy());
  });
});

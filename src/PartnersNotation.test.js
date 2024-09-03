import { partnersNotation } from './PartnersNotation';

describe('`partnersNotation()` function', () => {
  test('an empty array of pairs', () => {
    let pairs = [];

    expect(partnersNotation(pairs)).toStrictEqual([]);
  });

  test('an array containing one pair', () => {
    let pairs = [[3, 9]];

    expect(partnersNotation(pairs)).toStrictEqual([
      undefined, undefined, 9,
      undefined, undefined, undefined, undefined, undefined, 3,
    ]);
  });

  test('an array containing five pairs', () => {
    // some pairs are unsorted
    let pairs = [[8, 1], [2, 11], [4, 15], [13, 5], [6, 10]];

    expect(partnersNotation(pairs)).toStrictEqual([
      8,
      11,
      undefined, 15,
      13,
      10,
      undefined, 1,
      undefined, 6,
      2,
      undefined, 5,
      undefined, 4,
    ]);
  });
});

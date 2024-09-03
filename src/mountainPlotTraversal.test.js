import { mountainPlotTraversal } from './mountainPlotTraversal';

describe('`mountainPlotTraversal()` function', () => {
  test('an empty structure', () => {
    let seq = [];
    let pairs = [];

    expect(mountainPlotTraversal(seq, pairs)).toStrictEqual([]);
  });

  test('a structure with no base-pairs', () => {
    let seq = [...'ACGUACGUAGCGUAGCUAGCUGA'];
    let pairs = [];

    expect(mountainPlotTraversal(seq, pairs)).toStrictEqual(
      [...'ACGUACGUAGCGUAGCUAGCUGA'].map(() => 0)
    )
  });

  test('one hairpin', () => {
    let seq = [...'1234567890abcdef'];
    let pairs = [[4, 14], [5, 13], [6, 12]];

    expect(mountainPlotTraversal(seq, pairs)).toStrictEqual([
      0, 0, 0, 0, 1, 2, 3, 3, 3, 3, 3, 2, 1, 0, 0, 0,
    ]);
  });

  test('a more complex structure', () => {
    let seq = [...'1234567890abcdefghijklmnopqrstuvwxyz'];

    let pairs = [
      [3, 25], [4, 24], [5, 23],
      [8, 21], [9, 20],
      [26, 33], [27, 32], [28, 31],
    ];

    expect(mountainPlotTraversal(seq, pairs)).toStrictEqual([
      0, 0,
      0, 1, 2,
      3, 3,
      3, 4,
      5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
      4, 3,
      3,
      2, 1, 0,
      0, 1, 2,
      3, 3,
      2, 1, 0,
      0, 0, 0,
    ]);
  });

  test('unsorted pairs', () => {
    let seq = [...'1234567890abcdefghijklmnopqrstuvwxyz'];

    let pairs = [[28, 31], [4, 24], [23, 5], [21, 8], [3, 25], [9, 20], [26, 33], [32, 27]];

    expect(mountainPlotTraversal(seq, pairs)).toStrictEqual([
      0, 0,
      0, 1, 2,
      3, 3,
      3, 4,
      5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
      4, 3,
      3,
      2, 1, 0,
      0, 1, 2,
      3, 3,
      2, 1, 0,
      0, 0, 0,
    ]);
  });

  test('a position paired with itself', () => {
    let seq = [...'1234567890abcdef'];

    let pairs = [
      [3, 15], [4, 14], [5, 13],
      [6, 6],
    ];

    expect(mountainPlotTraversal(seq, pairs)).toStrictEqual([
      0, 0,
      0, 1, 2,
      3,
      3, 3, 3, 3, 3, 3,
      2, 1, 0,
      0,
    ]);
  });

  test('a structure containing pseudoknot(s)', () => {
    let seq = [...'1234567890abcdefghijklmnopqrstuvwxyz'];

    let pairs = [
      [4, 29], [5, 28], [6, 27],
      [10, 33], [11, 32], [12, 31],
    ];

    expect(() => mountainPlotTraversal(seq, pairs)).toThrow();
  });
});

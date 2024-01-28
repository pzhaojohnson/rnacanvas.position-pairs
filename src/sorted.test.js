import { sorted } from './sorted';

describe('sorted function', () => {
  test('zero pairs', () => {
    let unsortedPairs = [];

    expect(sorted(unsortedPairs)).toStrictEqual([]);
  });

  test('one pair', () => {
    let unsortedPairs = [[5, 33]];

    expect(sorted(unsortedPairs)).toStrictEqual([[5, 33]]);
  });

  test('eight pairs', () => {
    let unsortedPairs = [[35, 101], [34, 102], [36, 100], [5, 260], [2, 261], [150, 170], [46, 79], [45, 80]];

    expect(unsortedPairs.length).toBe(8);

    expect(sorted(unsortedPairs)).toStrictEqual(
      [[2, 261], [5, 260], [34, 102], [35, 101], [36, 100], [45, 80], [46, 79], [150, 170]]
    );
  });

  test('when the two positions within individual pairs need to be sorted', () => {
    let unsortedPairs = [[99, 21], [100, 20], [30, 70], [200, 7], [202, 5], [6, 201]];

    expect(sorted(unsortedPairs)).toStrictEqual(
      [[5, 202], [6, 201], [7, 200], [20, 100], [21, 99], [30, 70]]
    );
  });

  test('pseudoknotted pairs', () => {
    let unsortedPairs = (
      [[101, 210], [150, 263], [125, 56], [70, 111], [800, 186], [5, 197], [151, 262], [187, 799]]
    );

    expect(sorted(unsortedPairs)).toStrictEqual(
      [[5, 197], [56, 125], [70, 111], [101, 210], [150, 263], [151, 262], [186, 800], [187, 799]]
    );
  });

  test('contradictory pairs', () => {
    let unsortedPairs = [[80, 261], [261, 88], [102, 80], [5, 267], [5, 300], [200, 1], [6, 299]];

    // the maximum positions of pairs do not currently affect the sorted order
    expect(sorted(unsortedPairs)).toStrictEqual(
      [[1, 200], [5, 267], [5, 300], [6, 299], [80, 261], [80, 102], [88, 261]]
    );
  });

  test('a position paired with itself', () => {
    let unsortedPairs = [[120, 200], [140, 140], [275, 230], [3, 9]];

    expect(sorted(unsortedPairs)).toStrictEqual([[3, 9], [120, 200], [140, 140], [230, 275]]);
  });

  test('repeat pairs', () => {
    let unsortedPairs = [[8, 86], [5, 89], [7, 87], [9, 85], [7, 87], [6, 88], [7, 87]];

    expect(sorted(unsortedPairs)).toStrictEqual(
      [[5, 89], [6, 88], [7, 87], [7, 87], [7, 87], [8, 86], [9, 85]]
    );
  });

  test('when the two positions within individual repeat pairs need to be sorted', () => {
    let unsortedPairs = [[8, 86], [5, 89], [87, 7], [9, 85], [7, 87], [6, 88], [87, 7]];

    expect(sorted(unsortedPairs)).toStrictEqual(
      [[5, 89], [6, 88], [7, 87], [7, 87], [7, 87], [8, 86], [9, 85]]
    );
  });

  it('returns a totally new array of position pairs', () => {
    let unsortedPairs = [[2, 81], [3, 80], [4, 79], [5, 78], [6, 77]];

    let sortedPairs = sorted(unsortedPairs);

    // creates a new array
    expect(sortedPairs).not.toBe(unsortedPairs);

    // creates new individual position pairs
    sortedPairs.forEach(pair => {
      expect(unsortedPairs.includes(pair)).toBeFalsy();
    });
  });

  it('does not modify the input array of position pairs', () => {
    let unsortedPairs = [[91, 20], [90, 21], [89, 22], [5, 30], [6, 29]];

    let sortedPairs = sorted(unsortedPairs);

    // was not changed
    expect(unsortedPairs).toStrictEqual([[91, 20], [90, 21], [89, 22], [5, 30], [6, 29]]);

    expect(sortedPairs).not.toStrictEqual([[91, 20], [90, 21], [89, 22], [5, 30], [6, 29]]);
  });
});

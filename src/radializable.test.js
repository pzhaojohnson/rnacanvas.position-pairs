import { radializable } from './radializable';

test('`function radializable()`', () => {
  // an empty array
  expect(radializable([])).toStrictEqual([]);

  // returns an entirely new array of position pairs
  var pairs = [[1, 30], [2, 29], [3, 28]];
  expect(radializable(pairs)).toStrictEqual([[1, 30], [2, 29], [3, 28]].reverse());
  expect(radializable(pairs)).not.toBe(pairs);
  radializable(pairs).forEach(pr => expect(pairs.includes(pr)).toBeFalsy());

  // does not modify the input array of pairs
  // (contains two repeat pairs and some knotted pairs)
  var pairs = [[5, 2], [4, 11], [13, 6], [1, 25], [5, 2]];
  radializable(pairs);
  expect(pairs).toStrictEqual([[5, 2], [4, 11], [13, 6], [1, 25], [5, 2]]);

  // an already radializable set of pairs
  var pairs = [[18, 1], [2, 17], [3, 16], [15, 5], [14, 6], [8, 11]];
  expect(radializable(pairs)).toStrictEqual([[8, 11], [14, 6], [15, 5], [3, 16], [2, 17], [18, 1]]);

  // omits repeat pairs
  var pairs = [[3, 17], [17, 3], [5, 11], [44, 99], [2, 1], [44, 99]];
  expect(radializable(pairs)).toStrictEqual([[2, 1], [5, 11], [3, 17], [44, 99]]);

  // omits conflicting pairs
  var pairs = [[5, 19], [19, 6], [10, 16], [1, 22], [10, 14]];
  expect(radializable(pairs)).toStrictEqual([[10, 14], [19, 6], [1, 22]]);

  // omits pseudoknots
  var pairs = [[3, 22], [4, 21], [8, 31], [9, 30], [19, 12]];
  expect(radializable(pairs)).toStrictEqual([[19, 12], [4, 21], [3, 22]]);

  // omits self-pairs
  var pairs = [[2, 6], [3, 5], [4, 4], [11, 12]];
  expect(radializable(pairs)).toStrictEqual([[11, 12], [3, 5], [2, 6]]);
});

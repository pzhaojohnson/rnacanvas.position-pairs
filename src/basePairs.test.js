import { basePairs } from './basePairs';

test('`function basePairs()`', () => {
  expect(basePairs([], [])).toStrictEqual([]);

  var seq = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(() => new NucleobaseMock());
  var positionPairs = [[6, 3]];
  expect(basePairs(seq, positionPairs)).toStrictEqual([[seq[5], seq[2]]]);

  var seq = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => new NucleobaseMock());
  var positionPairs = [[1, 5], [2, 4], [9, 6], [7, 3]];
  expect(basePairs(seq, positionPairs)).toStrictEqual([[seq[0], seq[4]], [seq[1], seq[3]], [seq[8], seq[5]], [seq[6], seq[2]]]);

  // non-positive positions
  var seq = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(() => new NucleobaseMock());
  expect(() => basePairs(seq, [[0, 5]])).toThrow();
  expect(() => basePairs(seq, [[-3, 5]])).toThrow();
  expect(() => basePairs(seq, [[5, 0]])).toThrow();
  expect(() => basePairs(seq, [[5, -2]])).toThrow();

  // positions out of sequence range
  var seq = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(() => new NucleobaseMock());
  expect(() => basePairs(seq, [[3, 12]])).toThrow();
  expect(() => basePairs(seq, [[3, 15]])).toThrow();
  expect(() => basePairs(seq, [[12, 3]])).toThrow();
  expect(() => basePairs(seq, [[16, 3]])).toThrow();
});

class NucleobaseMock {
  // make each base unique in some way
  id = Math.random();
}

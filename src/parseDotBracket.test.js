import { parseDotBracket } from './parseDotBracket';

test('`function parseDotBracket()`', () => {
  // empty or whitespace-only input
  expect([...parseDotBracket('')]).toStrictEqual([]);
  expect([...parseDotBracket('   \n\t  ')]).toStrictEqual([]);

  // unrecognized characters are treated as unpaired positions
  const unrecognized = parseDotBracket('abc123!?');
  expect([...unrecognized]).toStrictEqual([]);
  expect(unrecognized.toArray()).toStrictEqual([]);
  expect(unrecognized['()']).toStrictEqual([]);
  expect(unrecognized['[]']).toStrictEqual([]);
  expect(unrecognized['{}']).toStrictEqual([]);
  expect(unrecognized['<>']).toStrictEqual([]);

  // simple bracket types and grouped results
  const simple = parseDotBracket('(){}[]<>');
  expect([...simple]).toStrictEqual([[1, 2], [3, 4], [5, 6], [7, 8]]);
  expect(simple.toArray()).toStrictEqual([[1, 2], [3, 4], [5, 6], [7, 8]]);
  expect(simple['()']).toStrictEqual([[1, 2]]);
  expect(simple['{}']).toStrictEqual([[3, 4]]);
  expect(simple['[]']).toStrictEqual([[5, 6]]);
  expect(simple['<>']).toStrictEqual([[7, 8]]);

  // whitespace is ignored while preserving original sequence positions
  const spaced = parseDotBracket('x ( ) y [ ] z { } w < >');
  expect([...spaced]).toStrictEqual([[2, 3], [5, 6], [8, 9], [11, 12]]);
  expect(spaced.toArray()).toStrictEqual([[2, 3], [5, 6], [8, 9], [11, 12]]);

  // nested bracket structures are grouped independently by bracket type
  const nested = parseDotBracket('([{}])');
  expect([...nested]).toStrictEqual([[1, 6], [2, 5], [3, 4]]);
  expect(nested.toArray()).toStrictEqual([[1, 6], [2, 5], [3, 4]]);
  expect(nested['()']).toStrictEqual([[1, 6]]);
  expect(nested['[]']).toStrictEqual([[2, 5]]);
  expect(nested['{}']).toStrictEqual([[3, 4]]);

  // repeated use of the same bracket type yields multiple pairs
  const repeated1 = parseDotBracket('((()))');
  expect([...repeated1]).toStrictEqual([[1, 6], [2, 5], [3, 4]]);
  expect(repeated1.toArray()).toStrictEqual([[1, 6], [2, 5], [3, 4]]);
  expect(repeated1['()']).toStrictEqual([[1, 6], [2, 5], [3, 4]]);

  const repeated2 = parseDotBracket('[] []');
  expect([...repeated2]).toStrictEqual([[1, 2], [3, 4]]);
  expect(repeated2.toArray()).toStrictEqual([[1, 2], [3, 4]]);
  expect(repeated2['[]']).toStrictEqual([[1, 2], [3, 4]]);

  // unbalanced notation throws
  expect(() => parseDotBracket('(')).toThrow();
  expect(() => parseDotBracket(')')).toThrow();
  expect(() => parseDotBracket('((()))))')).toThrow();
  expect(() => parseDotBracket('((([{}]))')).toThrow();
  expect(() => parseDotBracket('[')).toThrow();
  expect(() => parseDotBracket('{')).toThrow();
  expect(() => parseDotBracket('<')).toThrow();

  // letter-based bracket pairs are not recognized
  expect(() => parseDotBracket('Aa')).not.toThrow();
  expect([...parseDotBracket('Aa')]).toStrictEqual([]);
  expect(parseDotBracket('Aa').toArray()).toStrictEqual([]);

  // nested bracket structures with mixed bracket types are parsed in order
  const nestedMixed = parseDotBracket('..((..[[[..{{.....)).}.]].}..].');
  expect([...nestedMixed]).toStrictEqual([[3, 20], [4, 19], [7, 30], [8, 25], [9, 24], [12, 27], [13, 22]]);
  expect(nestedMixed.toArray()).toStrictEqual([[3, 20], [4, 19], [7, 30], [8, 25], [9, 24], [12, 27], [13, 22]]);
});

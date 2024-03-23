import { parseDotBracket } from './parseDotBracket';

describe('parseDotBracket function', () => {
  test('an empty string', () => {
    expect([...parseDotBracket('')]).toStrictEqual([]);
  });

  test('dot-bracket notations with only unpaired positions', () => {
    expect([...parseDotBracket('.')]).toStrictEqual([]);
    expect([...parseDotBracket('.....')]).toStrictEqual([]);
    expect([...parseDotBracket('.................')]).toStrictEqual([]);
  });

  test('dot-bracket notations containing unrecognized character(s)', () => {
    expect(() => parseDotBracket('...[[...]]....')).toThrow();
    expect(() => parseDotBracket('...((<.....>)).....')).toThrow();
    expect(() => parseDotBracket('1 ..(((...)))...')).toThrow();
    expect(() => parseDotBracket('asdf')).toThrow();
    expect(() => parseDotBracket('     ')).toThrow();
  });

  test('dot-bracket notations with unmatched upstream and/or downstream partner(s)', () => {
    expect(() => parseDotBracket('(')).toThrow();
    expect(() => parseDotBracket(')')).toThrow();
    expect(() => parseDotBracket('(((((.....))))')).toThrow();
    expect(() => parseDotBracket('((((.....)))))')).toThrow();
    expect(() => parseDotBracket('...(((.....((((((....))).))....)...')).toThrow();
    expect(() => parseDotBracket('...(((....((.....)))))....)))))))......')).toThrow();
  });

  test('dot-bracket notations with just one pair', () => {
    expect([...parseDotBracket('()')]).toStrictEqual([[1, 2]]);
    expect([...parseDotBracket('....(......)....')]).toStrictEqual([[5, 12]]);
  });

  test('dot-bracket notations with multiple pairs', () => {
    expect([...parseDotBracket('(((((......)))))')]).toStrictEqual([
      [1, 16], [2, 15], [3, 14], [4, 13], [5, 12],
    ]);

    expect([...parseDotBracket('..(((....((((...))))....)))...(((...))).')]).toStrictEqual([
      [3, 27], [4, 26], [5, 25],
      [10, 20], [11, 19], [12, 18], [13, 17],
      [31, 39], [32, 38], [33, 37],
    ]);

    expect([...parseDotBracket('...((((((((.....)))..)))...(((((...))))..))).....')]).toStrictEqual([
      [4, 44], [5, 43],
      [6, 24], [7, 23], [8, 22],
      [9, 19], [10, 18], [11, 17],
      [28, 42],
      [29, 39], [30, 38], [31, 37], [32, 36],
    ]);
  });
});

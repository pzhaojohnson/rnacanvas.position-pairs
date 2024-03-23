import type { PositionPair } from './PositionPair';

import { sorted } from './sorted';

/**
 * Parses the given structure in dot-bracket notation
 * and returns some form of iterable over the position pairs specified by the dot-bracket notation.
 *
 * Position pairs are always returned with the upstream partner position (i.e., the smaller position)
 * ordered before the downstream partner position (i.e., the larger position).
 *
 * Positions pairs are also returned in ascending order by their upstream partner positions
 * (i.e., in the order that one would encounter them traversing the dot-bracket notation).
 *
 * Currently, this function is only able to handle simple dot-bracket notation
 * (i.e., dot-bracket notation that only contains the characters ".", "(" and ")").
 *
 * Will throw if the input string contains any characters other than ".", "(" and ")".
 *
 * Will also throw if the given dot-bracket notation is invalid
 * (i.e., has unmatched upstream or downstream brackets).
 */
export function parseDotBracket(dotBracket: string): Iterable<PositionPair> | never {
  let characters = dotBracket.split('');

  let recognizedCharacters = ['.', '(', ')'];

  characters.forEach(c => {
    if (!recognizedCharacters.includes(c)) {
      throw new Error(`Unrecognized character in dot-bracket notation: "${c}".`);
    }
  });

  let pairs: PositionPair[] = [];

  let upstreamPartnersStack: number[] = [];

  characters.forEach((c, i) => {
    let p = i + 1;

    if (c == '(') {
      upstreamPartnersStack.push(p);
    } else if (c == ')') {
      let q = upstreamPartnersStack.pop();
      if (typeof q != 'number') { throw new Error('Unmatched downstream partner(s) in dot-bracket notation.'); }
      pairs.push([q, p]);
    } else {
      // nothing to do for unpaired positions
    }
  });

  if (upstreamPartnersStack.length > 0) {
    throw new Error('Unmatched upstream partner(s) in dot-bracket notation.');
  }

  return sorted(pairs);
}

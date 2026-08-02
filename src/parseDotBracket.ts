import type { PositionPair } from './PositionPair';

import { removeWhitespace } from '@rnacanvas/utilities';

import { sorted } from './sorted';

/**
 * Parses the input dot-bracket notation.
 *
 * Recognized characters include "()", "[]", "{}" and "<>".
 *
 * Any unrecognized characters are treated as unpaired positions.
 *
 * Any whitespace in the input string is ignored.
 *
 * This function throws for unbalanced dot-bracket notation
 * (e.g., dot-bracket notation with more upstream brackets than downstream brackets, or vice versa).
 */
export function parseDotBracket(dotBracket: string) {
  // ignore all whitespace
  dotBracket = removeWhitespace(dotBracket);

  let positionPairs: Record<BracketPair, PositionPair[]> = {
    '()': [],
    '[]': [],
    '{}': [],
    '<>': [],
  };

  bracketPairs.forEach(bracketPair => {
    let [upstreamBracket, downstreamBracket] = bracketPair.split('');

    let simpleDotBracket = [...dotBracket].map(c => (
      c === upstreamBracket ? '('
      : c === downstreamBracket ? ')'
      : '.'
    )).join('');

    positionPairs[bracketPair] = parseSimple(simpleDotBracket);
  });

  // don't forget to sort
  let toArray = () => sorted(bracketPairs.flatMap(bracketPair => positionPairs[bracketPair]));

  return {
    [Symbol.iterator]() {
      return toArray()[Symbol.iterator]();
    },

    toArray,

    ...positionPairs,
  };
}

export function parseSimple(dotBracket: string) {
  let positionPairs: PositionPair[] = [];

  let upstreamStack: Position[] = [];

  [...dotBracket].forEach((character, i) => {
    let p = i + 1;

    if (character == '.') {
      // nothing to do
    } else if (character == '(') {
      upstreamStack.push(p);
    } else if (character == ')') {
      let q = upstreamStack.pop();

      if (typeof q != 'number') {
        throw new Error(`Unmatched downstream partner in dot-bracket notation at position: ${p}.`);
      }

      positionPairs.push([q, p]);
    }
  });

  if (upstreamStack.length > 0) {
    throw new Error(`Unmatched upstream partner in dot-bracket notation at position: ${upstreamStack.pop()}.`);
  }

  // don't forget to sort
  return sorted(positionPairs);
}

type Position = number;

const bracketPairs = ['()', '[]', '{}', '<>'] as const;

type BracketPair = typeof bracketPairs[number];

import type { PositionPair } from './PositionPair';

import { max } from '@rnacanvas/math';

/**
 * A notation for indicating pairs in a nucleic acid structure
 * where the value at each position in the array
 * indicates the partner position for that position
 * (and a value of undefined means the position is unpaired).
 *
 * This type definition also supports sparse arrays,
 * though sparse arrays can often be tricky to work with
 * (e.g., when trying to iterate through them).
 *
 * It is always necessary that the values for two paired positions
 * agree with each (i.e., that both indicate the same pairing),
 * otherwise the partners notation would be invalid.
 */
export type PartnersNotation = (number | undefined)[];

/**
 * Returns the corresponding partners notation
 * for the given array of pairs.
 *
 * The length of the returned partners notation
 * will be equal to the maximum paired position.
 */
export function partnersNotation(pairs: PositionPair[]): PartnersNotation {
  if (pairs.length == 0) {
    return [];
  }

  let partners: PartnersNotation = [];

  for (let i = 0; i < max(pairs.flat()); i++) {
    partners.push(undefined);
  }

  pairs.forEach(pr => {
    partners[pr[0] - 1] = pr[1];
    partners[pr[1] - 1] = pr[0];
  });

  return partners;
}

import type { PositionPair } from './PositionPair';

import { deepCopy } from './deepCopy';

import { sortNumbers } from '@rnacanvas/math';

/**
 * Returns true if and only if the two pairs pair the same position(s) together.
 *
 * This function can handle the case of a position paired with itself.
 */
export function areEqual(pair1: PositionPair, pair2: PositionPair): boolean {
  let pairCopy1 = deepCopy(pair1);
  let pairCopy2 = deepCopy(pair2);

  sortNumbers(pairCopy1);
  sortNumbers(pairCopy2);

  return [0, 1].every(i => pairCopy1[i] == pairCopy2[i]);
}

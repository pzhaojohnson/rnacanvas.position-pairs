import type { PositionPair } from './PositionPair';

import { sorted } from './sorted';

/**
 * Returns true if the two position pairs are stacked
 * (i.e., one encloses the other and their positions are neighboring).
 *
 * Returns false otherwise.
 */
export function areStacked(pair1: PositionPair, pair2: PositionPair): boolean {
  let sortedPairs = sorted([pair1, pair2]);

  return (
    sortedPairs[0][0] == sortedPairs[1][0] - 1
    && sortedPairs[0][1] == sortedPairs[1][1] + 1
  );
}

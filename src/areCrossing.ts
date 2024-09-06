import type { PositionPair } from './PositionPair';

import { areKnotless } from './areKnotless';

/**
 * Returns true if and only if the two pairs form a pseudoknot together.
 */
export function areCrossing(pair1: PositionPair, pair2: PositionPair): boolean {
  return !areKnotless([pair1, pair2]);
}

import type { PositionPair } from './PositionPair';

import { min, max } from '@rnacanvas/math';

/**
 * Returns true if and only if the two pairs conflict with each other
 * (i.e., the two pairs share a position but they pair it with two different positions).
 */
export function areConflicting(pair1: PositionPair, pair2: PositionPair): boolean {
  return (
    (min(pair1) == min(pair2) && max(pair1) != max(pair2))
    || (min(pair1) != min(pair2) && max(pair1) == max(pair2))
  );
}

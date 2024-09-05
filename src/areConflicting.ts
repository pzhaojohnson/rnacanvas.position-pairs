import type { PositionPair } from './PositionPair';

/**
 * Returns true if and only if the two pairs conflict with each other
 * (i.e., the two pairs share a position but they pair it with two different positions).
 */
export function areConflicting(pair1: PositionPair, pair2: PositionPair): boolean {
  return (
    (pair1.includes(pair2[0]) && !pair1.includes(pair2[1]))
    || (pair1.includes(pair2[1]) && !pair1.includes(pair2[0]))
  );
}

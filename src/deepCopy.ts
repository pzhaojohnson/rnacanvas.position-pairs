import type { PositionPair } from './PositionPair';

/**
 * Returns a deep copy of the array of position pairs.
 */
export function deepCopy(pairs: PositionPair[]): PositionPair[] {
  return pairs.map(pr => [...pr]);
}

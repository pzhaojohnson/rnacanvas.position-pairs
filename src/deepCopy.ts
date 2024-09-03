import type { PositionPair } from './PositionPair';

import { isNumbersArray } from '@rnacanvas/value-check';

export function deepCopy(pair: PositionPair): PositionPair;

export function deepCopy(pairs: PositionPair[]): PositionPair[];

/**
 * Returns a deep copy of a position pair or an array of position pairs.
 */
export function deepCopy(pairs: PositionPair | PositionPair[]): PositionPair | PositionPair[] {
  if (isNumbersArray(pairs)) {
    return [...pairs];
  } else {
    let pairsCopy: PositionPair[] = pairs.map(pr => [...pr]);
    return pairsCopy;
  }
}

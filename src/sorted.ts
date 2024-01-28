import type { PositionPair } from './PositionPair';

import { deepCopy } from './deepCopy';

import { sortNumbers } from '@rnacanvas/math';

/**
 * Returns a deep copy of the provided position pairs array that has been sorted.
 *
 * (Does not modify the input array of position pairs in any way.)
 *
 * The way that the position pairs are sorted is meant to reflect the order in which one would encounter the pairs
 * while traversing the parent sequence that the pairs are for from start to end.
 *
 * Position pairs are sorted amongst each other in ascending order according to their minimum positions.
 *
 * The two positions within individual position pairs are also sorted such that the minimum position is first.
 *
 * The array of unsorted pairs is not expected to contain contradictory pairs
 * (i.e., two different pairs containing the same position).
 *
 * It is currently not firmly defined exactly how contradictory pairs are sorted,
 * though they will not "break" this function
 * (i.e., cause it to throw or return an invalid value).
 *
 * Pairs containing the same position twice (i.e., indicating a position paired with itself)
 * are also not expected, though they also will not "break" this function.
 *
 * Repeat pairs (i.e., the same pair more than once) are also not expected,
 * though they will end up being grouped together sequentially after sorting.
 */
export function sorted(unsortedPairs: PositionPair[]): PositionPair[] {
  let sortedPairs = deepCopy(unsortedPairs);

  // sort the two positions within individual pairs
  sortedPairs.forEach(sortNumbers);

  sortedPairs.sort((pair1, pair2) => pair1[0] - pair2[0]);

  return sortedPairs;
}

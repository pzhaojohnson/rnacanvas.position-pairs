import type { PositionPair } from './PositionPair';

import { deepCopy } from './deepCopy';

import { min, max } from '@rnacanvas/math';

/**
 * Returns a deep copy of the provided pairs array
 * with pairs creating pseudoknots having been omitted.
 *
 * Pairs are omitted/retained according to the incremental range heuristic
 * reported by Smit et al., 2008.
 */
export function knotless(pairs: PositionPair[]): PositionPair[] {
  let noPseudoknots: PositionPair[] = [];

  // don't edit the passed in pairs array
  let pairsCopy = deepCopy(pairs);

  // sort by the distance spanned by each pair
  pairsCopy.sort((pr1, pr2) => Math.abs(pr1[0] - pr1[1]) - Math.abs(pr2[0] - pr2[1]));

  let spanned: (boolean | undefined)[] = [];

  pairsCopy.forEach(pr => {
    let indices = [pr[0] - 1, pr[1] - 1];

    let minIndex = min(indices);
    let maxIndex = max(indices);

    if (!spanned[minIndex] && !spanned[maxIndex]) {
      noPseudoknots.push(pr);

      for (let i = minIndex; i <= maxIndex; i++) {
        spanned[i] = true;
      }
    }
  });

  return noPseudoknots;
}

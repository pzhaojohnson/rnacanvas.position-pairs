import type { PositionPair } from './PositionPair';

import { deepCopy } from './deepCopy';

import { areKnotless } from './areKnotless';

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

  pairsCopy.forEach(pr => {
    if (areKnotless([...noPseudoknots, pr])) {
      noPseudoknots.push(pr);
    }
  });

  return noPseudoknots;
}

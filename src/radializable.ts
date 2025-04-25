import type { PositionPair } from './PositionPair';

import { deepCopy } from './deepCopy';

import { knotless } from './knotless';

/**
 * Returns a new array of position pairs with all conflicting pairs,
 * all repeat equivalent pairs, all self-pairs (i.e., pairs pairing a position with itself)
 * and all pseudoknots having been omitted.
 *
 * Conflicting pairs and pseudoknots are omitted according to
 * the incremental range heuristic reported by Smit et al., 2008.
 */
export function radializable(pairs: PositionPair[]): PositionPair[] {
  // don't edit the passed in pairs array
  let pairsCopy = deepCopy(pairs);

  // sort by the distance spanned by each pair
  pairsCopy.sort(([p1, q1], [p2, q2]) => Math.abs(p1 - q1) - Math.abs(p2 - q2));

  // no repeat pairs, self-pairs or conflicting pairs
  let pruned: PositionPair[] = [];

  let partners: (number | undefined)[] = [];

  pairsCopy.forEach(([p, q]) => {
    if (p == q) {
      // omit (is a self-pair)
    } else if (partners[p - 1] != undefined || partners[q - 1] != undefined) {
      // omit
    } else {
      pruned.push([p, q]);

      partners[p - 1] = q;
      partners[q - 1] = p;
    }
  });

  return knotless(pruned);
}

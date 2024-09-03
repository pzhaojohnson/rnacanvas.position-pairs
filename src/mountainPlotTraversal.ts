import type { Structure } from './Structure';

import { partnersNotation } from './PartnersNotation';

import { formPseudoknots } from './formPseudoknots';

/**
 * Returns the mountain plot traversal for a given structure,
 * which is the height of the mountain plot for the structure
 * at each position in the structure.
 *
 * Mountain plot heights are calculated according to the ViennaRNA definition.
 *
 * The returned mountain plot traversal will have the same length
 * as the sequence of the structure.
 *
 * This function will throw if the given structure contains any pseudoknots.
 */
export function mountainPlotTraversal<T>(...structure: Structure<T>): number[] | never {
  let seq = structure[0];

  let pairs = structure[1];
  let partners = partnersNotation(pairs);

  if (formPseudoknots(pairs)) {
    throw new Error('Pseudoknot(s) encountered.');
  }

  let mpt: number[] = [];

  let h = 0;

  seq.forEach((_, i) => {
    let p = i + 1;
    let q = partners[i];

    if (q == undefined) {
      mpt.push(h);
    } else if (p < q) {
      mpt.push(h);
      h++;
    } else if (p == q) {
      mpt.push(h);
    } else {
      h--;
      mpt.push(h);
    }
  });

  return mpt;
}

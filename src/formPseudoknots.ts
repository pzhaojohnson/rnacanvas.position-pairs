import type { PositionPair } from './PositionPair';

import { partnersNotation } from './PartnersNotation';

/**
 * Returns true if and only if the given pairs form any pseudoknots
 * (including if they only form one pseudoknot).
 */
export function formPseudoknots(pairs: PositionPair[]): boolean {
  let partners = partnersNotation(pairs);

  let upstreamPartnersStack: number[] = [];

  let pseudoknotsDetected = false;

  partners.forEach((q, i) => {
    let p = i + 1;

    if (q == undefined) {
      // nothing to do
    } else if (p < q) {
      upstreamPartnersStack.push(p);
    } else if (p == q) {
      // nothing to do
    } else {
      if (upstreamPartnersStack.pop() != q) {
        pseudoknotsDetected = true;
      }
    }
  });

  return pseudoknotsDetected;
}

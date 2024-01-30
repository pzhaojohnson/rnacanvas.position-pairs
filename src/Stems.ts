import type { Stem } from './Stem';

import type { Structure } from './Structure';

import { sorted } from './sorted';

import { areStacked } from './areStacked';

/**
 * Represents all stems in a target structure.
 *
 * The target structure is not supposed to contain invalid pairs,
 * such as contradictory pairs (i.e., multiple different pairs involving the same position),
 * repeat pairs (i.e., the same pair multiple times),
 * pairs that pair a single position with itself,
 * or pairs containing positions outside of the target structure's sequence.
 */
export class Stems<T> {
  private targetStructure: Structure<T>;

  constructor(...targetStructure: Structure<T>) {
    this.targetStructure = targetStructure;
  }

  get(): Stem[] {
    let pairs = this.targetStructure[1];

    if (pairs.length == 0) {
      return [];
    }

    let sortedPairs = sorted(pairs);

    let stems: Stem[] = [];

    let currentStem: Stem = [];

    sortedPairs.forEach(currentPair => {
      let previousPair = currentStem.length == 0 ? null : currentStem[currentStem.length - 1];

      if (!previousPair || areStacked(previousPair, currentPair)) {
        currentStem.push(currentPair);
      } else {
        stems.push(currentStem);
        currentStem = [currentPair];
      }
    });

    // don't forget to include the last stem
    // (also necessary if there is only one stem in the target structure)
    stems.push(currentStem);

    return stems;
  }
}

import type { Linker } from './Linker';

import type { Structure } from './Structure';

import { Stems } from './Stems';

import { min, max } from '@rnacanvas/math';

import { sortNumbers } from '@rnacanvas/math';

/**
 * Represents all linkers in a target structure.
 *
 * The target structure is not supposed to contain invalid pairs,
 * such as contradictory pairs (i.e., multiple different pairs containing the same position),
 * repeat pairs (i.e., duplications of the same pair),
 * pairs that pair the same position with itself,
 * or pairs containing positions outside of the target structure's sequence.
 */
export class Linkers<T> {
  private targetStructure: Structure<T>;

  constructor(...targetStructure: Structure<T>) {
    this.targetStructure = targetStructure;
  }

  get(): Linker[] {
    let stems = (new Stems(...this.targetStructure)).get();

    let stemSides = stems.flatMap(st => [
      st.map(min),
      st.map(max),
    ]);

    // technically not necessary if one makes use of the min and max functions below
    // (but makes things simpler to think about)
    stemSides.forEach(sortNumbers);

    // each stem side should have at least one position
    stemSides.sort((side1, side2) => min(side1) - min(side2));

    let linkers: Linker[] = [];

    let previousStemSide = stemSides.shift();
    let nextStemSide = stemSides.shift();

    while (previousStemSide && nextStemSide) {
      let currentLinker: Linker = [];

      // 5'- and 3'-most positions of the current linker
      let p5 = max(previousStemSide);
      let p3 = min(nextStemSide);

      for (let p = p5; p <= p3; p++) {
        currentLinker.push(p);
      }

      linkers.push(currentLinker);

      previousStemSide = nextStemSide;
      nextStemSide = stemSides.shift();
    }

    return linkers;
  }
}

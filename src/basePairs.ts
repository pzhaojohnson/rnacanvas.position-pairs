import type { PositionPair } from './PositionPair';

/**
 * Returns the base-pairs corresponding to the input sequence and position pairs.
 *
 * Throws if a position pair references a position outside of the range of the sequence.
 */
export function basePairs<Nucleobase>(seq: Nucleobase[], positionPairs: PositionPair[]): BasePair<Nucleobase>[] | never {
  positionPairs.forEach(pp => {
    pp.forEach(p => {
      if (p < 1) {
        throw new Error('Sequence positions must be positive.');
      } else if (p > seq.length) {
        throw new Error('Position out of sequence range.');
      }
    });
  });

  return positionPairs.map(pp => [seq[pp[0] - 1], seq[pp[1] - 1]]);
}

type BasePair<Nucleobase> = [Nucleobase, Nucleobase];

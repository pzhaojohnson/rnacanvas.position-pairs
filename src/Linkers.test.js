import { Linkers } from './Linkers';

describe('Linkers class', () => {
  describe('get method', () => {
    test('an empty structure', () => {
      let targetStructure = [
        [],
        [],
      ];

      let linkers = new Linkers(...targetStructure);

      expect(linkers.get()).toStrictEqual([]);
    });

    test('a structure with no pairs', () => {
      let targetStructure = [
        'AGCTUAGCUACTGAUCTAUTCG'.split(''),
        [],
      ];

      let linkers = new Linkers(...targetStructure);

      expect(linkers.get()).toStrictEqual([]);
    });

    test('a structure with just one stem', () => {
      let targetStructure = [
        'agcuatcgctgaccautacgcatuacg'.split(''),
        [[5, 18], [6, 17], [7, 16], [8, 15]],
      ];

      let linkers = new Linkers(...targetStructure);

      expect(linkers.get()).toStrictEqual([
        [8, 9, 10, 11, 12, 13, 14, 15],
      ]);
    });

    test('a structure with two sibling stems', () => {
      let targetStructure = [
        'AGCTCGACUTGCTCGACTUATCUAGCUATCUAGCAUCTUAGCAUTGC'.split(''),
        [
          [3, 22], [4, 21], [5, 20], [6, 19], [7, 18],
          [27, 41], [28, 40], [29, 39], [30, 38],
        ],
      ];

      let linkers = new Linkers(...targetStructure);

      expect(linkers.get()).toStrictEqual([
        [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
        [22, 23, 24, 25, 26, 27],
        [30, 31, 32, 33, 34, 35, 36, 37, 38],
      ]);
    });

    test('a structure with a stem enclosing another stem', () => {
      let targetStructure = [
        'agcutcagactgctgactugactactguacautcaugcatcugacutgac'.split(''),
        [[4, 42], [5, 41], [6, 40], [7, 39], [14, 32], [15, 31], [16, 30], [17, 29], [18, 28]],
      ];

      let linkers = new Linkers(...targetStructure);

      expect(linkers.get()).toStrictEqual([
        [7, 8, 9, 10, 11, 12, 13, 14],
        [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
        [32, 33, 34, 35, 36, 37, 38, 39],
      ]);
    });

    test('a structure with a multibranch loop', () => {
      let targetStructure = [
        'atgcautcagctacguatcagcutaucgautcagcgatcagcuatcuagcuatcugacutactagctacguacuatcgauctaugcuatcuagc'.split(''),
        [
          [4, 72], [5, 71], [6, 70],
          [9, 22], [10, 21], [11, 20],
          [23, 40], [24, 39], [25, 38], [26, 37],
          [50, 67], [51, 66], [52, 65], [53, 64], [54, 63],
        ],
      ];

      let linkers = new Linkers(...targetStructure);

      expect(linkers.get()).toStrictEqual([
        [6, 7, 8, 9],
        [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        [22, 23],
        [26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37],
        [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
        [54, 55, 56, 57, 58, 59, 60, 61, 62, 63],
        [67, 68, 69, 70],
      ]);
    });

    test('a structure with pseudoknots', () => {
      let targetStructure = [
        'ACGTCGAUCTGCAUTCGCGAUCTGCATGACTGAUCGACTGACUTACGTGCAAGCTCGAUCTAUGCATCAGC'.split(''),
        [
          [5, 30], [6, 29], [7, 28],
          [10, 36], [11, 35], [12, 34], [13, 33],
          [19, 48], [20, 47], [21, 46], [22, 45],
        ],
      ];

      let linkers = new Linkers(...targetStructure);

      expect(linkers.get()).toStrictEqual([
        [7, 8, 9, 10],
        [13, 14, 15, 16, 17, 18, 19],
        [22, 23, 24, 25, 26, 27, 28],
        [30, 31, 32, 33],
        [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
      ]);
    });

    test('a hairpin loop that has no unpaired positions', () => {
      let targetStructure = [
        'tcagcutacgtacugacuatccctaucgauctacugt'.split(''),
        [[8, 15], [9, 14], [10, 13], [11, 12]],
      ];

      let linkers = new Linkers(...targetStructure);

      expect(linkers.get()).toStrictEqual([
        [11, 12],
      ]);
    });

    test('a linker that has no unpaired positions and is not a hairpin loop', () => {
      let targetStructure = [
        'GAUCTAGCATCGCTGACUAUCTAUGCUACTGCAUTCUAGCUATCA'.split(''),
        [
          [5, 16], [6, 15], [7, 14], [17, 30], [18, 29], [19, 28],
        ],
      ];

      let linkers = new Linkers(...targetStructure);

      expect(linkers.get()).toStrictEqual([
        [7, 8, 9, 10, 11, 12, 13, 14],
        [16, 17],
        [19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
      ]);
    });

    test('two sibling stems that both just have one pair', () => {
      let targetStructure = [
        'gcutacgacutacgauctaucgauctcgctcaugc'.split(''),
        [[3, 9], [14, 26]],
      ];

      let linkers = new Linkers(...targetStructure);

      expect(linkers.get()).toStrictEqual([
        [3, 4, 5, 6, 7, 8, 9],
        [9, 10, 11, 12, 13, 14],
        [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26],
      ]);
    });

    test('when the pairs of the target structure are not sorted already', () => {
      // pairs are not sorted relative to each other
      // (nor are the two positions within individual pairs already sorted)
      let targetStructure = [
        'atgcautcagctacguatcagcutaucgautcagcgatcagcuatcuagcuatcugacutactagctacguacuatcgauctaugcuatcuagc'.split(''),
        [
          [23, 40], [71, 5], [6, 70], [63, 54],
          [72, 4], [10, 21], [50, 67],
          [24, 39], [38, 25], [20, 11], [26, 37],
          [22, 9], [65, 52], [53, 64], [51, 66],
        ],
      ];

      let linkers = new Linkers(...targetStructure);

      expect(linkers.get()).toStrictEqual([
        [6, 7, 8, 9],
        [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        [22, 23],
        [26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37],
        [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
        [54, 55, 56, 57, 58, 59, 60, 61, 62, 63],
        [67, 68, 69, 70],
      ]);
    });
  });
});

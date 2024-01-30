import { Stems } from './Stems';

describe('Stems class', () => {
  describe('get method', () => {
    test('an empty structure', () => {
      let targetStructure = [
        [],
        [],
      ];

      let stems = new Stems(...targetStructure);

      expect(stems.get()).toStrictEqual([]);
    });

    test('a structure with no pairs', () => {
      let targetStructure = [
        'ACGUACG'.split(''),
        [],
      ];

      let stems = new Stems(...targetStructure);

      expect(stems.get()).toStrictEqual([]);
    });

    test('a structure with one stem', () => {
      let targetStructure = [
        'AAACTGATCGTACGRRACURACGACTRAGCUCGAUCTCG'.split(''),
        [[5, 14], [6, 13], [7, 12], [8, 11]],
      ];

      let stems = new Stems(...targetStructure);

      expect(stems.get()).toStrictEqual([
        [[5, 14], [6, 13], [7, 12], [8, 11]],
      ]);
    });

    test('a one pair stem', () => {
      let targetStructure = [
        'acgtcgaucgtgcuagctg'.split(''),
        [[3, 7]],
      ];

      let stems = new Stems(...targetStructure);

      expect(stems.get()).toStrictEqual([
        [[3, 7]],
      ]);
    });

    test('a structure with two sibling stems', () => {
      let targetStructure = [
        'AGCGCAUGCUGCUGAUCAUGUGCUGAUCGUAC'.split(''),
        [[3, 12], [4, 11], [5, 10], [15, 29], [16, 28], [17, 27], [18, 26]],
      ];

      let stems = new Stems(...targetStructure);

      expect(stems.get()).toStrictEqual([
        [[3, 12], [4, 11], [5, 10]],
        [[15, 29], [16, 28], [17, 27], [18, 26]],
      ]);
    });

    test('a structure with a stem enclosing another stem', () => {
      let targetStructure = [
        'AGCTGCAGCTAUGACUTACGACUTUGACUTUACGAUCTAUCG'.split(''),
        [[6, 39], [7, 38], [8, 37], [9, 36], [10, 28], [11, 27], [12, 26], [13, 25]],
      ];

      let stems = new Stems(...targetStructure);

      expect(stems.get()).toStrictEqual([
        [[6, 39], [7, 38], [8, 37], [9, 36]],
        [[10, 28], [11, 27], [12, 26], [13, 25]],
      ]);
    });

    test('a structure with two pseudoknotted stems', () => {
      let targetStructure = [
        'acguctgcautcgctcuagcutugacug'.split(''),
        [[3, 16], [4, 15], [5, 14], [8, 22], [9, 21], [10, 20], [11, 19], [12, 18], [13, 17]],
      ];

      let stems = new Stems(...targetStructure);

      expect(stems.get()).toStrictEqual([
        [[3, 16], [4, 15], [5, 14]],
        [[8, 22], [9, 21], [10, 20], [11, 19], [12, 18], [13, 17]],
      ]);
    });

    test('a structure with five stems', () => {
      let targetStructure = [
        'agctgauctgcautcgacuctgacuacutacgautcagcuagcutgcgcttcgctcagcugactacgauctautcgagctguctcagcutgat'.split(''),
        [
          [2, 71], [3, 70], [4, 69], [5, 68], [6, 67],
          [9, 47], [10, 46], [11, 45], [12, 44],
          [20, 39], [21, 38], [22, 37], [23, 36], [24, 35],
          [48, 62], [49, 61], [50, 60], [51, 59],
          [74, 88], [75, 87], [76, 86],
        ],
      ];

      let stems = new Stems(...targetStructure);

      expect(stems.get()).toStrictEqual([
        [[2, 71], [3, 70], [4, 69], [5, 68], [6, 67]],
        [[9, 47], [10, 46], [11, 45], [12, 44]],
        [[20, 39], [21, 38], [22, 37], [23, 36], [24, 35]],
        [[48, 62], [49, 61], [50, 60], [51, 59]],
        [[74, 88], [75, 87], [76, 86]],
      ]);
    });

    test('a structure with pairs that need to be sorted first', () => {
      // pairs need to be sorted relative to each other
      // (and the two positions within individual pairs need to be sorted)
      let targetStructure = [
        'agctgauctgcautcgacuctgacuacutacgautcagcuagcutgcgcttcgctcagcugactacgauctautcgagctguctcagcutgat'.split(''),
        [
          [9, 47], [10, 46], [45, 11], [12, 44],
          [2, 71], [3, 70], [69, 4], [51, 59], [5, 68], [49, 61],
          [20, 39], [38, 21], [23, 36], [24, 35],
          [88, 74], [22, 37], [87, 75], [76, 86],
          [62, 48], [50, 60],  [6, 67],
        ],
      ];

      let stems = new Stems(...targetStructure);

      expect(stems.get()).toStrictEqual([
        [[2, 71], [3, 70], [4, 69], [5, 68], [6, 67]],
        [[9, 47], [10, 46], [11, 45], [12, 44]],
        [[20, 39], [21, 38], [22, 37], [23, 36], [24, 35]],
        [[48, 62], [49, 61], [50, 60], [51, 59]],
        [[74, 88], [75, 87], [76, 86]],
      ]);
    });
  });
});

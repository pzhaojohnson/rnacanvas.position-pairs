# Installation

With `npm`:

```
npm install @rnacanvas/position-pairs
```

# Usage

All exports of this package
can be accessed as named imports.

```typescript
// some example imports
import type { PositionPair } from '@rnacanvas/position-pairs';
import { parseDotBracket } from '@rnacanvas/position-pairs';
```

## `PositionPair`

The `PositionPair` type
represents a pairing
between two positions in a sequence.

Positions in a sequence
use one-based indexing
(as opposed to zero-based indexing).

Thus, the first item in a sequence
will have a position of `1`,
and so on.

```typescript
// the two numbers should be positive integers
type PositionPair = [number, number];
```

Code in this package
will also generally handle the case
of a position paired with itself
(i.e., a position pair
composed of the same position twice),
though such a pairing would not have any biological underpinning.

## `deepCopy()`

Creates and returns a deep copy
of an individual position pair
or an array of position pairs.

```javascript
deepCopy([82, 108]); // [82, 108]

deepCopy([[19, 2], [10, 30], [11, 29]]); // [[19, 2], [10, 30], [11, 29]]
```

## `areConflicting()`

Returns `true` if and only if
the two pairs conflict with one another
(i.e., they both share a position
but they pair it with two different positions).

```javascript
areConflicting([10, 20], [10, 21]); // true
areConflicting([10, 20], [9, 20]); // true

areConflicting([10, 20], [11, 21]); // false

// the two pairs are equal
areConflicting([10, 20], [10, 20]); // false
```

## `areKnotless()`

Returns `true` if and only if
the given pairs do not form any pseudoknots.

```javascript
// a simple stem
var pairs = [[3, 24], [4, 23], [5, 22], [6, 21]];

areKnotless(pairs); // true

// add an H-type pseudoknot
pairs.push([9, 40], [10, 39], [11, 38], [12, 37]);

areKnotless(pairs); // false
```

## `knotless()`

Creates and returns an entirely new array of pairs,
with pairs creating pseudoknots having been omitted.

Pairs are omitted/retained
according to the incremental range heuristic
reported by [Smit et al., 2008](https://www.ibi.vu.nl/programs/k2nwww/static/method.html).

```javascript
// form an H-type pseudoknot
var pairs = [
  [7, 18], [8, 17], [9, 16],
  [11, 25], [12, 24], [13, 23],
];

knotless(pairs); // [[7, 18], [8, 17], [9, 16]]
```

## `Structure`

The `Structure` type
is a way to express a nucleic acid structure
using position pairs.

```typescript
// a sequence of nucleobases, for instance
type Sequence<T> = T[];

// a sequence and pairs among the items in the sequence
type Structure<T> = [Sequence<T>, PositionPair[]];
```

## `mountainPlotTraversal()`

The `mountainPlotTraversal()` function
returns an array of numbers
that is the mountain plot traversal of a given structure
(i.e., each value in the returned array
indicates the height of the mountain plot
at that position in the structure).

Mountain plot heights are calculated
using the [ViennaRNA definition](https://www.tbi.univie.ac.at/~ronny/Leere/270038/tutorial/node23.html).

This function will throw
if the passed in structure contains pseudoknots.

```javascript
var seq = [...'1234567890ab'];
var pairs = [[2, 11], [3, 10], [4, 9]];

var mpt = mountainPlotTraversal(seq, pairs);

mpt; // [0, 0, 1, 2, 3, 3, 3, 3, 2, 1, 0, 0]
```

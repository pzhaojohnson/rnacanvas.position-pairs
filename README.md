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

import type { PositionPair } from './PositionPair';

/**
 * An array of position pairs that stack perfectly
 * (i.e., the position pairs can all be stacked with no unpaired positions
 * within the sides of the stem).
 */
export type Stem = PositionPair[];

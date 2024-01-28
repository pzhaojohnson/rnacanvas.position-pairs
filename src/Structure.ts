import type { PositionPair } from './PositionPair';

export type Sequence<T> = T[];

/**
 * A structure defined by a sequence of items (e.g., nucleobases)
 * and pairs among the items in the sequence (specified using position pairs).
 */
export type Structure<T> = [Sequence<T>, PositionPair[]];

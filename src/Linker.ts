/**
 * An array of consecutive positions connecting two consecutive stem sides
 * (i.e., there are no other paired positions between the two stem sides).
 *
 * The two stem sides could be part of different stems
 * or the same stem (in the case of a hairpin loop).
 *
 * All linkers will contain at least two positions by this definition,
 * those being the two closest positions within the two stem sides being linked.
 *
 * Leading and trailing unpaired positions in a structure are not considered to be part of any linkers
 * according to this definition.
 */
export type Linker = number[];

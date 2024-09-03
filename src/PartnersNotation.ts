/**
 * A notation for indicating pairs in a nucleic acid structure
 * where the value at each position in the array
 * indicates the partner position for that position
 * (and a value of undefined means the position is unpaired).
 *
 * This type definition also supports sparse arrays,
 * though sparse arrays can often be tricky to work with
 * (e.g., when trying to iterate through them).
 *
 * It is always necessary that the values for two paired positions
 * agree with each (i.e., that both indicate the same pairing),
 * otherwise the partners notation would be invalid.
 */
export type PartnersNotation = (number | undefined)[];

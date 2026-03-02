/**
 * GraphemerIterator
 *
 * Takes a string and a "BreakHandler" method during initialisation
 * and creates an iterable object that returns individual graphemes.
 *
 * @param str {string}
 * @return GraphemerIterator
 */
declare class GraphemerIterator implements Iterator<string> {
    private _index;
    private _str;
    constructor(str: string);
    [Symbol.iterator](): this;
    next(): {
        value: string;
        done: boolean;
    } | {
        value: undefined;
        done: boolean;
    };
}
declare const CLUSTER_BREAK: {
    CR: number;
    LF: number;
    CONTROL: number;
    EXTEND: number;
    REGIONAL_INDICATOR: number;
    SPACINGMARK: number;
    L: number;
    V: number;
    T: number;
    LV: number;
    LVT: number;
    OTHER: number;
    PREPEND: number;
    E_BASE: number;
    E_MODIFIER: number;
    ZWJ: number;
    GLUE_AFTER_ZWJ: number;
    E_BASE_GAZ: number;
};
declare const EXTENDED_PICTOGRAPHIC = 101;
declare function isSurrogate(str: any, pos: any): boolean;
/**
 * The String.prototype.codePointAt polyfill
 * Private function, gets a Unicode code point from a JavaScript UTF-16 string
 * handling surrogate pairs appropriately
 * @param str {string}
 * @param idx {number}
 * @returns {number}
 */
declare function getCodePointAt(str: any, idx: any): any;
/**
 * Private function, returns whether a break is allowed between the two given grapheme breaking classes
 * Implemented the UAX #29 3.1.1 Grapheme Cluster Boundary Rules on extended grapheme clusters
 * @param start {number}
 * @param mid {Array<number>}
 * @param end {number}
 * @param startEmoji {number}
 * @param midEmoji {Array<number>}
 * @param endEmoji {number}
 * @returns {number}
 */
declare function shouldBreak(start: any, mid: any, end: any, startEmoji: any, midEmoji: any, endEmoji: any): any;
declare function getNextBreak(string: any, index: any): any;
/**
 * Breaks the given string into an array of grapheme clusters
 * @param str {string}
 * @returns {string[]}
 */
declare function splitGraphemes(str: any): any[];
/**
 * Returns an iterator of grapheme clusters in the given string
 * @param str {string}
 * @returns {GraphemerIterator}
 */
declare function iterateGraphemes(str: any): GraphemerIterator;
/**
 * Returns the number of grapheme clusters in the given string
 * @param str {string}
 * @returns {number}
 */
declare function countGraphemes(str: any): number;

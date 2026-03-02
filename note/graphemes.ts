
/**
 * GraphemerIterator
 *
 * Takes a string and a "BreakHandler" method during initialisation
 * and creates an iterable object that returns individual graphemes.
 *
 * @param str {string}
 * @return GraphemerIterator
 */
class GraphemerIterator implements Iterator<string> {
  private _index: number = 0;
  private _str: string;

  constructor(str: string) {
    this._str = str;
  }

  [Symbol.iterator]() {
    return this;
  }

  next() {
    let brk;
    if (
      (brk = Graphemer.nextBreak(this._str, this._index)) < this._str.length
    ) {
      const value = this._str.slice(this._index, brk);
      this._index = brk;
      return { value: value, done: false };
    }
    if (this._index < this._str.length) {
      const value = this._str.slice(this._index);
      this._index = this._str.length;
      return { value: value, done: false };
    }
    return { value: undefined, done: true };
  }
}

const CLUSTER_BREAK = {
  CR: 0,
  LF: 1,
  CONTROL: 2,
  EXTEND: 3,
  REGIONAL_INDICATOR: 4,
  SPACINGMARK: 5,
  L: 6,
  V: 7,
  T: 8,
  LV: 9,
  LVT: 10,
  OTHER: 11,
  PREPEND: 12,
  E_BASE: 13,
  E_MODIFIER: 14,
  ZWJ: 15,
  GLUE_AFTER_ZWJ: 16,
  E_BASE_GAZ: 17,
}

const EXTENDED_PICTOGRAPHIC = 101;

function isSurrogate(str, pos) {
  return (
    0xd800 <= str.charCodeAt(pos) &&
    str.charCodeAt(pos) <= 0xdbff &&
    0xdc00 <= str.charCodeAt(pos + 1) &&
    str.charCodeAt(pos + 1) <= 0xdfff
  );
}

/**
 * The String.prototype.codePointAt polyfill
 * Private function, gets a Unicode code point from a JavaScript UTF-16 string
 * handling surrogate pairs appropriately
 * @param str {string}
 * @param idx {number}
 * @returns {number}
 */
function getCodePointAt(str, idx) {
  const code = str.charCodeAt(idx);

  // if a high surrogate
  if (0xd800 <= code && code <= 0xdbff && idx < str.length - 1) {
    const hi = code;
    const low = str.charCodeAt(idx + 1);
    if (0xdc00 <= low && low <= 0xdfff) {
      return (hi - 0xd800) * 0x400 + (low - 0xdc00) + 0x10000;
    }
    return hi;
  }

  // if a low surrogate
  if (0xdc00 <= code && code <= 0xdfff && idx >= 1) {
    const hi = str.charCodeAt(idx - 1);
    const low = code;
    if (0xd800 <= hi && hi <= 0xdbff) {
      return (hi - 0xd800) * 0x400 + (low - 0xdc00) + 0x10000;
    }
    return low;
  }

  // just return the char if an unmatched surrogate half or a
  // single-char codepoint
  return code;
}

//
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
function shouldBreak(
  start,
  mid,
  end,
  startEmoji,
  midEmoji,
  endEmoji,
) {
  const all = [start].concat(mid).concat([end]);
  const allEmoji = [startEmoji].concat(midEmoji).concat([endEmoji]);
  const previous = all[all.length - 2];
  const next = end;
  const nextEmoji = endEmoji;

  // Lookahead terminator for:
  // GB12. ^ (RI RI)* RI ? RI
  // GB13. [^RI] (RI RI)* RI ? RI
  const rIIndex = all.lastIndexOf(CLUSTER_BREAK.REGIONAL_INDICATOR);
  if (
    rIIndex > 0 &&
    all.slice(1, rIIndex).every(function (c) {
      return c === CLUSTER_BREAK.REGIONAL_INDICATOR;
    }) &&
    [CLUSTER_BREAK.PREPEND, CLUSTER_BREAK.REGIONAL_INDICATOR].indexOf(
      previous,
    ) === -1
  ) {
    if (
      all.filter(function (c) {
        return c === CLUSTER_BREAK.REGIONAL_INDICATOR;
      }).length %
        2 ===
      1
    ) {
      return BreakLastRegional;
    } else {
      return BreakPenultimateRegional;
    }
  }

  // GB3. CR × LF
  if (previous === CLUSTER_BREAK.CR && next === CLUSTER_BREAK.LF) {
    return NotBreak;
  }
  // GB4. (Control|CR|LF) ÷
  else if (
    previous === CLUSTER_BREAK.CONTROL ||
    previous === CLUSTER_BREAK.CR ||
    previous === CLUSTER_BREAK.LF
  ) {
    return BreakStart;
  }
  // GB5. ÷ (Control|CR|LF)
  else if (
    next === CLUSTER_BREAK.CONTROL ||
    next === CLUSTER_BREAK.CR ||
    next === CLUSTER_BREAK.LF
  ) {
    return BreakStart;
  }
  // GB6. L × (L|V|LV|LVT)
  else if (
    previous === CLUSTER_BREAK.L &&
    (next === CLUSTER_BREAK.L ||
      next === CLUSTER_BREAK.V ||
      next === CLUSTER_BREAK.LV ||
      next === CLUSTER_BREAK.LVT)
  ) {
    return NotBreak;
  }
  // GB7. (LV|V) × (V|T)
  else if (
    (previous === CLUSTER_BREAK.LV || previous === CLUSTER_BREAK.V) &&
    (next === CLUSTER_BREAK.V || next === CLUSTER_BREAK.T)
  ) {
    return NotBreak;
  }
  // GB8. (LVT|T) × (T)
  else if (
    (previous === CLUSTER_BREAK.LVT || previous === CLUSTER_BREAK.T) &&
    next === CLUSTER_BREAK.T
  ) {
    return NotBreak;
  }
  // GB9. × (Extend|ZWJ)
  else if (next === CLUSTER_BREAK.EXTEND || next === CLUSTER_BREAK.ZWJ) {
    return NotBreak;
  }
  // GB9a. × SpacingMark
  else if (next === CLUSTER_BREAK.SPACINGMARK) {
    return NotBreak;
  }
  // GB9b. Prepend ×
  else if (previous === CLUSTER_BREAK.PREPEND) {
    return NotBreak;
  }

  // GB11. \p{Extended_Pictographic} Extend* ZWJ × \p{Extended_Pictographic}
  const previousNonExtendIndex = allEmoji
    .slice(0, -1)
    .lastIndexOf(EXTENDED_PICTOGRAPHIC);
  if (
    previousNonExtendIndex !== -1 &&
    allEmoji[previousNonExtendIndex] === EXTENDED_PICTOGRAPHIC &&
    all.slice(previousNonExtendIndex + 1, -2).every(function (c) {
      return c === CLUSTER_BREAK.EXTEND;
    }) &&
    previous === CLUSTER_BREAK.ZWJ &&
    nextEmoji === EXTENDED_PICTOGRAPHIC
  ) {
    return NotBreak;
  }

  // GB12. ^ (RI RI)* RI × RI
  // GB13. [^RI] (RI RI)* RI × RI
  if (mid.indexOf(CLUSTER_BREAK.REGIONAL_INDICATOR) !== -1) {
    return Break;
  }
  if (
    previous === CLUSTER_BREAK.REGIONAL_INDICATOR &&
    next === CLUSTER_BREAK.REGIONAL_INDICATOR
  ) {
    return NotBreak;
  }

  // GB999. Any ? Any
  return BreakStart;
}

function getNextBreak(string, index) {
  if (index >= string.length - 1) {
    return string.length;
  }
  const prevCP = GraphemerHelper.codePointAt(string, index);
  const prev = Graphemer.getGraphemeBreakProperty(prevCP);
  const prevEmoji = Graphemer.getEmojiProperty(prevCP);
  const mid = [];
  const midEmoji = [];
  for (let i = index + 1; i < string.length; i++) {
    // check for already processed low surrogates
    if (GraphemerHelper.isSurrogate(string, i - 1)) {
      continue;
    }

    const nextCP = GraphemerHelper.codePointAt(string, i);
    const next = Graphemer.getGraphemeBreakProperty(nextCP);
    const nextEmoji = Graphemer.getEmojiProperty(nextCP);
    if (
      GraphemerHelper.shouldBreak(
        prev,
        mid,
        next,
        prevEmoji,
        midEmoji,
        nextEmoji,
      )
    ) {
      return i;
    }

    mid.push(next);
    midEmoji.push(nextEmoji);
  }
  return string.length;
}

/**
 * Breaks the given string into an array of grapheme clusters
 * @param str {string}
 * @returns {string[]}
 */
function splitGraphemes(str) {
  const res = [];
  let index = 0;
  let brk;
  while ((brk = getNextBreak(str, index)) < str.length) {
    res.push(str.slice(index, brk));
    index = brk;
  }
  if (index < str.length) {
    res.push(str.slice(index));
  }
  return res;
}

/**
 * Returns an iterator of grapheme clusters in the given string
 * @param str {string}
 * @returns {GraphemerIterator}
 */
function iterateGraphemes(str) {
  return new GraphemerIterator(str)
}

/**
 * Returns the number of grapheme clusters in the given string
 * @param str {string}
 * @returns {number}
 */
function countGraphemes(str) {
  let count = 0;
  let index = 0;
  let brk;
  while ((brk = getNextBreak(str, index)) < str.length) {
    index = brk;
    count++;
  }
  if (index < str.length) {
    count++;
  }
  return count;
}

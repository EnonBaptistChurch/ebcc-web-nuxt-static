/** A contiguous run of scripture, e.g. "3:16-18", "45-46" or "3:16-4:5". */
export interface ScriptureRange {
  startChapter: number;
  startVerse?: number;
  /** Same as startChapter unless the run crosses a chapter boundary. */
  endChapter: number;
  /** Only set for a verse range ("3:16-18" -> 18, "3:16-4:5" -> 5). */
  endVerse?: number;
}

export interface ScripturePassage {
  /** Normalised reference, e.g. "2 Chronicles 7:1-22", "Genesis 45-46", "John 3:16, 18; 4:1" */
  reference: string;
  /** Canonical book name, e.g. "Romans", "1 John" */
  book: string;
  /** First chapter cited. */
  chapter: number;
  /** Last chapter of the first range, when it spans several chapters. */
  chapterEnd?: number;
  verseStart?: number;
  verseEnd?: number;
  /** Every range in the citation, in order ("John 3:16, 18; 4:1" has three). */
  ranges: ScriptureRange[];
  /** The text exactly as it appeared in the source */
  raw: string;
  /** Position of the match in the source text */
  index: number;
}

// Canonical book name and its number of chapters, used to reject impossible
// references like "Mark 17".
const BOOKS: Array<[string, number]> = [
  ['Genesis', 50], ['Exodus', 40], ['Leviticus', 27], ['Numbers', 36], ['Deuteronomy', 34],
  ['Joshua', 24], ['Judges', 21], ['Ruth', 4], ['1 Samuel', 31], ['2 Samuel', 24],
  ['1 Kings', 22], ['2 Kings', 25], ['1 Chronicles', 29], ['2 Chronicles', 36], ['Ezra', 10],
  ['Nehemiah', 13], ['Esther', 10], ['Job', 42], ['Psalms', 150], ['Proverbs', 31],
  ['Ecclesiastes', 12], ['Song of Solomon', 8], ['Isaiah', 66], ['Jeremiah', 52],
  ['Lamentations', 5], ['Ezekiel', 48], ['Daniel', 12], ['Hosea', 14], ['Joel', 3],
  ['Amos', 9], ['Obadiah', 1], ['Jonah', 4], ['Micah', 7], ['Nahum', 3], ['Habakkuk', 3],
  ['Zephaniah', 3], ['Haggai', 2], ['Zechariah', 14], ['Malachi', 4], ['Matthew', 28],
  ['Mark', 16], ['Luke', 24], ['John', 21], ['Acts', 28], ['Romans', 16],
  ['1 Corinthians', 16], ['2 Corinthians', 13], ['Galatians', 6], ['Ephesians', 6],
  ['Philippians', 4], ['Colossians', 4], ['1 Thessalonians', 5], ['2 Thessalonians', 3],
  ['1 Timothy', 6], ['2 Timothy', 4], ['Titus', 3], ['Philemon', 1], ['Hebrews', 13],
  ['James', 5], ['1 Peter', 5], ['2 Peter', 3], ['1 John', 5], ['2 John', 1],
  ['3 John', 1], ['Jude', 1], ['Revelation', 22],
];

// Extra full-name spellings that are safe to accept.
const VARIANTS: Record<string, string> = {
  Psalm: 'Psalms',
  'Song of Songs': 'Song of Solomon',
};

const CHAPTERS = new Map(BOOKS);
const SINGLE_CHAPTER = new Set(['Obadiah', 'Philemon', '2 John', '3 John', 'Jude']);

// Full names only, and case-sensitive: "Mark 3" matches, "mark 3" does not.
const NAME_TO_BOOK = new Map<string, string>();
for (const [name] of BOOKS) NAME_TO_BOOK.set(name, name);
for (const [alt, canon] of Object.entries(VARIANTS)) NAME_TO_BOOK.set(alt, canon);

const NUM_PREFIX: Record<string, string> = {
  '1': '(?:1|I|1st|First)',
  '2': '(?:2|II|2nd|Second)',
  '3': '(?:3|III|3rd|Third)',
};

const BOOK_PATTERN = [...NAME_TO_BOOK.keys()]
  .sort((a, b) => b.length - a.length)
  .map((name) => {
    const body = name.replace(/\s+/g, '\\s+');
    // Numbered books REQUIRE their number; other books never take one.
    return /^\d/.test(name) ? body.replace(/^\d/, (d) => NUM_PREFIX[d] ?? d) : body;
  })
  .join('|');

// Finds "<Book> " when a number follows. Everything after that (chapters,
// verses, lists, ranges) is read by scanLocator() below.
const BOOK_RE = new RegExp(`(?<![\\p{L}\\p{N}])(${BOOK_PATTERN})\\s+(?=\\d)`, 'gu');

// "Samuel|Kings|...|John": the part of a numbered book's name after its number.
// Used to tell "Romans 8, 2 Timothy 3" (a new book) from "Romans 8, 2" (a list).
const NUMBERED_REST = [
  ...new Set(
    BOOKS.map(([n]) => n)
      .filter((n) => /^\d /.test(n))
      .map((n) => n.slice(2)),
  ),
].join('|');
const BOOK_FOLLOWS_RE = new RegExp(`^\\s+(?:${NUMBERED_REST})(?![\\p{L}])`, 'u');
const startsNumberedBook = (text: string, idx: number, n: number) =>
  n <= 3 && BOOK_FOLLOWS_RE.test(text.slice(idx));

// A number of up to 3 digits, not glued to other digits or letters ("2024", "3rd" fail).
const NUM = '(\\d{1,3})(?![\\p{L}\\p{N}])';
const VERSE_PART = `(?:\\s*:\\s*${NUM})?`;
const FIRST_RE = new RegExp(`${NUM}${VERSE_PART}`, 'uy'); //             45   45:3
const RANGE_RE = new RegExp(`\\s*[-–—]\\s*${NUM}${VERSE_PART}`, 'uy'); // -46  -18  -4:5
const LIST_RE = new RegExp(`\\s*(?:[,;&]|\\band\\b)\\s*${NUM}${VERSE_PART}`, 'uy'); // ,46  & 18  ; 4:1

// "Matthew 12-03-2024" is a date, not a passage.
const DATE_RE = /^\d{1,2}[-/.]\d{1,2}[-/.]\d{2,4}/;

const NAMED_ENTITIES: Record<string, string> = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ',
  ndash: '–', mdash: '—', lsquo: '‘', rsquo: '’', ldquo: '“', rdquo: '”', hellip: '…',
};

// Decodes &#39; / &#x27; / &amp; etc. Loops so double-encoded text
// ("&amp;#39;") also resolves; no DOM needed, so it works in Astro/Node.
function decodeEntities(s: string): string {
  let out = s;
  for (let i = 0, prev = ''; i < 3 && out !== prev; i++) {
    prev = out;
    out = out.replace(/&(?:#(\d+)|#x([\da-f]+)|([a-z]+));/gi, (m, dec, hex, name) => {
      const cp = dec ? Number(dec) : hex ? parseInt(hex, 16) : undefined;
      if (cp !== undefined) return cp <= 0x10ffff ? String.fromCodePoint(cp) : m;
      return NAMED_ENTITIES[name.toLowerCase()] ?? m;
    });
  }
  return out;
}

// "I John" / "First John" / "1st John" -> "1 John"
function toCanonical(token: string): string | undefined {
  const t = token
    .replace(/\s+/g, ' ')
    .replace(/^(III|3rd|Third) /, '3 ')
    .replace(/^(II|2nd|Second) /, '2 ')
    .replace(/^(I|1st|First) /, '1 ');
  return NAME_TO_BOOK.get(t);
}

/**
 * Reads everything after the book name:
 *
 *   45            45,46         45-46         45 & 46 & 48
 *   3:16          3:16-18       3:16,18       3:16-18, 20
 *   3:16-4:5      3:16; 4:1-5   45-46:3       Jude 3-5
 *   13: 42 - 14: 1-7   (spaces and the odd double range are fine: 13:42 to 14:7)
 *
 * Reading stops quietly at the first piece that doesn't fit (a chapter that
 * doesn't exist, a backwards range, the "2" of a following "2 Timothy"), so
 * "Mark 3, 17" still gives "Mark 3".
 */
function scanLocator(
  book: string,
  text: string,
  from: number,
): { ranges: ScriptureRange[]; end: number } | null {
  const single = SINGLE_CHAPTER.has(book);
  const chapterOk = (c: number) => c >= 1 && c <= CHAPTERS.get(book)!;
  const isRange = (r: ScriptureRange) => r.endChapter !== r.startChapter || r.endVerse !== undefined;

  FIRST_RE.lastIndex = from;
  const m = FIRST_RE.exec(text);
  if (!m) return null;

  const n = Number(m[1]);
  const v = m[2] ? Number(m[2]) : undefined;
  let first: ScriptureRange;
  if (v !== undefined) first = { startChapter: n, startVerse: v, endChapter: n };
  // "Jude 3" means verse 3 of the only chapter.
  else if (single) first = { startChapter: 1, startVerse: n, endChapter: 1 };
  else first = { startChapter: n, endChapter: n };
  if (!chapterOk(first.startChapter) || (first.startVerse !== undefined && first.startVerse < 1)) {
    return null;
  }

  const ranges: ScriptureRange[] = [first];
  let pos = FIRST_RE.lastIndex;
  // Once a verse has been seen, a bare number in a list is a verse ("3:16, 18").
  let verseMode = first.startVerse !== undefined;

  for (;;) {
    const last = ranges[ranges.length - 1]!;

    // A range: "-46", "-18", "-4:5"
    if (!isRange(last)) {
      RANGE_RE.lastIndex = pos;
      const r = RANGE_RE.exec(text);
      if (r) {
        const a = Number(r[1]);
        const b = r[2] ? Number(r[2]) : undefined;
        if (b === undefined && startsNumberedBook(text, RANGE_RE.lastIndex, a)) break;

        if (last.startVerse !== undefined) {
          if (b !== undefined) {
            // "3:16-4:5"
            if (!chapterOk(a) || a <= last.startChapter || b < 1) break;
            last.endChapter = a;
            last.endVerse = b;
          } else {
            // "3:16-18"
            if (a <= last.startVerse) break;
            last.endVerse = a;
          }
        } else {
          // "45-46" or "45-46:3"
          if (!chapterOk(a) || a <= last.startChapter) break;
          last.endChapter = a;
          if (b !== undefined) {
            if (b < 1) break;
            last.endVerse = b;
          }
        }
        pos = RANGE_RE.lastIndex;

        // "13:42 - 14:1-7" really means 13:42 to 14:7: a second dash after a
        // cross-chapter range extends the closing verse.
        if (last.startVerse !== undefined && last.endChapter !== last.startChapter && last.endVerse !== undefined) {
          RANGE_RE.lastIndex = pos;
          const x = RANGE_RE.exec(text);
          if (x && !x[2]) {
            const extra = Number(x[1]);
            const after = text.slice(RANGE_RE.lastIndex);
            if (extra > last.endVerse && !startsNumberedBook(text, RANGE_RE.lastIndex, extra) && !/^\s+\p{Ll}/u.test(after)) {
              last.endVerse = extra;
              pos = RANGE_RE.lastIndex;
            }
          }
        }
        continue;
      }
    }

    // A list: ",46"  "& 18"  "; 4:1"  "and 47"
    LIST_RE.lastIndex = pos;
    const l = LIST_RE.exec(text);
    if (!l) break;
    const a = Number(l[1]);
    const b = l[2] ? Number(l[2]) : undefined;
    if (b === undefined && startsNumberedBook(text, LIST_RE.lastIndex, a)) break;

    let next: ScriptureRange;
    if (b !== undefined) next = { startChapter: a, startVerse: b, endChapter: a };
    else if (verseMode) next = { startChapter: last.endChapter, startVerse: a, endChapter: last.endChapter };
    else next = { startChapter: a, endChapter: a };

    if (!chapterOk(next.startChapter) || (next.startVerse !== undefined && next.startVerse < 1)) break;
    ranges.push(next);
    if (next.startVerse !== undefined) verseMode = true;
    pos = LIST_RE.lastIndex;
  }

  return { ranges, end: pos };
}

const isWholeChapters = (r: ScriptureRange) => r.startVerse === undefined && r.endVerse === undefined;

// "Genesis 45,46" -> one run, chapters 45-46. "Genesis 45,47" stays as two.
function mergeChapters(ranges: ScriptureRange[]): ScriptureRange[] {
  const out: ScriptureRange[] = [];
  for (const r of ranges) {
    const last = out[out.length - 1];
    if (last && isWholeChapters(last) && isWholeChapters(r) && r.startChapter === last.endChapter + 1) {
      last.endChapter = r.endChapter;
    } else {
      out.push({ ...r });
    }
  }
  return out;
}

function format(book: string, ranges: ScriptureRange[]): string {
  const single = SINGLE_CHAPTER.has(book);
  let out = book;

  ranges.forEach((r, i) => {
    const prev = ranges[i - 1];
    const hasVerse = r.startVerse !== undefined;
    // "3:16, 18": the 18 stays in the same chapter, so no "3:" is repeated.
    const sameChapter = !!prev && prev.startVerse !== undefined && hasVerse && r.startChapter === prev.endChapter;

    let text: string;
    if (!hasVerse) {
      text = r.endChapter === r.startChapter ? `${r.startChapter}` : `${r.startChapter}-${r.endChapter}`;
      if (r.endVerse !== undefined) text = `${r.startChapter}-${r.endChapter}:${r.endVerse}`;
    } else {
      // "Jude 3", not "Jude 1:3"
      const lead = single || sameChapter ? '' : `${r.startChapter}:`;
      text = `${lead}${r.startVerse}`;
      if (r.endVerse !== undefined) {
        text += r.endChapter === r.startChapter ? `-${r.endVerse}` : `-${r.endChapter}:${r.endVerse}`;
      }
    }

    const sep = i === 0 ? ' ' : sameChapter ? ', ' : prev!.startVerse !== undefined ? '; ' : ', ';
    out += sep + text;
  });

  return out;
}

// How much detail a citation carries: verse range > single verse > bare chapter(s).
const detail = (p: ScripturePassage) =>
  Math.max(...p.ranges.map((r) => (r.endVerse !== undefined ? 3 : r.startVerse !== undefined ? 2 : 1)));

/**
 * Finds EVERY scripture passage cited in a piece of text, in the order they
 * appear. Duplicates (the same reference cited twice) are dropped.
 *
 * Understands single chapters ("Genesis 47"), chapter lists and ranges
 * ("Genesis 45,46", "Genesis 45-46", "Genesis 45 & 46"), verses and verse
 * ranges ("John 3:16", "2 Chronicles 7: 1-22"), verse lists ("John 3:16, 18"),
 * ranges across chapters ("John 3:16-4:5", "Acts 13: 42 - 14: 1-7") and several
 * runs in one citation ("John 3:16-18; 4:1-5"). Different books give separate
 * passages ("1 Peter 1, Luke 11" -> 1 Peter 1 and Luke 11).
 */
export function findScripturePassages(text: string | null | undefined): ScripturePassage[] {
  if (!text) return [];
  text = tidy(decodeEntities(text));

  const re = new RegExp(BOOK_RE.source, BOOK_RE.flags); // own lastIndex per call
  const found: ScripturePassage[] = [];

  for (let m = re.exec(text); m !== null; m = re.exec(text)) {
    const book = toCanonical(m[1] ?? '');
    if (!book) continue;

    const locatorStart = m.index + m[0].length;
    if (DATE_RE.test(text.slice(locatorStart))) continue;

    const scan = scanLocator(book, text, locatorStart);
    if (!scan) continue;
    const ranges = mergeChapters(scan.ranges);
    const first = ranges[0]!;

    // A lone bare chapter followed by a lowercase word is almost always prose
    // ("Mark 3 times", "Job 5 things"), not a citation. A list or range is
    // strong enough evidence to skip this check.
    if (
      ranges.length === 1 &&
      isWholeChapters(first) &&
      first.endChapter === first.startChapter &&
      !SINGLE_CHAPTER.has(book) &&
      /^\s+(?!and\b)\p{Ll}/u.test(text.slice(scan.end)) // "Romans 8 and John 3" is still a citation
    ) {
      continue;
    }

    const candidate: ScripturePassage = {
      book,
      chapter: first.startChapter,
      chapterEnd: first.endChapter !== first.startChapter ? first.endChapter : undefined,
      verseStart: first.startVerse,
      verseEnd: first.endVerse,
      ranges,
      reference: format(book, ranges),
      raw: text.slice(m.index, scan.end),
      index: m.index,
    };

    if (!found.some((p) => p.reference === candidate.reference)) found.push(candidate);
    re.lastIndex = scan.end; // carry on after this citation
  }

  return found;
}

/**
 * The single most detailed passage in the text (a verse range beats a single
 * verse, which beats a bare chapter; ties go to whichever appears first).
 * Use findScripturePassages() if you want all of them.
 */
export function findScripturePassage(text: string | null | undefined): ScripturePassage | null {
  let best: ScripturePassage | null = null;
  for (const p of findScripturePassages(text)) {
    if (!best || detail(p) > detail(best)) best = p;
  }
  return best;
}

/** "Genesis 45-46; Luke 11:1-13": all passages as one display string. */
export function formatPassages(passages: ScripturePassage[], separator = '; '): string {
  return passages.map((p) => p.reference).join(separator);
}

/** Canonical book names in Bible order: handy for sorting or building a filter list. */
export const BIBLE_BOOKS: readonly string[] = BOOKS.map(([name]) => name);

/**
 * The books cited, once each, in the order they appear:
 * booksOf(findScripturePassages('1 Peter 1, Luke 11, Luke 12')) -> ['1 Peter', 'Luke']
 * Names are canonical ("Psalm 23" gives "Psalms", "First John 2" gives "1 John").
 */
export function booksOf(passages: ScripturePassage[]): string[] {
  return [...new Set(passages.map((p) => p.book))];
}

export interface ParsedSermonTitle {
  /** The message title with any leading/trailing scripture references removed. */
  title: string;
  /** The most detailed passage found, or null if there isn't one (kept for convenience). */
  passage: ScripturePassage | null;
  /** Every passage found in the text, in order. */
  passages: ScripturePassage[];
}

const tidy = (s: string) => s.replace(/\s+/g, ' ').trim();
const trimSeparators = (s: string) => s.replace(/^[\s\-–—:|·•,;]+|[\s\-–—:|·•,;]+$/g, '');

// What may sit between two passages for them to count as one group:
// ", " "; " " & " " and " " , and ".
const PASSAGE_GAP = /^[\s,;&]*(?:and[\s,;&]*)?$/;

/**
 * Splits a sermon heading into its message title and its scripture passages.
 *
 *   "2 Chronicles 7: 1-22 - Key Actions required for a God centered revival"
 *     -> title "Key Actions required for a God centered revival"
 *   "1 Peter 1, Luke 11 - Keep on Praying"
 *     -> title "Keep on Praying", passages [1 Peter 1, Luke 11]
 *
 * Works with the passages at the start ("John 3:16 - Title"), at the end
 * ("Title - John 3:16" or "Title (John 3:16)"), or not at all (the whole
 * text is the title). A group of passages at the start or end is removed
 * together. A passage in the middle of a title ("Why John 3:16 matters") is
 * treated as part of the title and left in place. If removing the passages
 * would leave nothing, the title falls back to the full text.
 */
export function parseSermonTitle(text: string | null | undefined): ParsedSermonTitle {
  const full = tidy(decodeEntities(text ?? ''));
  const passages = findScripturePassages(full);
  if (!passages.length) return { title: full, passage: null, passages: [] };

  let best: ScripturePassage = passages[0]!;
  for (const p of passages) if (detail(p) > detail(best)) best = p;

  const endOf = (p: ScripturePassage) => p.index + p.raw.length;
  const gap = (a: ScripturePassage, b: ScripturePassage) => PASSAGE_GAP.test(full.slice(endOf(a), b.index));

  let before: string | null = null;
  let after = '';

  // A group of passages at the start...
  if (/^[\s(\[]*$/.test(full.slice(0, passages[0]!.index))) {
    let last = 0;
    while (last + 1 < passages.length && gap(passages[last]!, passages[last + 1]!)) last++;
    before = full.slice(0, passages[0]!.index);
    after = full.slice(endOf(passages[last]!));
  } else {
    // ...or at the end.
    const lastP = passages[passages.length - 1]!;
    if (/^[\s)\].,;]*$/.test(full.slice(endOf(lastP)))) {
      let first = passages.length - 1;
      while (first > 0 && gap(passages[first - 1]!, passages[first]!)) first--;
      before = full.slice(0, passages[first]!.index);
      after = full.slice(endOf(lastP));
    }
  }

  if (before === null) return { title: full, passage: best, passages };

  const title = trimSeparators(tidy(`${before} ${after}`.replace(/\(\s*\)|\[\s*\]/g, '')));
  return { title: title || full, passage: best, passages };
}

// Examples:
// findScripturePassage('2 Chronicles 7: 1-22 - Key Actions required for a God centered revival')
//   -> reference '2 Chronicles 7:1-22'
// findScripturePassage('Genesis 45,46 - How God can bring victory out of pain')
//   -> reference 'Genesis 45-46', raw 'Genesis 45,46'
// findScripturePassage('Genesis 45, 47 and 49')   -> 'Genesis 45, 47, 49'
// findScripturePassage('John 3:16-18; 4:1-5')     -> 'John 3:16-18; 4:1-5'
// findScripturePassage('Acts 13: 42 - 14: 1-7')   -> 'Acts 13:42-14:7'
// findScripturePassage('Mark 3 times') -> null
//
// findScripturePassages('1 Peter 1, Luke 11 - Keep on Praying')
//   -> [ '1 Peter 1', 'Luke 11' ]
// formatPassages(findScripturePassages('Romans 8, 2 Timothy 3')) -> 'Romans 8; 2 Timothy 3'
//
// parseSermonTitle('1 Peter 1, Luke 11 - Keep on Praying')
//   -> { title: 'Keep on Praying', passages: [ 1 Peter 1, Luke 11 ], ... }
// parseSermonTitle('Walking in Love - Romans 14')
//   -> { title: 'Walking in Love', passages: [ Romans 14 ], ... }
// parseSermonTitle('A Heart for the Lost') -> { title: 'A Heart for the Lost', passage: null, passages: [] }
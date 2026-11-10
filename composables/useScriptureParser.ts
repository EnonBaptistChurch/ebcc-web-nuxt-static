export interface ScripturePassage {
  /** Normalised reference, e.g. "2 Chronicles 7:1-22", "Genesis 47", "John 3:16" */
  reference: string;
  /** Canonical book name, e.g. "Romans", "1 John" */
  book: string;
  chapter: number;
  verseStart?: number;
  verseEnd?: number;
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

const REF_RE = new RegExp(
  `(?<![\\p{L}\\p{N}])(${BOOK_PATTERN})\\s+(\\d{1,3})` +
    `(?:\\s*:\\s*(\\d{1,3})(?:\\s*[-–—]\\s*(\\d{1,3}))?)?(?![\\p{L}\\p{N}])`,
  'gu',
);

const NAMED_ENTITIES: Record<string, string> = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: '\u00a0',
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

function format(p: Omit<ScripturePassage, 'reference' | 'raw' | 'index'>): string {
  if (p.verseStart === undefined) return `${p.book} ${p.chapter}`;
  const verses = p.verseEnd ? `${p.verseStart}-${p.verseEnd}` : `${p.verseStart}`;
  // "Jude 3", not "Jude 1:3"
  return SINGLE_CHAPTER.has(p.book) ? `${p.book} ${verses}` : `${p.book} ${p.chapter}:${verses}`;
}

// How much detail a citation carries: verse range > single verse > bare chapter.
const detail = (p: ScripturePassage) =>
  p.verseEnd !== undefined ? 3 : p.verseStart !== undefined ? 2 : 1;

/**
 * Finds the fullest scripture passage cited in a piece of text.
 *
 * If the text cites several passages, the most detailed one wins
 * (a verse range beats a single verse, which beats a bare chapter);
 * ties go to whichever appears first. Returns null if nothing is found.
 */
export function findScripturePassage(text: string | null | undefined): ScripturePassage | null {
  if (!text) return null;
    text = tidy(decodeEntities(text));
  let best: ScripturePassage | null = null;

  for (const m of text.matchAll(REF_RE)) {
    const book = toCanonical(m[1] ?? '');
    if (!book) continue;

    let chapter = Number(m[2]);
    let verseStart = m[3] ? Number(m[3]) : undefined;
    const verseEnd = m[4] ? Number(m[4]) : undefined;

    // "Jude 3" means verse 3 of the only chapter.
    if (SINGLE_CHAPTER.has(book) && verseStart === undefined) {
      verseStart = chapter;
      chapter = 1;
    }

    // Reject anything that can't exist.
    if (chapter < 1 || chapter > CHAPTERS.get(book)!) continue;
    if (verseStart !== undefined && verseStart < 1) continue;
    if (verseEnd !== undefined && verseStart !== undefined && verseEnd <= verseStart) continue;

    // A bare chapter followed by a lowercase word is almost always prose
    // ("Mark 3 times", "Job 5 things"), not a citation.
    const index = m.index ?? 0;
    const end = index + m[0].length;
    if (m[3] === undefined && !SINGLE_CHAPTER.has(book) && /^\s+\p{Ll}/u.test(text.slice(end))) {
      continue;
    }

    const parts = { book, chapter, verseStart, verseEnd };
    const candidate: ScripturePassage = { ...parts, reference: format(parts), raw: m[0], index };

    if (!best || detail(candidate) > detail(best)) best = candidate;
  }

  return best;
}

export interface ParsedSermonTitle {
  /** The message title with any leading/trailing scripture reference removed. */
  title: string;
  /** The passage found in the text, or null if there isn't one. */
  passage: ScripturePassage | null;
}

const tidy = (s: string) => s.replace(/\s+/g, ' ').trim();
const trimSeparators = (s: string) => s.replace(/^[\s\-–—:|·•,;]+|[\s\-–—:|·•,;]+$/g, '');

/**
 * Splits a sermon heading into its message title and its scripture passage.
 *
 *   "2 Chronicles 7: 1-22 - Key Actions required for a God centered revival"
 *     -> title "Key Actions required for a God centered revival"
 *
 * Works with the passage at the start ("John 3:16 - Title"), at the end
 * ("Title - John 3:16" or "Title (John 3:16)"), or not at all (the whole
 * text is the title). A passage in the middle of a title ("Why John 3:16
 * matters") is treated as part of the title and left in place. If removing
 * the passage would leave nothing, the title falls back to the full text.
 */
export function parseSermonTitle(text: string | null | undefined): ParsedSermonTitle {
  const full = tidy(decodeEntities(text ?? ''));
  const passage = findScripturePassage(full);
  if (!passage) return { title: full, passage: null };

  const before = full.slice(0, passage.index);
  const after = full.slice(passage.index + passage.raw.length);

  const atStart = /^[\s(\[]*$/.test(before);
  const atEnd = /^[\s)\].,;]*$/.test(after);
  if (!atStart && !atEnd) return { title: full, passage };

  const title = trimSeparators(tidy(`${before} ${after}`.replace(/\(\s*\)|\[\s*\]/g, '')));
  return { title: title || full, passage };
}

// Examples:
// findScripturePassage('2 Chronicles 7: 1-22 - Key Actions required for a God centered revival')
//   -> { reference: '2 Chronicles 7:1-22', book: '2 Chronicles', chapter: 7, verseStart: 1, verseEnd: 22, ... }
// findScripturePassage("Genesis 47 - God prospers Joseph's family")
//   -> { reference: 'Genesis 47', book: 'Genesis', chapter: 47, ... }
// findScripturePassage('Romans 8 and John 3:16-18')
//   -> { reference: 'John 3:16-18', ... }   (the range is the fullest)
// findScripturePassage('Mark 3 times') -> null
//
// parseSermonTitle('2 Chronicles 7: 1-22 - Key Actions required for a God centered revival')
//   -> { title: 'Key Actions required for a God centered revival', passage: { reference: '2 Chronicles 7:1-22', ... } }
// parseSermonTitle('Walking in Love - Romans 14')
//   -> { title: 'Walking in Love', passage: { reference: 'Romans 14', ... } }
// parseSermonTitle('A Heart for the Lost') -> { title: 'A Heart for the Lost', passage: null }
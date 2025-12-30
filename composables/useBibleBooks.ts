// composables/useBibleBooks.ts

export function useBibleBooks() {
  // List of Bible books, abbreviated and full names
  const books = [
    'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy',
    'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel',
    '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles',
    'Ezra', 'Nehemiah', 'Esther', 'Job', 'Psalms',
    'Proverbs', 'Ecclesiastes', 'Song of Solomon', 'Isaiah',
    'Jeremiah', 'Lamentations', 'Ezekiel', 'Daniel',
    'Hosea', 'Joel', 'Amos', 'Obadiah', 'Jonah', 'Micah',
    'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah',
    'Malachi', 'Matthew', 'Mark', 'Luke', 'John',
    'Acts', 'Romans', '1 Corinthians', '2 Corinthians',
    'Galatians', 'Ephesians', 'Philippians', 'Colossians',
    '1 Thessalonians', '2 Thessalonians', '1 Timothy', '2 Timothy',
    'Titus', 'Philemon', 'Hebrews', 'James', '1 Peter', '2 Peter',
    '1 John', '2 John', '3 John', 'Jude', 'Revelation'
  ]

  // Escape for regex
  const escapedBooks = books.map(b => b.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))

  // Match a book name followed by optional chapter:verse(s), supporting
  // - Ranges (John 3:16-18)
  // - Multiple verses (John 3:16,18)
  // - Multiple passages separated by semicolons (John 3:16; Psalms 23)
  const bookRegex = new RegExp(
    `(${escapedBooks.join('|')})\\s*\\d+(?:(?::\\d+(?:[-,]\\d+)*)?)*(?:\\s*;\\s*\\d+[^;]*)*`,
    'gi'
  )

  return {
    books,
    bookRegex
  }
}

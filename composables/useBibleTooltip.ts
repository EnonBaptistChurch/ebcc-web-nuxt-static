// composables/useBibleTooltip.ts

const MAX_VERSES = 7

export function useBibleTooltip() {

  function countVerses(reference: string): number | null {
    // Split multiple passages by semicolon
    const passages = reference.split(';').map(s => s.trim())
    let total = 0

    for (const passage of passages) {
      const parts = passage.split(':')
      if (parts.length < 2) return null
      const versePart = parts[1]
      if (!versePart) return null

      const verseRanges = versePart.split(',')
      for (const part of verseRanges) {
        const rangeParts = part.split('-').map(s => Number(s.trim()))

        if (rangeParts.length === 2) {
          const start = rangeParts[0]
          const end = rangeParts[1]
          if (start === undefined || end === undefined) return null
          if (Number.isNaN(start) || Number.isNaN(end)) return null
          if (end < start) return null
          total += end - start + 1
        } else if (rangeParts.length === 1) {
          const n = rangeParts[0]
          if (n === undefined || Number.isNaN(n)) return null
          total += 1
        } else {
          // Unexpected format
          return null
        }
      }
    }

    return total
  }

function nkjvLink(reference: string) {
  // Encode the whole multi-passage reference as a single URL
  return `https://www.biblegateway.com/passage/?search=${encodeURIComponent(reference)}&version=NKJV`
}

function canShowTooltip(reference: string) {
  const count = countVerses(reference)
  return count !== null && count <= MAX_VERSES
}
  return {
    MAX_VERSES,
    countVerses,
    canShowTooltip,
    nkjvLink
  }
}

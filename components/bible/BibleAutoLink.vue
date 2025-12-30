<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
declare global {
  interface Window {
    BGLinks: any
  }
}
// Regex to detect Bible references (simplified)
const bibleRegex = /\b(?:Genesis|Exodus|Leviticus|Numbers|Deuteronomy|Joshua|Judges|Ruth|1 Samuel|2 Samuel|1 Kings|2 Kings|1 Chronicles|2 Chronicles|Ezra|Nehemiah|Esther|Job|Psalms?|Proverbs|Ecclesiastes|Song of Solomon|Isaiah|Jeremiah|Lamentations|Ezekiel|Daniel|Hosea|Joel|Amos|Obadiah|Jonah|Micah|Nahum|Habakkuk|Zephaniah|Haggai|Zechariah|Malachi|Matthew|Mark|Luke|John|Acts|Romans|1 Corinthians|2 Corinthians|Galatians|Ephesians|Philippians|Colossians|1 Thessalonians|2 Thessalonians|1 Timothy|2 Timothy|Titus|Philemon|Hebrews|James|1 Peter|2 Peter|1 John|2 John|3 John|Jude|Revelation)\s+\d+:\d+(?:-\d+)?(?:;\s*\d+:\d+(?:-\d+)?)*/g

const container = ref<HTMLElement | null>(null)
const allReferences = ref<string[]>([])

function collectReferences() {
  if (!container.value) return
  allReferences.value = []
  const textNodes: Text[] = []

  // recursively find text nodes
  function getTextNodes(node: Node) {
    if (node.nodeType === Node.TEXT_NODE) {
      textNodes.push(node as Text)
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      node.childNodes.forEach(getTextNodes)
    }
  }

  getTextNodes(container.value)

  textNodes.forEach(node => {
    const matches = node.nodeValue?.match(bibleRegex)
    if (matches) {
      allReferences.value.push(...matches)
    }
  })

  // remove duplicates
  allReferences.value = Array.from(new Set(allReferences.value))
}

onMounted(() => {
  nextTick(() => {
    collectReferences()

    // Load BGLinks script
    if (!window.BGLinks) {
      const script = document.createElement('script')
      script.src = "https://www.biblegateway.com/public/link-to-us/tooltips/bglinks.js"
      script.type = "text/javascript"
      script.onload = () => {
        window.BGLinks.version = "NKJV"
        window.BGLinks.showTooltips = true
        window.BGLinks.linkVerses()
      }
      document.body.appendChild(script)
    } else {
      window.BGLinks.version = "NKJV"
      window.BGLinks.showTooltips = true
      window.BGLinks.linkVerses()
    }
  })
})

function showAllLink() {
  if (allReferences.value.length === 0) return '#'
  const searchQuery = allReferences.value.join('; ')
  return `https://www.biblegateway.com/passage/?search=${encodeURIComponent(searchQuery)}&version=NKJV`
}
</script>

<template>
  <div ref="container">
    <slot />
    <div v-if="allReferences.length" style="margin-top: 0.5rem">
      <a :href="showAllLink()" target="_blank" class="show-all-link">
        Show All Bible References
      </a>
    </div>
  </div>
</template>

<style scoped>
.show-all-link {
  color: #1a73e8;
  text-decoration: underline;
  font-size: 0.9rem;
}
.show-all-link:hover {
  color: #155ab6;
}
</style>

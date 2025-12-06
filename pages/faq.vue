<script setup lang="ts">
import { ref, computed } from 'vue'
import Fuse from 'fuse.js'
import { faqs, type FAQ } from '../data/faqs'
import CollapsibleComponent from '../components/CollapsibleComponent.vue'

const query = ref('')
const selectedCategory = ref('All')

// Fuzzy search setup
const fuse = new Fuse(faqs, {
  keys: ['question', 'answer', 'keywords'],
  threshold: 0.4,
})

const filteredFaqs = computed(() => {
  let results = query.value.trim() ? fuse.search(query.value.trim()).map(r => r.item) : faqs
  if (selectedCategory.value !== 'All') {
    results = results.filter(f => f.category) // ensure category exists
    results = results.filter(f => f.category === selectedCategory.value)
  }
  return results
})

const categories = computed(() => {
  const set = new Set(faqs.map(f => f.category).filter(Boolean))
  return ['All', ...Array.from(set).sort()]
})

const grouped = computed(() => {
  const map: Record<string, FAQ[]> = {}
  for (const f of filteredFaqs.value) {
    const cat = f.category || 'Uncategorized' // avoid undefined
    if (!map[cat]) map[cat] = []
    map[cat].push(f)
  }
  return map
})
</script>

<template>
  <div class="container">
    <h1>Church FAQs</h1>

    <!-- Search input -->
    <input v-model="query" placeholder="Search FAQs..." class="search-input" />

    <!-- Category buttons -->
    <div class="categories">
      <button
        v-for="cat in categories"
        :key="cat"
        @click="selectedCategory = cat"
        :class="['category-btn', { active: selectedCategory === cat }]"
      >
        {{ cat }}
      </button>
    </div>

    <div v-if="filteredFaqs.length === 0" class="no-results">No FAQs match your search.</div>

    <div v-else class="categories-container">
      <div v-for="(items, cat) in grouped" :key="cat" class="category-group">
        <h2>{{ cat }} ({{ items.length }})</h2>
        <ul class="faq-list">
          <li v-for="faq in items" :key="faq.id" >
            <collapsible-component :title="faq.question" :content="faq.answer" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  
  margin: 0 auto;
  padding: 20px;
}

.search-input {
  width: 100%;
  padding: 8px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
}


.categories-container {
  display: grid;
  grid-template-columns: repeat(2,1fr);
  gap: 0 0.75rem;
}

.category-btn {
  margin-right: 6px;
  margin-bottom: 6px;
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  background-color: var(--button-bg-color, #f9d);
  color: var(--button-text-color, #000);
  cursor: pointer;
}

.category-btn.active {
  background-color: #ddd;
}

.no-results {
  padding: 10px;
  border: 1px solid #eee;
}

.category-group {
  margin-bottom: 0.25rem;
  
}

.faq-list {
  list-style: none;
  padding-left: 0;
  
}

.faq-item {
  margin-bottom: 8px;
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 4px;
}

.faq-item summary {
  cursor: pointer;
  font-weight: bold;
}

.faq-item p {
  margin-top: 4px;
}

.keywords {
  font-size: 12px;
  color: #555;
}

@media (min-width: 768px) {
  .categories-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop layout */
@media (min-width: 1024px) {
  .categories-container {
    padding: 0.5rem 2rem;
  }

  .categories-container {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>

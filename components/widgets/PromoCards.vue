<template>
  <section
    class="action-card-grid"
    :style="{ 'grid-template-columns': `repeat(${columns}, 1fr)` }"
  >
    <PromoCard
      v-for="(card, index) in visibleCards"
      :key="index"
      :image="card.image"
      :title="card.title"
      :description="card.description"
      :link="card.link"
      :aria-label="card.ariaLabel"
      :buttonText="card.buttonText"
    />
  </section>
</template>

<script setup>
import PromoCard from '../components/widgets/PromoCard.vue'
import { computed } from 'vue'
import { cards } from '../../data/PromoCards'
import { useWindowSize } from '@vueuse/core'

const { width: screenWidth } = useWindowSize()

// 1. All available cards that pass the show condition
const shownCards = computed(() => cards.filter(c => c.show))

// 2. Define standard responsive column breakpoints
const columns = computed(() => {
  if (screenWidth.value < 640) return 1  // Mobile
  if (screenWidth.value < 900) return 2  // Tablet
  if (screenWidth.value < 1200) return 3 // Laptop
  return 4                               // Desktop
})

// 3. Display as many as possible without leaving remainder/gaps on the last row
const visibleCards = computed(() => {
  const total = shownCards.value.length
  const cols = columns.value

  // On single-column screens, display all cards
  if (cols === 1) return shownCards.value

  // Calculate the largest multiple of `cols` that fits within `total`
  // Example: 11 cards on a 3-column grid -> Math.floor(11 / 3) * 3 = 9 cards
  const completeRowsCount = Math.floor(total / cols) * cols

  // If there aren't enough cards to fill even 1 full row, show what we have
  const limit = completeRowsCount > 0 ? completeRowsCount : total

  return shownCards.value.slice(0, limit)
})
</script>

<style scoped>
.action-card-grid {
  display: grid;
  gap: 2rem;
  padding: 2rem 1rem;
  background: linear-gradient(to top, #f7efe2, color-mix(in srgb, var(--body-bg-color) 97%, black)); 
}
</style>

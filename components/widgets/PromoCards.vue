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

const visibleCards = computed(() => {
  const shownCards = cards.filter(c => c.show)

  if (screenWidth.value < 1024) {
    return shownCards.slice(0, 4)
  }
  return shownCards
})

const columns = computed(() => {
  const count = visibleCards.value.length

  if (screenWidth.value < 600) return 1
  if (screenWidth.value < 900) return count === 3 ? 3 : 2
  if (screenWidth.value < 1200) return count % 3 === 1 ? 2 : 3
  return count % 4 === 1 ? 3 : 4
})
</script>

<style scoped>
.action-card-grid {
  display: grid;
  gap: 2rem;
  padding: 2rem 1rem;
  background: #e2e2e0d8 
}
</style>

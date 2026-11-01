<template>
  <section class="action-card-grid">
    <PromoCard
      v-for="(card, index) in cardsWithRules"
      :key="card.title"
      :class="card.hideClasses"
      :image="card.image"
      :title="card.title"
      :description="card.description"
      :link="card.link"
      :aria-label="card.ariaLabel"
      :button-text="card.buttonText"
    />
  </section>
</template>

<script setup>
import PromoCard from '../components/widgets/PromoCard.vue'
import { cards } from '../../data/PromoCards'

const shownCards = cards.filter(c => c.show)
const total = shownCards.length

// For each column count, work out how many cards fit in complete rows
const limitFor = (cols) => {
  const complete = Math.floor(total / cols) * cols
  return complete > 0 ? complete : total
}

const cardsWithRules = shownCards.map((card, i) => ({
  ...card,
  hideClasses: [2, 3, 4]
    .filter(cols => i >= limitFor(cols))
    .map(cols => `hide-at-${cols}`),
}))
</script>

<style scoped>
.action-card-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  padding: 0.5rem 1rem;
  background: linear-gradient(to top, #f7efe2, color-mix(in srgb, var(--body-bg-color) 97%, black));
}

@media (max-width: 600px) {
  .action-card-grid { padding: 2rem 1rem; }
}

/* 2 columns */
@media (min-width: 640px) and (max-width: 899.98px) {
  .action-card-grid { grid-template-columns: repeat(2, 1fr); }
  .action-card-grid > .hide-at-2 { display: none; }
}

/* 3 columns */
@media (min-width: 900px) and (max-width: 1199.98px) {
  .action-card-grid { grid-template-columns: repeat(3, 1fr); }
  .action-card-grid > .hide-at-3 { display: none; }
}

/* 4 columns */
@media (min-width: 1200px) {
  .action-card-grid { grid-template-columns: repeat(4, 1fr); }
  .action-card-grid > .hide-at-4 { display: none; }
}
</style>
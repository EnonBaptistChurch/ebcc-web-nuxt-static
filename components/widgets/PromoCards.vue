<template>
  <section class="action-card-grid">
    <PromoCard
      v-for="(card, index) in visibleCards.filter(c => c.show)"
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
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
const screenWidth = ref(window.innerWidth)

const updateWidth = () => {
  screenWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', updateWidth)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWidth)
})

// Decide how many cards to show based on screen width
const visibleCards = computed(() => {
  const shownCards = cards.filter(c => c.show)
  
  if (screenWidth.value < 640) {
    return shownCards.slice(0, 2)  // mobile: show first 2
  } else if (screenWidth.value < 1024) {
    return shownCards.slice(0, 4)  // tablet: show first 4
  } else {
    return shownCards              // desktop: show all
  }
})
const cards = [
  
  {
    image: '/images/bible-640.webp',
    title: 'Christmas Services',
    description: `We'd love to invite you to our Carol Services this Christmas`,
    link: '/christmas-services',
    ariaLabel: 'Christmas Services Image',
    buttonText: 'Find Out More',
    show: new Date(Date.now()) > new Date('2025-10-26') && new Date(Date.now()) < new Date('2025-12-26')
  },
  {
    image: '/images/building/enonOutside-480.webp',
    title: 'I\'m New',
    description: 'Find out more about who we are and what to expect when you visit us',
    link: '/about/',
    ariaLabel: 'I\'m new',
    buttonText: 'Learn More',
    show: true
  },
  {
    image: '/images/bible-640.webp',
    title: 'Sermons',
    description: 'Catch up on all our recent sermons by clicking the link below',
    link: '/sermons',
    ariaLabel: 'Sermons Image',
    buttonText: 'Listen Now',
    show: true
  },
  {
    image: '/images/bible-640.webp',
    title: 'Christmas Services',
    description: `We'd love to invite you to our Carol Services this Christmas`,
    link: '/christmas-services',
    ariaLabel: 'Christmas Services Image',
    buttonText: 'Find Out More',
    show: Date.now() > new Date('2025-11-26') && Date.now() < new Date('2025-12-26')
  },
  {
    image: '/images/sunday-club-640.webp',
    title: 'What\'s On',
    description: 'Find out about our regular meetings.',
    link: '/whats-on',
    ariaLabel: 'What\'s On',
    buttonText: 'See What\'s On',
    show: true
  },
  {
    image: '/images/GMT-MST-640.webp',
    title: 'Testimonies',
    description: 'See the stories of how God has worked in the lives of our members',
    link: '/testimonies',
    ariaLabel: 'Testimonies',
    buttonText: 'See More',
    show: true
  }

]
</script>

<style scoped>
.action-card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  padding: 2rem 1rem;
  background: linear-gradient( #fff,#fffd, #fff,#fffd, #fff);
}
</style>

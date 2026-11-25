<script setup lang="ts">
import SundayMorning from '../../components/sundays/SundayMorning.vue';
import SundayEvening from '../../components/sundays/SundayEvening.vue';
import { useHead } from 'nuxt/app';

useHead({
  title: 'Sunday Services - Enon Baptist Church',
  meta: [
    {
      name: 'description',
      content: 'Enon Baptist Church, Chatham welcomes you to Sunday Services with Bible preaching, gospel-centered worship, and fellowship.'
    }
  ]
})
</script>

<template>
  <div class="sundays">
    <header class="intro">
      <p class="eyebrow">Join us</p>
      <h1>Sunday Services</h1>
      <p class="lead">
        Everyone is given a warm welcome at Enon. Our worship is God-focused and traditional in style.
        We sing hymns, read the Bible, pray and listen to God speak through the preaching of his Word.
      </p>
      <p>Questions are very welcome after each service, and light refreshments are available.</p>

      <aside class="new-here">
        <strong>New to Enon?</strong>
        <span>We generally recommend you come to the morning service.</span>
      </aside>
    </header>

    <section class="services" aria-label="Service times">
      <SundayMorning />
      <SundayEvening />
    </section>
  </div>
</template>

<style scoped>
.sundays {
  /* Shared design tokens, inherited by the service components */
  --accent: #9a7b4f;
  --accent-soft: #faf6ef;
  --ink: #1f2937;
  --ink-soft: #4b5563;
  --card-border: #e5e7eb;
  --button-bg-color: #1976d2;

  max-width: 64rem;
  margin: 0 auto;
  padding: 3rem 1.25rem 4rem;
}

.intro {
  max-width: 42rem;
  margin: 0 auto 3rem;
  text-align: center;
  line-height: 1.7;
  color: var(--ink-soft);
}

.eyebrow {
  margin: 0 0 0.5rem;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--accent);
}

.intro h1 {
  margin: 0 0 1.25rem;
  font-size: clamp(2rem, 5vw, 3rem);
  line-height: 1.15;
  color: var(--ink);
}

.intro h1::after {
  content: '';
  display: block;
  width: 3.5rem;
  height: 3px;
  margin: 1rem auto 0;
  border-radius: 2px;
  background: var(--accent);
}

.lead {
  font-size: 1.15rem;
  color: var(--ink);
}

.new-here {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-top: 1.75rem;
  padding: 1rem 1.25rem;
  border-left: 4px solid var(--accent);
  border-radius: 0.5rem;
  background: var(--accent-soft);
  text-align: left;
}

.new-here strong {
  color: var(--ink);
}

.services {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 900px) {
  .services {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    align-items: stretch;
  }
}
</style>
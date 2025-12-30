<template>
  <section class="wrapper">
    <header class="intro">
      <h2>Local Church Links</h2>
      <p class="subtitle">
        We have links with like-minded churches across Medway, joining together for worship, prayer, and fellowship.
      </p>
    </header>

    <div class="church-grid">
      <article v-for="church in localChurches" :key="church.name" class="church-card">
        <h3 class="church-name">
          <a :href="church.url" target="_blank" rel="noopener">{{ church.name }}</a>
        </h3>
        <p class="description">{{ church.description }}</p>
        <p v-if="church.pastor" class="meta">
          <strong>Pastor:</strong> {{ church.pastor }}
        </p>
        <p v-if="church.location" class="meta location">
          <strong>Location:</strong><br/>{{ church.location }}
        </p>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { localChurches } from '../data/localChurches';
</script>

<style scoped>
.wrapper {
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: Arial, sans-serif;
}

.intro {
  text-align: center;
  margin-bottom: 3rem;
}

.intro h2 {
  font-size: 2.2rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  max-width: 60ch;
  margin: 0 auto;
  color: #555;
  font-size: 1rem;
}

/* Grid with 4 columns on large screens, 2 on medium */
.church-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

@media (max-width: 1024px) {
  .church-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .church-grid {
    grid-template-columns: 1fr;
  }
  .intro h2 {
    font-size: 1.8rem;
  }
}

.church-card {
  background: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.church-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}

.church-name {
  margin: 0;
  font-size: 1.3rem;
  font-weight: bold;
}

.church-name a {
  color: #1e3a8a;
  text-decoration: none;
}

.church-name a:hover {
  text-decoration: underline;
}

.description {
  font-style: italic;
  color: #555;
  font-size: 0.95rem;
  margin: 0rem;
}

.meta {
  font-size: 0.9rem;
  color: #444;
  margin:0;
}

.location {
  margin-top: auto;
  font-size: 0.9rem;
  color: #555;
  margin: 0rem;
}
</style>
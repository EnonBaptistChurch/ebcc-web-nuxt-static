<template>
  <section class="wrapper">
    <!-- Local Churches -->
    <header class="section-intro">
      <h2>Local Church Links</h2>
      <p class="subtitle">
        We have links with like-minded churches across Medway, joining together for worship, prayer, and fellowship.
      </p>
    </header>

    <div class="card-grid">
      <article v-for="church in localChurches" :key="church.name" class="card">
        <div class="card-body">
          <h3 class="card-name">
            <a :href="church.url" target="_blank" rel="noopener">{{ church.name }}</a>
          </h3>
          <p class="card-description">{{ church.description }}</p>
        </div>
        <footer class="card-footer">
          <p v-if="church.pastor" class="meta">
            <span class="meta-label">Pastor</span>
            {{ church.pastor }}
          </p>
          <p v-if="church.location" class="meta">
            <span class="meta-label">Location</span>
            {{ church.location }}
          </p>
        </footer>
      </article>
    </div>

    <div class="section-divider" aria-hidden="true">
      <span class="divider-cross">✦</span>
    </div>

    <!-- Missionaries -->
    <header class="section-intro">
      <span class="eyebrow">Global Outreach</span>
      <h2>Missionary Links</h2>
      <p class="subtitle">
        We have links with missionaries serving across the world, taking the gospel to the nations.
      </p>
    </header>

    <div class="card-grid mission-grid">
      <article v-for="mission in missionLinks" :key="mission.name" class="card">
        <div class="card-body">
          <div class="mission-image">
            <img v-if="mission.imgSrc" :src="mission.imgSrc" :style="mission.bgColor ? { backgroundColor: mission.bgColor } : {}" />
          </div>
          <h3 class="card-name">
            <a :href="mission.link" target="_blank" rel="noopener">{{ mission.name }}</a>
          </h3>
          <p class="card-description">{{ mission.description }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { localChurches } from '../data/localChurches';
import missionLinks from '../data/missionLinks';
</script>

<style scoped>
/* @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=Source+Serif+4:ital,wght@0,300;0,400;1,300&display=swap'); */

/* ── Tokens ─────────────────────────────────────────── */
:root {
  --cream:    #faf7f2;
  --parchment:#f0ead8;
  --stone:    #e8e0cc;
  --ink:      #1c1a17;
  --muted:    #6b6355;
  --gold:     #9a7c3f;
  --gold-lt:  #c4a55a;
  --navy:     #1e3557;
  --navy-lt:  #2a4a7f;
  --radius:   ;
  --shadow-sm: 0 2px 8px rgba(28,26,23,0.07);
  --shadow-md: 0 6px 20px rgba(28,26,23,0.11);
  --shadow-lg: 0 12px 36px rgba(28,26,23,0.14);
}

/* ── Layout ─────────────────────────────────────────── */
.wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1.5rem 4rem;
  background: var(--cream);
  font-family: 'Source Serif 4', Georgia, serif;
  color: var(--ink);
}

/* ── Section intro ──────────────────────────────────── */
.section-intro {
  text-align: center;
  margin-bottom: 2.5rem;
}

.eyebrow {
  display: inline-block;
  font-family: 'Source Serif 4', serif;
  font-size: 0.75rem;
  font-weight: 300;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 0.6rem;
}

.section-intro h2 {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 700;
  color: var(--navy);
  margin: 0 0 0.75rem;
  line-height: 1.15;
}

.subtitle {
  max-width: 56ch;
  margin: 0 auto;
  font-size: 1rem;
  font-weight: 300;
  font-style: italic;
  color: var(--muted);
  line-height: 1.65;
}

/* ── Divider ────────────────────────────────────────── */
.section-divider {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 3.5rem 0;
  color: var(--stone);
}

.section-divider::before,
.section-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: linear-gradient(to right, transparent, var(--stone), transparent);
}

.divider-cross {
  color: var(--gold-lt);
  font-size: 1.1rem;
  flex-shrink: 0;
}

/* ── Grid ───────────────────────────────────────────── */
.card-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
}

.mission-grid {
  grid-template-columns: repeat(3, 1fr);
}

@media (max-width: 1024px) {
  .card-grid       { grid-template-columns: repeat(2, 1fr); }
  .mission-grid    { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 600px) {
  .card-grid,
  .mission-grid    { grid-template-columns: 1fr; }
  .section-intro h2 { font-size: 1.7rem; }
}

/* ── Card ───────────────────────────────────────────── */
.card {
  background: #fff;
  border: 1px solid var(--parchment);
  border-radius: 16px;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: transform 0.22s ease, box-shadow 0.22s ease;

}

.card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-lg);
}

.card::before {
  content: '';
  display: block;
  height: 3px;
  background: linear-gradient(90deg, var(--navy), var(--gold));
}

.card-body {
  padding: 1.25rem 1.25rem 0.75rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
}

.card-footer {
  padding: 0.75rem 1.25rem 1.1rem;
  border-top: 1px solid var(--parchment);
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  background: var(--cream);
}


.mission-image {
  aspect-ratio: 16 / 9; /* or 4 / 3 depending on your images */
  overflow: hidden;
  max-height: 100px;
}

.mission-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
/* ── Card typography ────────────────────────────────── */
.card-name {
  margin: 0;
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 1.3;
}

.card-name a {
  color: var(--navy);
  text-decoration: none;
  transition: color 0.15s;
}

.card-name a:hover {
  color: var(--gold);
}

.card-description {
  margin: 0;
  font-size: 0.9rem;
  font-style: italic;
  font-weight: 300;
  color: var(--muted);
  line-height: 1.6;
}

.meta {
  margin: 0;
  font-size: 0.8rem;
  color: var(--muted);
  line-height: 1.4;
  display: flex;
  gap: 0.4rem;
  align-items: baseline;
}

.meta-label {
  font-family: 'Source Serif 4', serif;
  font-weight: 400;
  font-style: normal;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-size: 0.65rem;
  color: var(--gold);
  flex-shrink: 0;
}
</style>
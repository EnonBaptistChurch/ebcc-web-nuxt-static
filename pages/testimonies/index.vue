<script setup lang="ts">
import { RouterLink } from 'vue-router'

export type TestimonySnippet = {
  name: string
  shortBio: string
  img: string
  link: string
}

import { testimonies } from '../../data/Testimonies'
import { useHead } from 'nuxt/app'

function initials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

function firstName(name: string): string {
  return name.split(' ')[0]!
}

useHead({
  meta: [
    {
      name: 'description',
      content:
        'Read the testimonies of people at Enon Baptist Church, Chatham'
    }
  ]
})
</script>

<template>
  <section class="testimonies-section">
    <p class="eyebrow">From the congregation</p>
    <h2 class="section-title">Testimonies</h2>
    <div class="section-rule">
      <span class="rule-cross" aria-hidden="true">✛</span>
    </div>

    <div
      v-for="(testimony, index) in testimonies"
      :key="testimony.name"
    >
      <div class="testimony-row" :class="{ reverse: index % 2 !== 0 }">
        <div class="photo-col">
          <div class="photo-circle">
            <img
              v-if="testimony.img"
              :src="testimony.img"
              :alt="testimony.name"
              class="photo-img"
            />
            <span v-else class="photo-initials" aria-hidden="true">
              {{ initials(testimony.name) }}
            </span>
          </div>
        </div>

        <div class="text-col">
          <p class="person-name">{{ testimony.name }}</p>
          <p v-if="testimony.shortBio" class="short-bio">{{ testimony.shortBio }}</p>
          <RouterLink :to="testimony.link" class="read-link">
            Read {{ firstName(testimony.name) }}'s testimony
            <span class="read-link-arrow" aria-hidden="true">→</span>
          </RouterLink>
        </div>
      </div>

      <div
        v-if="index < testimonies.length - 1"
        class="row-divider"
      />
    </div>
  </section>
</template>

<style scoped>
.testimonies-section {
  padding: 2rem 0;
  margin: auto;
  max-width: min(90%,1440px);

}

.eyebrow {
  font-size: 0.6875rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #9ca3af;
  margin: 0 0 0.35rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0 0 0.25rem;
}

.section-rule {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  margin: 0.75rem 0 1.5rem;
}

.section-rule::before,
.section-rule::after {
  content: '';
  flex: 1;
  height: 0.5px;
  background: #e5e7eb;
}

.rule-cross {
  font-size: 0.8125rem;
  color: #9ca3af;
  user-select: none;
}

/* --- Alternating row --- */
.testimony-row {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.testimony-row.reverse {
  flex-direction: row-reverse;
}

.photo-col {
  flex-shrink: 0;
}

.photo-circle {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: #f3f4f6;
  border: 0.5px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.photo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.photo-initials {
  font-size: 2rem;
  font-weight: 500;
  color: #9ca3af;
}

.text-col {
  flex: 1;
}

.person-name {
  font-size: 1.125rem;
  font-weight: 500;
  margin: 0 0 0.5rem;
}

.short-bio {
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.7;
  margin: 0 0 1rem;
}

.read-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.8125rem;
  font-weight: 500;
  color: inherit;
  text-decoration: none;
  border-bottom: 0.5px solid #d1d5db;
  padding-bottom: 1px;
  transition: opacity 0.15s;
}

.read-link:hover {
  opacity: 0.6;
}

.read-link-arrow {
  font-size: 0.75rem;
}

.row-divider {
  height: 0.5px;
  background: #e5e7eb;
  margin-bottom: 1.5rem;
}

/* --- Mobile: stack photo above centred text --- */
@media (max-width: 600px) {
  .testimony-row,
  .testimony-row.reverse {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1.25rem;
    margin-bottom: 2rem;
  }

  .row-divider {
    margin-bottom: 2rem;
  }
}

/* --- Dark mode --- */
@media (prefers-color-scheme: dark) {
  .section-rule::before,
  .section-rule::after,
  .row-divider {
    background: #374151;
  }

  .photo-circle {
    background: #374151;
    border-color: #4b5563;
  }

  .read-link {
    border-bottom-color: #4b5563;
  }
}
</style>
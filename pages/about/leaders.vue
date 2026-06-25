<script setup lang="ts">
import { Elders as elders, type Elder } from '../../data/ChurchLeaders';

function initials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}
const getPossessiveFirstName = (person: Elder): string => {
  const personName = person.name.split(' ')[0]!

  return personName[personName.length - 1]!.toLowerCase() === 's'
    ? `${personName}'`
    : `${personName}'s`
}
</script>

<template>
  <div>
  <section class="leaders-section">
    <p class="eyebrow">Church leadership</p>
    <h2 class="section-title">Meet our Elders</h2>
    <div class="section-rule">
      <span class="rule-cross" aria-hidden="true">✛</span>
    </div>

    <div
      v-for="(elder, index) in elders"
      :key="elder.name"
      class="elder-grid"
    >
      <div class="elder-row" :class="{ reverse: index % 2 !== 0 }">
        <div class="photo-col">
          <div class="photo-circle">
            <img
              v-if="elder.photo"
              :src="elder.photo"
              :alt="elder.name"
              class="photo-img"
            />
            <span v-else class="photo-initials" aria-hidden="true">
              {{ initials(elder.name) }}
            </span>
          </div>
        </div>

        <div class="text-col">
          <span class="title-pill">{{ elder.elderTitle }}</span>
          <p class="elder-name">{{ elder.name }}</p>
          <p v-if="elder.bio" class="elder-bio" v-html="elder.bio"></p>
          <p v-if="elder.testimonyLink">
            Read {{ getPossessiveFirstName(elder) }} Testimony
          <NuxtLink :to="elder.testimonyLink" v-if="elder.testimonyLink">here</NuxtLink>.
          </p>
        </div>
      </div>

      <div
        v-if="index < elders.length - 1"
        class="elder-divider"
      />
    </div>
  </section>
  </div>
</template>

<style scoped>
.leaders-section {
  padding: 2rem 0;
  max-width: min(90%, 1024px);
  margin: auto;
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
  margin: 0.75rem 0 2.5rem;
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

.elder-row {
    max-width: 1440px;
}

/* --- Alternating row --- */
.elder-row {
  display: flex;
  align-items: center;
  gap: 2.5rem;
  margin-bottom: 3rem;
}

.elder-row.reverse {
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

.title-pill {
  font-size: 0.6875rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: #f3f4f6;
  color: #6b7280;
  border: 0.5px solid #e5e7eb;
  border-radius: 99px;
  padding: 3px 10px;
  display: inline-block;
  margin-bottom: 0.5rem;
}

.elder-name {
  font-size: 1.25rem;
  font-weight: 500;
  margin: 0 0 0.75rem;
}

.elder-bio {
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.7;
  margin: 0;
  padding: 0  8px 0 0;
}

.elder-divider {
  height: 0.5px;
  background: #e5e7eb;
  margin-bottom: 3rem;
}

/* --- Mobile: stack photo above centred text --- */
@media (max-width: 600px) {
  .elder-row,
  .elder-row.reverse {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1.25rem;
    margin-bottom: 2rem;
  }

  .elder-divider {
    margin-bottom: 2rem;
  }
  .elder-bio {
    padding: 0 16px;
  }
}

/* --- Dark mode --- */
@media (prefers-color-scheme: dark) {
  .section-rule::before,
  .section-rule::after,
  .elder-divider {
    background: #374151;
  }

  .photo-circle {
    background: #374151;
    border-color: #4b5563;
  }

  .title-pill {
    background: #374151;
    color: #ffffff;
    border-color: #4b5563;
  }
}
</style>
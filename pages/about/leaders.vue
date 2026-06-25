<script setup lang="ts">
import { Elders as elders, type Elder } from '../../data/ChurchLeaders'

function initials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
}

type TextSegment = {
  type: 'text'
  value: string
}

type LinkSegment = {
  type: 'link'
  value: string
  href: string
}

type BioSegment = TextSegment | LinkSegment

function renderBioParagraph(
  text: string,
  links?: { label: string; href: string }[]
): BioSegment[] {
  if (!links || links.length === 0) {
    return [{ type: 'text', value: text }]
  }

  const result: BioSegment[] = []
  let remaining = text

  for (const link of links) {
    const parts = remaining.split(link.label)

    if (parts.length === 2) {
      if (parts[0]) {
        result.push({ type: 'text', value: parts[0] })
      }

      result.push({
        type: 'link',
        value: link.label,
        href: link.href
      })

      remaining = parts[1]!
    }
  }

  if (remaining) {
    result.push({ type: 'text', value: remaining })
  }

  return result
}

function getPossessiveFirstName(person: Elder): string {
  const personName = person.name.split(' ')[0]!

  return personName.toLowerCase().endsWith('s')
    ? `${personName}'`
    : `${personName}'s`
}
</script>

<template>
  <section class="leaders-section">
    <p class="eyebrow">Church leadership</p>
    <h2 class="section-title">Elders</h2>

    <div class="section-rule">
      <span class="rule-cross" aria-hidden="true">✛</span>
    </div>

    <div
      v-for="(elder, index) in elders"
      :key="elder.name"
      class="elder-grid"
    >
      <div class="elder-row" :class="{ reverse: index % 2 !== 0 }">

        <!-- PHOTO -->
        <div class="photo-col">
          <div class="photo-circle">
            <img
              v-if="elder.photo"
              :src="elder.photo"
              :alt="elder.name"
              class="photo-img"
            />
            <span v-else class="photo-initials">
              {{ initials(elder.name) }}
            </span>
            
          </div>
          <div class="title-pill-container">
          <span class="title-pill">{{ elder.elderTitle }}</span>
          </div>
        </div>

        <!-- TEXT -->
        <div class="text-col">
          
          <p class="elder-name">{{ elder.name }}</p>

          <!-- BIO -->
          <div v-if="elder.bio?.length">
            <p
              v-for="(para, i) in elder.bio"
              :key="i"
              class="elder-bio"
            >
              <template
                v-for="(seg, j) in renderBioParagraph(para.text, para.links)"
                :key="j"
              >
                <a
                  v-if="seg.type === 'link'"
                  :href="seg.href"
                  target="_blank"
                  rel="noopener"
                >
                  {{ seg.value }}
                </a>

                <span v-else>
                  {{ seg.value }}
                </span>
              </template>
            </p>
          </div>

          <!-- TESTIMONY -->
          <p v-if="elder.testimonyLink">
            You can read {{ getPossessiveFirstName(elder) }} Testimony
            <NuxtLink :to="elder.testimonyLink">here</NuxtLink>.
          </p>
        </div>
      </div>

      <div
        v-if="index < elders.length - 1"
        class="elder-divider"
      />
    </div>

    <div class="elder-divider" style="margin:1rem;" />
      <div class="elder-bio">
      <p>
        We also have a deacon who serves alongside the Elders of the church, to support in practical matters.
      </p>
      </div>
    


  </section>
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
  text-align: center;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 500;
  text-align: center;
  margin: 0.75rem 0;
  
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

.title-pill-container {
  margin:auto;
  display: flex;
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
  
  margin: 0.5rem auto;
  align-items: center;
}

.elder-name {
  font-size: 1.25rem;
  font-weight: 500;
  margin: 0 0 0.5rem;
}

.elder-bio {
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.7;
  margin: 0;
  padding: 0 8px 0 0;
  margin-bottom: 0.25rem;
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
    gap: 0.2  5rem;
    margin-bottom: 2rem;
  }

  .elder-divider {
    margin-bottom: 2rem;
  }
  .elder-bio {
    padding: 0.25rem 16px;
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
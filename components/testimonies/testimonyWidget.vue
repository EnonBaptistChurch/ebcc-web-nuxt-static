<script setup lang="ts">
interface Props {
  to: string
  imageSrc: string
  imageAlt: string
  heading: string
  name: string
  role?: string
  ctaText?: string
}

withDefaults(defineProps<Props>(), {
  role: '',
  ctaText: 'Read testimony →'
})
</script>

<template>
  <section class="testimony" aria-labelledby="testimony-heading">
    <NuxtLink :to="to" class="testimony-card">
      <div>
        <h4 id="testimony-heading" class="testimony-heading">
          {{ heading }}
        </h4>
        <div class="testimony-main">
          <img
            :src="imageSrc"
            :alt="imageAlt"
            class="testimony-avatar"
            width="72"
            height="72"
            loading="lazy"
          />
          <span class="testimony-text">
            <strong>{{ name }}</strong>
            <span v-if="role" class="testimony-role">{{ role }}</span>
            <span class="testimony-cta">{{ ctaText }}</span>
          </span>
        </div>
      </div>
    </NuxtLink>
  </section>
</template>

<style scoped>
.testimony-heading {
  margin: 0 0 1rem;
}

.testimony-main {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.1rem;
  font-weight: 600;
}

.testimony-card {
  display: flex;
  flex-direction: column;
  max-width: 100%;
  padding: 1rem 1.25rem;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 1px 4px rgb(0 0 0 / 0.08);
  text-decoration: none;
  color: inherit;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.testimony-card:hover,
.testimony-card:focus-visible {
  box-shadow: 0 4px 12px rgb(0 0 0 / 0.12);
  transform: translateY(-1px);
}

.testimony-avatar {
  width: 72px;
  height: 72px;
  flex-shrink: 0;
  border-radius: 50%;
  object-fit: cover;
}

.testimony-text {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  min-width: 0; /* Fixes text overflow in flex containers on narrow screens */
  overflow: hidden;
  word-break: break-word;
}

.testimony-role {
  font-size: 0.9rem;
  color: #64748b;
}

.testimony-cta {
  margin-top: 0.35rem;
  font-weight: 600;
  color: var(--nav-bar-bg-color);
  font-size: 0.95rem;
}

.testimony-card:hover .testimony-cta {
  text-decoration: underline;
}
</style>
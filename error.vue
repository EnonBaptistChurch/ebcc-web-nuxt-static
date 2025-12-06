<script setup lang="ts">
import type { NuxtError } from 'nuxt/app'
const props = defineProps<{ error: NuxtError }>()

// Optionally, a function to clear error / redirect:
import { clearError } from 'nuxt/app'
const goHome = () => {
  clearError({ redirect: '/' })
}
import BibleVerseParallaxOverlay from '@/components/BibleVerseParallaxOverlay.vue'


</script>

<template>
  <!-- Use a layout for consistency -->
  <NuxtLayout name="default">
    <main class="error-page">

      <!-- Your parallax component -->
      <BibleVerseParallaxOverlay
        image="/images/field.webp"
        verseText="And you will seek Me and find Me, when you search for Me with all your heart."
        reference="Jeremiah 29:13"
        version="NKJV"
        :isErrorPage="true"
      />

      <div class="text-content">
        <h1 v-if="error.statusCode === 404">Oops! Page not found.</h1>
        <h1 v-else>An error occurred</h1>

        <h5 v-if="error.statusCode === 404">
          This page wandered off — like a sheep without a shepherd.
        </h5>
        <h5 v-else>{{ error.statusMessage || error.statusCode }}</h5>

        <button @click="goHome" class="btn-home">Return home</button>
      </div>
    </main>
  </NuxtLayout>
</template>

<style scoped>
.error-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  font-family: var(--font-family, sans-serif);
  color: var(--color-text, #333);
}

.text-content {
  max-width: 600px;
  text-align: center;
  margin: 3rem 1rem;
}

.text-content h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.text-content h5 {
  font-size: 1.25rem;
  margin-bottom: 2rem;
}

.btn-home {
  padding: 0.75rem 1.25rem;
  border-radius: 6px;
  background-color: var(--button-bg-color, #007bff);
  color: var(--button-text-color, #fff);
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s;
}
.btn-home:hover {
  background-color: #005fa3;
}
</style>

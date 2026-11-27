<template>
  <div class="contact-page">
    <header class="contact-hero">
      <h1>Contact Us</h1>
      <p>Questions about our church or the Christian faith? We'd love to hear from you.</p>
    </header>

    <NetlifyContact />
  </div>
</template>

<script setup lang="ts">
import NetlifyContact from '../components/NetlifyContact.vue';
import { useHead } from 'nuxt/app';
useHead({
  title: 'Contact Us - Enon Baptist Church',
  meta: [
    {
      name: 'description',
      content: 'Get in touch with Enon Baptist Church, Chatham. Fill out our contact form or find our phone number to reach us for any inquiries or information.'
    }
  ]
})
</script>

<style scoped>
.contact-page {
  padding-bottom: 3rem;
}

.contact-hero {
  padding: 3rem 1rem;
  text-align: center;
  color: var(--button-color, #fff);
  background: linear-gradient(
    135deg,
    var(--nav-bar-bg-color, #1f3a5f),
    color-mix(in srgb, var(--nav-bar-bg-color, #1f3a5f) 70%, #000)
  );
}

.contact-hero h1 {
  margin: 0 0 0.5rem;
  font-size: clamp(2rem, 5vw, 2.75rem);
  line-height: 1.15;
}

.contact-hero p {
  max-width: 600px;
  margin: 0 auto;
  font-size: 1.1rem;
  opacity: 0.9;
}
</style>
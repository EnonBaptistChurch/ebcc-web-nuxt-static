<script setup>
import SimonAsante from '~/components/testimonies/simon-asante.vue';
import { useHead } from 'nuxt/app';
useHead({
  title: 'Testimonies - Simon Asante - Enon Baptist Church',
  meta: [
    {
      name: 'description',
      content: 'Read Simon Asante\'s testimony at Enon Baptist Church, Chatham.'
    }
  ]
})
</script>

<template>
    <SimonAsante />
</template>
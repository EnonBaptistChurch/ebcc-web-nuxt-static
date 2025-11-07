<template>
  <div class="contact-page">
    <NetlifyContact />
  </div>
</template>


<script setup lang="ts">
import NetlifyContact from '../components/NetlifyContact.vue';
// import Contact from '~/components/Contact.vue';
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

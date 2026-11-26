<!-- pages/whats-on/coffee-morning.vue -->
<script setup lang="ts">
definePageMeta({
  layout: 'whats-on',
  whatsOn: {
    title: 'Coffee Morning',
    subtitle: 'A hot drink and a friendly chat',
    // Self-hosted copy of the Unsplash photo (see notes), saved in public/images/whats-on/
    heroImage: '/images/whats-on/coffee-morning-1920.webp',
    facts: [
      { title: 'Friday', detail: 'Every fortnight' },
      { title: '10:00 – 11:30 am' },
      { title: 'Everyone welcome' }
    ],
    // Matches events whose title contains this text in the church's Google Calendar
    calendarEvent: 'Coffee Morning',
    pageUrl: 'https://enonbaptistchatham.org.uk/whats-on/coffee-morning/',
    metaTitle: 'Coffee Morning - Enon Baptist Church',
    description:
      'Join us for our fortnightly Friday Coffee Morning at Enon Baptist Church, Chatham. Come for a hot drink, a friendly chat and good company.',
    event: {
      name: 'Coffee Morning',
      byDay: 'Friday',
      startTime: '10:00',
      endTime: '11:30',
      repeatFrequency: 'P2W'
    }
  }
});
</script>

<template>
  <p class="ep-welcome">
    Pop in for a hot drink, a friendly chat and a chance to meet people from the
    church and the local community. Everyone is very welcome, whether you have
    been before or not.
  </p>

  <p>
    It is a relaxed, informal morning, and part-way through there is a short
    talk. You are welcome to stay for it or simply carry on chatting over your
    drink. We meet at the church on Skinner Street, Chatham, and there is a car
    park available.
  </p>

  <p>
    If you would like to know more, or which Friday the next Coffee Morning is
    on, please <NuxtLink to="/contact-us/">contact us</NuxtLink> or call
    <a href="tel:07508779145">07508 779145</a> outside of service times.
  </p>
</template>
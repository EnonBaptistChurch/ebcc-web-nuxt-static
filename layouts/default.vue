<template>
  <div>
    <ClientOnly v-if="notices.length > 0">
      <ScrollingBanner :notices="notices" :speed="70" />
    </ClientOnly>
       <Nav />
      <main>
        <div class="content">
        <slot />
        </div>
      </main>
      <Footer />
  </div>
</template>

<script setup lang="ts">
import Nav from '../components/nav/Nav.vue';
import { getRunningbannerNotices } from '../data/BannerNotices.ts'
import ScrollingBanner from '../components/ScrollingBanner.vue'
import Footer from '../components/nav/Footer.vue';

const notices = getRunningbannerNotices()
</script>


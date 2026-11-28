<template>
  <div>
       <Nav />
       <SnowEffect :enabled="snow" />
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
import Footer from '../components/nav/Footer.vue';
import SnowEffect from '../components/misc/snoweffect.vue'
import { ref } from 'vue'
const snow = ref(true)
</script>


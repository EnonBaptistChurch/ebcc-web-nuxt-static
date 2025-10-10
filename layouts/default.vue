<template>
  <div>
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
import Footer from '../components/nav/Footer.vue';
</script>


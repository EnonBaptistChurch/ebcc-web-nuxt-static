<template>
  <!-- Add a wrapper class here so we can control its height and flex layout -->
  <div class="map-wrapper">  
    <iframe
      :src="mapUrl"
      allowfullscreen=""
      loading="eager"
      referrerpolicy="no-referrer-when-downgrade"
      class="mapcontainer"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const mapUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2490.338154880195!2d0.5245410153408684!3d51.378462827943984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8cd053f801537%3A0x39e4cda4ed625544!2sEnon+Baptist+Church!5e0!3m2!1sen!2suk!4v1485452280704';
const preloadMap = ref(false);

onMounted(() => {
  setTimeout(() => {
    preloadMap.value = true;
  }, 1000);
});
</script>

<style scoped>
/* 1. Give the parent wrapper a defined height or make it stretch to its container */
.map-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 300px; /* Adjust this value as needed */
}

/* 2. Style the iframe to fill that wrapper */
.mapcontainer {
  width: 100%;
  height: 100%;
  border: none; /* Removes default iframe borders */
  flex: 1;
}



.text-content h2 {
  margin: 1rem 0.25rem;
}
</style>
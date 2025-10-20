<template>
  <!-- <NuxtImg
  ref="imageRef"
  src="/images/enonChurch.webp"
  alt="Enon Baptist Church"
  class="responsive-image"
  preload
  loading="eager"
/> -->
  <!-- <img fetchpriority="high" src="/images/enonChurch.webp" alt="Enon Baptist Church"  @load="notifyParent" class="responsive-image" width="1487" height="600" /> -->
   <img
  src="/images/new-enon-1920.webp"
  srcset="
    /images/new-enon-320.webp 320w,
    /images/new-enon-480.webp 480w,
    /images/new-enon-640.webp 640w,
    /images/new-enon-768.webp 768w,
    /images/new-enon-1024.webp 1024w,
    /images/new-enon-1280.webp 1280w,
    /images/new-enon-1440.webp 1440w,
    /images/new-enon-1920.webp 1920w"
  sizes="100vw"
  alt="Enon Baptist Church"
  class="church-image"
  fetchpriority="high"
/>
  
  
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue';
const imageRef = ref(null);
const emit = defineEmits(['imageRendered']); // Define the custom event

const notifyParent = async () => {
  await nextTick(); // Ensures Vue updates the DOM before emitting
  emit('imageRendered'); // Notify the parent
};

onMounted(async () => {
  await nextTick(); // Ensure the component is fully mounted
  notifyParent();
});
</script>
<style scoped>
.church-image {
    width: 100%;            
  max-height: 725px;        
  object-fit: cover;        
  object-position: center;  
  display: block;           
}
</style>

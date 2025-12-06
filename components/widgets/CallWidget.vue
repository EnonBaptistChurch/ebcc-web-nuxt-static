<template>
  <NuxtLink to="#" @click.prevent="callNumber" class="num">{{ text }}</NuxtLink>
</template>

<script setup>
const props = defineProps({
  text: { type: String, required: true }
})

const phone = atob("KzQ0MTYzNDMwMTQ5OQ==")

function callNumber() {
  window.location.href = `tel:${phone}`
}
</script>
<style scoped>
.num {
  color: var(--button-bg-color, #007bff);
  font-weight: 600;
  text-decoration: none;
} 
.num:hover {
  text-decoration: underline;
}
</style>

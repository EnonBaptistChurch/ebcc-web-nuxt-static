<template>
  <svg
    :width="size"
    :height="size"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M8 5v14l11-7z"/>
  </svg>
</template>

<script setup lang="ts">
const props = defineProps<{ size?: number }>()
const size = props.size || 24
</script>

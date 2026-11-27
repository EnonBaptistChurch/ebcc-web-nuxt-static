<template>
  <svg
    :width="size"
    :height="size"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
  </svg>
</template>

<script setup lang="ts">
const props = defineProps<{ size?: number }>()
const size = props.size || 24
</script>

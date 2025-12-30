<script setup lang="ts">
import { ref, onMounted } from 'vue'

const passages = ref(['Proverbs 28:10-11', 'Psalms 28:1-2'])

onMounted(() => {
  passages.value.forEach(passage => {
    const links = document.querySelectorAll(`.bible-ref-${passage.replace(/\s+/g, '-')}`)
    links.forEach(link => {
      link.setAttribute('title', `Click to read ${passage} (NKJV)`)
    })
  })
})
</script>

<template>
  <p>
    <a
      v-for="passage in passages"
      :key="passage"
      :href="`https://www.biblegateway.com/passage/?search=${encodeURIComponent(passage)}&version=NKJV`"
      target="_blank"
      :class="`bible-ref-${passage.replace(/\s+/g, '-')}`"
      style="margin-right: 4px;"
    >
      {{ passage }}
    </a>
  </p>
</template>

<template>
  <div class="footer-column">
    <h4 class="column-title">
      <NuxtLink :href="link">{{ title }}</NuxtLink>
    </h4>
    <ul class="column-list">
      <li v-for="(item, idx) in items" :key="idx">
        <NuxtLink :href="item.link">{{ item.title }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  items: {
    type: Array,
    required: true
  }
});
</script>

<style scoped>
.footer-column {
  display: flex;
  flex-direction: column;
}

.column-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
  margin-top: 0;
}

.column-title a {
  color: inherit;
  text-decoration: none;
}

.column-title a:hover {
  opacity: 0.8;
}

.column-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.column-list li {
  margin-bottom: 0.5rem;
}

.column-list a {
  color: inherit;
  text-decoration: none;
  font-size: 0.875rem;
}

.column-list a:hover {
  opacity: 0.8;
}
</style>
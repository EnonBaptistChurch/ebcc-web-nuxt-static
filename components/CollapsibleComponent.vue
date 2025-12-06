<template>
  <section class="item">
    <details>
      <summary>
        <span class="arrow">▼</span>
        {{ title }}
      </summary>
      <div class="content" v-html="content"></div>
    </details>
  </section>
</template>

<script setup>
defineProps({
  title: String,
  content: String
})
</script>

<style scoped>
.item {
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 1rem;
  overflow: hidden;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
}

/* Style the summary */
summary {
  background: var(--nav-bar-bg-color);
  color: var(--button-text-color);
  padding: 0.75rem 1rem;
  /* font-weight: bold; */
  cursor: pointer;
  justify-content: space-between;
  align-items: center;
  list-style: none; /* Remove default marker */
  outline: none;
}

/* Optional hover effect */
summary:hover {
  background: #eaeaea;
  color: var(--nav-bar-bg-color);
}

/* Arrow rotation */
.arrow {
  display: inline-block;
  transition: transform 0.3s ease;
  transform: rotate(-90deg);
  font-size: 0.8rem; /* Smaller arrow */
}

/* Rotate arrow when open */
details[open] .arrow {
  transform: rotate(0deg);
}

/* FAQ content styling */
.content {
  padding: 1rem;
  background-color: white;
  border-top: 1px solid #ddd;
}

</style>

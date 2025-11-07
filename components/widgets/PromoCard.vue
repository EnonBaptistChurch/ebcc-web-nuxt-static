<template>
  <NuxtLink :to="link" class="action-card">
    <div
      class="action-card__image"
      :style="{ backgroundImage: `url(${image})` }"
      role="img"
      :aria-label="ariaLabel"
    ></div>
    <div class="action-card__content">
      <h3 class="action-card__title">{{ title }}</h3>
      <p class="action-card__description">{{ description }}</p>
      <a :href="link" class="action-card-grid__button">{{ buttonText }}</a>
    </div>
  </NuxtLink>
</template>

<script setup>
defineProps({
  image: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
  ariaLabel: { type: String, default: '' },
  buttonText: { type: String, required: true },
})
</script>

<style scoped>
.action-card {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 6px 16px rgba(0,0,0,0.1);
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  max-width: 300px;
    margin: auto;
}

.action-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.15);
}

.action-card__image {
  width: 100%;
  padding-top: 60%; /* maintain aspect ratio */
  background-size: cover;
  background-position: center;
  transition: transform 0.5s ease;
}

.action-card:hover .action-card__image {
  transform: scale(1.05);
}

.action-card__content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.action-card__title {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;
}

.action-card__description {
  font-size: 1rem;
  color: #555;
  margin: 0;
}

.action-card-grid__button {
  align-self: flex-start;
  display: inline-block;
  text-decoration: none;
  background-color: var(--button-bg-color, #007bff);
  color: #fff;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  transition: background-color 0.3s ease;
}

.action-card-grid__button:hover {
  background-color: #0056b3;
}

/* RESPONSIVE */
@media (max-width: 600px) {
  .action-card__title {
    font-size: 1.1rem;
  }

  .action-card__description {
    font-size: 0.95rem;
  }
}
</style>

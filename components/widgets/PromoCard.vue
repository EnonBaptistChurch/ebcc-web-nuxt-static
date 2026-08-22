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
  background-color: var(--body-bg-color, #fff); 
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 6px 16px rgba(0,0,0,0.1);
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  max-width: 300px;
  margin: auto;
  width: 100%;
}

.action-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.15);
}

.action-card__image {
  width: 100%;
  padding-top: 75%; /* maintain aspect ratio */
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

/* HORIZONTAL LAYOUT: Only for mobile screens between 380px and 599px (1-column mode) */
@media (min-width: 360px) {
  .action-card {
    flex-direction: row;
    max-width: 100%; /* Expand to fill single column width */
  }

  .action-card__image {
    width: 40%;
    padding-top: 0; /* Clear ratio padding for row mode */
    min-height: 150px;
    flex-shrink: 0;
  }

  .action-card__content {
    width: 60%;
    justify-content: center;
    padding: 1rem;
  }

  .action-card__title {
    font-size: 1.1rem;
  }

  .action-card__description {
    font-size: 0.9rem;
  }
}

/* VERY SMALL MOBILE (< 380px) */
@media (max-width: 359px) {
  .action-card__title {
    font-size: 1.1rem;
  }

  .action-card__description {
    font-size: 0.95rem;
  }
}
</style>
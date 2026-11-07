<script lang="ts" setup>
withDefaults(
  defineProps<{
    heading?: string
    text?: string
    phone?: string
    to?: string
  }>(),
  {
    heading: 'Get in touch',
    text: "Have a question, or want to know more about us or about Christianity? We'd love to hear from you.",
    phone: '07508 779145',
    to: '/contact'
  }
)
</script>

<template>
  <!-- The wrapper lets the card respond to the space it is given (full width or half) -->
  <div class="callout-wrap">
    <section class="callout" aria-labelledby="callout-heading">
      <div class="callout__body">
        <h2 id="callout-heading" class="callout__heading">{{ heading }}</h2>
        <p class="callout__text">{{ text }}</p>
      </div>

      <div class="callout__actions">
        <NuxtLink :to="to" class="callout__btn callout__btn--primary">Send us a message</NuxtLink>
        <a :href="`tel:${phone.replace(/\s/g, '')}`" class="callout__btn callout__btn--ghost">
          Call {{ phone }}
        </a>
      </div>
    </section>
  </div>
</template>

<style scoped>
.callout-wrap {
  container-type: inline-size;
  height: 100%;
}

.callout {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  height: 100%;
  padding: 2rem 2.25rem;
  color: var(--button-color, #fff);
  background: linear-gradient(
    135deg,
    var(--nav-bar-bg-color, #1f3a5f),
    color-mix(in srgb, var(--nav-bar-bg-color, #1f3a5f) 70%, #000)
  );
  border-radius: 1rem;
  box-shadow: 0 10px 30px -12px rgb(0 0 0 / 0.35);
}

.callout__body {
  flex: 1;
}

.callout__heading {
  margin: 0 0 0.4rem;
  font-size: 1.6rem;
  line-height: 1.2;
}

.callout__text {
  max-width: 520px;
  margin: 0;
  line-height: 1.6;
  opacity: 0.92;
}

.callout__actions {
  display: flex;
  flex: none;
  flex-direction: column;
  gap: 0.75rem;
  min-width: 220px;
}

.callout__btn {
  display: block;
  padding: 0.8rem 1.25rem;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  border: 1px solid var(--button-color, #fff);
  border-radius: 0.6rem;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.callout__btn--primary {
  color: var(--nav-bar-bg-color, #1f3a5f);
  background: var(--button-color, #fff);
}

.callout__btn--primary:hover {
  color: var(--button-color, #fff);
  background: transparent;
}

.callout__btn--ghost {
  color: var(--button-color, #fff);
  background: transparent;
}

.callout__btn--ghost:hover {
  color: var(--nav-bar-bg-color, #1f3a5f);
  background: var(--button-color, #fff);
}

.callout__btn:focus-visible {
  outline: 3px solid color-mix(in srgb, var(--button-color, #fff) 60%, transparent);
  outline-offset: 2px;
}

/* Stack when the card is narrow (half-width column or mobile) */
@container (max-width: 700px) {
  .callout {
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    gap: 1.25rem;
    padding: 1.5rem;
    text-align: center;
  }

  .callout__body {
    flex: none;
  }

  .callout__text {
    margin: 0 auto;
  }

  .callout__actions {
    min-width: 0;
  }
}
</style>
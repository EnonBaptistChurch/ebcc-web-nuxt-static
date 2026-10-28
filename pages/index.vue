<template>
  <div class="home">
    <div class="hero">
      <ChurchImage>
        <h1 class="home-title">Welcome to Enon Baptist Church</h1>
      </ChurchImage>

      <aside class="services" aria-labelledby="services-heading">
        <h2 id="services-heading" class="services__title">Our Lord's Day Services</h2>

        <dl class="services__list">
          <div
            v-for="service in services"
            :key="service.name"
            class="services__item"
          >
            <dt class="services__name">{{ service.name }}</dt>
            <dd class="services__time">{{ service.time }}</dd>
          </div>
        </dl>

        <NuxtLink to="/whats-on" class="services__link">
          <span>See what’s on</span>
          <span class="services__arrow" aria-hidden="true">&rarr;</span>
        </NuxtLink>
      </aside>
    </div>

    <section class="intro">
      <p class="intro__text">
        We are a group of people who meet together to worship God. We are
        concerned for one another and those who live around us. We believe the
        Bible to be God’s Word that is relevant to all areas of our life. In
        particular, we have a personal belief in Jesus Christ and through him
        have a real relationship with God.
      </p>
    </section>

    <ClientOnly>
      <PromoCards />
    </ClientOnly>

    <BibleVerseParallaxOverlay
      image="/images/field.webp"
      verseText="For God so loved the world that He gave His only begotten Son, that whoever believes in Him should not perish but have everlasting life."
      reference="John 3:16"
      version="NKJV"
    />
  </div>
</template>

<script setup lang="ts">
import BibleVerseParallaxOverlay from '../components/BibleVerseParallaxOverlay.vue';
import PromoCards from '../components/widgets/PromoCards.vue';
import ChurchImage from '../components/ChurchImage.vue';

const services = [
  { name: 'Sunday Morning Worship', time: '11:15 am' },
  { name: 'Sunday Evening Service', time: '6:30 pm' },
];
</script>

<style scoped>

.home {
  /* Guards against any child pushing the page wider than the screen */
  overflow-x: hidden;
  --services-text-wide: #fff;
  --services-text: var(--nav-bar-bg-color);
}

.home-title {
  margin: 0;
  max-width: 66ch;
  font-size: clamp(1.25rem, 5vw, 2rem);
  line-height: 1.15;
  font-weight: 200;
  letter-spacing: -0.01em;
  text-wrap: balance;
  text-shadow: 0 2px 14px rgba(0, 0, 0, 0.5);
}

/* Wrapper so the card can be positioned against the image on desktop */
.hero {
  position: relative;
}

/* Intro text */
.intro {
  box-sizing: border-box;
  width: 100%;
  max-width: 66rem;
  margin: 0 auto;
  padding: 1rem 1.25rem;
}

.intro__text {
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  margin: 0;
  font-size: clamp(1rem, 1.4vw, 1.15rem);
  line-height: 1.5;
  color: #374151;
  text-align: center;
  overflow-wrap: break-word;
  text-wrap: pretty;
}

/* Services card. Mobile: sits in the normal flow, directly under the image */
.services {

  box-sizing: border-box;
  margin: 0.25rem 0.25rem 0;
  padding: 0.5rem 0.75rem 0.5rem;
  border: 1px solid rgba(17, 24, 39, 0.06);
  
  border-radius: 0.75rem;
  box-shadow:
    0 1px 2px rgba(17, 24, 39, 0.04),
    0 12px 28px -12px rgba(17, 24, 39, 0.18);
  color: var(--services-text);
}

.services__title {
  margin: 0rem;
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.01em;
  color: var(--services-text);
}

/* Services side by side */
.services__list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
  gap: 0.5rem 0;
  margin: 0;
  padding: 0;
}

.services__item {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  padding: 0.25rem 0.25rem;
  /* border-left: 1px solid #e5e7eb; */
}

.services__item:first-child {
  padding-left: 0;
  border-left: none;
}

.services__name {
  margin: 0;
  padding: 0;
  font-size: 0.85rem;
  font-weight: 400;
  color: var(--services-text);
}

.services__time {
  margin: 0;
  padding: 0;
  font-size: 1.25rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: var(--services-accent);
  white-space: nowrap;
}

.services__link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.25rem;
  padding-top: 0.2rem;
  border-top: 1px solid #e5e7eb;
  font-weight: 500;
  color: var(--services-accent);
  text-decoration: none;
}

.services__arrow {
  transition: transform 0.2s ease;
}


.services__link:hover .services__arrow,
.services__link:focus-visible .services__arrow {
  transform: translateX(4px);
}

.services__link:hover,
.services__link:focus-visible {
  color: var(--services-text);
}

@media (prefers-reduced-motion: reduce) {
  .services__arrow {
    transition: none;
  }
}

/* Desktop: card floats in the bottom right corner of the image */
@media (min-width: 876px) {
  .services {
    position: absolute;
    right: 0.75rem;
    bottom: 0.15rem;  
    z-index: 2;
    width: 24rem;
    max-width: calc(100% - 4rem);
    margin: 0;
  color: var(--services-text-wide);
  padding: 0.25rem;
  
}


.services__title {
  color: var(--services-text-wide);
}

.services__item {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  padding: 0.25rem 0.25rem;
  /* border-left: 1px solid #e5e7eb; */
}

.services__name {
  color: var(--services-text-wide);
}

.services__link:hover,
.services__link:focus-visible {
  color: var(--body-bg-color);
}
}

@media (max-width:340px ) {
  .services__item {
    border-left: none;
  padding-left: 0;  
  }
  .services__list {
    gap: 0.25rem;
  }
}


</style>
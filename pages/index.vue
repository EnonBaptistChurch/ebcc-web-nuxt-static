<template>
  <div class="home">
    <ChurchImage>
      <h1 class="home-title">Welcome to Enon Baptist Church</h1>
    </ChurchImage>

    <section class="intro">
      <p class="intro__text">
        We are a group of people who meet together to worship God. We are
        concerned for one another and those who live around us. We believe the
        Bible to be God’s Word that is relevant to all areas of our life. In
        particular, we have a personal belief in Jesus Christ and through him
        have a real relationship with God.
      </p>

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

/* Mobile first: single column, services sit directly under the image */
.intro {
  box-sizing: border-box;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1rem;
  width: 100%;
  max-width: 66rem;
  margin: 0 auto;
  padding: 0.75rem 1.25rem 1rem;
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


/* Services card */
.services {
  --services-accent: #1e4a73;

  order: -1;
  box-sizing: border-box;
  padding: 1rem 1.25rem 0.75rem;
  background: #fff;
  border: 1px solid rgba(17, 24, 39, 0.06);
  border-top: 4px solid var(--services-accent);
  border-radius: 0.75rem;
  box-shadow:
    0 1px 2px rgba(17, 24, 39, 0.04),
    0 12px 28px -12px rgba(17, 24, 39, 0.18);
  color: #374151;
}

.services__title {
  margin: 0 0 0.25rem;
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.01em;
  color: #111827;
}

.services__list {
  margin: 0;
  padding: 0;
}

/* Name on the left, time on the right, same line */
.services__item {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.25rem 1rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f0ece6;
}



.services__item:last-child {
  border-bottom: none;
}

.services__name {
  margin: 0;
  padding: 0;
  font-weight: 400;
  color: #1f2937;
}

.services__time {
  margin: 0;
  padding: 0;
  font-size: 0.95rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: var(--services-accent);
  white-space: nowrap;
}

/* Footer link, separated from the list */
.services__link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.25rem;
  padding-top: 0.6rem;
  border-top: 1px solid #e5e7eb;
  font-weight: 500;
  color: var(--services-accent);
  text-decoration: none;
}

.services__arrow {
  transition: transform 0.2s ease;
}

.services__link:hover,
.services__link:focus-visible {
  color: #163a5c; /* slightly darker than the accent */
}

.services__link:hover .services__arrow,
.services__link:focus-visible .services__arrow {
  transform: translateX(4px);
}

@media (prefers-reduced-motion: reduce) {
  .services__arrow {
    transition: none;
  }
}

/* Desktop: text on the left, services on the right */
@media (min-width: 768px) {
  .intro {
    grid-template-columns: minmax(0, 1fr) 21rem;
    gap: 3rem;
    align-items: center;
    padding: 0.5rem 1.25rem 1rem;
  }

  .services {
    order: 0;
  }

  .intro__text {
    text-align: left;
  }
}
</style>
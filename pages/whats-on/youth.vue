<!-- pages/whats-on/youth.vue -->
<template>
  <div>
  <!-- Banner, hero, facts, notice, Find us and SEO all come from layouts/whats-on.vue -->
    <!-- <section class="carousel-section">
      <ClientOnly>
      <swiper-container
        :slides-per-view="2"
        :space-between="16"
        :loop="true"
        :autoplay="{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }"
        :pagination="{ clickable: true }"
        :navigation="true"
        :breakpoints="{
          480: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }"
        class="custom-swiper"
      >
        <swiper-slide v-for="n in 12" :key="n">
          <img
            :src="`/images/whats-on/discoverers/${n}.jpeg`"
            :alt="`Discoverers photo ${n}`"
            class="aspect-3-2"
            loading="lazy"
          />
        </swiper-slide>
      </swiper-container>
      </ClientOnly>
    </section> -->

    <p>
      <strong>Discoverers</strong> is our youth group for secondary school-aged young people.
      It's a friendly, relaxed evening, and young people are welcome to come along
      with a friend or on their own.
    </p>

    <h2>What's an evening like?</h2>
    <ol class="evening">
      <li>
        <span class="step-num" aria-hidden="true">01</span>
        <strong>Games to start</strong>
        <span class="step-text">Table tennis, card games, small board games and the occasional bit of origami.</span>
      </li>
      <li>
        <span class="step-num" aria-hidden="true">02</span>
        <strong>Drinks and biscuits</strong>
        <span class="step-text">Refreshments are provided for everyone. There is no cost for these refreshments.</span>
      </li>
      <li>
        <span class="step-num" aria-hidden="true">03</span>
        <strong>A short Christian talk</strong>
        <span class="step-text">We look at what the Bible says and we look at who Jesus is and what it means to follow him.</span>
        <span class="step-text step-note">Questions are always welcome.</span>
      </li>
      <li>
        <span class="step-num" aria-hidden="true">04</span>
        <strong>More games to finish</strong>
        <span class="step-text">We round off the evening with different activities, these can be team games or individual activities.</span>
      </li>
    </ol>

    <div class="side-by-side">
      <p class="mix-title"><strong>Every so often we mix it up with:</strong></p>

      <div class="mix-up">
        <div class="mix-group">
          <span class="mix-label">Winter <br />& Spring</span>
          <ul>
            <li>Making pizzas and pancakes</li>
            <li>Tasks / Challenge nights, with a prize at the end</li>
          </ul>
        </div>

        <div class="mix-group">
          <span class="mix-label">Summer</span>
          <ul>
            <li>Water fights and football in the Church Car Park</li>
            <li>Games at the park</li>
            <li>Snow tubing and tobogganing at Capstone Country Park</li>
          </ul>
        </div>

        <div class="mix-group">
          <span class="mix-label">All year</span>
          <ul>
            <li>Joint evenings with other local Gospel Church Youth Groups</li>
          </ul>
        </div>
      </div>

      <div class="ep-box">
        <p>
          <strong>Our hope</strong> is that every young person who comes along will have fun in a safe,
          friendly environment, and also hear about Jesus, have the chance to ask their own questions,
          and get to know him for themselves.
        </p>
        <p class="end-ep-box-note">
          If you have any questions, <NuxtLink to="/contact-us/">get in touch</NuxtLink>.
        </p>
      </div>
    </div>

    <TestimonyCard
    to="/testimonies/patrick-nkala"
    heading="Read how one of our youth leaders became a Christian"
    image-src="/images/PN-320.webp"
    image-alt="Patrick Nkala"
    name="Patrick Nkala"
    role="Youth Leader, Discoverers"
    cta-text="Read his testimony →"
    class="testimony"
  />
  </div>
</template>

<script setup lang="ts">
import TestimonyCard from '~/components/testimonies/testimonyWidget.vue'
import { onMounted } from 'vue';

// definePageMeta is auto-imported by Nuxt and compiled ahead of time,
// so it can only contain plain values.
definePageMeta({
  layout: 'whats-on',
  whatsOn: {
    title: 'Discoverers',
    subtitle: 'Youth group for ages 11–16 at Enon Baptist Church, Chatham',
    heroImage: '/images/whats-on/discoverers/potential_hero2.jpeg', // uncomment to put a photo behind the heading
    facts: [
      { title: 'Every other Friday', detail: 'During term time' },
      { title: '7:30 – approx. 9:15pm', detail: 'In the church hall' },
      { title: 'Ages 11 – 16', detail: 'Year 7 and up' }
    ],
    notice: {
      label: 'First-time attendees:',
      text: 'Parents will need to complete a consent form for their child to join.'
    },

    pageUrl: 'https://enonbaptistchatham.org.uk/whats-on/discoverers/',
    metaTitle: 'Discoverers Youth Group - Enon Baptist Church',
    description:
      'Join Discoverers, the youth group for 11-16 year olds at Enon Baptist Church, Chatham. Enjoy games, activities, and a Christian message every other Friday during term time.',

    event: {
      name: 'Discoverers Youth Group',
      byDay: 'Friday',
      startTime: '19:30',
      endTime: '21:15',
      typicalAgeRange: '11-16',
      repeatFrequency: 'P2W'
    }
  }
});


</script>

<style scoped>
.carousel-section {
  padding-top: 1rem;
  width: 100%;
  margin-bottom: 1.5rem;
}

.aspect-3-2 {
  width: 100%;
  height: 100%;
  aspect-ratio: 2.5 / 2;
  object-fit: cover;
  border-radius: 10px;
  display: block;
}

.custom-swiper {
  width: 100%;
  --swiper-theme-color: #2b6cb0;

  /* Navigation buttons */
  --swiper-navigation-size: 26px;
  --swiper-navigation-color: #fafafa;

  /* Pagination dots */
  --swiper-pagination-bullet-size: 10px;
  --swiper-pagination-color: #2b6cb0;
  --swiper-pagination-bullet-inactive-color: #94a3b8;
  --swiper-pagination-bullet-inactive-opacity: 0.5;
  --swiper-pagination-bullet-horizontal-gap: 6px;
  
}

.custom-swiper :deep(.swiper-button-next::after),
.custom-swiper :deep(.swiper-button-prev::after) {
  font-weight: 1000;
}

/* "What's an evening like?": four columns across, fewer on smaller screens */
.evening {
  list-style: none;
  margin: 1.25rem 0 1.75rem;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem 1.25rem;
}

.evening li {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding: 1rem 1.1rem 1.1rem;
  background: color-mix(in srgb, #fff 50%, #fdf6ec);
  color: #2b2b2b;
  border-top: 3px solid var(--nav-bar-bg-color);
  border-radius: 12px;
  box-shadow: 0 16px 14px rgba(0, 0, 0, 0.12);
}



.step-num {
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--nav-bar-bg-color);
}

.evening li strong {
  font-size: 1rem;
  color: var(--nav-bar-bg-color);
}

.step-text {
  line-height: 1.5;
  opacity: 0.85;
  font-size: 0.85rem;
}

/* Highlighted line, e.g. "Questions are always welcome." */
.step-note {
  margin-top: 0.25rem;
  font-weight: 500;
  font-style: italic;
  opacity: 1;
}

@media (max-width: 900px) {
  .evening {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Phones: keep two columns so the evening stays compact, with slightly smaller text */
@media (max-width: 520px) {
  .evening {
    gap: 1.1rem 1rem;
  }

  .evening li {
    padding: 0.8rem 0.85rem 0.9rem;
  }

  .evening li strong {
    font-size: 1rem;
  }

  .step-text {
    font-size: 0.9rem;
    line-height: 1.4;
  }
}

/* "Mix it up" note and "Our hope" note, side by side (stacked on small screens) */
.side-by-side {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin: 1.75rem 0 2rem;
}

.side-by-side {
  align-items: stretch;
}

/* Heading sits above the groups only; the "Our hope" box starts level with the first group */
.mix-title {
  grid-column: 1;
  grid-row: 1;
  margin: 0;
}

.side-by-side .mix-up {
  grid-column: 1;
  grid-row: 2;
  margin: 0;
  line-height: 1.5;
}

.mix-up ul {
  list-style: none;
  margin: 0.25rem 0 0;
  padding: 0;
}

.mix-group {
  display: grid;
  grid-template-columns: 2.6rem 1fr;
  column-gap: 0.4rem;
  align-items: center;
  margin-top: 0.6rem;
  padding: 0.35rem 0.2rem 0.35rem 0.2rem;
  background: color-mix(in srgb, #fff 40%, #fdf6ec);
  color: #2b2b2b;
  border-top: 3px solid var(--nav-bar-bg-color);
  border-radius: 12px;
  box-shadow: 0 16px 14px rgba(0, 0, 0, 0.12);
}

.mix-group ul {
  margin: 0;
}

/* Group heading runs up the left-hand side, rotated 90 degrees */
.mix-label {
  justify-self: center;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  text-align: center;
  line-height: 1.2;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--nav-bar-bg-color);
}

.mix-up li {
  padding: 0.2rem 0;
  line-height: 1.4;
  font-size: 0.8rem;
}

/* Right-hand box fills the same height as the list, text centred in it */
.side-by-side .ep-box {
  grid-column: 2;
  grid-row: 2;
  margin-top: 0.6rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}


/* When stacked (phones/small tablets): lines between items when a group has more than one */
@media (max-width: 500px) {
  .mix-up li,
  .mix-up li:last-child {
    display: block;
    padding: 0.35rem 0;
  }

  .mix-up li + li {
    border-top: 1px solid color-mix(in srgb, currentColor 18%, transparent);
  }

  /* Headings go back to normal horizontal text above each group */
  .mix-group {
    display: block;
  }

  .mix-label {
    writing-mode: horizontal-tb;
    transform: none;
    text-align: left;
    display: block;
    margin-bottom: 0.15rem;
  }

  .mix-label br {
    display: none;
  }
}

.side-by-side .ep-box {
  margin: 0.6rem 0 0;
  line-height: 1.6;
}

@media (max-width:425px) {
  
  .ep-box p {
    font-size: 0.85rem;
  }
}

@media (max-width: 360px) {
  .side-by-side {
    grid-template-columns: 1fr;
  }

  .mix-title,
  .side-by-side .mix-up,
  .side-by-side .ep-box {
    grid-column: auto;
    grid-row: auto;
  }
  .ep-box p {
    font-size: 0.8rem;
  }
}

.ep-box a {
  font-weight: 700;
  text-decoration: underline;
  color: inherit;
}

.ep-box .end-ep-box-note  {
  margin-top: 0.75rem;
}

.testimony {
  margin-top: 2rem;
}

</style>
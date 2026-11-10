<template>
  <div class="text-content">
    <article class="about">
      <header class="about-header">
        <h1>Welcome To Enon Baptist Church</h1>

        <p class="about-lead">
          We are a group of people who meet together to worship God. We are concerned for one another and those who live around us. We believe the Bible to be God’s Word, relevant to all areas of life. In particular, we have a personal belief in Jesus Christ and through Him have a real relationship with God.
        </p>
      </header>

      <section class="about-sundays" aria-labelledby="sundays">
        <h2 id="sundays">Join Us on Sundays</h2>

        <p>
          Everyone is given a warm welcome at Enon. Our worship is God-focused and traditional in style. We sing hymns, read the Bible, pray, and listen to God speak through the preaching of His Word. </p>
          <p>After the services we share tea and coffee, and most people stay to get to know each other better and encourage one another — all are welcome to stay.
        </p>

        <blockquote class="about-verse">
        <p>
          “For God so loved the world that He gave His only begotten Son, that whoever believes in Him should not perish but have everlasting life.”
        </p>
        <footer>John 3:16, NKJV</footer>
      </blockquote>
      </section>

      <!-- Right-hand column on desktop. On mobile it dissolves so the pieces can sit in their own places -->
      <div class="about-aside">
        <div class="about-pastor">
          <PastorMessageComponent />
        </div>

        <aside class="about-times" aria-labelledby="times">
          <h2 id="times">Service Times</h2>

          <ul class="about-services">
            <li v-for="service in services" :key="service.time">
              <span class="about-service-time">{{ service.time }}</span>
              <span class="about-service-name">{{ service.name }}</span>
              <span v-if="service.recommended" class="about-badge">Best for first-time visitors</span>
            </li>
          </ul>
        </aside>
      </div>

      <section class="about-more" aria-labelledby="more">
        <h2 id="more">Find Out More</h2>

        <ul class="about-links">
          <li v-for="link in links" :key="link.to">
            <NuxtLink :to="link.to">{{ link.title }}</NuxtLink>
            <span class="about-link-desc">{{ link.description }}</span>
          </li>
        </ul>
      </section>

      
    </article>
  </div>
</template>

<script setup lang="ts">
import { useHead } from 'nuxt/app';
import PastorMessageComponent from '~/components/PastorMessageComponent.vue';

useHead({
  title: 'About Us - Enon Baptist Church',
  meta: [
    {
      name: 'description',
      content: 'Learn more about Enon Baptist Church in Chatham, Kent. Discover our beliefs, worship style, and what to expect when you visit us.'
    }
  ]
});

const services = [
  { time: '11:15am', name: 'Morning Worship', recommended: true },
  { time: '6:30pm', name: 'Evening Worship', recommended: false }
];

const links = [
  {
    to: '/about/what-we-believe',
    title: 'What We Believe',
    description: 'The truths from God’s Word that we hold to.'
  },
  {
    to: '/about/leaders',
    title: 'Our Leaders',
    description: 'Those who serve and care for the church family.'
  },
  {
    to: '/about/church-history',
    title: 'Church History',
    description: 'How God has led Enon through the years.'
  }
];
</script>

<style scoped>
.about {
  --about-line: rgb(0 0 0 / 0.12);
  --about-strong: rgb(0 0 0 / 0.45);
  --about-muted: rgb(0 0 0 / 0.6);

  display: grid;
  gap: 1.5rem;
  max-width: 64rem;
  margin-inline: auto;
  padding-block: 1.5rem 3rem;
}

.about,
.about *,
.about *::before,
.about *::after {
  box-sizing: border-box;
}

/* One consistent text style for everything on the page */
.about p {
  margin: 0 0 1rem;
  font-size: 1rem;
  line-height: 1.7;
}

.about p:last-child {
  margin-bottom: 0;
}

.about h1 {
  margin: 0 0 1rem;
}

.about h2 {
  margin: 0 0 0.75rem;
}

.about .about-lead {
  font-size: 1.15rem;
}

/* ---------- Service times ---------- */
.about .about-times {
  padding-top: 1.5rem;
  border-top: 1px solid var(--about-line);
}

.about .about-services {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin: 1.25rem 0 0;
  padding: 0;
  list-style: none;
}

.about .about-services li {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.15rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.about .about-service-time {
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 1.2;
}

.about .about-service-name {
  color: var(--about-muted);
}

.about .about-badge {
  margin-top: 0.4rem;
  padding: 0.1rem 0.65rem;
  border: 1px solid var(--about-strong);
  border-radius: 999px;
  font-size: 0.75rem;
  line-height: 1.5;
}

/* ---------- Links: 1 / 2 / 4 columns ---------- */
.about .about-more {
  margin-top: 1rem;
}

.about .about-links {
  display: grid;
  gap: 1.5rem;
  margin: 1.25rem 0 0;
  padding: 0;
  list-style: none;
}

@media (min-width: 24rem) {
  .about .about-links {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 56rem) {
  .about .about-links {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem 2rem;
  }
}

.about .about-links li {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin: 0;
  padding: 0.75rem 0 0;
  border-top: 2px solid var(--about-line);
  list-style: none;
  transition: border-color 0.15s ease;
}

.about .about-links li:hover,
.about .about-links li:focus-within {
  border-top-color: var(--about-strong);
}

.about .about-links a,
.about .about-links a:visited {
  color: inherit;
  font-weight: 600;
  text-decoration: none;
}

.about .about-links a:hover,
.about .about-links a:focus-visible {
  text-decoration: underline;
}

/* Makes the whole block clickable */
.about .about-links a::after {
  content: '';
  position: absolute;
  inset: 0;
}

.about .about-link-desc {
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--about-muted);
}

/* ---------- Verse ---------- */
.about .about-verse {
  margin: 1rem 0 0;
  padding: 1.5rem 0 0;
  border-top: 1px solid var(--about-line);
}

.about .about-verse p {
  max-width: 40rem;
  font-style: italic;
}

.about .about-verse footer {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: var(--about-muted);
}

/* ---------- Mobile: single column, pastor's message towards the bottom ---------- */
@media (max-width: 47.99rem) {
  /* Let the pastor message and service times become direct items of the page grid */
  .about .about-aside {
    display: contents;
  }

  .about .about-header { order: 1; }
  .about .about-sundays { order: 2; }
  .about .about-times { order: 3; }
  .about .about-more { order: 4; }
  .about .about-pastor { order: 5; }
  .about .about-verse { order: 6; }
}

/* ---------- Desktop: text on the left, pastor's message and times on the right ---------- */
@media (min-width: 48rem) {
  .about {
    grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);
    gap: 1.5rem 4rem;
    align-items: start;
  }

  .about .about-header {
    grid-column: 1;
    grid-row: 1;
  }

  .about .about-sundays {
    grid-column: 1;
    grid-row: 2;
  }

  .about .about-aside {
    grid-column: 2;
    grid-row: 1 / span 2;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding-left: 2.5rem;
    border-left: 1px solid var(--about-line);
  }

  .about .about-services {
    grid-template-columns: 1fr;
  }

  .about .about-more,
  .about .about-verse {
    grid-column: 1 / -1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .about .about-links li {
    transition: none;
  }
}
</style>
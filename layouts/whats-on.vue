<!--
  layouts/whats-on.vue

  Reusable layout for "What's on" pages. It supplies the banner, hero, fact cards,
  notice box, "Find us" card and all the <head>/SEO/structured data.
  The page itself only provides the body content (through the default slot) and its details
  through definePageMeta({ layout: 'whats-on', whatsOn: { ... } }).
-->
<template>
  <div class="ep-page">
    <Nav />
    <ClientOnly>
      <ScrollingBanner :notices="bannerNotices" :speed="70" />
    </ClientOnly>

    <header class="ep-hero" :class="{ 'ep-hero--placeholder': !info.heroImage }" :style="heroStyle">
      <div class="ep-hero-inner">
        <h1>{{ info.title }}</h1>
        <p v-if="info.subtitle" class="ep-subtitle">{{ info.subtitle }}</p>
      </div>
    </header>

    <div class="text-content">
      <div class="text-wrapper">
        <ul v-if="info.facts?.length" class="ep-facts" aria-label="Key details">
          <li v-for="fact in info.facts" :key="fact.title">
            <strong>{{ fact.title }}</strong>
            <span v-if="fact.detail">{{ fact.detail }}</span>
          </li>
        </ul>

        <p v-if="info.notice" class="ep-box">
          <strong>{{ info.notice.label }}</strong> {{ info.notice.text }}
        </p>

        <!-- The page's own content goes here -->
        <slot />

        <div class="ep-card ep-find">
          <strong>Find us:</strong> {{ address }}
          <div class="low-card">
            <a v-for="link in links" :key="link.href" :href="link.href">{{ link.label }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Nav from '../components/nav/Nav.vue';
import ScrollingBanner from '../components/ScrollingBanner.vue';
import { computed } from 'vue';
import { useRoute, useHead } from 'nuxt/app';
import { bannerNotices } from '../data/BannerNotices';

interface WhatsOnInfo {
  title: string;
  subtitle?: string;
  heroImage?: string;
  heroPosition?: string;
  facts?: { title: string; detail?: string }[];
  notice?: { label: string; text: string };
  // SEO
  pageUrl: string;
  metaTitle: string;
  description: string;
  // Optional: adds schema.org Event data
  event?: {
    name: string;
    byDay: string; // e.g. 'Thursday'
    startTime: string; // '09:00'
    endTime: string; // '11:00'
    typicalAgeRange?: string;
    isAccessibleForFree?: boolean;
    /** ISO 8601 duration. Defaults to weekly ('P1W'); use 'P2W' for fortnightly */
    repeatFrequency?: string;
  };
  // Optional overrides for the Find us card
  address?: string;
  links?: { label: string; href: string }[];
}

const route = useRoute();
const info = computed(() => (route.meta.whatsOn ?? {}) as WhatsOnInfo);

const address = computed(() => info.value.address ?? 'Skinner Street, Chatham, ME4 5RF');
const links = computed(
  () =>
    info.value.links ?? [
      { label: 'Directions', href: '/find-us/' },
      { label: 'What’s on at Enon', href: '/whats-on' },
      { label: 'Contact us', href: '/contact-us/' }
    ]
);

const heroStyle = computed(() =>
  info.value.heroImage
    ? {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.55)), url('${info.value.heroImage}')`,
        backgroundPosition: info.value.heroPosition ?? 'center 2%',
        backgroundSize: 'cover'
      }
    : {}
);

const structuredData = computed(() => {
  const e = info.value.event;
  if (!e) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: e.name,
    description: info.value.description,
    url: info.value.pageUrl,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    ...(e.isAccessibleForFree !== undefined && { isAccessibleForFree: e.isAccessibleForFree }),
    ...(e.typicalAgeRange && { typicalAgeRange: e.typicalAgeRange }),
    eventSchedule: {
      '@type': 'Schedule',
      byDay: `https://schema.org/${e.byDay}`,
      startTime: e.startTime,
      endTime: e.endTime,
      repeatFrequency: e.repeatFrequency ?? 'P1W',
      scheduleTimezone: 'Europe/London'
    },
    location: {
      '@type': 'Place',
      name: 'Enon Baptist Church',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Skinner Street',
        addressLocality: 'Chatham',
        addressRegion: 'Kent',
        postalCode: 'ME4 5RF',
        addressCountry: 'GB'
      }
    },
    organizer: {
      '@type': 'Organization',
      name: 'Enon Baptist Church',
      url: 'https://enonbaptistchatham.org.uk/'
    }
  };
});

useHead(() => ({
  title: info.value.metaTitle,
  meta: [
    { name: 'description', content: info.value.description },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'Enon Baptist Church' },
    { property: 'og:title', content: info.value.metaTitle },
    { property: 'og:description', content: info.value.description },
    { property: 'og:url', content: info.value.pageUrl },
    { property: 'og:locale', content: 'en_GB' },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:title', content: info.value.metaTitle },
    { name: 'twitter:description', content: info.value.description }
  ],
  link: [{ rel: 'canonical', href: info.value.pageUrl }],
  script: structuredData.value
    ? [{ type: 'application/ld+json', innerHTML: JSON.stringify(structuredData.value) }]
    : []
}));
</script>

<style>
/* Stops the full-width hero from causing a sideways scrollbar */
.ep-page {
  overflow-x: clip;
}

.text-wrapper {
  max-width: 800px;
  margin: 0 auto;
}
.text-content p {
  margin-bottom: 1rem;
}
.text-content h2 {
  margin-top: 1.75rem;
  margin-bottom: 0.75rem;
}
.text-content strong {
  font-weight: bold;
}

/*
  Hero banner: full width of the screen, image behind the heading.
  The fact cards overlap its bottom edge by 3rem, so bottom padding = top padding + 3rem.
*/
.ep-page .ep-hero {
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  box-sizing: border-box;
  min-height: clamp(10rem, 60vh, 40rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4rem 1.5rem 7rem;
  text-align: center;
  color: #fff;
  background-color: #2f3338;
  background-size: cover;
  background-position: center;
  border-radius: 0;
}
.ep-page .ep-hero--placeholder {
  background-image: linear-gradient(135deg, #4a4f57, #2f3338);
}
.ep-page .ep-hero-inner {
  max-width: 800px;
  margin: 0 auto;
}
.ep-page .ep-hero h1 {
  margin: 0 0 0.5rem;
  color: #fff;
  text-align: center;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
}
.ep-page .ep-hero .ep-subtitle {
  margin: 0;
  font-size: 1.1rem;
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.4);
}

/* Fact cards */
.text-content .ep-facts {
  list-style: none;
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  gap: 1rem;
  margin: -3rem 1rem 1.5rem;
  padding: 0;
}
.text-content .ep-facts li {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  background: #fff;
  border-radius: 12px;
  padding: 1.1rem 1rem;
  text-align: center;
  color: #2b2b2b;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
}
.text-content .ep-facts strong {
  font-size: 1.1rem;
}
.text-content .ep-facts span {
  font-size: 0.95rem;
  opacity: 0.75;
}

/* Highlighted boxes: tint follows the site's text colour */
.text-content .ep-box {
  background: color-mix(in srgb, currentColor 8%, transparent);
  border-left: 4px solid color-mix(in srgb, currentColor 35%, transparent);
  border-radius: 8px;
  padding: 0.85rem 1.1rem;
}
.text-content .ep-welcome {
  margin: 1.5rem 0 1rem;
  font-size: 1.1rem;
}

/* Photo beside the text (markup lives in the page) */
.text-content .ep-feature {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  gap: 1.5rem;
  margin: 1.5rem 0;
}
.text-content .ep-image-wrap {
  position: relative;
  flex: 0 0 200px;
  width: 200px;
  aspect-ratio: 3 / 4;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
}
.text-content .ep-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
}
.text-content .ep-feature-text {
  flex: 1;
  min-width: 0;
}
.text-content .ep-feature-text > :first-child {
  margin-top: 0;
}

/* Find us card */
.text-content .ep-card {
  background: #fff;
  border-radius: 12px;
  padding: 1rem 1.25rem;
  text-align: center;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
  margin: 1.5rem 0;
}
.ep-card a,
.ep-card a:hover {
  text-decoration: none;
  color: inherit;
  padding: 4px 12px;
}
.low-card {
  margin-top: 1rem;
}
.low-card a {
  background-color: var(--nav-bar-bg-color);
  color: var(--body-bg-color);
  border: 1px solid transparent;
  border-radius: 12px;
  box-shadow: 0 8px 14px rgba(0, 0, 0, 0.12);
  margin: 0 0.25rem;
}
.low-card a:hover {
  background-color: #faf4f1;
  color: var(--nav-bar-bg-color);
  border: 1px solid #0f0f0f;
}

/* Mobile */
@media (max-width: 600px) {
  .ep-page .ep-hero {
    min-height: 22rem;
    padding: 3rem 1rem;
  }

  /* Facts: plain text (no card). First fact on the left, the rest stacked on the right */
  .text-content .ep-facts {
    grid-template-columns: 1.2fr 1fr;
    gap: 0;
    margin: 0.5rem 0;
  }
  .text-wrapper .ep-facts li {
    background: transparent;
    border-radius: 0;
    box-shadow: none;
    padding: 0.1rem 1rem;
    color: inherit;
  }
  .text-wrapper .ep-facts li:first-child {
    grid-row: 1 / span 2;
    justify-content: center;
    padding: 1.1rem 1rem;
  }
  .text-wrapper .ep-facts li:first-child strong {
    font-size: 1rem;
  }
  .text-wrapper .ep-facts li:nth-child(n + 2) strong {
    font-size: 0.8rem;
    margin: 0.2rem 0 0;
  }
  .text-wrapper .ep-facts li:nth-child(n + 2) span {
    margin: 0;
    font-size: 0.8rem;
  }

  /*
    Photo moves to the bottom of the page: wrapper becomes a column, the feature wrappers
    dissolve (display: contents) and `order` pushes the photo down:
    text (0) -> photo (1) -> Find us card (2).
  */
  .text-content .text-wrapper {
    display: flex;
    flex-direction: column;
  }
  .text-content .ep-feature,
  .text-content .ep-feature-text {
    display: contents;
  }
  .text-content h2 {
    margin-top: 0.75rem;
  }
  .text-content .ep-image-wrap {
    order: 1;
    align-self: center;
    flex: none;
    width: 150px;
    aspect-ratio: 3 / 4;
    margin: 0.5rem 0 1.5rem;
  }
  .text-content .ep-find {
    order: 2;
  }

  /* Link buttons stack, full width */
  .text-content .low-card {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 0.75rem;
  }
  .text-content .low-card a {
    margin: 0;
    padding: 0.65rem 1rem;
    text-align: center;
  }
}
</style>
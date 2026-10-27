<template>
  <div class="fs-page">
    <ClientOnly>
    <ScrollingBanner :notices="bannerNotices" :speed="70" dismissible />
    </ClientOnly>
    <!-- Hero: the image sits behind the heading, edge to edge. Set heroImage in the script to use a photo. -->
    <header class="fs-hero">
      <div class="fs-hero-inner">
        <h1>First Steps</h1>
        <p class="fs-subtitle">Every Thursday in term time at Enon Baptist Church, Chatham</p>
      </div>
    </header>

    <div class="text-content">
      <div class="text-wrapper">
        <ul class="fs-facts" aria-label="Key details">
          <li>
            <strong>Thursdays, 9 - 11am</strong>
            <span>During term time</span>
          </li>
          <li>
            <strong>Free entry</strong>
            <span>Everyone welcome</span>
          </li>
          <li>
            <strong>Free parking</strong>
            <span>Available on site</span>
          </li>
        </ul>

        <p class="fs-box">
          <strong>Please note:</strong> parents/carers need to stay with their children.
        </p>

        <p>
          Enon First Steps is a friendly, welcoming baby and toddler group in Chatham, Medway, where little ones can
          play, explore and make new friends, while parents and carers enjoy a cuppa and connect with others.
        </p>

        <!-- Photo beside the text on desktop; moves to the bottom of the page on mobile -->
        <div class="fs-feature">
          <div class="fs-image-wrap">
            <img
              src="/images/whats-on/first-steps/portrait-640.webp"
              alt="Enon First Steps Craft"
              class="fs-image"
              loading="lazy"
            />
          </div>

          <div class="fs-feature-text">
            <p>
              We meet every Thursday during term time, from 9 - 11am, and everyone is welcome. Our sessions are
              completely free, with free parking available too!
            </p>

            <h2>Play, explore and enjoy</h2>

            <p>
              Our mornings begin with plenty of time for free play, with a variety of toys and activities for all ages
              and stages. From baby toys and small world play to role play, a slide and seesaws, there’s lots for little
              ones to discover. 
            </p>
            <p> We rotate some of our toys to keep things fresh and exciting. There is also a craft available for those
              who wish to do it. 
            </p>
            <p>
              During playtime, we
              offer toast and drinks for both children and adults to enjoy. 
            </p>
          </div>
        </div>

        <h2>Snacks, Bible story and songs</h2>

        <p>
          We finish each session with a snack, followed by a time of Bible story and songs, giving us a lovely
          opportunity to come together before heading home.
        </p>

        <p class="fs-box fs-welcome">
          Whether you’re a new parent in the area or have a curious toddler, we’d love to welcome you to Enon First
          Steps. Come along, get to know us and enjoy a relaxed morning of play, friendship and fun!
        </p>

        <div class="fs-card fs-find">
          <strong>Find us:</strong> Skinner Street, Chatham, ME4 5RF
          <div class="low-card">
            <a href="/find-us/">Directions</a>
            <a href="/whats-on">What’s on at Enon</a>
            <a href="/contact-us/">Contact us</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from 'nuxt/app';
import { bannerNotices } from '../../data/BannerNotices'

// Set this to a path such as '/images/whats-on/first-steps/hero.jpeg' to put a photo behind the heading.
// While it is empty, the banner shows a plain dark placeholder.
const heroImage = '/images/whats-on/first-steps/landscape-1920.webp';

// Padding is set in CSS (not here) so the heading stays centred at every screen width.
const heroStyle = heroImage
  ? {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.55)), url('${heroImage}')`,
      backgroundPosition: 'center 2%',
      backgroundSize: 'cover'
    }
  : {};

const pageUrl = 'https://enonbaptistchatham.org.uk/whats-on/first-steps/';
const title = 'Baby & Toddler Group in Chatham, Medway | Enon First Steps';
const description =
  'Free baby and toddler group in Chatham, Medway. Join Enon First Steps every Thursday in term time, 9–11am, for play, snacks, songs and free parking.';

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'Enon First Steps Baby & Toddler Group',
  description,
  url: pageUrl,
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  eventStatus: 'https://schema.org/EventScheduled',
  isAccessibleForFree: true,
  typicalAgeRange: '0-5',
  eventSchedule: {
    '@type': 'Schedule',
    byDay: 'https://schema.org/Thursday',
    startTime: '09:00',
    endTime: '11:00',
    repeatFrequency: 'P1W',
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

useHead({
  title,
  meta: [
    { name: 'description', content: description },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'Enon Baptist Church' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: pageUrl },
    { property: 'og:locale', content: 'en_GB' },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description }
  ],
  link: [{ rel: 'canonical', href: pageUrl }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(structuredData)
    }
  ]
});
</script>

<style>
/* Stops the full-width hero from causing a sideways scrollbar */
.fs-page {
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
  The fact cards overlap its bottom edge by 3rem, so bottom padding = top padding + 3rem
  to keep the heading centred in the part you can see.
*/
.fs-page .fs-hero {
  /* break out of any page container so it spans the whole screen */
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
  background-position: center 2%;
  background-size: cover;
  background-image: linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.55)), url('/images/whats-on/first-steps/landscape-1920.webp')
}
.fs-page .fs-hero--placeholder {
  background-image: linear-gradient(135deg, #4a4f57, #2f3338);
}

.fs-page .fs-hero-inner {
  max-width: 800px;
  margin: 0 auto;
}

.fs-page .fs-hero h1 {
  margin: 0 0 0.5rem;
  color: #fff;
  text-align: center;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
}

.fs-page .fs-hero .fs-subtitle {
  margin: 0;
  font-size: 1.1rem;
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.4);
}

/* Fact cards */
.text-content .fs-facts {
  list-style: none;
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  gap: 1rem;
  margin: -3rem 1rem 1.5rem;
  padding: 0;
}

.text-content .fs-facts li {
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

.text-content .fs-facts strong {
  font-size: 1.1rem;
}

.text-content .fs-facts span {
  font-size: 0.95rem;
  opacity: 0.75;
}

/* Highlighted boxes: tint follows the site's text colour */
.text-content .fs-box {
  background: color-mix(in srgb, currentColor 8%, transparent);
  border-left: 4px solid color-mix(in srgb, currentColor 35%, transparent);
  border-radius: 8px;
  padding: 0.85rem 1.1rem;
}

.text-content .fs-welcome {
  margin: 1.5rem 0 1rem;
  font-size: 1.1rem;
}

/* Photo beside the text */
.text-content .fs-feature {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.text-content .fs-image-wrap {
  position: relative;
  flex: 0 0 200px;
  width: 200px;
  aspect-ratio: 3 / 4;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
}

.text-content .fs-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
}

.text-content .fs-feature-text {
  flex: 1;
  min-width: 0;
}

.text-content .fs-feature-text > :first-child {
  margin-top: 0;
}

/* Find us card */
.text-content .fs-card {
  background: #fff;
  border-radius: 12px;
  padding: 1rem 1.25rem;
  text-align: center;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
  margin: 1.5rem 0;
}

.fs-card a,
.fs-card a:hover {
  text-decoration: none;
  color: inherit;
  padding: 4px 12px;
}

/* Link buttons inside the Find us card */
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
  background-color:#FAF4F1;
  color:  var(--nav-bar-bg-color);
  border: 1px solid #0F0F0F
}

/* Mobile */
@media (max-width: 600px) {
  .fs-page .fs-hero {
    min-height: 22rem;
    padding: 3rem 1rem;
  }

  /* Facts: plain text (no card). Day and time on the left, entry and parking on the right */
  .text-content .fs-facts {
    grid-template-columns: 1.2fr 1fr;
    gap: 0;
    margin: 0.5rem 0;
  }

  .text-wrapper .fs-facts li {
    background: transparent;
    border-radius: 0;
    box-shadow: none;
    padding: 0.1rem 1rem;
    color: inherit;
  }

  .text-wrapper .fs-facts li:first-child {
    grid-row: 1 / span 2;
    justify-content: center;
    padding: 1.1rem 1rem;
  }

  .text-wrapper .fs-facts li:first-child strong {
    font-size: 1rem;
  }

  .text-wrapper .fs-facts li:nth-child(n + 2) strong {
    font-size: 0.8rem;
    margin: 0.2rem 0 0;
  }

  .text-wrapper .fs-facts li:nth-child(n + 2) span {
    margin: 0;
    font-size: 0.8rem;
  }

  /*
    Photo moves to the bottom of the page. The wrapper becomes a column, the feature
    wrappers dissolve (display: contents) so their children become items in that column,
    and `order` pushes the photo down: text (0) -> photo (1) -> Find us card (2).
  */
  .text-content .text-wrapper {
    display: flex;
    flex-direction: column;
  }

  .text-content .fs-feature,
  .text-content .fs-feature-text {
    display: contents;
  }

  /* flex items don't collapse margins, so trim the heading's top margin to keep spacing the same */
  .text-content h2 {
    margin-top: 0.75rem;
  }

  .text-content .fs-image-wrap {
    order: 1;
    align-self: center;
    flex: none;
    width: 150px; /* explicit size: with width:auto the wrapper has no content to size it */
    aspect-ratio: 3 / 4; /* 150 x 200 */
    margin: 0.5rem 0 1.5rem;
  }

  .text-content .fs-find {
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
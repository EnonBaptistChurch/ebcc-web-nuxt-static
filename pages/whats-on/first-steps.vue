<template>
  <div>
    <div class="text-content">
      <div class="text-wrapper">
        <h1>First Steps Baby &amp; Toddler Group in Chatham</h1>

        <p class="fs-subtitle">Every Thursday in term time at Enon Baptist Church</p>

        <ul class="fs-facts" aria-label="Key details">
          <li>
            <strong>Thursdays, 9–11am</strong>
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

        <p>
          We meet every Thursday during term time, from 9–11am, and everyone is welcome. Our sessions are completely
          free, with free parking available too!
        </p>

        <h2>Play, explore and enjoy</h2>

        <p>
          Our mornings begin with plenty of time for free play, with a variety of toys and activities for all ages and
          stages. From baby toys and small world play to role play, slides and seesaws, there’s lots for little ones to
          discover. We also rotate some of our toys to keep things fresh and exciting. During playtime, we offer toast
          and drinks for both children and adults to enjoy. There is also a craft available for those who wish to do
          it.
        </p>

        <h2>Snacks, Bible stories and songs</h2>

        <p>
          We finish each session with a snack, followed by a time of Bible stories and songs, giving us a lovely
          opportunity to come together before heading home.
        </p>

        <p class="fs-box fs-welcome">
          Whether you’re a new parent in the area or have a curious toddler, we’d love to welcome you to Enon First
          Steps. Come along, get to know us and enjoy a relaxed morning of play, friendship and fun!
        </p>

        <p class="fs-card fs-find">
          <strong>Find us:</strong> Skinner Street, Chatham, ME4 5RF<br />
          <a href="/find-us/">Directions</a> &middot;
          <a href="/whats-on">What’s on at Enon</a> &middot;
          <a href="/contact-us/">Contact us</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from 'nuxt/app';

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
.text-wrapper {
  max-width: 800px;
  margin: 0 auto;
}
.text-content p {
  margin-bottom: 1rem;
}
.text-content h1 {
  text-align: center;
  margin-bottom: 0.5rem;
}
.text-content h2 {
  margin-top: 1.75rem;
  margin-bottom: 0.75rem;
}
.text-content strong {
  font-weight: bold;
}

.text-content .fs-subtitle {
  text-align: center;
  margin-bottom: 1.5rem;
}

/* Fact cards */
.text-content .fs-facts {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  gap: 1rem;
  margin: 0 0 1.5rem;
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
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
}
.text-content .fs-facts strong {
  font-size: 1.1rem;
}
.text-content .fs-facts span {
  font-size: 0.95rem;
  opacity: 0.75;
}

/* Mobile: merge the three fact cards into one card with dividers */
@media (max-width: 600px) {
  .text-content .fs-facts {
    grid-template-columns: 1fr;
    gap: 0;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
    overflow: hidden;
  }
  .text-content .fs-facts li {
    background: transparent;
    border-radius: 0;
    box-shadow: none;
    padding: 0.9rem 1rem;
  }
  .text-content .fs-facts li + li {
    border-top: 1px solid color-mix(in srgb, currentColor 15%, transparent);
  }
}

/* Highlighted boxes: tint follows the site's text colour */
.text-content .fs-box {
  background: color-mix(in srgb, currentColor 8%, transparent);
  border-left: 4px solid color-mix(in srgb, currentColor 35%, transparent);
  border-radius: 8px;
  padding: 0.85rem 1.1rem;
}
.text-content .fs-welcome {
  margin-top: 2rem;
  font-size: 1.05rem;
}

/* Find us card */
.text-content .fs-card {
  background: #fff;
  border-radius: 12px;
  padding: 1rem 1.25rem;
  text-align: center;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
}
</style>
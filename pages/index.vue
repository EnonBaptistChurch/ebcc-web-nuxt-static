<template>
  <div class="home">
    <ClientOnly v-if="notices.length > 0">
      <ScrollingBanner :notices="notices" :speed="70" />
    </ClientOnly>

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
      <div class="intro__content">
        <div>
        <p class="intro__text">
          We are a group of people who meet together to worship God. We are
          concerned for one another and those who live around us. 
          <br class="intro-linebreak" />
          <br class="intro-linebreak" />
          We believe the
          Bible to be God’s Word that is relevant to all areas of our life. In
          particular, we have a personal belief in Jesus Christ and through him
          have a real relationship with God.
        </p>
        </div>
        <div class="intro__brush" aria-hidden="true"></div>
        <RecentSermons :sermons="latestThree" showSeekBar="true" />
      </div>
    </section>

    <PromoCards />
    <BibleVerseParallaxOverlay
      verseText="For God so loved the world that He gave His only begotten Son, that whoever believes in Him should not perish but have everlasting life."
      reference="John 3:16"
      version="NKJV"
      class="home-verse"
    />
    <section class="find-contact">
      <div class="maps-widget">
      <MapWidget />
      </div>
      <ContactCallout compact />
    </section>
  </div>
</template>

<script setup lang="ts">
import { getRunningbannerNotices } from '../data/BannerNotices.ts'
import ScrollingBanner from '../components/ScrollingBanner.vue'
import BibleVerseParallaxOverlay from '../components/BibleVerseParallaxOverlay.vue'
import PromoCards from '../components/widgets/PromoCards.vue'
import ChurchImage from '../components/ChurchImage.vue'
import MapWidget from '../components/widgets/MapsWidget.vue'
import ContactCallout from '../components/contact/ContactCallout.vue'
import PastorMessageComponent from '../components/PastorMessageComponent.vue'
import PulpitBand from '../components/PulpitBand.vue'
import RecentSermons from '../components/sermons/RecentSermons.vue'

// Called once instead of twice per render
const notices = getRunningbannerNotices()

const services = [
  { name: 'Sunday Morning Worship', time: '11:15 am' },
  { name: 'Sunday Evening Service', time: '6:30 pm' },
]

// Structured JSON-LD data
useHead({
  link: [
    {
      rel: 'preload',
      as: 'image',
      fetchpriority: 'high',
      imagesrcset: [
        '/images/building/enonOutside-320.webp 320w',
        '/images/building/enonOutside-480.webp 480w',
        '/images/building/enonOutside-640.webp 640w',
        '/images/building/enonOutside-768.webp 768w',
        '/images/building/enonOutside-1024.webp 1024w',
        '/images/building/enonOutside-1280.webp 1280w',
        '/images/building/enonOutside-1440.webp 1440w',
        '/images/building/enonOutside-1920.webp 1920w',
      ].join(', '),
      imagesizes: '100vw',
    },
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Church',
        'name': 'Enon Baptist Church',
        'description': 'A group of people who meet together to worship God, study the Bible, and share a personal belief in Jesus Christ.',
        'url': 'https://www.enonbaptistchatham.org.uk',
        'logo': 'https://www.enonbaptistchatham.org.uk/images/new-logo.ico',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': 'Skinner Street',
          'addressLocality': 'Chatham',
          'postalCode': 'ME4 5RF',
          'addressCountry': 'GB'
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': 51.37861349456109,
          'longitude': 0.5267082398135957
        },
        'openingHoursSpecification': [
          {
            '@type': 'OpeningHoursSpecification',
            'dayOfWeek': 'Sunday',
            'opens': '11:15',
            'closes': '12:30'
          },
          {
            '@type': 'OpeningHoursSpecification',
            'dayOfWeek': 'Sunday',
            'opens': '18:30',
            'closes': '19:30'
          }
        ]
      })
    }
  ]
})
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

.home-verse {
  margin: 2.5rem 0 0.5rem 0;
  padding: 0.5rem 1rem;
  font-size: clamp(1rem, 1.4vw, 1.15rem);
  line-height: 1.5;
  color: #374151;
  text-align: center;
  overflow-wrap: break-word;
  text-wrap: pretty;
}
/* Map on the left, contact card on the right */
.find-contact {
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2rem;
  align-items: start;
  width: 100%;
  margin: 1.5rem auto;
  padding: 0 0.5rem;
}
.maps-widget {
  width: 100%;
  height: 100%;
  min-height: 12rem;
  border-radius: 0.75rem;
  overflow: hidden;
  border: 1px solid #888888;
  background-color: #ffffff;
  box-shadow:
    0 1px 2px rgba(17, 24, 39, 0.04),
    0 12px 28px -12px rgba(17, 24, 39, 0.18);
}

.maps-widget p {
  padding: 0.75rem;
}

@media (max-width: 875px) {
  .find-contact {
    grid-template-columns: 1fr;
  }
}

/* ---------- Intro: text on the left, sermons pinned to the right edge ---------- */
.intro {
  box-sizing: border-box;
  width: 100%;
  /* No max-width, so the sermons column can sit at the right edge of the page */
  margin: 0;
  padding: 0.5rem 1.25rem;
}

.intro__content {
  display: grid;
  /* minmax(0, 1fr) stops the column growing to fit wide content (the default `auto` column can't shrink below it) */
  grid-template-columns: minmax(0, 1fr);
  gap: 2rem;
  align-items: start;
  width: 100%;
  margin: 0;
}

/* Grid items default to min-width: auto, which lets long content push them past the parent */
.intro__content > * {
  min-width: 0;
  max-width: 100%;
}

/* Hand-drawn, slightly wonky frame around the intro text: two imperfect outlines that don't quite line up */
.intro__text {
  position: relative;
  padding: 0.75rem 0.25rem;
}

.intro__text::before,
.intro__text::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
}

/* The second line sits slightly off and tilted, like a pen retracing the shape */
.intro__text::after {
  inset: -4px -5px -3px -4px;
  transform: rotate(-0.25deg);
  border-color: rgb(55 65 81 / 0.2);
  border-radius: 8px 24px 6px 20px / 20px 6px 24px 8px;
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
.intro-linebreak {
  display: none;
}
@media (max-width: 600px) {
  .intro__text--second {
  margin-top: 1.5rem;
  color: #4b5563;
}
.intro-linebreak {
  display: block;
}
}


/* Fine, faded brush stroke separator.
   Mobile: a horizontal stroke between the text and the sermons */
.intro__brush {
  width: 100%;
  max-width: 28rem;
  height: 0.75rem;
  margin-inline: auto;
  background: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 12' preserveAspectRatio='none'><defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='0'><stop offset='0' stop-color='%23374151' stop-opacity='0'/><stop offset='0.25' stop-color='%23374151' stop-opacity='0.55'/><stop offset='0.75' stop-color='%23374151' stop-opacity='0.45'/><stop offset='1' stop-color='%23374151' stop-opacity='0'/></linearGradient><filter id='r' x='-5%' y='-100%' width='110%' height='300%'><feTurbulence type='fractalNoise' baseFrequency='0.05 0.8' numOctaves='2' seed='5' result='n'/><feDisplacementMap in='SourceGraphic' in2='n' scale='1.5'/></filter></defs><g filter='url(%23r)' fill='none' stroke='url(%23g)' stroke-linecap='round'><path d='M0 6 C120 4 220 8 320 5.5 S520 4.5 600 6' stroke-width='1.6'/><path d='M60 4.6 C170 3.4 280 6.4 380 4.8 S520 4 570 5' stroke-width='0.6' opacity='.7'/><path d='M90 7.6 C200 8.6 300 6.8 400 7.6 S520 8 560 7.4' stroke-width='0.5' opacity='.5'/></g></svg>") center / 100% 100% no-repeat;
}

@media (min-width: 876px) {
  .intro {
    padding: 0.25rem 2rem;   /* more breathing room above and below (was 0.5rem) */
  }

  .intro__content {
    /* Text takes all the space left over, then the brush stroke, then the sermons on the right */
    grid-template-columns: minmax(0, 1fr) 1rem minmax(0, 28rem);
    gap: 1rem;
    align-items: center;   /* text and sermons line up on their vertical centres */
  }

  /* Desktop: the stroke runs vertically between the two columns */
  .intro__brush {
    align-self: stretch;
    width: 100%;
    max-width: none;
    height: auto;
    min-height: 8rem;
    margin: 0;
    background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 400' preserveAspectRatio='none'><defs><linearGradient id='g' x1='0' x2='0' y1='0' y2='1'><stop offset='0' stop-color='%23374151' stop-opacity='0'/><stop offset='0.25' stop-color='%23374151' stop-opacity='0.55'/><stop offset='0.75' stop-color='%23374151' stop-opacity='0.45'/><stop offset='1' stop-color='%23374151' stop-opacity='0'/></linearGradient><filter id='r' x='-100%' y='-5%' width='300%' height='110%'><feTurbulence type='fractalNoise' baseFrequency='0.8 0.05' numOctaves='2' seed='5' result='n'/><feDisplacementMap in='SourceGraphic' in2='n' scale='1.5'/></filter></defs><g filter='url(%23r)' fill='none' stroke='url(%23g)' stroke-linecap='round'><path d='M6 0 C4 80 8 150 5.5 215 S4.5 345 6 400' stroke-width='1.6'/><path d='M4.6 40 C3.4 115 6.4 187 4.8 255 S4 347 5 380' stroke-width='0.6' opacity='.7'/><path d='M7.6 60 C8.6 135 6.8 200 7.6 267 S8 347 7.4 373' stroke-width='0.5' opacity='.5'/></g></svg>");
  }

  .intro__text {
    /* Larger text with a comfortable line length (about 70 characters) */
    font-size: clamp(1.1rem, 0.75rem + 0.6vw, 1.35rem);
    line-height: 1.6;
    
    text-align: left;
  }
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

@media (max-width: 340px) {
  .services__item {
    border-left: none;
    padding-left: 0;
  }

  .services__list {
    gap: 0.25rem;
  }
}

</style>
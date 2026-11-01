<template>
  
  <div>
    <ClientOnly>
      
    
      <ScrollingBanner :notices="bannerNotices" :speed="70" dismissible />
    </ClientOnly>
    <ChurchImage />
      <!-- <HeroSection /> -->
        <div class="home-page">
          <h1 class="welcome text-content">Welcome to Enon Baptist Church</h1>
          <p class="home-description text-content">
            We are a group of people who meet together to worship God. We are concerned for one another and those who live around us. We believe the Bible to be God’s Word that is relevant to all areas of our life. In particular, we have a personal belief in Jesus Christ and through him have a real relationship with God.
          </p>
        </div>
        <PromoCards />
          <BibleVerseParallaxOverlay
            image="/images/field.webp"
            verseText="For God so loved the world that He gave His only begotten Son, that whoever believes in Him should not perish but have everlasting life."
            reference="John 3:16"
            version="NKJV"
          />
    
    <!-- <NetlifyContact /> -->
  </div>
</template>

<script setup lang="ts">
import { bannerNotices } from '../data/BannerNotices.ts'
import ScrollingBanner from '../components/ScrollingBanner.vue'
import { ref, computed, watch } from 'vue';
import BibleVerseParallaxOverlay from '../components/BibleVerseParallaxOverlay.vue';
import PromoCards from '../components/widgets/PromoCards.vue';
// import CalendarEventsComponent from '../components/events/CalendarEventsComponent.vue';
import ChurchImage from '../components/ChurchImage.vue';
import NetlifyContact from '../components/NetlifyContact.vue';
import { usePageReady } from '../composables/usePageReady';

const imageRendered = ref(false);
const eventsLoaded = ref(false);

const isReady = computed(() => {
  const ready = eventsLoaded.value && imageRendered.value;
  return ready
})
// const handleEventsLoaded = () => {
//   eventsLoaded.value = true;
// };



const services = [
  { name: 'Sunday Morning Worship', time: '11:15 am' },
  { name: 'Sunday Evening Service', time: '6:30 pm' },
];

// Add structured JSON-LD data using Nuxt's useHead
useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Church',
        'name': 'Enon Baptist Church',
        'description': 'A group of people who meet together to worship God, study the Bible, and share a personal belief in Jesus Christ.',
        'url': 'https://www.enonbaptistchatham.org.uk', // Replace with your actual domain
        'logo': 'https://www.enonbaptistchatham.org.uk/images/new-logo.ico', // Replace with your actual logo URL if available
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': 'Skinner Street', // Replace with actual address
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
.welcome {
  margin-top: 0.5rem;
  margin-bottom: 0;
}
</style>

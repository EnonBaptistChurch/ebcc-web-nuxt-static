<template>
  <div>
  <div>
    <ChurchImage />
      <!-- <HeroSection /> -->
        <div class="home-page">
          <h1 class="welcome text-content squished-text">Welcome to Enon Baptist Church</h1>
          <p class="home-description text-content squished-text">
            We are a group of people who meet together to worship God. We are concerned for one another and those who live around us.
          <!-- </p>
          <p class="home-description text-content squished-text">  -->
            We believe the Bible to be God’s Word that is relevant to all areas of our life. In particular, we have a personal belief in Jesus Christ and through him have a real relationship with God.
          </p>
          <p class="home-description text-content squished-text">
            Everyone is given a warm welcome at Enon. Our worship is God-focused and traditional in style. We sing hymns, read the Bible, pray, and listen to God speak through the preaching of His Word.
          </p>
          <p class="home-description text-content squished-text">
            After the services we share tea and coffee, and most people stay to get to know each other better and encourage one another — all are welcome to stay.
          </p>
          
        </div>

              <!-- <div class="home-page-container">
        <div class="home-page-left">
          <h1 class="welcome text-content">Welcome to Enon Baptist Church</h1>
          <p class="home-description text-content">
            We are a group of people who meet together to worship God. We are concerned for one another and those who live around us. We believe the Bible to be God’s Word that is relevant to all areas of our life. In particular, we have a personal belief in Jesus Christ and through him have a real relationship with God.
          </p>
          <p class="home-description text-content">
            Everyone is given a warm welcome at Enon. Our worship is God-focused and traditional in style. We sing hymns, read the Bible, pray, and listen to God speak through the preaching of His Word. After the services we share tea and coffee, and most people stay to get to know each other better and encourage one another — all are welcome to stay.
          </p>
        </div>

        <div class="home-page-right">
          Anything you want on the right, e.g.: 
          <CalendarEventsComponent @loaded="eventsLoaded = true" class="events" />
          <PromoCards />
        </div> -->
      </div>
              
      <ClientOnly>
        <PromoCards />
      </ClientOnly>
      <ClientOnly>
        <BibleVerseParallaxOverlay
          image="/images/field.webp"
          verseText="For God so loved the world that He gave His only begotten Son, that whoever believes in Him should not perish but have everlasting life."
          reference="John 3:16"
          version="NKJV"
        />
      </ClientOnly>
        
    
    <!-- <NetlifyContact /> -->
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import BibleVerseParallaxOverlay from '../components/BibleVerseParallaxOverlay.vue';
import PromoCards from '../components/widgets/PromoCards.vue';
import CalendarEventsComponent from '../components/events/CalendarEventsComponent.vue';
import ChurchImage from '../components/ChurchImage.vue';
import NetlifyContact from '../components/NetlifyContact.vue';
import { usePageReady } from '../composables/usePageReady';
import { useHead } from 'nuxt/app';

const imageRendered = ref(false);
const eventsLoaded = ref(false);

const isReady = computed(() => {
  const ready = eventsLoaded.value && imageRendered.value;
  return ready
})
// const handleEventsLoaded = () => {
//   eventsLoaded.value = true;
// };



</script>

<style scoped>
.welcome {
  margin-top: 0.5rem;
  margin-bottom: 0;
  max-width: 80ch;
  margin: 0 auto;
  text-align: center;
}
.home-page {
  max-width: 100%;      /* allow full width */
  width: 90%;           /* optional: leave some margin on sides */
  padding: 1rem;
  margin: 0 auto;       /* center the content */
}
.squished-text {
  max-width: 66ch;
  margin: 0.5rem auto;
  
}
.events {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.home-page-container {
  display: flex;
  flex-wrap: wrap;       /* allows items to wrap on small screens */
  gap: 2rem;             /* space between columns */
  width: 100%;
  max-width: 1200px;     /* optional max width */
  margin: 0 auto;        /* center content */
  padding: 1rem;
}

.home-page-left {
  flex: 1 1 500px;       /* grow/shrink, minimum width 500px */
}

.home-page-right {
  flex: 1 1 300px;       /* grow/shrink, minimum width 300px */
}
</style>

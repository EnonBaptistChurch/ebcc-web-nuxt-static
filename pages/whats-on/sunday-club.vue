<template>
  <article class="page-container">
    <section class="carousel-section">
      <swiper-container
        :slides-per-view="1"
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
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }"
        class="custom-swiper"
      >
        <swiper-slide 
          v-for="n in 16" 
          :key="n"
        >
          <img 
            :src="`/images/events/SCP-2026-07-12/${n}-768.webp`" 
            :alt="`Sunday Club photo ${n}`"
            class="aspect-3-2"
            loading="lazy"
          />
        </swiper-slide>
      </swiper-container>
    </section>
    <div class="text-info">
      <h1>Sunday Club</h1>
      <p class="highlight-time">
        <strong>Every Sunday from 9:45 – 10:45 am</strong>
      </p>
      
      <p>
        Each week, the children are taught a lesson from the Bible in age groups. 
        We follow a syllabus that covers the main teaching of the Bible over a five-year period.
        There is also singing, a quiz, and if children come regularly they can choose rewards.
      </p>
      <p>We go on some trips and have some fun activities for those attending.</p>
      <p>Lifts can be provided to and from local roads.</p>
      <p>
        At a time when morals are often ignored, it is important to consider the spiritual needs of today’s children. 
        Why not send your children to our Sunday Club? They will be very welcome.
      </p>
      <p>
        The Children present something they've been learning within the main service at different points in the year, and we encourage parents to attend the service with their children.
        Children collect "stars" for attending and can exchange them for prizes across the year.
        During our prize-giving service, we celebrate the children's achievements and present them with their prizes, alongside a message during the service. 
        This is a great opportunity for parents to see what their children have been learning and to celebrate their progress.
      </p>
      <p>
        Above are some pictures of the latest Sunday Club Prize Giving Service, where the children received their prizes for attending and learning throughout the year.
      </p>

    </div>

    
  </article>
</template>

<script setup lang="ts">
import { useHead } from 'nuxt/app';

// Register Swiper custom elements (Web Components API)
import { register } from 'swiper/element/bundle';
register();

useHead({
  title: 'Sunday Club for Children - Enon Baptist Church',
  meta: [
    {
      name: 'description',
      content: 'Join our free Sunday Club at Enon Baptist Church, Chatham, for children to sing and learn Bible lessons in an age appropriate way.'
    }
  ]
});
</script>

<style scoped>
.page-container {
  max-width: 1100px;
  margin: 0 auto;
}

.text-info {
  margin-top: 1rem;
  margin-bottom: 2rem;
}

.text-info h1 {
  margin-top: 0;
  color: #1a1a1a;
}

.highlight-time {
  font-size: 1.1rem;
  color: #2b6cb0;
}

/* 3:2 Aspect Ratio Enforcement */
.aspect-3-2 {
  width: 100%;
  height: 100%;
  aspect-ratio: 2.5 / 2;
  object-fit: cover;
  border-radius: 10px;
  display: block;
}

/* Swiper Styling Adjustments */
.carousel-section {
  width: 100%;
}

.custom-swiper {
  width: 100%;
  --swiper-theme-color: #2b6cb0; /* Custom button/dot color */
}

.custom-swiper {
  width: 100%;
  
  /* --- 1. Edit Navigation Buttons --- */
  /* Default is 44px; reducing to 24px-28px makes them much sleeker */
  --swiper-navigation-size: 26px; 
  --swiper-navigation-color: #FAFAFA;
  
  /* --- 2. Change Pagination Dots --- */
  /* Size of the dots */
  --swiper-pagination-bullet-size: 10px;
  /* Active dot color */
  --swiper-pagination-color: #2b6cb0; 
  /* Inactive dot styling */
  --swiper-pagination-bullet-inactive-color: #94a3b8;
  --swiper-pagination-bullet-inactive-opacity: 0.5;
  /* Gap between dots */
  --swiper-pagination-bullet-horizontal-gap: 6px;
}

.custom-swiper::v-deep(.swiper-button-next::after),
.custom-swiper::v-deep(.swiper-button-prev::after) {
  font-weight: 1000; /* Try values like 300 (thin), 600 (bold), or 900 (ultra-bold) */
}

/* Optional: If you want to move the dots further down so they don't overlap images */
.carousel-section {
  padding-top: 1rem;
  width: 100%;
}


</style>
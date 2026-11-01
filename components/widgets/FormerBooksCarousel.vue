<template>
  <div class="books">
    <swiper-container
        :slides-per-view="1"
        :space-between="16"
        :loop="true"
        :navigation="true"
        :breakpoints="{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }"
        class="custom-swiper"
      >
      <swiper-slide 
        v-for="book in books" 
        :key="book.title" 
        class="book"
      >
        <div class="book-image">
          <img 
            :src="book.imgSrc" 
            :alt="`${book.title} book cover`" 
          />
        </div>
        <div class="book-metadata">
          <p class="book-title">{{ book.title }}</p>
          <p v-if="book.subTitle" class="book-subtitle">{{ book.subTitle }}</p>
          <p class="book-author">{{ book.author }}</p>
        </div>
      </swiper-slide>
    </swiper-container>
  </div>
</template>

<script setup lang="ts">
import { register } from 'swiper/element/bundle';
import type { Book } from '@/types/book';

// Register Swiper custom elements
register();

const props = defineProps<{
  books: Book[]
}>()
</script>

<style scoped>
.books {
  width: 100%;
  margin: 0 auto 0 auto;
}

.book {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.book-image {
  margin-bottom: 0.5rem;
}

.book img {
  max-width: 100px;
  height: auto;
}
.book-metadata {
  max-width: 125px;
}

.book-title,
.book-subtitle,
.book-author {
  padding: 0;
  margin: 0;
  text-align: center;
}

.book-title {
  font-weight: bold;
}

.book-subtitle {
  font-style: italic;
  font-size: 0.9rem;
}

.book-author {
  font-size: 0.85rem;
  color: #555;
}

.custom-swiper {
  width: 100%;
  
  /* --- 1. Edit Navigation Buttons --- */
  /* Default is 44px; reducing to 24px-28px makes them much sleeker */
  --swiper-navigation-size: 16px; 
  --swiper-navigation-color: #0A0A0A;
  
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
</style>
<template>
    <div class="books">
      <div 
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
        <p class="book-title">{{ book.title }}</p>
        <p v-if="book.subTitle" class="book-subtitle">{{ book.subTitle }}</p>
        <p class="book-author">{{ book.author }}</p>
      </div>
    </div>
</template>
<script setup lang="ts">
import type { Book } from '@/types/book';
const props = defineProps<{
  books: Book[]
}>()
</script>

<style scoped >
.books {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin: 0 auto 1.5rem auto ;
}

.book {
  max-width: 250px;
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
</style>
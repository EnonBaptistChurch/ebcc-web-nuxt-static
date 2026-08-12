<template>
  <div class="text-content">
    <h1>Men's Meetings</h1>
    <p>
      On Sunday afternoons following lunch in the church building, we hold our Men's meeting after the morning service and lunch (for the men attending and any related family) at around 2:00 PM. 
      These meetings are announced during the morning service and listed on the church notice sheet a week or two prior.
    </p>
    
    <p>We will either go through a book or have also take a standalone topic affecting men in our congregation, such as Biblical Manhood, Biblical Recreation and money, amongst other topics affecting men in their Christian Lives. </p>
    <p>Each time the bible will be open and discussed with someone closing the meeting in prayer. </p>

    <p>In the past, we have studied books, such as:</p>
    
    <div class="books">
      <div class="book">
        <div class="book-image">
          <img 
            src="/images/resources/books/love-your-church-320.webp" 
            alt="Love Your Church book cover" 
          />
        </div>
        <p class="book-title">Love Your Church</p>
        <p class="book-subtitle">8 Great Things About Being a Church Member</p>
        <p class="book-author">Tony Merida</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from 'nuxt/app';

useHead({
  title: "Men's Meetings - Enon Baptist Church",
  meta: [
    {
      name: 'description',
      content: "Men's meetings happen after the morning service at Enon Baptist Church, Chatham. A time for fellowship, discussion, and growth among men."
    }
  ]
});
</script>

<style scoped>
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
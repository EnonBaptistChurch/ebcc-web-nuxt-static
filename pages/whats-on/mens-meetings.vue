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
    <FormerBooksCarousel :books="mensMeetingBooks" />
  </div>
</template>

<script setup lang="ts">
import { useHead } from 'nuxt/app';
import { mensMeetingBooks } from '../../data/mensMeetingBooks'; // Adjust import path as needed
import FormerBooksCarousel from '../../components/widgets/FormerBooksCarousel.vue';

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

</style>
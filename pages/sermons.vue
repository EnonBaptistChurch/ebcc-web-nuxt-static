<template>
  <div class="sermons-page">
    <h1>Recent Sermons</h1>
    <p>Here is our latest uploaded sermon.</p>
    <SermonWidget />

    <p>We hope to have easier access to historical sermons here in the near future! Meanwhile, if you would like to have access to current historical sermons, please click on the spotify logo in the top right of the widget.</p>
    
    <!-- <div v-if="podcast">
      <AudioPlayerWidget :src="chosenPodcast"/>
      <RssFeedSermonsComponent :episodes="podcast.items" :choose-podcast="choosePodcast" :chosen-podcast="chosenPodcast" />
    </div>
    <div v-else>
      <p>Loading sermons...</p>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SermonWidget from '../components/sermons/SermonWidget.vue'
import RssFeedSermonsComponent from '../components/sermons/RssFeedSermonsComponent.vue'
import AudioPlayerWidget from '../components/widgets/AudioPlayerWidget.vue'
import type { PodcastItem } from '@/types/SermonPodcasts';

useHead({
  title: 'Sermons - Enon Baptist Church',
  meta: [
    {
      name: 'description',
      content: 'Listen to recent sermons from Enon Baptist Church, Chatham.'
    }
  ]
})

const podcast = ref<any>(null);
const chosenPodcast = ref<any>(null);
const fetchedNoPodcastSuccessfully = ref<boolean|null>(false);

onMounted(async () => {
  try {
    const data = await fetch("/.netlify/functions/sermons").then(res => res.json())
    podcast.value = data
    choosePodcast(data.items[0]);
  } catch (err) {
    podcast.value = [];
    fetchedNoPodcastSuccessfully.value = true;
  }
})

const choosePodcast = (podcast: PodcastItem) => {
  chosenPodcast.value = podcast;
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

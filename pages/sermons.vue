<template>
  <div class="sermons-page">
    <h1>Recent Sermons</h1>
    
    <SermonWidget v-if="fetchedNoPodcastSuccessfully">
      <p>Here is our latest uploaded sermon.</p>
    </SermonWidget>
    
    <div v-if="podcast">
      <AudioPlayerWidget src='https://d3ctxlq1ktw2nl.cloudfront.net/staging/2025-7-31/f9492f2f-fce2-1315-c70f-db32df91e3c3.mp3'/>
      <RssFeedSermonComponent :episodes="podcast.items" />
    </div>
    <div v-else>
      <p>Loading sermons...</p>
    </div>    
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SermonWidget from '../components/sermons/SermonWidget.vue'
import RssFeedSermonComponent from '../components/sermons/RssFeedSermonComponent.vue'
import AudioPlayerWidget from '../components/widgets/AudioPlayerWidget.vue'

const podcast = ref<any>(null);
const chosenPodcast = ref<any>(null);
const fetchedNoPodcastSuccessfully = ref<boolean|null>(null);

onMounted(async () => {
  try {
    const data = await fetch("/.netlify/functions/sermons").then(res => res.json())
    podcast.value = data
    console.log("Podcast data loaded:", data)
  } catch (err) {
    console.error("Failed to load podcast feed:", err)
    podcast.value = [];
    fetchedNoPodcastSuccessfully.value = true;
  }
})
</script>

<template>
  <div class="sermons-page">
    <h1>Recent Sermons</h1>
    
    <SermonWidget >
      <p>Here is our latest uploaded sermon.</p>
    </SermonWidget>
    
    <div v-if="podcast">
      <AudioPlayerWidget :src="chosenPodcast" :player="audioPlayer"/>
      <RssFeedSermonsComponent :episodes="podcast.items" :choose-podcast="choosePodcast" :chosen-podcast="chosenPodcast" :player="audioPlayer" />
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


const podcast = ref<any>(null);
const chosenPodcast = ref<any>(null);
const fetchedNoPodcastSuccessfully = ref<boolean|null>(false);

onMounted(async () => {
  try {
    const data = await fetch("/.netlify/functions/sermons").then(res => res.json())
    podcast.value = data;
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

const audioPlayer = useAudioPlayer();
</script>

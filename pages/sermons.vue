<template>
  <div class="sermons-page">
    <h1>Recent Sermons</h1>

    <!-- Show if fetching sermons failed -->
    <SermonWidget v-if="fetchedNoPodcastSuccessfully">
      <p>Here is our latest uploaded sermon.</p>
    </SermonWidget>

    <!-- Show podcast content if available -->
    <div v-else-if="podcast">
      <AudioPlayerWidget :src="chosenPodcast" :player="audioPlayer" />

      <RssFeedSermonsComponent
        :episodes="podcast.items"
        :choose-podcast="choosePodcast"
        :chosen-podcast="chosenPodcast"
        :player="audioPlayer"
      />
    </div>

    <!-- Loading state -->
    <div v-else>
      <p>Loading sermons...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SermonWidget from '../components/sermons/SermonWidget.vue'
import RssFeedSermonsComponent from '../components/sermons/RssFeedSermonsComponent.vue'
import AudioPlayerWidget from '../components/widgets/AudioPlayerWidget.vue'
import type { PodcastItem } from '@/types/SermonPodcasts'
import { useHead } from 'nuxt/app'
import { useAudioPlayer } from '../composables/useAudioPlayer'

// Set page title and meta
useHead({
  title: 'Sermons - Enon Baptist Church',
  meta: [
    {
      name: 'description',
      content: 'Listen to recent sermons from Enon Baptist Church, Chatham.'
    }
  ]
})

// Reactive state
const podcast = ref<any>(null)
const chosenPodcast = ref<any>(null)
const fetchedNoPodcastSuccessfully = ref<boolean | null>(false)
const audioPlayer = useAudioPlayer()

// Fetch sermons on mount
onMounted(async () => {
  try {
    const data = await fetch("/.netlify/functions/sermons").then(res => res.json())
    podcast.value = data
    choosePodcast(data.items[0])
  } catch (err) {
    podcast.value = []
    fetchedNoPodcastSuccessfully.value = true
  }
})

const choosePodcast = (podcast: PodcastItem) => {
  chosenPodcast.value = podcast
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

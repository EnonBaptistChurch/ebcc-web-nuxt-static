<template>
  <div class="sermons-page">
    <h1>Recent Sermons</h1>

    <SermonWidget v-if="!hasSermons">
      <p>Here is our latest uploaded sermon.</p>
    </SermonWidget>

    <div v-else>
      <AudioPlayerWidget :src="chosenPodcast" :player="audioPlayer" />

      <RssFeedSermonsComponent
        :episodes="podcast.items"
        :choose-podcast="choosePodcast"
        :chosen-podcast="chosenPodcast"
        :player="audioPlayer"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SermonWidget from '../components/sermons/SermonWidget.vue'
import RssFeedSermonsComponent from '../components/sermons/RssFeedSermonsComponent.vue'
import AudioPlayerWidget from '../components/widgets/AudioPlayerWidget.vue'
import type { PodcastItem } from '@/types/SermonPodcasts'
import { useHead } from 'nuxt/app'
import { useAudioPlayer } from '../composables/useAudioPlayer'
import sermonsData from '~~/data/sermons.json'

useHead({
  title: 'Sermons - Enon Baptist Church',
  meta: [
    {
      name: 'description',
      content: 'Listen to recent sermons from Enon Baptist Church, Chatham.'
    }
  ]
})

const podcast = sermonsData as any
const hasSermons = podcast?.items?.length > 0
const audioPlayer = useAudioPlayer()
const chosenPodcast = ref<PodcastItem | null>(hasSermons ? podcast.items[0] : null)

const choosePodcast = (item: PodcastItem) => {
  chosenPodcast.value = item
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>
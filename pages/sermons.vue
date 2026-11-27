<template>
  <div class="sermons-page">
    <header class="page-header">
      <p class="eyebrow">Listen</p>
      <h1>Recent Sermons</h1>
      <p class="intro">
        Hear the Bible taught at Enon Baptist Church. 
      </p>
      <span>
        Choose a sermon below to listen online.
      </span>
    </header>

    <SermonWidget v-if="!chosenPodcast">
      <p>Here is our latest uploaded sermon.</p>
    </SermonWidget>

    <div v-else class="layout">
      <div class="player-col">
        <AudioPlayerWidget :src="chosenPodcast" :player="audioPlayer" />
      </div>

      <section class="sermon-list" aria-labelledby="all-sermons-heading">
        <h2 id="all-sermons-heading" class="list-heading">All sermons</h2>

        <RssFeedSermonsComponent
          :episodes="podcast.items"
          :choose-podcast="choosePodcast"
          :chosen-podcast="chosenPodcast"
          :player="audioPlayer"
        />
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SermonWidget from '../components/sermons/SermonWidget.vue'
import RssFeedSermonsComponent from '../components/sermons/RssFeedSermonsComponent.vue'
import AudioPlayerWidget from '../components/widgets/AudioPlayerWidget.vue'
import type { PodcastItem } from '~/types/SermonPodcasts'
import { useHead } from 'nuxt/app'
import { useAudioPlayer } from '../composables/useAudioPlayer'
import sermonsData from '../data/sermons.json'

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
  // On desktop the player stays pinned beside the list, so only scroll on narrow screens
  if (window.innerWidth < 1024) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>

<style scoped>
.sermons-page {
  max-width: 760px;
  margin: 0 auto;
  padding: 2rem 1rem 3rem;
}

.page-header {
  text-align: center;
  margin-bottom: 1.75rem;
}

.eyebrow {
  margin: 0 0 0.25rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #6b6b6b;
}

.page-header h1 {
  margin: 0;
}

.intro {
  max-width: 34rem;
  margin: 0.75rem auto 0;
  line-height: 1.5;
  color: #555;
}

.sermon-list {
  margin-top: 2.5rem;
}

.list-heading {
  margin: 0 0 1rem;
  padding-bottom: 0.5rem;
  font-size: 1.125rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

@media (max-width: 480px) {
  .sermons-page {
    padding: 1.25rem 0.75rem 2rem;
  }

  .sermon-list {
    margin-top: 2rem;
  }
}

/* Desktop: player pinned on the left, sermon list on the right */
@media (min-width: 1024px) {
  .sermons-page {
    max-width: 1120px;
    padding: 3rem 2rem 4rem;
  }

  .page-header {
    margin-bottom: 2.5rem;
  }

  .page-header h1 {
    font-size: 2.5rem;
  }

  .intro {
    font-size: 1.125rem;
  }

  .layout {
    display: grid;
    grid-template-columns: 380px minmax(0, 1fr);
    gap: 3rem;
    align-items: start;
  }

  .player-col {
    position: sticky;
    top: 1.5rem;
  }

  .player-col :deep(.audio-player) {
    max-width: none;
    width: 100%;
  }

  .sermon-list {
    margin-top: 0;
  }
}

@media (min-width: 1280px) {
  .layout {
    grid-template-columns: 420px minmax(0, 1fr);
    gap: 4rem;
  }
}
</style>
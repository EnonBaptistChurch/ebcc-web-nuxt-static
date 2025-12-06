<template>
  <div class="sermon-widget">
    <!-- Filter / Search Input -->
    <div class="filter-bar">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search sermons..."
        class="search-input"
      />
    </div>

    <!-- Sermon Cards -->
    <ul class="cards-list">
      <SermonsRssFeedSermonCardComponent
        v-for="episode in filteredEpisodes"
        :key="episode.guid"
        class="card"
        :episode="episode"
        :choosePodcast="choosePodcast"
        :chosenPodcast="isChosenPodcast(episode)"
      />
    </ul>

    <!-- Show More Button -->
    <div v-if="hasMoreEpisodes" class="show-more">
      <button @click="showMore">Show More</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { PodcastItem } from '@/types/SermonPodcasts'

const props = defineProps<{
  episodes: PodcastItem[]
  choosePodcast: Function
  chosenPodcast: PodcastItem
}>()

const searchQuery = ref('')
const visibleCount = ref(10) 
const increment = 10

const filteredEpisodes = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  let list = props.episodes

  // Filter based on search query
  if (query) {
    list = list.filter(
      (ep) =>
        ep.title.toLowerCase().includes(query) ||
        ep.pubDate?.toLowerCase().includes(query) ||
        ep.parsedSnippet?.speaker?.toLowerCase().includes(query)
    )
  }

  // Move chosen podcast to the top
  if (props.chosenPodcast) {
    list = [
      ...list.filter(ep => ep.guid === props.chosenPodcast.guid),
      ...list.filter(ep => ep.guid !== props.chosenPodcast.guid)
    ]
  }

  return list.slice(0, visibleCount.value)
})

const hasMoreEpisodes = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  const list = query
    ? props.episodes.filter(
        (ep) =>
          ep.title.toLowerCase().includes(query) ||
          ep.pubDate?.toLowerCase().includes(query) ||
          ep.parsedSnippet?.speaker?.toLowerCase().includes(query)
      )
    : props.episodes

  return visibleCount.value < list.length
})

const showMore = () => {
  visibleCount.value += increment
}

const isChosenPodcast = (episode: PodcastItem) => {
  return props.chosenPodcast?.guid === episode.guid
}
</script>

<style scoped>
.sermon-widget {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.filter-bar {
  margin-bottom: 1rem;
}

.search-input {
  width: 100%;
  max-width: 400px;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s ease;
}

.search-input:focus {
  border-color: #66aaff;
}

/* Card List */
.cards-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Show More Button */
.show-more {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.show-more button {
  background-color: #0077cc;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1.25rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.show-more button:hover {
  background-color: #005fa3;
  transform: scale(1.05);
}
</style>

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

      <!-- Speaker Checkboxes -->
<div class="checkbox-group">
  <span class="checkbox-label">Speakers:</span>
  <div class="checkbox-items">
    <label v-for="speakerObj in distinctSpeakers" :key="speakerObj.speaker">
      <input
        type="checkbox"
        :value="speakerObj.speaker"
        v-model="selectedSpeakers"
      />
      {{ speakerObj.speaker }} ({{ speakerObj.count }})
    </label>
  </div>
</div>

<!-- Series Checkboxes -->
<div class="checkbox-group">
  <span class="checkbox-label">Series:</span>
  <div class="checkbox-items">
    <label v-for="series in distinctSeries" :key="series.series">
      <input
        type="checkbox"
        :value="series.series"
        v-model="selectedSeries"
      />
      {{ series.series }} ({{ series.count }})
    </label>
  </div>
</div>

      <button
        v-if="searchQuery || selectedSpeakers.length || selectedSeries.length"
        @click="clearFilters"
        class="clear-filters"
      >
        Clear Filters
      </button>
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
        :player="player"
      />
    </ul>

    <!-- No results message -->
    <p v-if="filteredEpisodes.length === 0" class="no-results">
      No sermons found.
    </p>

    <!-- Show More Button -->
    <div v-if="hasMoreEpisodes" class="show-more">
      <button @click="showMore">Show More</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { PodcastItem } from '@/types/SermonPodcasts'
import SermonsRssFeedSermonCardComponent from './RssFeedSermonCardComponent.vue'
import { useAudioPlayer } from '../../composables/useAudioPlayer'

const props = defineProps<{
  episodes: PodcastItem[]
  choosePodcast: (episode: PodcastItem) => void
  chosenPodcast: PodcastItem
  player: ReturnType<typeof useAudioPlayer>
}>()

// Filter state
const searchQuery = ref('')
const selectedSpeakers = ref<string[]>([])
const selectedSeries = ref<string[]>([])
const visibleCount = ref(10)
const increment = 10

// Distinct checkbox options
const distinctSpeakers = computed(() => {
  const counts = props.episodes.reduce((acc, episode) => {
    const speaker = episode.parsedSnippet?.speaker

    if (!speaker) return acc

    acc[speaker.name] = (acc[speaker.name] || 0) + 1

    return acc
  }, {} as Record<string, number>)

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([speaker, count]) => ({
      speaker,
      count
    }))
})

const distinctSeries = computed(() => {
  const counts = props.episodes.reduce((acc, ep) => {
    for (const tag of ep.parsedSnippet?.series ?? []) {
      acc[tag] = (acc[tag] || 0) + 1
    }
    return acc
  }, {} as Record<string, number>)

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([series, count]) => ({ series, count }))
})

// Filtered episodes
const filteredEpisodes = computed(() => {
  let list = props.episodes
  const query = searchQuery.value.toLowerCase().trim()

  if (query) {
    list = list.filter(
      ep =>
        ep.title.toLowerCase().includes(query) ||
        ep.pubDate?.toLowerCase().includes(query) ||
        ep.parsedSnippet?.speaker?.name?.toLowerCase().includes(query)
    )
  }

  // Speaker filter (checkboxes)
  if (selectedSpeakers.value.length) {
    list = list.filter(ep => selectedSpeakers.value.includes(ep.parsedSnippet?.speaker?.name ?? ''))
  }

  // Series filter (checkboxes)
  if (selectedSeries.value.length) {
  list = list.filter(ep =>
    selectedSeries.value.some(tag =>
      ep.parsedSnippet?.series?.includes(tag)
    )
  )
}

  // Move chosen podcast to top
  if (props.chosenPodcast) {
    list = [
      ...list.filter(ep => ep.guid === props.chosenPodcast.guid),
      ...list.filter(ep => ep.guid !== props.chosenPodcast.guid)
    ]
  }

  return list.slice(0, visibleCount.value)
})

// Show more logic
const hasMoreEpisodes = computed(() => {
  const totalMatching = props.episodes.filter(ep => {
    const query = searchQuery.value.toLowerCase().trim()
    const matchesQuery = query
      ? ep.title.toLowerCase().includes(query) ||
        ep.pubDate?.toLowerCase().includes(query) ||
        ep.parsedSnippet?.speaker?.name?.toLowerCase().includes(query)
      : true
    const matchesSpeaker = selectedSpeakers.value.length
      ? selectedSpeakers.value.includes(ep.parsedSnippet?.speaker?.name ?? '')
      : true
    const matchesSeries = selectedSeries.value.length
      ? selectedSeries.value.some(tag => ep.parsedSnippet?.series?.includes(tag))
      : true
    return matchesQuery && matchesSpeaker && matchesSeries
  })
  return visibleCount.value < totalMatching.length
})

const showMore = () => {
  visibleCount.value += increment
}

const isChosenPodcast = (episode: PodcastItem) => {
  return props.chosenPodcast?.guid === episode.guid
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedSpeakers.value = []
  selectedSeries.value = []
  visibleCount.value = 10
}
</script>

<style scoped>
.sermon-widget {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.filter-bar {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 1rem;
  align-items: flex-start;
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
  margin: 0 auto;
}

.search-input:focus {
  border-color: #66aaff;
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 0.75rem;
}

.checkbox-label {
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.checkbox-items {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
}

.checkbox-items label {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  cursor: pointer;
  user-select: none;
}

.clear-filters {
  background-color: #ff5555;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.clear-filters:hover {
  background-color: #cc4444;
  transform: scale(1.05);
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

/* No results */
.no-results {
  text-align: center;
  font-style: italic;
  margin-top: 1rem;
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

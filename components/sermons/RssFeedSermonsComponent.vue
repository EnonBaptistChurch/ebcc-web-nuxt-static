<template>
  <div class="sermon-widget">
    <div class="filter-bar">

      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search sermons..."
        class="search-input"
      />
      <div :class="{ 'filters-container': true, 'container-open': filtersOpen }">

      
        <button class="dropdown-toggle" @click="filtersOpen = !filtersOpen">
              <span class="checkbox-label">
                Filters
              </span>
              <span class="chevron" :class="{ open: filtersOpen }">&#8250;</span>
        </button>
        <div v-if="filtersOpen" class="filters-dropdown">
          <div class="checkbox-group"> </div>
            
            <!-- Speaker dropdown -->
            <div class="checkbox-group">
            <button class="dropdown-toggle" @click="speakersOpen = !speakersOpen">
              <span class="checkbox-label">
                Speakers
                <span v-if="selectedSpeakers.length" class="active-badge">{{ selectedSpeakers.length }}</span>
              </span>
              <span class="chevron" :class="{ open: speakersOpen }">&#8250;</span>
            </button>
            <div v-if="speakersOpen" class="checkbox-items">
              <label v-for="speakerObj in distinctSpeakers" :key="speakerObj.speaker">
                <input type="checkbox" :value="speakerObj.speaker" v-model="selectedSpeakers" />
                {{ speakerObj.speaker }} ({{ speakerObj.count }})
              </label>
            </div>
          </div>
        

          <!-- Series dropdown -->
          <div class="checkbox-group">
            <button class="dropdown-toggle" @click="seriesOpen = !seriesOpen">
              <span class="checkbox-label">
                Series
                <span v-if="selectedSeries.length" class="active-badge">{{ selectedSeries.length }}</span>
              </span>
              <span class="chevron" :class="{ open: seriesOpen }">&#8250;</span>
            </button>
            <div v-if="seriesOpen" class="checkbox-items">
              <label v-for="series in distinctSeries" :key="series.series">
                <input type="checkbox" :value="series.series" v-model="selectedSeries" />
                {{ series.series }} ({{ series.count }})
              </label>
            </div>
          </div>
        </div>

        <!-- Active filter chips -->
        <div v-if="selectedSpeakers.length || selectedSeries.length" class="active-filters">
          <div class="filter-chips">
            <button
              v-for="speaker in selectedSpeakers"
              :key="`speaker-${speaker}`"
              class="filter-chip"
              @click="selectedSpeakers = selectedSpeakers.filter(s => s !== speaker)"
            >
              {{ speaker }} <span>&times;</span>
            </button>
            <button
              v-for="series in selectedSeries"
              :key="`series-${series}`"
              class="filter-chip"
              @click="selectedSeries = selectedSeries.filter(s => s !== series)"
            >
              {{ series }} <span>&times;</span>
            </button>
          </div>
          <button @click="clearFilters" class="clear-all">Clear all</button>
        </div>
      </div>

    </div>

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

    <p v-if="filteredEpisodes.length === 0" class="no-results">No sermons found.</p>

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

const searchQuery = ref('')
const selectedSpeakers = ref<string[]>([])
const selectedSeries = ref<string[]>([])
const visibleCount = ref(10)
const increment = 10
const speakersOpen = ref(false)
const seriesOpen = ref(false)
const filtersOpen = ref(false)
const distinctSpeakers = computed(() => {
  const counts = props.episodes.reduce((acc, episode) => {
    const speaker = episode.parsedSnippet?.speaker
    if (!speaker) return acc
    acc[speaker.name] = (acc[speaker.name] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([speaker, count]) => ({ speaker, count }))
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

const filteredEpisodes = computed(() => {
  let list = props.episodes
  const query = searchQuery.value.toLowerCase().trim()
  if (query) {
    list = list.filter(ep =>
      ep.title.toLowerCase().includes(query) ||
      ep.pubDate?.toLowerCase().includes(query) ||
      ep.parsedSnippet?.speaker?.name?.toLowerCase().includes(query)
    )
  }
  if (selectedSpeakers.value.length) {
    list = list.filter(ep => selectedSpeakers.value.includes(ep.parsedSnippet?.speaker?.name ?? ''))
  }
  if (selectedSeries.value.length) {
    list = list.filter(ep => selectedSeries.value.some(tag => ep.parsedSnippet?.series?.includes(tag)))
  }
  if (props.chosenPodcast) {
    list = [
      ...list.filter(ep => ep.guid === props.chosenPodcast.guid),
      ...list.filter(ep => ep.guid !== props.chosenPodcast.guid)
    ]
  }
  return list.slice(0, visibleCount.value)
})

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

const showMore = () => { visibleCount.value += increment }
const isChosenPodcast = (episode: PodcastItem) => props.chosenPodcast?.guid === episode.guid
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
}

.filters-container {
  position: relative;
  width: calc(100% - 1rem);
  padding: 0.5rem;
}

.filters-container.container-open {
  border: 1px solid #000;
  border-radius: 8px;
  transition: border-color 0.6s ease;
  margin: 0 auto;
}

.search-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.2s ease;
}
.search-input:focus { border-color: #66aaff; }

.checkbox-group {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 0.5rem;
}

.dropdown-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.dropdown-toggle:hover { background: #ebebeb; }

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: bold;
}

.active-badge {
  background: #0077cc;
  color: white;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.1rem 0.45rem;
  line-height: 1.4;
}

.chevron {
  font-size: 1.2rem;
  display: inline-block;
  transform: rotate(0deg);
  transition: transform 0.25s ease;
}
.chevron.open { transform: rotate(90deg); }

.checkbox-items {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  max-height: 160px;
  overflow-y: auto;
  padding: 0.6rem 0.75rem;
  border: 1px solid #ddd;
  border-top: none;
  border-radius: 0 0 8px 8px;
  background: #fafafa;
  scrollbar-width: thin;
  scrollbar-color: #ddd transparent;
}
.checkbox-items::-webkit-scrollbar { width: 4px; }
.checkbox-items::-webkit-scrollbar-track { background: transparent; }
.checkbox-items::-webkit-scrollbar-thumb { background: #ddd; border-radius: 4px; }

.checkbox-items label {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.9rem;
  cursor: pointer;
  user-select: none;
}

.active-filters {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  padding: 4px 0;
}

.filter-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  flex: 1;
}

.filter-chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: #e8f0fe;
  color: #1a56cc;
  border: none;
  border-radius: 999px;
  padding: 3px 10px 3px 12px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: background 0.15s ease;
}
.filter-chip:hover { background: #d0e2fc; }
.filter-chip span { font-size: 1rem; line-height: 1; opacity: 0.7; }

.clear-all {
  background: none;
  border: none;
  color: #999;
  font-size: 0.8rem;
  cursor: pointer;
  white-space: nowrap;
  text-decoration: underline;
  text-underline-offset: 2px;
  padding: 0 4px;
}
.clear-all:hover { color: #555; }

.cards-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.no-results {
  text-align: center;
  font-style: italic;
  margin-top: 1rem;
}

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
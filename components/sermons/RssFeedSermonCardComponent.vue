<template>
  <article class="card" :class="{ chosen: chosenPodcast }">
    <div class="main">
      <!-- Thumbnail + play button -->
      <button
        type="button"
        class="thumbnail"
        :aria-label="isPlayingThis ? 'Pause episode' : 'Play episode'"
        @click="play(episode)"
      >
        <img :src="episode.itunes.image" alt="" loading="lazy" />
        <span class="play-button" :class="{ active: isPlayingThis }">
          <PauseIcon v-if="isPlayingThis" width="16" height="16" fill="#ffffff" />
          <PlayIcon v-else width="16" height="16" fill="#ffffff" />
        </span>
      </button>

      <!-- Info -->
      <div class="info" v-if="snippet">
        <h2 class="card-title" :title="snippet.title">
          {{ displayTitle }}
        </h2>

        <!-- Passage -->
        <p v-if="snippet.passage" class="card-passage">
          {{ snippet.passage }}
        </p>

        <!-- Speaker -->
        <p class="card-speaker">
          <img v-if="snippet.speaker.name == 'Pastor Paul Relf'"
        src="/images/leaders/PR-8258-320.webp"
        alt="Pastor Paul Relf"
        class="pastor-message__avatar"
        width="44"
        height="44"
        loading="lazy"
      />
          {{ snippet.speaker.name }}
          <span
            v-if="snippet.speaker.information"
            class="speaker-info"
            role="button"
            tabindex="0"
            aria-label="Speaker information"
            :aria-expanded="activeInfo"
            @click.stop="toggleInfo"
            @keydown.enter.prevent="toggleInfo"
            @keydown.space.prevent="toggleInfo"
            @keydown.esc="activeInfo = false"
            @blur="activeInfo = false"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 4a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm1 13h-2v-8h2v8z"
                fill="currentColor"
              />
            </svg>
            <span v-if="activeInfo" class="tooltip" role="tooltip">
              {{ snippet.speaker.information }}
            </span>
          </span>
        </p>

        <!-- Date / service -->
        <p class="info-row">
          <span class="card-date">{{ getUkDateString(snippet.formattedDate) }}</span>
          <template v-if="snippet.service">
            <span class="dot" aria-hidden="true">•</span>
            <span class="card-service">{{ snippet.service }}</span>
          </template>
        </p>
      </div>

      <!-- Fallback when the snippet couldn't be parsed -->
      <div class="info" v-else>
        <h2 class="card-title">{{ episode.title }}</h2>
      </div>
    </div>

    <!-- Series chips -->
    <ul v-if="seriesList.length" class="series-list" aria-label="Series">
      <li v-for="s in seriesList" :key="s" class="series-chip">{{ s }}</li>
    </ul>

    <!-- Footer -->
    <footer class="bottom">
      <span class="card-duration">
        <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm.5-13H11v6l5.2 3.1.8-1.3-4.5-2.7V7z"
          />
        </svg>
        {{ episode.itunes.duration }}
      </span>

      <a
        :href="episode.link"
        target="_blank"
        rel="noopener noreferrer"
        class="spotify-logo"
        aria-label="Listen on Spotify"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" aria-hidden="true">
          <path
            fill="#1ed760"
            d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8Z"
          />
          <path
            d="M406.6 231.1c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3zm-31 76.2c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm-26.9 65.6c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4z"
          />
        </svg>
      </a>
    </footer>
  </article>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { PodcastItem } from '@/types/SermonPodcasts'
import PlayIcon from '../widgets/audio/icons/PlayIcon.vue'
import PauseIcon from '../widgets/audio/icons/PauseIcon.vue'
import { getUkDateString } from '../../composables/useDateToText'
import { useAudioPlayer } from '../../composables/useAudioPlayer'

const props = defineProps<{
  episode: PodcastItem
  choosePodcast: (episode: PodcastItem) => void
  chosenPodcast: boolean
  player: ReturnType<typeof useAudioPlayer>
}>()

const activeInfo = ref(false)

const snippet = computed(() => props.episode.parsedSnippet)

// Prefer the condensed title; fall back to the full one
const displayTitle = computed(
  () => snippet.value?.condensedTitle?.trim() || snippet.value?.title || props.episode.title,
)

const seriesList = computed<string[]>(() => {
  const s = snippet.value?.series
  return Array.isArray(s) ? s.filter(Boolean) : []
})

const isPlayingThis = computed(() => props.chosenPodcast && props.player.isPlaying.value)

function toggleInfo() {
  activeInfo.value = !activeInfo.value
}

const play = (episode: PodcastItem) => {
  props.player.setInitialStart(true)

  if (!props.chosenPodcast) {
    props.choosePodcast(episode)
  } else {
    props.player.togglePlay()
  }
}
</script>

<style scoped>
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  background: #fff;
  border: 1px solid #e5e5ea;
  border-radius: 12px;
  padding: 0.85rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
}

.card.chosen {
  background: #f1f0f9;
  border-color: #8f8ac4;
  box-shadow: 0 0 0 2px rgba(143, 138, 196, 0.25);
}

.main {
  display: flex;
  gap: 0.85rem;
}

/* Thumbnail */
.thumbnail {
  position: relative;
  width: 84px;
  height: 84px;
  flex-shrink: 0;
  padding: 0;
  border: 0;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  background: #ddd;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}

.thumbnail:hover img {
  transform: scale(1.06);
}

.thumbnail:focus-visible {
  outline: 3px solid #6b64c7;
  outline-offset: 2px;
}

.play-button {
  position: absolute;
  inset: 0;
  margin: auto;
  width: 34px;
  height: 34px;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(2px);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
}

.thumbnail:hover .play-button,
.play-button.active {
  background: #6b64c7;
}

/* Info */
.info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.2rem;
}

.card-title {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 1.25;
  color: #1c1c28;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-passage {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin: 0;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--nav-bar-bg-color);
}

.card-speaker {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin: 0;
  font-size: 0.95rem;
  font-weight: 500;
  color: #444;
}

.info-row {
  margin: 0;
  font-size: 0.85rem;
  color: #6b6b76;
}

.dot {
  margin: 0 0.35rem;
  opacity: 0.6;
}

/* Speaker tooltip */
.speaker-info {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  color: #777;
  background: #eee;
  border-radius: 50%;
  cursor: pointer;
}

.speaker-info:hover,
.speaker-info:focus-visible {
  color: var(--nav-bar-bg-color);
  background: #e0def3;
  outline: none;
}

.tooltip {
  position: absolute;
  left: 0;
  top: 130%;
  z-index: 10;
  width: max-content;
  max-width: 220px;
  padding: 6px 10px;
  font-size: 0.8rem;
  font-weight: 400;
  line-height: 1.35;
  color: #fff;
  background: #2b2b38;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
}

/* Series chips */
.series-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.15rem 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 0.8rem;
  color: #6b6b76;
}

.series-chip:not(:last-child)::after {
  content: ';';
}

/* Footer */
.bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.5rem;
  border-top: 1px solid #f0f0f3;
}

.card-duration {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  margin: 0;
  font-size: 0.85rem;
  color: #888;
}

.spotify-logo {
  display: flex;
  width: 24px;
  height: 24px;
  transition: transform 0.2s ease;
}

.spotify-logo:hover,
.spotify-logo:focus-visible {
  transform: scale(1.25);
}

@media (prefers-reduced-motion: reduce) {
  .card,
  .thumbnail img,
  .spotify-logo {
    transition: none;
  }
  .card:hover {
    transform: none;
  }
}

.pastor-message__avatar {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 0 0 2px #fff, 0 0 0 3px #e5e7eb;
}
</style>
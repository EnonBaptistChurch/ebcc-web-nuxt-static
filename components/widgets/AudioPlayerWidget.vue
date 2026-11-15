<template>
  <div class="audio-player" id="audio-player">
    <p class="now-playing">Now playing</p>

    <h2 class="title">{{ src.title }}</h2>

    <p v-if="src.parsedSnippet?.speaker?.name" class="speaker">
      {{ src.parsedSnippet.speaker.name }}
    </p>

    <p v-if="src.parsedSnippet?.speaker?.information" class="speaker-info">
      {{ src.parsedSnippet.speaker.information }}
    </p>

    <p v-if="src.parsedSnippet?.formattedDate" class="meta">
      {{ getUkDateString(src.parsedSnippet.formattedDate) }}
      <span v-if="src.parsedSnippet?.service" aria-hidden="true">·</span>
      {{ src.parsedSnippet?.service }}
    </p>

    <div class="progress">
      <input
        type="range"
        min="0"
        :max="props.player.duration.value || 0"
        step="0.1"
        :value="props.player.currentTime.value"
        :style="{ '--progress': progressPercent + '%' }"
        aria-label="Seek"
        @input="onSeek"
      />
      <div class="time-container">
        <span>{{ props.player.formatTime(props.player.currentTime.value) }}</span>
        <span>{{ props.player.formatTime(props.player.duration.value) }}</span>
      </div>
    </div>

    <div class="controls">
      <button
        @click="props.player.rewind(10)"
        class="icon-btn"
        title="Rewind 10s"
        aria-label="Rewind 10 seconds"
        :style="{ '--btn-size': buttonSize + 'px' }"
      >
        <RewindIcon :size="iconSize" />
      </button>

      <button
        @click="toPlayAtStart()"
        class="play-btn"
        :class="{ playing: props.player.isPlaying.value }"
        :title="props.player.isPlaying.value ? 'Pause' : 'Play'"
        :aria-label="props.player.isPlaying.value ? 'Pause sermon' : 'Play sermon'"
        :style="{ '--btn-size': playButtonSize + 'px' }"
      >
        <PauseIcon v-if="props.player.isPlaying.value" :size="playIconSize" />
        <PlayIcon v-else :size="playIconSize" />
      </button>

      <button
        @click="props.player.forward(10)"
        class="icon-btn"
        title="Forward 10s"
        aria-label="Forward 10 seconds"
        :style="{ '--btn-size': buttonSize + 'px' }"
      >
        <ForwardIcon :size="iconSize" />
      </button>
    </div>

    <div class="volume-control">
      <label for="volume" aria-label="Volume">🔊</label>
      <input
        id="volume"
        type="range"
        min="0"
        max="1"
        step="0.01"
        :value="props.player.volume.value"
        :style="{ '--progress': props.player.volume.value * 100 + '%' }"
        @input="changeVolume"
        title="Volume"
        class="volume-slider"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import RewindIcon from './audio/icons/RewindIcon.vue';
import PlayIcon from './audio/icons/PlayIcon.vue';
import PauseIcon from './audio/icons/PauseIcon.vue';
import ForwardIcon from './audio/icons/ForwardIcon.vue';

import type { PodcastItem } from '@/types/SermonPodcasts';
import { getUkDateString } from '../../composables/useDateToText';
import { useAudioPlayer } from '../../composables/useAudioPlayer';

const props = defineProps<{
  src: PodcastItem;
  player: ReturnType<typeof useAudioPlayer>;
}>();

const iconSize = ref(24);
const buttonSize = ref(44);
const playIconSize = ref(28);
const playButtonSize = ref(60);

const progressPercent = computed(() => {
  const d = props.player.duration.value;
  if (!d) return 0;
  return Math.min(100, (props.player.currentTime.value / d) * 100);
});

const toPlayAtStart = () => {
  if (!props.player.initialStart.value) {
    props.player.setInitialStart(true);
  }
  props.player.togglePlay();
};

// Safe during SSR/prerender: player.init() is a no-op on the server
watch(
  () => props.src?.enclosure?.url,
  (url) => {
    if (url) {
      props.player.init(url, props.player.initialStart.value);
    }
  },
  { immediate: true }
);

const onSeek = (e: Event) => {
  props.player.seek(Number((e.target as HTMLInputElement).value));
};

const changeVolume = (e: Event) => {
  props.player.setVolume(Number((e.target as HTMLInputElement).value));
};
</script>

<style scoped>
.audio-player {
  --accent: var(--button-bg-color, #1f2937);

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem 1.5rem 1.25rem;
  border-radius: 1.25rem;

  background:
    linear-gradient(rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0.88)),
    url('/images/building/new-enon-320.webp') no-repeat center / cover;

  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  max-width: 540px;
  margin: 0 auto;
}

.now-playing {
  margin: 0 0 0.5rem;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #6b6b6b;
}

.title {
  margin: 0;
  font-size: clamp(1.25rem, 1.1rem + 0.6vw, 1.6rem);
  line-height: 1.25;
  font-weight: 700;
  text-align: center;
  overflow-wrap: anywhere;
}

.speaker {
  margin: 0.5rem 0 0;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
}

.speaker-info {
  margin: 0.15rem 0 0;
  font-size: 0.875rem;
  font-style: italic;
  font-weight: 400;
  color: #555;
  text-align: center;
}

.meta {
  margin: 0.4rem 0 0;
  font-size: 0.85rem;
  font-weight: 500;
  color: #6b6b6b;
  text-align: center;
}

/* progress */
.progress {
  width: 100%;
  margin-top: 1.25rem;
}

.time-container {
  display: flex;
  justify-content: space-between;
  margin-top: 0.35rem;
  font-size: 0.8rem;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  color: #6b6b6b;
}

/* shared range-slider styling, filled up to --progress */
input[type='range'] {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 6px;
  margin: 0;
  border-radius: 999px;
  cursor: pointer;
  background: linear-gradient(
    to right,
    var(--accent) var(--progress, 0%),
    rgba(0, 0, 0, 0.15) var(--progress, 0%)
  );
}

input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 0;
  background: var(--accent);
  box-shadow: 0 0 0 3px #fff, 0 1px 4px rgba(0, 0, 0, 0.3);
}

input[type='range']::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 0;
  background: var(--accent);
  box-shadow: 0 0 0 3px #fff, 0 1px 4px rgba(0, 0, 0, 0.3);
}

input[type='range']:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 4px;
}

/* buttons */
.controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  margin-top: 1rem;
}

.icon-btn,
.play-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--btn-size, 44px);
  height: var(--btn-size, 44px);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
}

.icon-btn {
  background: #f9fafb;
  color: #232323;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.icon-btn:hover {
  background: #e5e7eb;
}

.play-btn {
  background: var(--accent);
  color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.play-btn:hover {
  transform: scale(1.05);
}

.icon-btn:active,
.play-btn:active {
  transform: scale(0.95);
}

.icon-btn:focus-visible,
.play-btn:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}

/* volume */
.volume-control {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.volume-slider {
  width: 110px;
  height: 4px;
}

@media (prefers-reduced-motion: reduce) {
  .icon-btn,
  .play-btn {
    transition: none;
  }
}

@media (max-width: 480px) {
  .audio-player {
    padding: 1.25rem 1rem 1rem;
  }

  .controls {
    gap: 1rem;
  }
}
</style>
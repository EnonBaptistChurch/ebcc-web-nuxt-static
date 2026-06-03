<template>
  <div class="audio-player" id="audio-player">
    <p class="audio-details">{{ src.title }}</p>
    <p class="audio-details">{{ src.parsedSnippet?.speaker.name }}</p>

    <p v-if="src.parsedSnippet?.speaker.information" class="audio-details  speaker-info">
      {{ src.parsedSnippet?.speaker.information }}
    </p>

    <p class="audio-details">
      {{ getUkDateString(src.parsedSnippet?.formattedDate!) }} -
      {{ src.parsedSnippet?.service }}
    </p>

    <div class="controls">
      <div class="left-controls">
        <button
          @click="props.player.rewind(10)"
          class="icon-btn"
          title="Rewind 10s"
          :style="{ '--btn-size': buttonSize + 'px' }"
        >
          <RewindIcon :size="iconSize" />
        </button>

        <button
          @click="toPlayAtStart()"
          class="play-btn"
          :class="{ playing: props.player.isPlaying }"
          title="Play/Pause"
          :style="{ '--btn-size': buttonSize + 'px' }"
        >
          <PlayIcon v-if="!props.player.isPlaying.value" :size="iconSize" />
          <PauseIcon v-else :size="iconSize" />
        </button>

        <button
          @click="props.player.forward(10)"
          class="icon-btn"
          title="Forward 10s"
          :style="{ '--btn-size': buttonSize + 'px' }"
        >
          <ForwardIcon :size="iconSize" />
        </button>
      </div>

      <div class="right-controls">
        <div class="volume-control">
          <label for="volume">🔊</label>
          <input
            id="volume"
            type="range"
            min="0"
            max="1"
            step="0.01"
            v-model.number="props.player.volume.value"
            @input="changeVolume"
            title="Volume"
            class="volume-slider"
          />
        </div>
      </div>
    </div>

    <div class="time-container">
      <span class="current-time">
        {{ props.player.formatTime(props.player.currentTime.value) }}
      </span>
      <span class="duration">
        {{ props.player.formatTime(props.player.duration.value) }}
      </span>
    </div>

    <div class="progress">
      <input
        type="range"
        min="0"
        :max="props.player.duration.value"
        step="0.1"
        :value="props.player.currentTime.value"
        @change="(e) => props.player.seek(Number((e.target as HTMLInputElement).value))"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
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

const iconSize = ref(30);
const buttonSize = ref(40);

const toPlayAtStart = () => {
  if (!props.player.initialStart.value) {
    props.player.setInitialStart(true);
    props.player.togglePlay();
  } else {
    props.player.togglePlay();
  }
};

watch(
  () => props.src?.enclosure?.url,
  (url) => {
    if (url) {
      props.player.init(url, props.player.initialStart.value);
    }
  },
  { immediate: true }
);

const changeVolume = () => {
  props.player.setVolume(props.player.volume.value);
};

/**
 * FIX: proper seek binding
 */
const seekTime = computed({
  get: () => props.player.currentTime.value,
  set: (val: number) => {
    props.player.seek(val);
  }
});
</script>

<style scoped>
.audio-player {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 1.25rem;
  border-radius: 1rem;
  font-weight: 700;

  background:
    linear-gradient(rgba(255,255,255,0.8), rgba(255,255,255,0.8)),
    url('/images/building/new-enon-320.webp') no-repeat center / cover;

  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.07);
  max-width: 500px;
  margin: 0 auto;
  transition: all 0.3s ease;
}

.audio-player:hover {
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

.audio-details {
  text-align: center;
  margin: 0.25rem;
}
.speaker-info {
  font-size: 0.9rem;
  color: #555;
  font-style: italic;
}

.icon-btn,
.play-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f9fafb;
  border: none;
  border-radius: 50%;
  width: var(--btn-size, 52px);
  height: var(--btn-size, 52px);
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.08);
}

.icon-btn:hover,
.play-btn:hover {
  background: #e0e7ff;
}

.play-btn.playing {
  background: var(--button-bg-color);
  color: white;
}

.progress {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

input[type='range'] {
  width: 100%;
  accent-color: var(--button-bg-color);
  cursor: pointer;
}

.time-container {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  width: 100%;
  margin: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  width: 100%;
  margin-top: 0.75rem;
  margin-bottom: 0.5rem;
}

.left-controls {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-left: 1.25rem;
}

.right-controls {
  display: flex;
  align-items: center;
}

.volume-control {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.volume-slider {
  max-width: 100px;
}

@media (max-width: 600px) {
  .controls {
    flex-direction: column;
    align-items: stretch;
  }

  .left-controls,
  .right-controls {
    justify-content: center;
    margin: 0.5rem 0;
    margin-left: 0;
    margin-right: 0;
  }

  .volume-control {
    justify-content: center;
    width: 100%;
  }

  .volume-control input[type="range"] {
    width: 80%;
  }
}
</style>
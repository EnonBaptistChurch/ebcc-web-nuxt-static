<template>
  <div class="audio-player" id="#audio-player">
    <p class="audio-details">{{ src.title }}</p>
    <p class="audio-details">{{ src.parsedSnippet?.speaker }}</p>
    <p class="audio-details">{{ getUkDateString(src.parsedSnippet?.formattedDate!) }} - {{ src.parsedSnippet?.service }}</p>
    
    <div class="controls">
  <div class="left-controls">
    <button @click="props.player.rewind(10)" class="icon-btn" title="Rewind 10s" :style="{ '--btn-size': buttonSize + 'px' }">
      <RewindIcon :size="iconSize" />
    </button>

    <button @click="toPlayAtStart()" class="play-btn" :class="{ playing: props.player.isPlaying }" title="Play/Pause" :style="{ '--btn-size': buttonSize + 'px' }">
      <PlayIcon v-if="!props.player.isPlaying.value" :size="iconSize" />
      <PauseIcon v-else :size="iconSize" />
    </button>

    <button @click="props.player.forward(10)" class="icon-btn" title="Forward 10s" :style="{ '--btn-size': buttonSize + 'px' }">
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
      <span class="current-time">{{ props.player.formatTime(props.player.currentTime.value) }}</span>
      <span class="duration">{{ props.player.formatTime(props.player.duration.value) }}</span>
    </div>
    <div class="progress">
      <input
        type="range"
        min="0"
        :max="props.player.duration.value"
        step="0.1"
        v-model="props.player.currentTime.value"
        @input="seekAudio"
      />
      
    </div>
  </div>
  
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import RewindIcon from './audio/icons/RewindIcon.vue';
import PlayIcon from './audio/icons/PlayIcon.vue';
import PauseIcon from './audio/icons/PauseIcon.vue';
import ForwardIcon from './audio/icons/ForwardIcon.vue';
import type { PodcastItem } from '@/types/SermonPodcasts';
import { getUkDateString } from '../../composables/useDateToText';

const props = defineProps<{ src: PodcastItem,
  player: ReturnType<typeof useAudioPlayer> }>();

const iconSize = ref(30);
const buttonSize = ref(40);
const volume = ref(1);

const toPlayAtStart = () => {
    if(!props.player.initialStart.value)
    {
      props.player.setInitialStart(true);
      props.player.togglePlay();
    }
    else
    {
      props.player.togglePlay();
    }
};

watch(
  () => props.src,
  (newVal) => {
    if (newVal?.enclosure?.url) {
      props.player.init(newVal.enclosure.url, props.player.initialStart.value); // autoplay only if user clicked
    }
  },
  { immediate: true }
);

const changeVolume = () => {
  props.player.setVolume(props.player.volume.value);
};

const seekAudio = () => {
  props.player.seek(props.player.currentTime.value);
};


</script>


<style scoped>
.audio-player {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 1.25rem;
  border-radius: 1rem;
  font-weight: 700;
  /* Background with watermark overlay */
  background: 
    linear-gradient(rgba(255,255,255,0.8), rgba(255,255,255,0.8)), /* semi-transparent overlay */
    url('/images/new-enon-320.webp') no-repeat center / cover; /* non-repeating, fit container */

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
  margin:0.25rem;
}


.icon-btn,
.play-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f9fafb;
  border: none;
  border-radius: 50%;
  width: var(--btn-size, 52px);   /* default 52px */
  height: var(--btn-size, 52px);  /* default 52px */
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

.icon {
  width: 24px;
  height: 24px;
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
  justify-content: space-between; /* pushes content to the edges */
  font-size: 14px;
  width: 100%;
  margin:0;
}

.controls {
  display: flex;
  justify-content: space-between; /* left controls to left, volume to right */
  align-items: center;
  gap: 1rem;
  width: 100%;
  margin-top: 0.75rem;
  margin-bottom: 0.5rem;
}

.left-controls {
  display: flex;
  gap: 1rem; /* spacing between rewind, play, forward */
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

.volume-control input[type="range"] {
  cursor: pointer;
  accent-color: var(--button-bg-color);
}

.volume-slider {
  max-width: 100px;
}

@media (max-width: 600px) {
  .controls {
    flex-direction: column;
    align-items: stretch; /* stretch to full width */
  }

  .left-controls,
  .right-controls {
    justify-content: center; /* center the controls horizontally */
    margin: 0.5rem 0;
    margin-left: 0;
    margin-right: 0;
  }

  .volume-control {
    justify-content: center;
    width: 100%;
  }

  .volume-control input[type="range"] {
    width: 80%; /* make slider more mobile-friendly */
  }
}
</style>

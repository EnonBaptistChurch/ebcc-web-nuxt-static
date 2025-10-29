<template>
  <div class="audio-player" id="#audio-player">
    <p class="audio-details">{{ src.title }}</p>
    <p class="audio-details">{{ src.parsedSnippet?.speaker }}</p>
    <p class="audio-details">{{ ukDateString(src.parsedSnippet?.date!) }} - {{ src.parsedSnippet?.service }}</p>
    
    <div class="controls">
  <div class="left-controls">
    <button @click="rewind" class="icon-btn" title="Rewind 10s" :style="{ '--btn-size': buttonSize + 'px' }">
      <RewindIcon :size="iconSize" />
    </button>

    <button @click="togglePlay" class="play-btn" :class="{ playing: isPlaying }" title="Play/Pause" :style="{ '--btn-size': buttonSize + 'px' }">
      <PlayIcon v-if="!isPlaying" :size="iconSize" />
      <PauseIcon v-else :size="iconSize" />
    </button>

    <button @click="forward" class="icon-btn" title="Forward 10s" :style="{ '--btn-size': buttonSize + 'px' }">
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
        v-model.number="volume"
        @input="changeVolume"
        title="Volume"
        class="volume-slider"
      />
    </div>
  </div>
</div>
    <div class="time-container">
      <span class="current-time">{{ formatTime(currentTime) }}</span>
      <span class="duration">{{ formatTime(duration) }}</span>
    </div>
    <div class="progress">
      <input
        type="range"
        min="0"
        :max="duration"
        step="0.1"
        v-model="currentTime"
        @input="seekAudio"
      />
      
    </div>
  </div>
  
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import RewindIcon from './audio/icons/RewindIcon.vue'
import PlayIcon from './audio/icons/PlayIcon.vue'
import PauseIcon from './audio/icons/PauseIcon.vue'
import ForwardIcon from './audio/icons/ForwardIcon.vue'


import type { PodcastItem } from '@/types/SermonPodcasts'
const volume = ref(1) 
const iconSize = ref(30) 
const buttonSize = ref(40)

const changeVolume = () => {
  if (audio) audio.volume = volume.value
}


const props = defineProps<{
  src: PodcastItem
}>()

let audio: any
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)

const initAudio = (autoplay: boolean) => {
  if (audio) {
    audio.pause()
    audio.src = ''
    isPlaying.value = false
  }
  audio = new Audio(props.src.enclosure.url)

  audio.addEventListener('timeupdate', () => {
    if(audio !== null)
    currentTime.value = audio.currentTime;
  })

  audio.addEventListener('loadedmetadata', () => {
    duration.value = audio.duration
  })

  audio.addEventListener('ended', () => {
    isPlaying.value = false
  })
  if (autoplay)
  togglePlay();
}

const ukDateString = (date: string) => {
  const newDate = new Date(parseDateString(date));
 return newDate.toLocaleDateString('en-GB', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
} 

onMounted(() =>initAudio(false))
watch(() => props.src, () => initAudio(true))

const togglePlay = () => {
  if (!audio) return
  if (isPlaying.value) audio.pause()
  else audio.play()
  isPlaying.value = !isPlaying.value
}

const seekAudio = () => {
  if (audio) audio.currentTime = currentTime.value
}

const rewind = () => {
  if (audio) audio.currentTime = Math.max(0, audio.currentTime - 10)
}

const forward = () => {
  if (audio) audio.currentTime = Math.min(audio.duration, audio.currentTime + 10)
}

const formatTime = (sec: number) => {
  if (isNaN(sec)) return '0:00'
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

onBeforeUnmount(() => {
  if (audio) {
    audio.pause()
    audio.src = ''
    audio = null
  }
})
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
  max-width: 400px;
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

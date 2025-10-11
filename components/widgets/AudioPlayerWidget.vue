<template>
  <div class="audio-player">
    <p class="audio-details">Speaker: Paul Relf</p>
    <p class="audio-details">Exodus 18 - God is Good</p>
    
    <div class="controls">
      <!-- Rewind 10s -->
      <button @click="rewind" class="icon-btn" title="Rewind 10s">
        <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" stroke-width="3" stroke="#000000" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><polyline points="9.57 15.41 12.17 24.05 20.81 21.44" stroke-linecap="round"></polyline><path d="M26.93,41.41V23a.09.09,0,0,0-.16-.07s-2.58,3.69-4.17,4.78" stroke-linecap="round"></path><rect x="32.19" y="22.52" width="11.41" height="18.89" rx="5.7"></rect><path d="M12.14,23.94a21.91,21.91,0,1,1-.91,13.25" stroke-linecap="round"></path></g></svg>
      </button>

      <!-- Play/Pause -->
      <button @click="togglePlay" class="play-btn" :class="{ playing: isPlaying }" title="Play/Pause">
        <svg v-if="!isPlaying" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="icon">
          <path d="M8 5v14l11-7z"/>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="icon">
          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
        </svg>
      </button>

      <!-- Forward 10s -->
      <button @click="forward" class="icon-btn" title="Forward 10s">
        <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" stroke-width="3" stroke="#000000" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><polyline points="54.43 15.41 51.83 24.05 43.19 21.44" stroke-linecap="round"></polyline><path d="M24.93,41.41V23a.09.09,0,0,0-.16-.07s-2.58,3.69-4.17,4.78" stroke-linecap="round"></path><rect x="30.19" y="22.52" width="11.41" height="18.89" rx="5.7"></rect><path d="M51.86,23.94a21.91,21.91,0,1,0,.91,13.25" stroke-linecap="round"></path></g></svg>
      </button>
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

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  src: { type: String, required: true }
})

let audio
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)

const initAudio = () => {
  if (audio) {
    audio.pause()
    audio.src = ''
  }
  audio = new Audio(props.src)

  audio.addEventListener('timeupdate', () => {
    currentTime.value = audio.currentTime
  })

  audio.addEventListener('loadedmetadata', () => {
    duration.value = audio.duration
  })

  audio.addEventListener('ended', () => {
    isPlaying.value = false
  })
}

onMounted(initAudio)
watch(() => props.src, initAudio)

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

const formatTime = (sec) => {
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
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  border-radius: 1rem;
  background: linear-gradient(145deg, #ffffff, #f2f4f8);
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
  margin:0;
}

.controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;
}

.icon-btn,
.play-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f9fafb;
  border: none;
  border-radius: 50%;
  width: 52px;
  height: 52px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.08);
}

.icon-btn:hover,
.play-btn:hover {
  background: #e0e7ff;
}

.play-btn.playing {
  background: #2563eb;
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
  accent-color: #2563eb;
  cursor: pointer;
}

.time-container {
  display: flex;
  justify-content: space-between; /* pushes content to the edges */
  font-family: monospace; /* optional, looks nice for time */
  font-size: 14px;
  width: 100%;
}
</style>

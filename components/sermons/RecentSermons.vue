<script setup lang="ts">
import { ref } from 'vue'
import sermonsData from '~~/data/sermons.json'
import { getUkDateString } from '../../composables/useDateToText'

const props = withDefaults(defineProps<{ showSeekBar?: boolean }>(), {
  showSeekBar: false,
})



// sermons.json is sorted newest first
const latest = (sermonsData as any).items?.[0]
const audioSrc: string | undefined = latest?.enclosure?.url

const audio = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)
const current = ref(0)
const duration = ref(0)


function hasSpeakerAvatar(speakerName: string | undefined): boolean {
  if (!speakerName) return false

  const formattedName = speakerName.toLowerCase().replace(/\s+/g, '-')
  if(formattedName === 'pastor-paul-relf' || formattedName === 'graham-trice') {
    return true
  }
  return false
}

const speakerAvatars: Record<string, string> = {
  'pastor-paul-relf': '/images/leaders/PR-8258-320.webp',
  'graham-trice': '/images/leaders/gt.jpg',
  // add more speakers here as you get photos
}
const DEFAULT_AVATAR = '/images/speakers/pulpit-avatar2.jpg'

function getSpeakerAvatarUrl(speakerName: string | undefined): string {
  if (!speakerName) return DEFAULT_AVATAR
  const key = speakerName.toLowerCase().replace(/\s+/g, '-')
  return speakerAvatars[key] ?? DEFAULT_AVATAR
}
function toggle() {
  const el = audio.value
  if (!el) return
  if (el.paused) el.play()
  else el.pause()
}

function onSeek(e: Event) {
  if (!audio.value) return
  audio.value.currentTime = Number((e.target as HTMLInputElement).value)
}
</script>

<template>
  <div v-if="latest" class="recent-sermons">
    <div class="title-row">
    <p class="recent-sermons__label">Latest Recorded Sermon</p>
    <span class="recent-sermons__date">
                {{ getUkShortDateString(latest.parsedSnippet?.formattedDate ?? latest.pubDate) }}
                {{ latest.parsedSnippet?.service }}
              </span>
              </div>

    <ul class="recent-sermons__list">
      <li>
        
        <div class="recent-sermons__row">
          <button
            v-if="audioSrc"
            type="button"
            class="recent-sermons__play"
            :aria-label="isPlaying ? 'Pause sermon' : 'Play sermon'"
            @click="toggle"
          >
            <svg v-if="!isPlaying" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path d="M8 5v14l11-7z" fill="currentColor" />
            </svg>
            <svg v-else viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path d="M6 5h4v14H6zM14 5h4v14h-4z" fill="currentColor" />
            </svg>
          </button>
          <div class="recent-sermons__item">
            <div class="recent-sermons__details">
            <div class="recent-sermons__text">
            
            <span class="recent-sermons__title">
              {{ latest.parsedSnippet?.condensedTitle }}
            </span>
            
            
            
<span v-if="latest.parsedSnippet?.passage" class="recent-sermons__passage">
                {{ latest.parsedSnippet.passage }}
              </span>
              <span v-if="latest.parsedSnippet?.speaker" class="recent-sermons__speaker">
              
                {{ latest.parsedSnippet.speaker.name }}
              </span>

            </div>
            <img v-if="hasSpeakerAvatar(latest.parsedSnippet?.speaker?.name)"
              :src="getSpeakerAvatarUrl(latest.parsedSnippet?.speaker?.name)"
              :alt="latest.parsedSnippet?.speaker?.name ?? 'Speaker'"
              class="speaker__avatar"
              width="60"
              height="60"
              loading="lazy"
            />
            </div>

            <div class="recent-sermons__footer">
              <input
                v-if="props.showSeekBar && audioSrc"
                type="range"
                class="recent-sermons__seek"
                aria-label="Seek"
                min="0"
                :max="duration || 0"
                step="1"
                :value="current"
                @input="onSeek"
              />
              <NuxtLink to="/sermons/" class="recent-sermons__all">
                All sermons <span aria-hidden="true">→</span>
              </NuxtLink>
            </div>
            
          </div>
        </div>

        <audio
          v-if="audioSrc"
          ref="audio"
          :src="audioSrc"
          preload="none"
          @play="isPlaying = true"
          @pause="isPlaying = false"
          @ended="isPlaying = false"
          @timeupdate="current = audio?.currentTime ?? 0"
          @loadedmetadata="duration = audio?.duration ?? 0"
        />
        
      </li>
    </ul>

    
  </div>
</template>

<style scoped>
.recent-sermons {
  --accent: #000000;
  --ink: #232323;
  --muted: #6b6b6b;
}
.title-row {
  display: flex;
  flex-wrap: wrap;            /* label and date stack instead of squeezing on narrow screens */
  justify-content: space-between;
  align-items: baseline;
  gap: 0 0.75rem;
}
.recent-sermons__label {
  margin: 0;
  /* matches the pill's height so the two columns line up */
  padding: 0.2rem 0;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted);
}

.recent-sermons__list {
  display: flex;
  flex-wrap: wrap;
  gap: 0 2rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.recent-sermons__list li {
  flex: 1 1 14rem;
  min-width: 0;
}

/* the divider moves from between rows to between columns */
@media (min-width: 640px) {
  .recent-sermons__list li + li {
    padding-left: 2rem;
    margin-left: -2rem;
    border-left: 1px solid rgba(0, 0, 0, 0.1);
  }
}

/* stacked layout on small screens keeps the original row dividers */
@media (max-width: 639px) {
  .recent-sermons__list li {
    flex-basis: 100%;
  }

  .recent-sermons__list li + li {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
}

/* NEW: play button + text side by side */
.recent-sermons__row {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.recent-sermons__play {
  flex: none;
  display: grid;
  place-items: center;
  width: 2.25rem;
  height: 2.25rem;
  margin-top: 0.15rem;
  border-radius: 9999px;
  border: 1px solid var(--ink);
  background: transparent;
  color: var(--ink);
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.recent-sermons__play:hover,
.recent-sermons__play:focus-visible {
  background: var(--ink);
  color: #fff;
}

/* was the link; now a plain wrapper with the same layout */
.recent-sermons__item {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  padding: 0.25rem 0;
  color: var(--ink);
}

.recent-sermons__content {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  color: inherit;
  text-decoration: none;
}

.recent-sermons__date {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--muted);
  max-width: 18ch;
  overflow-wrap: anywhere;
}

.recent-sermons__title {
  font-weight: 600;
  line-height: 1.25;
  /* 1rem on phones, grows slightly on wider screens (was 0.5rem on phones) */
  font-size: clamp(1rem, 0.9rem + 0.4vw, 1.125rem);
  overflow-wrap: anywhere;
  color: inherit;
  text-decoration: none;
  transition: color 0.2s ease;
}

.recent-sermons__speaker {
  font-weight: 500;
  line-height: 1.3;
  font-size: clamp(0.875rem, 0.8rem + 0.3vw, 0.9rem);
  color: inherit;
  text-decoration: none;
  transition: color 0.2s ease;
}

.recent-sermons__passage {
  font-family: Georgia, 'Times New Roman', serif;
  font-style: italic;
  font-size: 0.95rem;
  color: var(--muted);
}

/* title / passage / speaker on the left, avatar on the right, footer spans the full width below */
.recent-sermons__details {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.recent-sermons__text {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

/* seek bar and "All sermons" on one line */
.recent-sermons__footer {
  display: flex;
  flex-wrap: wrap;            /* "All sermons" drops below the seek bar if there isn't room */
  align-items: center;
  gap: 0.25rem 0.75rem;
  margin-top: 0.25rem;
}

.recent-sermons__seek {
  flex: 1 1 8rem;
  min-width: 8rem;
  margin: 0;
  accent-color: var(--accent);
}

.recent-sermons__title:hover,
.recent-sermons__title:focus-visible,
.recent-sermons__content:hover .recent-sermons__date,
.recent-sermons__content:focus-visible .recent-sermons__date {
  text-decoration: underline;
}

.recent-sermons__all {
  flex: none;
  margin-left: auto;   /* keeps it on the right even when the seek bar is hidden */
  white-space: nowrap;
  font-weight: 600;
  color: var(--accent);
  text-decoration: none;
}

.recent-sermons__all:hover,
.recent-sermons__all:focus-visible {
  text-decoration: underline;
}

.speaker__avatar {
  flex: none;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 0 0 2px #fff, 0 0 0 3px #e5e7eb;
}

/* Small phones: tighten the row so the text gets more room */
@media (max-width: 480px) {
  .recent-sermons__row {
    gap: 0.5rem;
  }

  .speaker__avatar {
    width: 48px;
    height: 48px;
  }
}
</style>
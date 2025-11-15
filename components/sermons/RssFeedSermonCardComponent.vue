<template>
    <div class="card" :class ="{ chosen: chosenPodcast }">
    <!-- Top row: Thumbnail + Info -->
        <div class="row thumbnail-row">
          <!-- Thumbnail with play button -->
          <div class="thumbnail" @click="play(episode)">
            <img :src="episode.itunes.image" alt="Episode Thumbnail" />
            <div class="play-button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path fill="#fff" d="M424 214.7L72 3c-17.8-10.2-40 2.7-40 23.7v458.6c0 21 22.2 34 40 23.7l352-211.7c16.5-9.9 16.5-33.7 0-43.3z"/>
              </svg>
            </div>
          </div>
          <!-- Info -->
          <div class="info">
            <div class="card-header">
            <h2 class="card-title">
              {{ episode.title }}
            </h2>
            </div>
            <div v-if="episode.parsedSnippet !== null">
            <p class="card-speaker">{{ episode.parsedSnippet.speaker }}</p>
            <div class="info-row">
              <span class="card-date">{{ episode.parsedSnippet.date }}</span> - 
              <span class="card-service">{{ episode.parsedSnippet.service }}</span>
            </div>
            </div>
          </div>
        </div>
        <div class="bottom">
        <!-- Duration -->
        <p class="card-duration">{{ episode.itunes.duration }}</p>

        <!-- Spotify Logo -->
         <a :href="episode.link" target="_blank">
        <div class="spotify-logo">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
            <path fill="#1ed760" d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8Z"/>
            <path d="M406.6 231.1c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3zm-31 76.2c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm-26.9 65.6c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4z"/>
          </svg>
        </div>
        </a>
        </div>
        </div>
</template> 

<script setup lang="ts">
import type { PodcastItem } from '@/types/SermonPodcasts';

const props = defineProps<{
  episode: PodcastItem
  choosePodcast: (episode: PodcastItem) => void
  chosenPodcast: boolean
}>()

const play = (episode: PodcastItem) => {
  props.choosePodcast(episode);

}
</script>

<style scoped>

/* Card */
.card {
  position: relative;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 0.75rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.chosen{
  background-color: #dddbeb;
}

.bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
/* Thumbnail */
.thumbnail-row {
  display: flex;
  gap: 12px;
}

.thumbnail {
  position: relative;
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 32px;
  height: 32px;
  transform: translate(-50%, -50%);
  background: rgba(0,0,0,0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.play-button svg {
  width: 16px;
  height: 16px;
}

.thumbnail:hover .play-button {
  transform: translate(-50%, -50%) scale(1.2);
}

/* Info next to thumbnail */
.info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Spotify Logo */
.spotify-logo {
  display: flex;
  width: 24px;
  height: 24px;
}

.spotify-logo:hover {
  transform: scale(1.5);
  transition: transform 0.3s ease;
}

.spotify-logo svg {
  width: 100%;
  height: 100%;
  display: block;
}

/* Rows */
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.info-row {
  color: #666;
  font-size: 0.9rem;
}

/* Card Title */
.card-title {
  margin: 0;
  font-size: 1.1rem;
  font-weight: bold;
}

.card-title a {
  text-decoration: none;
  color: #000;
}

.card-title a:hover {
  text-decoration: underline;
}
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
/* Card Text */
.card-speaker {
  font-size: 0.95rem;
  color: #555;
  margin:0;
}

.card-date,
.card-service {
  font-size: 0.85rem;
  color: #666;
}

.card-duration {
  font-size: 0.85rem;
  color: #888;
  margin-bottom: 0;
  align-items: center;
}

/* Link Button */
.card-link {
  display: inline-block;
  padding: 6px 12px;
  background-color: #1a73e8;
  color: #fff;
  border-radius: 4px;
  text-decoration: none;
  font-size: 0.9rem;
}

.card-link:hover {
  background-color: #155ab6;
}

@media (max-width: 480px) {
  .row, .info-row, .thumbnail-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .row + .info-row {
    margin-top: 4px;
  }

  .card-title {
    font-size: 1rem;
  }

  .card-speaker {
    font-size: 0.9rem;
  }

  .card-date,
  .card-service {
    font-size: 0.8rem;
  }

  .card-duration {
    font-size: 0.8rem;
  }

  .thumbnail {
    width: 60px;
    height: 60px;
  }
}
</style>




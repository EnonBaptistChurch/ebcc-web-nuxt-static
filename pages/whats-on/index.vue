<template>
  <article class="whats-on-container">
    <h1>What's On</h1>
    <h2>Weekly Meetings</h2>

    <section v-for="group in eventsByDay" :key="group.day" class="day-section">
      <h3 class="day-title">{{ group.day }}</h3>

      <div class="cards-grid">
        <div v-for="event in group.events" :key="event.id" class="event-card">
          <!-- Media: carousel for several images, single image otherwise -->
          <div class="card-media">
            <ClientOnly >
              
            
            <swiper-container
              v-if="galleryFor(event).length > 1"
              :slides-per-view="1"
              :space-between="0"
              :loop="true"
              :autoplay="{
                delay: 1500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
              }"
              
              class="custom-swiper"
            >
              <swiper-slide v-for="(img, i) in galleryFor(event)" :key="i">
                <img
                  :src="img.src"
                  :alt="img.alt"
                  loading="lazy"
                  decoding="async"
                  @error="onImageError"
                >
              </swiper-slide>
            </swiper-container>

            <img
              v-else
              :src="galleryFor(event)[0].src"
              :alt="galleryFor(event)[0].alt"
              loading="lazy"
              decoding="async"
              @error="onImageError"
            >
            </ClientOnly>
          </div>

          <!-- Text -->
          <div class="card-content">
            <h4 class="event-title">
              <NuxtLink v-if="event.url" :to="event.url">{{ event.title }}</NuxtLink>
              <span v-else>{{ event.title }}</span>
            </h4>

            <p class="event-time">{{ event.time }}</p>

            <span v-if="event.note" class="event-note">{{ event.note }}</span>

            <p v-if="event.description" class="event-description">
              {{ event.description }}
            </p>

            <div v-if="event.additionalLinks?.length" class="card-actions">
              <NuxtLink
                v-for="(link, idx) in event.additionalLinks"
                :key="idx"
                :to="link.url"
                class="card-button"
              >
                {{ link.text }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useHead } from 'nuxt/app';
import { eventCardsData } from '../../data/whats-on';
import { register } from 'swiper/element/bundle';
  register()
onMounted(() => {
  import('swiper/element/bundle').then(({ register }) => register());
});
type EventCard = (typeof eventCardsData)[number];
type ImageItem = { src: string; alt: string };

const DEFAULT_IMAGE: ImageItem = {
  src: '/images/building/enonOutside-320.webp',
  alt: ''
};

useHead({
  title: "What's On - Enon Baptist Church",
  meta: [
    {
      name: 'description',
      content: "Discover regular meetings at Enon Baptist Church, Chatham. Join us for worship, Bible study and children's activities."
    }
  ]
});

// Always returns at least one image.
// - event.images: string[]            -> carousel (or single image if only one)
// - event.image: string | {src, alt}  -> single image
// - neither                           -> default building photo
function galleryFor(event: EventCard): ImageItem[] {
  const e = event as any;

  if (Array.isArray(e.images) && e.images.length) {
    console.log("Array");
    return e.images.map((img: string | { src: string; alt?: string }, i: number) =>
      typeof img === 'string'
        ? { src: img, alt: `${e.title} photo ${i + 1}` }
        : { src: img.src, alt: img.alt ?? `${e.title} photo ${i + 1}` }
    );
  }

  if (e.image) {
    console.log("Single Image");
    return [
      typeof e.image === 'string'
        ? { src: e.image, alt: '' }
        : { src: e.image.src, alt: e.image.alt ?? '' }
    ];
  }

  return [DEFAULT_IMAGE];
}

// If a custom image 404s, fall back to the default
function onImageError(e: Event) {
  const el = e.target as HTMLImageElement;
  if (!el.src.endsWith(DEFAULT_IMAGE.src)) {
    el.src = DEFAULT_IMAGE.src;
  }
}

const eventsByDay = computed(() => {
  const groups = new Map<string, EventCard[]>();

  for (const event of eventCardsData) {
    if (!groups.has(event.day)) {
      groups.set(event.day, []);
    }
    groups.get(event.day)!.push(event);
  }

  return Array.from(groups.entries()).map(([day, events]) => ({ day, events }));
});
</script>

<style scoped>
.whats-on-container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 1.5rem;
}

.day-section {
  margin-top: 2rem;
}

.day-title {
  font-size: 1.35rem;
  color: var(--nav-bar-bg-color);
  border-bottom: 2px solid #e0f2fe;
  padding-bottom: 0.35rem;
  margin-bottom: 1rem;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 1.25rem;
}

/* Card: media on the left, text on the right */
.event-card {
  display: flex;
  align-items: stretch;
  background-color: #fdf4e8;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.event-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
}

.card-media {
  position: relative;
  flex: 0 0 42%;
  min-height: 170px;
}

.card-media > img,
.custom-swiper,
.custom-swiper swiper-slide,
.custom-swiper swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-media > img,
.custom-swiper {
  position: absolute;
  inset: 0;
}

.custom-swiper {
  --swiper-pagination-color: #ffffff;
  --swiper-pagination-bullet-inactive-color: #ffffff;
  --swiper-pagination-bullet-inactive-opacity: 0.6;
  --swiper-pagination-bullet-size: 7px;
}

.card-content {
  flex: 1;
  min-width: 0; /* lets long titles wrap instead of overflowing */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 1rem 1.25rem;
}

.event-title {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 1.25;
}

.event-title a {
  color: #0f172a;
  text-decoration: none;
}

.event-title a:hover {
  color: #0284c7;
  text-decoration: underline;
}

.event-time {
  margin: 0.2rem 0 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--nav-bar-bg-color);
}

.event-note {
  display: inline-block;
  font-size: 0.8rem;
  background-color: var(--nav-bar-bg-color);
  color: #fafafa;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  margin-bottom: 0.5rem;
}

.event-description {
  margin: 0;
  font-size: 0.95rem;
  color: #475569;
  line-height: 1.4;
}

.card-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.85rem;
}

.card-button {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: var(--nav-bar-bg-color);
  color: #ffffff;
  font-weight: 700;
  font-size: 0.95rem;
  text-decoration: none;
  border-radius: 8px;
  transition: filter 0.2s ease;
}

.card-button:hover {
  filter: brightness(1.2);
}

/* Narrow screens: stack image above text */
@media (max-width: 480px) {
  .cards-grid {
    grid-template-columns: 1fr;
  }

  .event-card {
    flex-direction: column;
  }

  .card-media {
    flex: none;
    height: 200px;
    min-height: 0;
  }
}
</style>
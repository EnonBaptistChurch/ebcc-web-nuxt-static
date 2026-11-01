<template>
  <article class="whats-on-container">
    <h1>What's On</h1>
    <h2>Weekly Meetings</h2>

    <section v-for="group in eventsByDay" :key="group.day" class="day-section">
      <h3 class="day-title">{{ group.day }}</h3>

      <div class="cards-grid">
        <div v-for="event in group.events" :key="event.id" class="event-card">
          <div class="card-header">
            <span class="event-time">{{ event.time }}</span>
          </div>

          <div class="card-body">
            <h4 class="event-title">
              <NuxtLink v-if="event.url" :to="event.url">{{ event.title }}</NuxtLink>
              <span v-else>{{ event.title }}</span>
            </h4>

            <span v-if="event.note" class="event-note">{{ event.note }}</span>

            <p v-if="event.description" class="event-description">
              {{ event.description }}
            </p>
          </div>

          <div v-if="event.additionalLinks?.length" class="card-footer">
            <NuxtLink
              v-for="(link, idx) in event.additionalLinks"
              :key="idx"
              :to="link.url"
              class="card-link"
            >
              {{ link.text }}
            </NuxtLink>
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

useHead({
  title: "What's On - Enon Baptist Church",
  meta: [
    {
      name: 'description',
      content: "Discover regular meetings at Enon Baptist Church, Chatham. Join us for worship, Bible study and children's activities."
    }
  ]
});

const eventsByDay = computed(() => {
  const groups = new Map<string, typeof eventCardsData>();
  
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
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem;
}

.day-section {
  margin-top: 2rem;
}

.day-title {
  font-size: 1.35rem;
  color: #0369a1;
  border-bottom: 2px solid #e0f2fe;
  padding-bottom: 0.35rem;
  margin-bottom: 1rem;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.25rem;
}

.event-card {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.event-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.card-header {
  padding: 0.75rem 1rem;
  background-color: #f8fafc;
  border-bottom: 1px solid #f1f5f9;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.event-time {
  font-size: 0.875rem;
  font-weight: 600;
  color: #0369a1;
}

.card-body {
  padding: 1rem;
  flex-grow: 1;
}

.event-title {
  margin: 0 0 0.35rem 0;
  font-size: 1.05rem;
}

.event-title a {
  color: #0f172a;
  text-decoration: none;
}

.event-title a:hover {
  color: #0284c7;
  text-decoration: underline;
}

.event-note {
  display: inline-block;
  font-size: 0.8rem;
  background-color: #104268;
  color: #FAFAFA;
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  margin-bottom: 0.5rem;
}

.event-description {
  margin: 0.5rem 0 0 0;
  font-size: 0.875rem;
  color: #475569;
  line-height: 1.4;
}

.card-footer {
  padding: 0.75rem 1rem;
  border-top: 1px solid #f1f5f9;
  background-color: #fafafa;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  font-size: 0.85rem;
}

.card-link {
  color: #0284c7;
  text-decoration: none;
  font-weight: 500;
}

.card-link:hover {
  text-decoration: underline;
}
</style>
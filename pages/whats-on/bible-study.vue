<template>
    <div>
      <div class="text-content">
        <h1>Bible Study</h1>
        <section>
            <p>
            <strong>Wednesday at 7:30 pm</strong></p> 
            <p>Unless we are meeting for <NuxtLink to="/whats-on/small-groups">small groups</NuxtLink>, which happen generally on the last Wednesday of the month, we meet for Bible Study and prayer at 7:30pm. </p>
            
            <p> We value the Bible as God's Word and meet each week to study it and learn from its teaching. We will learn from it and often discuss it together.
            </p>
            <p> We also spend time in prayer, seeking God's help in all that we do as a church and praying for the advance of the Gospel (the good news about Jesus) around the world.
            </p>
            <p> In our time of prayer we often remember our persecuted brothers and sisters in Christ using <a href="https://www.opendoorsuk.org/" target="_blank">OpenDoors</a> prayer updates to be more informed.
            </p>
            <p>
              Occasionally, we will also watch together an update from <a href="https://www.gbm.org.uk/" target="_blank">GBM</a> <a href="https://vimeo.com/showcase/12227213" target="_blank">prayer waves</a>, where we are updated on what is going in their respective field, but also how we may pray in a more informed way.
            </p>
        </section>
      </div>
    </div>
</template>

<script setup>
import { useHead } from 'nuxt/app';
useHead({
  title: 'Bible Study | Enon Baptist Church',
  meta: [
    {
      name: 'description',
      content:
        "Join us for Bible Study at Enon to explore and study God's Word together, and engage in prayer for our church and the whole world.",
    }
  ]
})
</script>
<style scoped>
a {
  text-decoration: none;
  color:#1a202c;
  font-weight: 900;
}
/* Base Container */
.small-groups {
  max-width: 720px;
  margin: 0 auto;
  padding: 1.5rem 1rem;
  font-family: system-ui, -apple-system, sans-serif;
  color: #222;
  line-height: 1.6;
}

.small-groups h1 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-size: 2rem;
}

.meeting-time {
  font-size: 1.1rem;
  color: #4a5568;
  margin-bottom: 1.5rem;
}

/* Featured Card Section */
.currently-studying {
  display: flex;
  flex-direction: column; /* Mobile first: stack image above text */
  align-items: flex-start;
  gap: 1.25rem;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1.25rem;
  margin: 1.5rem 0;
}

.study-guide-img {
  width: 120px;
  max-width: 100%;
  height: auto;
  border-radius: 4px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  align-self: center; /* Center image on mobile */
}

.study-details h2 {
  font-size: 1.2rem;
  margin-top: 0;
  margin-bottom: 0.5rem;
  color: #1a202c;
}

.study-details p {
  margin: 0 0 0.5rem 0;
}

.study-details p:last-child {
  margin-bottom: 0;
}

/* Desktop Styles */
@media (min-width: 600px) {
  .currently-studying {
    flex-direction: row; /* Align side-by-side on desktop */
    align-items: center;
  }

  .study-guide-img {
    align-self: flex-start; /* Top-align image with content on desktop */
  }
}
</style>
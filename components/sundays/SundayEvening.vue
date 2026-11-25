<template>
  <article class="service">
    <div class="service-image">
      <img src="/images/building/from_the_back.jpg" class="evening-worship-image" alt="">
    </div>

    <div class="service-body">
      <p class="time-badge">Sunday · 6:30 PM</p>
      <h2>Evening Service</h2>

      <p class="lead-text">
        Join us Sunday evening as we gather to worship, pray, and hear from God's Word together.
      </p>

      <div class="online">
        <p class="sub-text">
          Everyone is welcome to attend in person. If you can't be with us physically, you can tune in online
          via our live Zoom broadcast.
        </p>

        <button type="button" class="zoom-btn" @click="openZoom">
          Join Zoom Meeting
        </button>

        <div class="zoom-image-container">
          <img
            src="/images/other-zoom.png"
            alt="Zoom service information"
            class="zoom-image"
          />
        </div>
      </div>
    </div>
  </article>
</template>

<script setup>
function openZoom() {
  // Build the link in pieces to obscure it from automated scrapers
  const base = "https://us02web.zoom.us/j/";
  const id = "468947237";
  const query = "?pwd=OGJaRDdqaFdabzZ2VEdacFdIS3ZMQT09";

  const link = base + id + query;
  window.open(link, "_blank", "noopener,noreferrer");
}
</script>

<style scoped>
.service {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--card-border, #e5e7eb);
  border-radius: 0.75rem;
  background: #fff;
  box-shadow: 0 1px 3px rgb(0 0 0 / 0.06);
}

.service-image {
  line-height: 0;
}

.evening-worship-image {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 10;
  object-fit: cover;
}

.service-body {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 1.5rem 1.75rem 1.75rem;
  line-height: 1.6;
  color: var(--ink-soft, #4b5563);
}

.time-badge {
  align-self: flex-start;
  margin: 0 0 0.75rem;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  background: var(--accent-soft, #faf6ef);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--accent, #9a7b4f);
}

h2 {
  margin: 0 0 0.75rem;
  font-size: 1.6rem;
  line-height: 1.2;
  color: var(--ink, #1f2937);
}

.lead-text {
  margin: 0 0 1.25rem;
  font-size: 1.05rem;
  color: var(--ink, #1f2937);
}

.sub-text {
  margin: 0;
  font-size: 0.95rem;
}

.online {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border-left: 4px solid var(--accent, #9a7b4f);
  border-radius: 0.5rem;
  background: var(--accent-soft, #faf6ef);
}

.zoom-btn {
  align-self: flex-start;
  padding: 0.75rem 1.4rem;
  border: none;
  border-radius: 8px;
  background-color: var(--button-bg-color, #1976d2);
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 12px rgb(0 0 0 / 0.1);
  transition: background-color 0.2s, transform 0.1s, box-shadow 0.2s;
}

.zoom-btn:hover {
  background-color: #166fe5;
  box-shadow: 0 6px 18px rgb(0 0 0 / 0.15);
}

.zoom-btn:active {
  background-color: #0b5fcc;
  transform: scale(0.97);
}

.zoom-btn:focus-visible {
  outline: 2px solid #8bb8f3;
  outline-offset: 3px;
}

.zoom-image-container {
  width: 100%;
  max-width: 300px;
  overflow: hidden;
  border-radius: 0.5rem;
  line-height: 0;
}

.zoom-image {
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  filter: blur(3px);
  transition: filter 0.3s ease;
}

.zoom-image:hover {
  filter: blur(0);
}

@media (prefers-reduced-motion: reduce) {
  .zoom-btn,
  .zoom-image {
    transition: none;
  }
}
</style>
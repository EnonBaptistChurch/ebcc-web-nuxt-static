<template>
  <div class="text-content">
    <div class="evening-total-content">
    <h1>Sunday Evening Service - 6:30 PM</h1>
    <div class="evening-image">
    <img src="/images/building/from_the_back.jpg" class="evening-worship-image" alt="">
    </div>
    <div class="evening-text-content">
      <div class="evening-text">
        <p class="lead-text">
          Join us Sunday evening as we gather to worship, pray, and hear from God's Word together.
        </p>
        
        <p class="sub-text">
          Everyone is welcome to attend in person. If you can't be with us physically, you can tune in online via our live Zoom broadcast.
        </p>

        <div class="action-block">
          <button type="button" class="zoom-btn" @click="openZoom">
            Join Zoom Meeting
          </button>
        </div>
      </div>
<div class="zoom-image-container">
      <img 
        src="/images/other-zoom.png" 
        alt="Zoom service information" 
        class="zoom-image" 
      />
      </div>
    </div>
    </div>
  </div>
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
.evening-total-content {
  text-align: center;
  margin: 0 auto;
}

.evening-image {
  padding: 0 1rem 0 1rem;
}

.evening-worship-image {
  max-height: 300px;
  max-width: 1920px;
  height: auto;
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

/* Centered container with row layout */
.evening-text-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  margin: 0 auto 1rem auto;
  width: 100%;
  max-width: 900px; /* Limits width so margin: 0 auto can center it */
  padding: 0 1rem;
  box-sizing: border-box;
}

/* Left-aligned text content */
.evening-text {
  flex: 1;
  text-align: left;
}

.lead-text {
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0 0 0.75rem 0;
  color: #2c3e50;
}

.sub-text {
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0 0 1.5rem 0;
  color: #555;
}

.action-block {
  margin-top: 0.5rem;
}

.zoom-btn {
  background-color: var(--button-bg-color, #1976D2);
  color: #fff;
  font-weight: 600;
  padding: 12px 22px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s, transform 0.1s, box-shadow 0.2s;
}

.zoom-btn:hover {
  background-color: #166FE5;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
}

.zoom-btn:active {
  background-color: #0B5FCC;
  transform: scale(0.97);
}

.zoom-btn:focus-visible {
  outline: 2px solid #8BB8F3;
  outline-offset: 3px;
}

/* Image container placed on the right */
.zoom-image-container {
  flex-shrink: 0;
  width: 300px;
  max-width: 100%;
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

/* Mobile responsive layout */
@media (max-width: 600px) {
  .evening-text-content {
    flex-direction: column;
    text-align: center;
  }
  
  .evening-text {
    text-align: center;
  }

  .zoom-image-container {
    width: 100%;
  }

  .zoom-image {
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    filter: blur(3px);
    transition: filter 0.3s ease;
  }
}
</style>
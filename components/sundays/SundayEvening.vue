<template>
<div class="text-content">
    <h1>Sunday Evening Service - 6:30PM</h1>
    <p>Join us for our Sunday evening service, where we gather to worship, pray, and hear from God's Word.</p>
    <p>We encourage all who are able to attend to join us.</p>
    <p>For those unable to join us in person, the evening service is also accessible via Zoom <a target="_blank" rel="nofollow noopener noreferrer" href="https://us02web.zoom.us/j/468947237?pwd=OGJaRDdqaFdabzZ2VEdacFdIS3ZMQT09"> here</a>.</p>
    <button
      type="button"
      @click="openZoom"
      class="zoom-btn"
    >
      Join Zoom
    </button>
    </div>
</template>

<script setup>
function openZoom() {
  // Build the link in pieces so bots can't just read it from source
  const base = "https://us02web.zoom.us/j/";
  const id = "468947237";
  const query = "?pwd=OGJaRDdqaFdabzZ2VEdacFdIS3ZMQT09";

  const link = base + id + query;
  window.open(link, "_blank", "noopener,noreferrer");
}
</script>

<style scoped>
.zoom-btn {
  background-color: var(--button-bg-color, #1976D2);
  color: #fff;
  font-weight: 600;
  padding: 12px 22px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: background-color .2s, transform .1s, box-shadow .2s;
}

.zoom-btn:hover {
  background-color: #166FE5;
  box-shadow: 0 6px 18px rgba(0,0,0,0.15);
}

.zoom-btn:active {
  background-color: #0B5FCC;
  transform: scale(0.97);
}

.zoom-btn:focus {
  outline: 2px solid #8BB8F3;
  outline-offset: 3px;
}
</style>
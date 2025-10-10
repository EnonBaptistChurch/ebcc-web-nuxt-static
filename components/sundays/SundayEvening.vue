<template>
<div class="text-content">
    <h1>Sunday Evening Service - 6:30PM</h1>
    <p>Join us for our Sunday evening service, where we gather to worship, pray, and hear from God's Word.</p>
    <p>We encourage all who are able to attend to join us.</p>
    <p>For those unable to join us in person, the evening service is also accessible via Zoom <a target="_blank" rel="nofollow noopener noreferrer" href="https://us02web.zoom.us/j/468947237?pwd=OGJaRDdqaFdabzZ2VEdacFdIS3ZMQT09"> here</a>.</p>
    <button
      type="button"
      @click="openZoom"
      class="btn btn-primary"
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
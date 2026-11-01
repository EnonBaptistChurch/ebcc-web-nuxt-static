<template>
  <div
    class="edenParallax-zone"
    :class="{ 'edenParallax-error': isErrorPage }"
    :style="{
      '--img-sm': `url(${images.small})`,
      '--img-md': `url(${images.medium})`,
      '--img-lg': `url(${images.large})`,
      '--img-xl': `url(${images.xlarge})`,
    }"
  >
    <div class="edenParallax-wrap">
      <div class="edenParallax-screen"></div>
      <div class="verse-content">
        “{{ verseText }}” {{ reference }} {{ version ? `(${version})` : '' }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BibleVerseParallax",
  props: {
    verseText: { type: String, required: true },
    reference: { type: String, required: true },
    version: { type: String, default: '' },
    images: {
      type: Object,
      default: () => ({
        small: '/images/field-768.webp',
        medium: '/images/field-768.webp',
        large: '/images/field-1440.webp',
        xlarge: '/images/field-1920.webp',
      }),
    },
    isErrorPage: { type: Boolean, default: false },
  },
};
</script>

<style scoped>
.edenParallax-zone {
  position: relative;
  flex-shrink: 0;
  width: 100%;
  height: 300px;
  overflow: hidden;
  background-image: var(--img-sm);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

@media (min-width: 768px)  { .edenParallax-zone { background-image: var(--img-md); } }
@media (min-width: 1440px) { .edenParallax-zone { background-image: var(--img-lg); } }
@media (min-width: 1920px) { .edenParallax-zone { background-image: var(--img-xl); } }

/* Parallax only where it works well: wide screens with a mouse */
@media (min-width: 1024px) and (hover: hover) {
  .edenParallax-zone { background-attachment: fixed; }
}

@media (orientation: landscape) and (max-width: 1023px) {
  .edenParallax-zone { height: 400px; }
}

.edenParallax-error { background-attachment: scroll; }

/* .edenParallax-wrap, -screen and .verse-content stay as they are */
</style>
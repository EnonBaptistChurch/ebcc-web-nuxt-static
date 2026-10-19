<template>
  <section class="church-hero">
    <img
      src="/images/building/enonOutside-1920.webp"
      srcset="
        /images/building/enonOutside-320.webp 320w,
        /images/building/enonOutside-480.webp 480w,
        /images/building/enonOutside-640.webp 640w,
        /images/building/enonOutside-768.webp 768w,
        /images/building/enonOutside-1024.webp 1024w,
        /images/building/enonOutside-1280.webp 1280w,
        /images/building/enonOutside-1440.webp 1440w,
        /images/building/enonOutside-1920.webp 1920w
      "
      sizes="100vw"
      alt="Enon Baptist Church"
      class="church-hero__image"
      width="1920"
      height="1080"
      fetchpriority="high"
    />
    <div class="church-hero__shade" aria-hidden="true" />
    <div v-if="$slots.default" class="church-hero__content">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.church-hero {
  position: relative;
  overflow: hidden;
  width: 100%;
  /* Taller than before so the roof peak isn't clipped on wide screens */
  height: clamp(280px, 42vw, 700px);
  background-color: #1f2937; /* shown while the image loads */
}

.church-hero__image {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* 0% = top of photo, 100% = bottom. Lower = shows more roof/sky */
  object-position: center 55%;
}

/* Strong fade at the bottom so the title is readable over the doors/fence */
.church-hero__shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0) 40%,
    rgba(0, 0, 0, 0.55) 75%,
    rgba(0, 0, 0, 0.8) 100%
  );
}

.church-hero__content {
  position: absolute;
  inset: auto 0 0 0;
  box-sizing: border-box;
  padding: clamp(1rem, 3vw, 1.5rem) 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: #fff;
}

@media (max-width: 600px) {
  .church-hero {
    height: 300px;
  }
  .church-hero__image {
    object-position: center 20%;
  }
}
</style>
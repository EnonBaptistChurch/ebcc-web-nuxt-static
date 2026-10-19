<template>
  <div class="home">
    <ChurchImage>
      <h1 class="home-title">Welcome to Enon Baptist Church</h1>
    </ChurchImage>

    <section class="intro">
      <p class="intro__text">
        We are a group of people who meet together to worship God. We are
        concerned for one another and those who live around us. We believe the
        Bible to be God’s Word that is relevant to all areas of our life. In
        particular, we have a personal belief in Jesus Christ and through him
        have a real relationship with God.
      </p>
    </section>

    <ClientOnly>
      <PromoCards />
    </ClientOnly>

    <BibleVerseParallaxOverlay
      image="/images/field.webp"
      verseText="For God so loved the world that He gave His only begotten Son, that whoever believes in Him should not perish but have everlasting life."
      reference="John 3:16"
      version="NKJV"
    />
  </div>
</template>

<script setup lang="ts">
import BibleVerseParallaxOverlay from '../components/BibleVerseParallaxOverlay.vue';
import PromoCards from '../components/widgets/PromoCards.vue';
import ChurchImage from '../components/ChurchImage.vue';
</script>

<style scoped>
.home {
  /* Guards against any child pushing the page wider than the screen */
  overflow-x: hidden;
}

.home-title {
  margin: 0;
  max-width: 66ch;
  font-size: clamp(1.25rem, 5vw, 2rem);
  line-height: 1.15;
  font-weight: 200;
  letter-spacing: -0.01em;
  text-wrap: balance;
  text-shadow: 0 2px 14px rgba(0, 0, 0, 0.5);
}

.intro {
  box-sizing: border-box;
  width: 100%;
  max-width: 66rem;
  margin: 0 auto;
  padding: clamp(0.5rem, 2vw, 1.5rem) 1.25rem 0;
  text-align: center;
}

.intro__text {
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  margin: 0;
  font-size: clamp(1.05rem, 1.6vw, 1.25rem);
  line-height: 1.5;
  color: #374151;
  overflow-wrap: break-word;
  text-wrap: pretty;
}
</style>
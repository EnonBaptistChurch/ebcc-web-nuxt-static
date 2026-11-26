<template>
  <div class="page">
    <header class="hero">
      <img
        src="/images/bible-1920.webp"
        srcset="
          /images/bible-320.webp 320w,
          /images/bible-480.webp 480w,
          /images/bible-640.webp 640w,
          /images/bible-768.webp 768w,
          /images/bible-1024.webp 1024w,
          /images/bible-1280.webp 1280w,
          /images/bible-1440.webp 1440w,
          /images/bible-1920.webp 1920w"
        sizes="100vw"
        fetchpriority="high"
        decoding="async"
        loading="eager"
        class="hero-image"
        alt="NKJV Bible"
      />
      <div class="hero-inner">
        <h1>What We Believe</h1>
        <p class="subtitle">
          A summary of the essential doctrines we hold at Enon Baptist Church.
        </p>
      </div>
    </header>

    <div class="layout">
      <nav class="toc" aria-label="Doctrines">
        <ul>
          <li v-for="section in sectionList" :key="section.id">
            <a
              :href="`#${section.id}`"
              :aria-current="activeId === section.id ? 'true' : undefined"
              :class="{ active: activeId === section.id }"
            >
              {{ section.title }}
            </a>
          </li>
        </ul>
      </nav>

      <details ref="jump" class="jump">
        <summary>Jump to a section</summary>
        <ul>
          <li v-for="section in sectionList" :key="section.id">
            <a
              :href="`#${section.id}`"
              :aria-current="activeId === section.id ? 'true' : undefined"
              @click="closeJump"
            >
              {{ section.title }}
            </a>
          </li>
        </ul>
      </details>

      <main class="content">
        <section
          v-for="section in sectionList"
          :id="section.id"
          :key="section.id"
          class="doctrine"
        >
          <h2>{{ section.title }}</h2>
          <p v-for="(paragraph, i) in section.paragraphs" :key="i">
            {{ paragraph }}
          </p>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useHead } from 'nuxt/app'

useHead({
  title: 'What We Believe - Enon Baptist Church',
  meta: [
    { name: 'description', content: 'Summary of the essential doctrines which we at Enon Baptist Church believe.' },
    { name: 'keywords', content: 'Bible, Doctrine, Church, Christianity, NKJV' }
  ],
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Literata:ital,opsz,wght@0,7..72,400;0,7..72,600;1,7..72,400&display=swap'
    }
  ]
})

const sections = ref([
  { title: "The Being of God", content: "There is one true and living God, Father, Son and Holy Spirit, sovereign over all things." },
  { title: "The Scriptures", content: "The 66 books of the Holy Scriptures are verbally inspired by God, and are the only sufficient and infallible guide in all matters of faith and practice." },
  { title: "The Fall of Man", content: "Because the first man, Adam, sinned, sin entered into the world and brought about the guilt and condemnation of all mankind. All people, therefore, are alienated from God and unable to truly turn to Him of themselves." },
  { title: "The Plan of Salvation", content: "Before the world was made, God determined to save a vast multitude of helpless mankind by sending His only and eternal Son to die for them upon the cross. \nWhen God’s time had come, Jesus was born of the virgin Mary. He lived a perfect life, keeping in full obedience the whole law of God. He gave Himself a substitute for all His people by dying upon a cross at Calvary, bearing the full penalty for their sin. The third day He rose again in his body from the dead, and now lives and reigns in Heaven, interceding for His people, and governing the affairs of men." },
  { title: "The Way of Salvation", content: "The salvation secured by the work of Jesus Christ is made real to His people by the work of the Holy Spirit. By his powerful and mysterious work, dead souls are quickened into spiritual life and given both the desire and ability to repent of their sin and believe in Jesus Christ as their Saviour and Lord. All who truly repent and believe have their sins forgiven and the righteousness of Christ is made theirs, being justified by faith alone. Those who God justifies will most certainly enter into the joys of Heaven." },
  { title: "The Christian Life", content: "The true believer receives not only forgiveness of sins but an inward desire to glorify God by a life which conforms to his laws. Therefore good works and holiness of life are essential evidences of true conversion." },
  { title: "The Church", content: "The true church is the innumerable company of God’s people in every age, chosen by Him before the world began. The local church is made up of those who have covenanted together in a visible bond of love and fellowship. The ordinances of baptism and the Lord’s Supper belong in the context of the local church. By their meaning and teaching of Scripture it is clear that before partaking of the Lord’s Supper, converts should identify themselves with the Lord Jesus and His people in Baptism." },
  { title: "The Last Things", content: "At a time known only to God, the Lord Jesus Christ will return to this earth in glory to raise the dead, both righteous and unrighteous, and to judge all mankind. The wicked will go away into everlasting punishment, and the righteous into eternal life." }
])

const slugify = (text) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

// Splits on newlines into real paragraphs, so v-html is no longer needed
const sectionList = computed(() =>
  sections.value.map((s) => ({
    id: slugify(s.title),
    title: s.title,
    paragraphs: s.content.split('\n').map((p) => p.trim()).filter(Boolean)
  }))
)

// Highlight the doctrine currently being read in the side navigation
const activeId = ref(null)
let observer = null

// Mobile "Jump to" menu: close it after a link is tapped
const jump = ref(null)
const closeJump = () => {
  if (jump.value) jump.value.open = false
}

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) activeId.value = entry.target.id
      }
    },
    { rootMargin: '-20% 0px -70% 0px' }
  )
  document.querySelectorAll('.doctrine').forEach((el) => observer.observe(el))
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<style scoped>
.page {
  --ink: #1b2733;
  --ink-soft: #4a5866;
  
  --rule: #d5dbe1;
  --accent: var(--nav-bar-bg-color, #1b2733);
  /* Raise this if your site header is sticky, so the contents list sits below it */
  --sticky-offset: 2rem;

  color: var(--ink);
  /* stops the full-width hero causing a sideways scrollbar */
  overflow-x: clip;
}

/* Hero: full-bleed, centred heading over a darkened image (matches First Steps) */
.hero {
  position: relative;
  /* break out of any page container so it spans the whole screen */
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);

  box-sizing: border-box;
  min-height: clamp(10rem, 60vh, 40rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4rem 1.5rem;
  text-align: center;
  color: #fff;
  background-color: #2f3338;
  overflow: hidden;
}

.hero-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.hero::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.55));
}

.hero-inner {
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
}

/* Heading uses the site's own h1 style and font, like the First Steps page */
.hero h1 {
  margin: 0 0 0.5rem;
  color: #fff;
  text-align: center;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
}

.subtitle {
  margin: 0;
  max-width: none;
  font-size: 1.1rem;
  line-height: normal;
  color: #fff;
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.4);
}

/* Layout */
.layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 0;
  max-width: 68rem;
  margin: 0 auto;
  padding: 0 1.25rem 4rem;
  font-family: 'Literata', Georgia, 'Times New Roman', serif;
}

.toc {
  display: none;
}

/* Mobile "Jump to" dropdown */
.jump {
  margin-top: 1.25rem;
  border: 1px solid var(--rule);
  border-radius: 0.5rem;
  background: #fff;
}

.jump summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.85rem 1rem;
  font-size: 1rem;
  font-weight: 600;
  color: var(--ink);
  cursor: pointer;
  list-style: none;
}

.jump summary::-webkit-details-marker {
  display: none;
}

.jump summary::after {
  content: '';
  width: 0.55rem;
  height: 0.55rem;
  margin-left: 1rem;
  border-right: 2px solid var(--accent);
  border-bottom: 2px solid var(--accent);
  transform: rotate(45deg) translateY(-2px);
  transition: transform 0.2s;
}

.jump[open] summary::after {
  transform: rotate(225deg) translateY(-2px);
}

.jump summary:focus-visible {
  outline: 3px solid var(--accent);
  outline-offset: 2px;
  border-radius: 0.5rem;
}

.jump ul {
  margin: 0;
  padding: 0 0 0.5rem;
  list-style: none;
  border-top: 1px solid var(--rule);
}

.jump a {
  display: block;
  padding: 0.7rem 1rem;
  color: var(--ink);
  text-decoration: none;
}

.jump a[aria-current='true'] {
  color: var(--accent);
  font-weight: 600;
}

.content {
  min-width: 0;
}

.doctrine {
  padding: 1rem 0;
  border-bottom: 1px solid var(--rule);
  scroll-margin-top: 1.5rem;
}

.doctrine:last-child {
  border-bottom: 0;
}

h2 {
  margin: 0 0 0.75rem;
  font-size: clamp(1.35rem, 4.5vw, 1.75rem);
  font-weight: 600;
  line-height: 1.2;
  color: var(--accent);
}

p {
  margin: 0 0 1rem;
  max-width: 62ch;
  font-size: 1.0625rem;
  line-height: 1.75;
  color: var(--ink);
  hyphens: auto;
}

p:last-child {
  margin-bottom: 0;
}

/* Desktop: sticky contents list beside the text */
@media (min-width: 60rem) {
  .layout {
    grid-template-columns: 15rem minmax(0, 1fr);
    gap: 4rem;
    padding-top: 1.5rem;
  }

  .jump {
    display: none;
  }

  .toc {
    display: block;
    position: sticky;
    top: var(--sticky-offset);
    align-self: start;
    padding-top: 2rem;
  }

  .toc ul {
    margin: 0;
    padding: 0;
    list-style: none;
    border-left: 1px solid var(--rule);
  }

  .toc a {
    display: block;
    margin-left: -1px;
    padding: 0.45rem 0 0.45rem 1rem;
    border-left: 3px solid transparent;
    font-size: 0.95rem;
    line-height: 1.35;
    color: var(--ink-soft);
    text-decoration: none;
    transition: color 0.15s, border-color 0.15s;
  }

  .toc a:hover {
    color: var(--ink);
  }

  .toc a.active {
    border-left-color: var(--accent);
    color: var(--ink);
    font-weight: 600;
  }

  .doctrine {
    padding: 1rem 0;
    scroll-margin-top: var(--sticky-offset);
  }

  .doctrine:first-child {
    padding-top: 2rem;
  }
}

/* Larger phones and small tablets */
@media (min-width: 40rem) {
  .layout {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}

@media (max-width: 600px) {
  .hero {
    min-height: 22rem;
    padding: 3rem 1rem;
  }
}

a:focus-visible {
  outline: 3px solid var(--accent);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: no-preference) {
  :global(html) {
    scroll-behavior: smooth;
  }
}
</style>
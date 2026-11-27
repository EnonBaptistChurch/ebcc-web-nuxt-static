<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import {
  isExternalLink,
  isNoticeActive,
  linksToCurrentPage,
  noticeKey,
  splitMessage,
  type BannerNotice,
} from '../data/BannerNotices'

const props = withDefaults(
  defineProps<{
    notices: BannerNotice[]
    /** Scroll speed in pixels per second. */
    speed?: number
    /** Shown in the middle of the gap between notices. Use "" for none. */
    separator?: string
    /** Allow the visitor to dismiss the banner (remembered until the set of active notices changes). */
    dismissible?: boolean
  }>(),
  {
    speed: 60,
    separator: '•',
    dismissible: false,
  },
)

/* ---- Which notices are live right now ----------------------------------- */
const now = ref(Date.now())
let timer: ReturnType<typeof setInterval> | undefined

const route = useRoute()

const activeNotices = computed(() => props.notices.filter((n) => isNoticeActive(n, now.value)))

/**
 * A notice is clickable only when it has a link, showLink is true, and the
 * link isn't to the page the visitor is already on (it's then plain text).
 */
function isLinked(notice: BannerNotice): notice is BannerNotice & { link: string } {
  if (notice.showLink !== true || !notice.link) return false
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  return !linksToCurrentPage(notice.link, route.path, origin)
}

interface DisplaySegment {
  text: string
  /** Set only for the clickable part of the message. */
  href?: string
}

/** Splits a notice into plain-text and linked parts for display. */
function segments(notice: BannerNotice): DisplaySegment[] {
  if (!isLinked(notice)) return [{ text: notice.message }]
  return splitMessage(notice.message, notice.linkText).map((s) => ({
    text: s.text,
    href: s.link ? notice.link : undefined,
  }))
}

/* ---- Dismissal ---------------------------------------------------------- */
const storageKey = computed(
  () => `banner-dismissed:${activeNotices.value.map(noticeKey).join('||')}`,
)
const dismissed = ref(false)

function loadDismissed() {
  if (!props.dismissible) {
    dismissed.value = false
    return
  }
  try {
    dismissed.value = localStorage.getItem(storageKey.value) === '1'
  } catch {
    dismissed.value = false
  }
}

function dismiss() {
  dismissed.value = true
  try {
    localStorage.setItem(storageKey.value, '1')
  } catch {
    /* ignore */
  }
}

const visible = computed(() => activeNotices.value.length > 0 && !dismissed.value)

/* ---- Ticker sizing -------------------------------------------------------
   The track holds two identical groups; each group repeats the full list of
   notices (each followed by a gap) enough times to fill the viewport.
   Animating the track by -50% then loops seamlessly. The gap size is set in
   CSS and scales with screen width; the ResizeObserver re-measures whenever
   it changes. */
const viewportEl = ref<HTMLElement | null>(null)
const trackEl = ref<HTMLElement | null>(null)
const copies = ref(1)
const groupWidth = ref(0)
let resizeObserver: ResizeObserver | undefined

function measure() {
  const viewport = viewportEl.value
  const track = trackEl.value
  if (!viewport || !track) return
  const sequenceWidth = track.scrollWidth / (copies.value * 2)
  if (!sequenceWidth) return
  copies.value = Math.max(1, Math.ceil(viewport.clientWidth / sequenceWidth))
  groupWidth.value = sequenceWidth * copies.value
}

function observe() {
  resizeObserver?.disconnect()
  if (!viewportEl.value || !trackEl.value) return
  resizeObserver = new ResizeObserver(measure)
  resizeObserver.observe(viewportEl.value)
  resizeObserver.observe(trackEl.value)
  measure()
}

const trackStyle = computed(() =>
  groupWidth.value > 0 && props.speed > 0
    ? { animationDuration: `${groupWidth.value / props.speed}s` }
    : {},
)

/* The first copy of the first group is the "real" one for assistive tech
   and keyboard users; the rest are visual repeats. */
function isPrimary(group: number, copy: number): boolean {
  return group === 1 && copy === 1
}

onMounted(() => {
  // Re-check every 30s so notices appear/disappear without a reload.
  timer = setInterval(() => {
    now.value = Date.now()
  }, 30_000)

  loadDismissed()
  if (visible.value) nextTick(observe)
})

watch(storageKey, loadDismissed)

watch(visible, (isVisible) => {
  if (isVisible) {
    nextTick(observe)
  } else {
    resizeObserver?.disconnect()
    copies.value = 1
    groupWidth.value = 0
  }
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
  resizeObserver?.disconnect()
})
</script>

<template>
  <div v-if="visible" class="banner" role="region" aria-label="Announcements">
    <div ref="viewportEl" class="banner-viewport">
      <div ref="trackEl" class="banner-track" :style="trackStyle">
        <div v-for="g in 2" :key="g" class="banner-group">
          <div
            v-for="n in copies"
            :key="n"
            class="banner-sequence"
            :aria-hidden="isPrimary(g, n) ? undefined : 'true'"
          >
            <template v-for="notice in activeNotices" :key="noticeKey(notice)">
              <span class="banner-notice">
                <template v-for="(segment, i) in segments(notice)" :key="i">
                  <a
                    v-if="segment.href"
                    class="banner-link"
                    :href="segment.href"
                    :target="isExternalLink(segment.href) ? '_blank' : undefined"
                    :rel="isExternalLink(segment.href) ? 'noopener noreferrer' : undefined"
                    :tabindex="isPrimary(g, n) ? undefined : -1"
                    >{{ segment.text }}</a
                  >
                  <template v-else>{{ segment.text }}</template>
                </template>
              </span>
              <!-- Always rendered: its padding is the gap, with the separator centred in it. -->
              <span class="banner-separator" aria-hidden="true">{{ separator }}</span>
            </template>
          </div>
        </div>
      </div>
    </div>

    <button
      v-if="dismissible"
      type="button"
      class="banner-dismiss"
      aria-label="Dismiss announcements"
      @click="dismiss"
    >
      &times;
    </button>
  </div>
</template>

<style scoped>
.banner {
  /* Override these from a parent or :root to match your theme. */
  --banner-bg: var(--body-bg-color);
  --banner-fg: var(--nav-bar-bg-color);

  /* Space between notices: scales with screen width, never below 1.5rem
     (phones) or above 6rem (large desktops). Adjust the numbers to taste. */
  --banner-gap: clamp(1.5rem, 10vw, 20rem);

  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  overflow: hidden;
  background: var(--banner-bg);
  color: var(--banner-fg);
  font-size: 0.875rem;
  font-weight: 500;
}

.banner-viewport {
  flex: 1;
  overflow: hidden;
  padding-block: 0.5rem;
}

.banner-track {
  display: flex;
  width: max-content;
  animation-name: banner-scroll;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

/* Pause when hovered or focused so links are easy to read and click. */
.banner-viewport:hover .banner-track,
.banner-viewport:focus-within .banner-track {
  animation-play-state: paused;
}

.banner-group {
  display: flex;
  flex-shrink: 0;
}

.banner-sequence {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  white-space: nowrap;
}

/* Half the gap on each side of the separator = one full gap between notices. */
.banner-separator {
  padding-inline: calc(var(--banner-gap) / 2);
}

.banner-link {
  color: inherit;
  text-decoration: none;
}

/* Underline only appears once the ticker has paused for hover/focus. */
.banner-link:hover,
.banner-link:focus-visible {
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.banner-link:focus-visible {
  outline: 2px solid var(--banner-fg);
  outline-offset: 2px;
}

.banner-dismiss {
  flex-shrink: 0;
  padding: 0.5rem 0.75rem;
  border: 0;
  background: transparent;
  color: inherit;
  font-size: 1.125rem;
  line-height: 1;
  cursor: pointer;
}

.banner-dismiss:hover {
  background: rgb(0 0 0 / 0.1);
}

.banner-dismiss:focus-visible {
  outline: 2px solid var(--banner-fg);
  outline-offset: -2px;
}

@keyframes banner-scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

/* Respect users who prefer reduced motion: show the notices once, static and wrapped. */
@media (prefers-reduced-motion: reduce) {
  .banner-track {
    animation: none;
    width: auto;
  }
  .banner-group:nth-child(n + 2),
  .banner-sequence:nth-child(n + 2),
  .banner-separator {
    display: none;
  }
  .banner-sequence {
    flex-wrap: wrap;
    gap: 0.25rem 1.5rem;
    padding-inline: 1rem;
    white-space: normal;
  }
}
</style>
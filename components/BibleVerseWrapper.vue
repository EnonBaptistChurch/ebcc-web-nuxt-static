<template>
  <div ref="container">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';

declare global {
  interface Window {
    VerseLinker?: {
      init: () => void;
      scanDOM?: () => void;
    }
  }
}

const props = defineProps<{
  lang?: string;
  version?: string;
}>()

const container = ref<HTMLElement | null>(null);
let observer: MutationObserver | null = null;
let debounceTimeout: number | null = null;

function initVerseLinker() {
  if (typeof window === 'undefined') return;
  try {
    window.VerseLinker?.init();
  } catch (e) {
    console.warn('VerseLinker init failed', e);
  }
}

// Debounced observer callback
function scheduleInit() {
  if (debounceTimeout) clearTimeout(debounceTimeout);
  debounceTimeout = window.setTimeout(() => {
    nextTick(() => initVerseLinker());
  }, 50); // small delay to batch updates
}

onMounted(() => {
  if (typeof window === 'undefined') return; // SSR

  // Load script once
  if (!document.getElementById('verselinker-script')) {
    const script = document.createElement('script');
    script.id = 'verselinker-script';
    script.src = 'https://cdn.bibliatodo.com/assets/js/verselinker.js';
    script.defer = true;
    script.setAttribute('lang', props.lang ?? 'en');
    script.setAttribute('version', props.version ?? 'NKJV');

    script.onload = () => scheduleInit();
    script.onerror = () => console.error('Failed to load VerseLinker script');

    document.body.appendChild(script);
  } else {
    scheduleInit();
  }

  // Safe observer
  if (container.value) {
    observer = new MutationObserver(scheduleInit);
    observer.observe(container.value, {
      childList: true,
      subtree: true,
      characterData: true
    });
  }
});

onBeforeUnmount(() => {
  observer?.disconnect();
  if (debounceTimeout) clearTimeout(debounceTimeout);
});
</script>

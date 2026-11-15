import { shallowRef, ref, onBeforeUnmount } from 'vue';

export function useAudioPlayer() {
  // shallowRef: no need for Vue to deeply proxy a DOM element
  const audio = shallowRef<HTMLAudioElement | null>(null);

  const isPlaying = ref(false);
  const currentTime = ref(0);
  const duration = ref(0);
  const volume = ref(1);
  const initialStart = ref(false);

  let currentUrl: string | null = null;

  const setInitialStart = (autoplay: boolean) => {
    initialStart.value = autoplay;
  };

  // create audio ONCE, in the browser only
  const ensureAudio = () => {
    // `Audio` doesn't exist during SSR / prerender
    if (!import.meta.client) return;
    if (audio.value) return;

    const el = new Audio();

    el.addEventListener('timeupdate', () => {
      currentTime.value = el.currentTime;
      duration.value = el.duration || 0;
    });

    el.addEventListener('loadedmetadata', () => {
      duration.value = el.duration || 0;
    });

    el.addEventListener('ended', () => {
      isPlaying.value = false;
    });

    audio.value = el;
  };

  const play = () => {
    if (!audio.value) return;
    isPlaying.value = true;
    // play() returns a promise that rejects if the browser blocks autoplay
    audio.value.play().catch(() => {
      isPlaying.value = false;
    });
  };

  const init = (url: string, autoplay = false) => {
    // Do nothing on the server, and don't record currentUrl there
    if (!import.meta.client) return;

    ensureAudio();

    if (!audio.value) return;

    // prevent re-initialising same audio
    if (url === currentUrl) return;
    currentUrl = url;

    audio.value.pause();
    audio.value.src = url;
    audio.value.load();

    setVolume(volume.value);
    currentTime.value = 0;

    if (autoplay) {
      play();
    } else {
      isPlaying.value = false;
    }
  };

  const togglePlay = () => {
    if (!audio.value) return;

    if (isPlaying.value) {
      audio.value.pause();
      isPlaying.value = false;
    } else {
      play();
    }
  };

  const seek = (time: number) => {
    if (!audio.value) return;

    const safe = Number.isFinite(time) ? time : 0;
    const clamped = Math.min(
      Math.max(safe, 0),
      audio.value.duration || 0
    );

    audio.value.currentTime = clamped;
    currentTime.value = clamped;
  };

  const rewind = (s = 10) => {
    if (!audio.value) return;
    seek(audio.value.currentTime - s);
  };

  const forward = (s = 10) => {
    if (!audio.value) return;
    seek(audio.value.currentTime + s);
  };

  const setVolume = (val: number) => {
    volume.value = val;
    if (audio.value) audio.value.volume = val;
  };

  const formatTime = (sec: number) => {
    if (!isFinite(sec)) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  onBeforeUnmount(() => {
    if (!audio.value) return;

    audio.value.pause();
    audio.value.src = '';
    audio.value = null;
    currentUrl = null;
  });

  return {
    audio,
    isPlaying,
    currentTime,
    duration,
    volume,
    initialStart,

    init,
    togglePlay,
    seek,
    rewind,
    forward,
    setVolume,
    formatTime,
    setInitialStart
  };
}
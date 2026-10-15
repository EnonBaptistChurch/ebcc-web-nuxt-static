import { ref, onBeforeUnmount } from 'vue';

export function useAudioPlayer() {
  const audio = ref<HTMLAudioElement | null>(null);

  const isPlaying = ref(false);
  const currentTime = ref(0);
  const duration = ref(0);
  const volume = ref(1);
  const initialStart = ref(false);

  let currentUrl: string | null = null;

  const setInitialStart = (autoplay: boolean) => {
    initialStart.value = autoplay;
  };

  // ✅ create audio ONCE
  const ensureAudio = () => {
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

  const init = (url: string, autoplay = false) => {
    ensureAudio();

    if (!audio.value) return;

    // ✅ prevent re-initialising same audio
    if (url === currentUrl) return;
    currentUrl = url;

    audio.value.pause();
    audio.value.src = url;
    audio.value.load();

    setVolume(volume.value);

    if (autoplay) {
      audio.value.play();
      isPlaying.value = true;
    } else {
      isPlaying.value = false;
    }

    currentTime.value = 0;
  };

  const togglePlay = () => {
    if (!audio.value) return;

    if (isPlaying.value) {
      audio.value.pause();
      isPlaying.value = false;
    } else {
      audio.value.play();
      isPlaying.value = true;
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
import { ref, onMounted, onBeforeUnmount } from 'vue';

export function useAudioPlayer(src?: string) {
  const audio = ref<HTMLAudioElement | null>(null);
  const isPlaying = ref(false);
  const currentTime = ref(0);
  const duration = ref(0);
  const volume = ref(1);
  const initialStart= ref(false);

  const setInitialStart = (autoplay: boolean) => {
    initialStart.value = autoplay;
  }

  const init = (url: string, autoplay = false) => {
  if (audio.value) {
    if(isPlaying.value) togglePlay();
    audio.value.src = '';
  }

  audio.value = new Audio(url);

  audio.value.addEventListener('timeupdate', () => {
    currentTime.value = audio.value?.currentTime ?? 0;
    duration.value = audio.value?.duration ?? 0;
  });

  audio.value.addEventListener('loadedmetadata', () => {
    duration.value = audio.value?.duration ?? 0;
  });

  audio.value.addEventListener('ended', () => {
    isPlaying.value = false;
  });

  setVolume(volume.value);

  if (autoplay) {
    togglePlay();
  }
};

  const togglePlay = () => {
    if (!audio.value) return;
    if (isPlaying.value) audio.value.pause();
    else audio.value.play();
    isPlaying.value = !isPlaying.value;
  };

  const seek = (time: number) => {
  if (!audio.value) return;

  // Ensure the time is a finite number
  const safeTime = Number.isFinite(time) ? time : 0;

  // Clamp to audio duration
  const clampedTime = Math.min(Math.max(safeTime, 0), audio.value.duration || 0);

  audio.value.currentTime = clampedTime;
  currentTime.value = clampedTime;
};

  const rewind = (seconds = 10) => {
    if (audio.value) seek(Math.max(0, audio.value.currentTime - seconds));
  };

  const forward = (seconds = 10) => {
    if (audio.value) seek(Math.min(audio.value.duration, audio.value.currentTime + seconds));
  };

  const setVolume = (val: number) => {
    volume.value = val;
    if (audio.value) audio.value.volume = val;
  };

  const formatTime = (sec: number) => {
    if (isNaN(sec)) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60)
      .toString()
      .padStart(2, '0');
    return `${m}:${s}`;
  };

  onBeforeUnmount(() => {
    if (audio.value) {
      audio.value.pause();
      audio.value.src = '';
      audio.value = null;
      console.log('Audio player unmounted and resources cleaned up.');
    }
  });

  return {
    audio,
    isPlaying,
    currentTime,
    duration,
    volume,
    init,
    togglePlay,
    seek,
    rewind,
    forward,
    setVolume,
    formatTime,
    setInitialStart,
    initialStart
  };
}

<!-- SnowEffect.vue -->
<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  enabled: { type: Boolean, default: true },
  count: { type: Number, default: 500 },
})

const canvas = ref(null)
let ctx, flakes = [], raf = null

function resize() {
  canvas.value.width = window.innerWidth
  canvas.value.height = window.innerHeight
}

function makeFlakes() {
  flakes = Array.from({ length: props.count }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 2.5 + 0.8,
    speed: Math.random() * 0.8 + 0.4,
    drift: Math.random() * 0.6 - 0.3,
    phase: Math.random() * Math.PI * 2,
  }))
}

function tick() {
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)
  ctx.fillStyle = 'rgba(255,255,255,0.85)'
  for (const f of flakes) {
    f.y += f.speed
    f.phase += 0.01
    f.x += f.drift + Math.sin(f.phase) * 0.3
    if (f.y > canvas.value.height) { f.y = -5; f.x = Math.random() * canvas.value.width }
    if (f.x > canvas.value.width) f.x = 0
    if (f.x < 0) f.x = canvas.value.width
    ctx.beginPath()
    ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2)
    ctx.fill()
  }
  raf = requestAnimationFrame(tick)
}

function start() {
  if (raf) return
  resize(); makeFlakes(); tick()
}
function stop() {
  cancelAnimationFrame(raf); raf = null
  ctx?.clearRect(0, 0, canvas.value.width, canvas.value.height)
}

onMounted(() => {
  ctx = canvas.value.getContext('2d')
  window.addEventListener('resize', resize)
  if (props.enabled) start()
})
onBeforeUnmount(() => {
  stop()
  window.removeEventListener('resize', resize)
})
watch(() => props.enabled, (on) => (on ? start() : stop()))
</script>

<template>
  <canvas ref="canvas" class="snow" aria-hidden="true" />
</template>

<style scoped>
.snow {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 50;
}
</style>
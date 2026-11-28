<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  enabled: { type: Boolean, default: true },
  count: { type: Number, default: 120 },
  contained: { type: Boolean, default: false }, // size to parent instead of window
  limit: { type: Number, default: 1 },          // 0-1: how far down flakes fall
})

const canvas = ref(null)
let ctx, flakes = [], raf = null, ro = null
let w = 0, h = 0

function resize() {
  const c = canvas.value
  if (props.contained) {
    const r = c.parentElement.getBoundingClientRect()
    w = r.width; h = r.height
  } else {
    w = window.innerWidth; h = window.innerHeight
  }
  c.width = w
  c.height = h
}

function makeFlakes() {
  flakes = Array.from({ length: props.count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h * props.limit,
    r: Math.random() * 2.5 + 0.8,
    speed: Math.random() * 0.8 + 0.4,
    drift: Math.random() * 0.6 - 0.3,
    phase: Math.random() * Math.PI * 2,
  }))
}

function tick() {
  ctx.clearRect(0, 0, w, h)
  ctx.fillStyle = 'rgba(255,255,255,0.85)'
  const floor = h * props.limit
  for (const f of flakes) {
    f.y += f.speed
    f.phase += 0.01
    f.x += f.drift + Math.sin(f.phase) * 0.3
    if (f.y > floor) { f.y = -5; f.x = Math.random() * w }
    if (f.x > w) f.x = 0
    if (f.x < 0) f.x = w
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
  ctx?.clearRect(0, 0, w, h)
}

onMounted(() => {
  ctx = canvas.value.getContext('2d')
  if (props.contained) {
    ro = new ResizeObserver(resize)
    ro.observe(canvas.value.parentElement)
  } else {
    window.addEventListener('resize', resize)
  }
  if (props.enabled) start()
})
onBeforeUnmount(() => {
  stop()
  ro?.disconnect()
  window.removeEventListener('resize', resize)
})

watch(() => props.enabled, (on) => (on ? start() : stop()))
watch(() => props.count, () => { if (raf) makeFlakes() })
</script>

<template>
  <canvas
    ref="canvas"
    class="snow"
    :class="{ 'snow--contained': contained }"
    aria-hidden="true"
  />
</template>

<style scoped>
.snow {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 50;
}

/* Sits inside the parent, under the title, and fades out towards the bottom */
.snow--contained {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
  -webkit-mask-image: linear-gradient(to bottom, #000 55%, transparent 90%);
  mask-image: linear-gradient(to bottom, #000 55%, transparent 90%);
}
</style>
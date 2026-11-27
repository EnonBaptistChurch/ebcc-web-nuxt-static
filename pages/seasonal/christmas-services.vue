<template>
  <div class="page">
    <div class="bg-texture"></div>

    <div class="container">
      <div class="header">
        <div class="tree-ornament">❄</div>
        <p class="eyebrow">Join Us This</p>
        <h1>Christmas</h1>
        <div class="divider">
          <span class="line"></span>
          <span class="diamond">◆</span>
          <span class="line"></span>
        </div>
      </div>

      <div v-if="upcomingServices.length > 0" class="services">
        <article
          v-for="(service, index) in upcomingServices"
          :key="service.id"
          class="service"
          :style="{ '--delay': `${index * 0.15 + 0.1}s` }"
        >
          <div class="service-inner">
            <div class="service-icon">{{ service.icon }}</div>
            <div class="service-label">{{ service.label }}</div>
            <h2 class="service-title">{{ service.title }}</h2>
            <div class="service-detail">
              <span class="service-date">{{ service.displayDate }}</span>
              <span class="service-sep">·</span>
              <span class="service-time">{{ service.displayTime }}</span>
            </div>
            <div>
              <p v-if="service.extraDetail" class="service-extra-detail" v-html="service.extraDetail">
              </p>
            </div>
          </div>
        </article>
      </div>

      <div v-else class="no-services">
        <p class="no-services-text">There are no upcoming services at this time.</p>
      </div>

      <p class="footer-text">All are welcome</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import services from '../../data/ChristmasServices'

function parseServiceDateTime(dateStr: string, timeStr: string): Date {
  const [year, month, day] = dateStr.split('-')
  const [hours, minutes] = timeStr.split(':')

  return new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hours),
    Number(minutes)
  )
}

const upcomingServices = computed(() => {
  const twoHoursAfterServiceStart = new Date()
  twoHoursAfterServiceStart.setHours(twoHoursAfterServiceStart.getHours() + 2)

  return services.filter((service) => {
    const serviceDateTime = parseServiceDateTime(service.date, service.time)
    return serviceDateTime > twoHoursAfterServiceStart
  })
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Cinzel:wght@400;500&display=swap');

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.page {
  min-height: 100vh;
  background-color: #f7f4ef;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 1.5rem;
  position: relative;
  overflow: hidden;
}

.bg-texture {
  position: fixed;
  inset: 0;
  background-image:
    radial-gradient(ellipse 80% 60% at 50% 0%, rgba(30, 90, 60, 0.10) 0%, transparent 70%),
    radial-gradient(ellipse 60% 50% at 80% 100%, rgba(150, 30, 40, 0.06) 0%, transparent 60%);
  pointer-events: none;
}

.container {
  max-width: 560px;
  width: 100%;
  position: relative;
  z-index: 1;
  animation: fadeUp 0.8s ease both;
}

/* Header */
.header {
  text-align: center;
  margin-bottom: 3rem;
}

.tree-ornament {
  font-size: 1rem;
  color: #1e5a3c;
  letter-spacing: 0.3em;
  margin-bottom: 0.75rem;
  display: block;
  animation: fadeUp 0.6s ease both;
}

.eyebrow {
  font-family: 'Cinzel', serif;
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: #96201e;
  margin-bottom: 0.5rem;
  animation: fadeUp 0.6s 0.05s ease both;
}

h1 {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(4rem, 12vw, 5.5rem);
  font-weight: 300;
  font-style: italic;
  color: #1c2b22;
  line-height: 1;
  letter-spacing: -0.02em;
  animation: fadeUp 0.6s 0.1s ease both;
}

.divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 1.25rem;
  animation: fadeUp 0.6s 0.15s ease both;
}

.line {
  display: block;
  width: 60px;
  height: 1px;
  background: linear-gradient(to right, transparent, #96201e, transparent);
}

.diamond {
  color: #1e5a3c;
  font-size: 0.5rem;
}

/* Service Cards */
.services {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.service {
  animation: fadeUp 0.6s var(--delay, 0s) ease both;
}

.service-inner {
  background: rgba(255, 253, 250, 0.85);
  border: 1px solid rgba(30, 90, 60, 0.25);
  border-radius: 4px;
  padding: 1.75rem 2rem;
  text-align: center;
  position: relative;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
  box-shadow: 0 2px 16px rgba(30, 40, 20, 0.06), inset 0 1px 0 rgba(255,255,255,0.8);
}

.service-inner::before,
.service-inner::after {
  content: '';
  position: absolute;
  width: 6px;
  height: 6px;
  border-color: #96201e;
  border-style: solid;
  opacity: 0.5;
}

.service-inner::before {
  top: 8px;
  left: 8px;
  border-width: 1px 0 0 1px;
}

.service-inner::after {
  bottom: 8px;
  right: 8px;
  border-width: 0 1px 1px 0;
}

.service-inner:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 28px rgba(30, 40, 20, 0.1), inset 0 1px 0 rgba(255,255,255,0.9);
  border-color: rgba(30, 90, 60, 0.5);
}

.service-icon {
  font-size: 1.2rem;
  margin-bottom: 0.3rem;
  opacity: 0.85;
}

.service-label {
  font-family: 'Cinzel', serif;
  font-size: 0.6rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #96201e;
  margin-bottom: 0.5rem;
}

.service-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.6rem;
  font-weight: 400;
  color: #1c2b22;
  line-height: 1.2;
  margin-bottom: 0.75rem;
}

.service-detail {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  font-family: 'Cormorant Garamond', serif;
  font-size: 1rem;
  font-style: italic;
  color: #3f5a48;
}

.service-extra-detail {
  margin-top: 0.75rem;
  font-family: 'Cormorant Garamond', serif;
  font-size: 0.95rem;
  color: #3f5a48;
  line-height: 1.4;
}

.service-sep {
  color: #96201e;
  font-style: normal;
}

/* No Services */
.no-services {
  animation: fadeUp 0.6s 0.1s ease both;
}

.no-services-text {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.1rem;
  font-style: italic;
  color: #3f5a48;
  text-align: center;
  padding: 2rem;
  border: 1px solid rgba(30, 90, 60, 0.2);
  border-radius: 4px;
}

/* Footer */
.footer-text {
  font-family: 'Cormorant Garamond', serif;
  text-align: center;
  font-size: 0.9rem;
  font-style: italic;
  color: #96201e;
  letter-spacing: 0.15em;
  margin-top: 2.25rem;
  opacity: 0.8;
  animation: fadeUp 0.6s 0.55s ease both;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
<script setup lang="ts">
// Place inside a `position: relative` wrapper that holds the picture.
const props = withDefaults(defineProps<{ max?: number }>(), { max: 12 })

const { now, upcoming } = useEvents()
const items = computed(() => upcoming.value.slice(0, props.max))
</script>

<template>
    <section v-if="items.length" class="next-events" aria-label="Coming up at Enon">
        <ul class="next-list">
            <li v-for="e in items" :key="e.key">
                <NuxtLink class="next-item" :to="e.href ?? '/whats-on/'">
                    <span class="next-when">{{ formatDay(e.date, now.date) }} · {{ formatTime(e.time) }}</span>
                    <span class="next-title">{{ e.title }}</span>
                    <span v-if="e.audience || e.detail" class="next-audience">{{ e.audience ?? e.detail }}</span>
                </NuxtLink>
            </li>
        </ul>
    </section>
</template>

<style scoped>
/*
 * One bar across the top of the picture. Each event is a segment.
 * Columns are at least 10rem wide on large screens but never wider than
 * a third of the bar, so at least 3 segments always fit and nothing
 * needs to scroll. Extra segments wrap onto a zero-height row and are
 * clipped. Text and padding shrink with the bar's width (cqi units).
 */
.next-events {
    position: absolute;
    inset: 0 0 auto;
    container-type: inline-size;
    padding: 0 0 3rem;
    background: linear-gradient(to bottom, rgb(0 0 0 / 0.45), transparent);
    color: #fff;
    pointer-events: none;
}

.next-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(10rem, 33.333%), 1fr));
    grid-template-rows: auto;     /* first row sizes to its segments */
    grid-auto-rows: 0;            /* overflow rows collapse */
    margin: 0;
    padding: 0;
    overflow: hidden;
    list-style: none;
    border: 1px solid rgb(255 255 255 / 0.25);
    background: rgb(0 0 0 / 0.55);
    backdrop-filter: blur(6px);
    pointer-events: auto;
}

.next-list li {
    min-width: 0;
    min-height: 0;
    overflow: hidden;
}

.next-list li + li .next-item {
    border-left: 1px solid rgb(255 255 255 / 0.2);
}

.next-item {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    height: 100%;
    /* Side padding shrinks on narrow bars; top/bottom stays fixed */
    padding: 0.45rem clamp(0.3rem, 1.6cqi, 0.8rem);
    color: #fff;
    text-decoration: none;
}

.next-item:hover,
.next-item:focus-visible {
    background: rgb(255 255 255 / 0.15);
}

/* Every line is a single line, so the bar is the same height at any width.
   Sizes shrink with the bar down to a floor, then stop for readability. */
.next-when,
.next-title,
.next-audience {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.next-when {
    font-size: clamp(0.62rem, 0.3rem + 1.2cqi, 0.8rem);
    line-height: 1.25;
    opacity: 0.85;
}

.next-title {
    font-size: clamp(0.72rem, 0.4rem + 1.4cqi, 1rem);
    font-weight: 700;
    line-height: 1.2;
}

.next-audience {
    font-size: clamp(0.62rem, 0.28rem + 1.1cqi, 0.76rem);
    line-height: 1.25;
    opacity: 0.85;
}
</style>
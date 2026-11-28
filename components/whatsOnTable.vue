<script setup lang="ts">
const props = withDefaults(defineProps<{ weeks?: number; moreWeeks?: number }>(), {
    weeks: 2,
    moreWeeks: 8,
})

const { now, within } = useEvents()

const expanded = ref(false)
const short = computed(() => within(props.weeks * 7))
const long = computed(() => within(props.moreWeeks * 7))
const shown = computed(() => (expanded.value ? long.value : short.value))
const hasMore = computed(() => long.value.length > short.value.length)
</script>

<template>
    <div class="whats-on">
        <div class="table-wrap">
            <table class="events">
                <caption class="visually-hidden">Upcoming events at Enon Baptist Church</caption>
                <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Time</th>
                        <th scope="col">What's on</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="e in shown" :key="e.key" :class="{ today: e.date === now.date }">
                        <td class="col-date">{{ formatDay(e.date, now.date) }}</td>
                        <td class="col-time">
                            {{ formatTime(e.time) }}<template v-if="e.end"> – {{ formatTime(e.end) }}</template>
                        </td>
                        <td class="col-what">
                            <NuxtLink v-if="e.href" :to="e.href">{{ e.title }}</NuxtLink>
                            <span v-else>{{ e.title }}</span>
                            <span v-if="e.audience" class="audience">{{ e.audience }}</span>
                            <span v-if="e.detail" class="detail">{{ e.detail }}</span>
                        </td>
                    </tr>   
                    <tr v-if="!shown.length">
                        <td class="empty" colspan="3">Nothing coming up just now. Please check back soon.</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <button v-if="hasMore" type="button" class="more" :aria-expanded="expanded" @click="expanded = !expanded">
            {{ expanded ? 'Show fewer' : 'See more' }}
        </button>
    </div>
</template>

<style scoped>
.whats-on {
    --accent: var(--accent-colour, #1a4a6e);
    --muted: #6b6b6b;
    --rule: #ddd5cb;
}

.visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
}

.table-wrap {
    overflow: hidden;
    border-radius: 1rem;
    background: #fff;
    box-shadow: 0 2px 10px rgb(0 0 0 / 0.08);
}

.events {
    width: 100%;
    border-collapse: collapse;
}

.events th,
.events td {
    padding: 0.8rem 1.25rem;
    text-align: left;
    vertical-align: top;
}

.events thead th {
    color: var(--muted);
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.03em;
    text-transform: uppercase;
}

.events tbody tr {
    border-top: 1px solid var(--rule);
}

.col-date {
    font-weight: 600;
    white-space: nowrap;
}

.col-time {
    white-space: nowrap;
}

.today .col-date {
    color: var(--accent);
}

.audience {
    margin-left: 0.5rem;
    padding: 0.1rem 0.6rem;
    border-radius: 999px;
    background: rgb(26 74 110 / 0.1);
    color: var(--accent);
    font-size: 0.8rem;
    font-weight: 600;
}

.detail {
    margin-left: 0.5rem;
    color: var(--muted);
    font-size: 0.9rem;
}

.empty {
    color: var(--muted);
}

.more {
    display: block;
    margin: 1rem auto 0;
    padding: 0.5rem 1.5rem;
    border: 1px solid var(--accent);
    border-radius: 999px;
    background: transparent;
    color: var(--accent);
    font: inherit;
    font-weight: 600;
    cursor: pointer;
}

.more:hover,
.more:focus-visible {
    background: var(--accent);
    color: #fff;
}

.col-what a {
        text-decoration: none;
        color: inherit;
    }

/* Narrow screens: each row becomes a small stacked entry */
@media (max-width: 39.99rem) {
    .events thead {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip-path: inset(50%);
    }

    .events tbody tr {
        display: grid;
        grid-template-columns: 1fr auto;
        grid-template-areas:
            'date time'
            'what what';
        gap: 0.15rem 1rem;
        padding: 0.8rem 1.25rem;
    }

    .events td {
        padding: 0;
    }

    .col-date {
        grid-area: date;
    }

    .col-time {
        grid-area: time;
        color: var(--muted);
    }

    .col-what > a,
    .col-what > span:first-child {
        display: block;
    }

    .audience {
        display: inline-block;
        margin-left: 0;
        margin-top: 0.4rem;
    }

    .detail {
        display: block;
        margin-left: 0;
        margin-top: 0.25rem;
    }

    .empty {
        grid-column: 1 / -1;
        grid-area: auto;
    }
}
</style>
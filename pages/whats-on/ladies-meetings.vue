<!-- pages/whats-on/ladies-meetings.vue -->
<template>
  <!-- Banner, hero, facts, Find us and SEO all come from layouts/whats-on.vue -->
  <div class="ladies">
    <p class="ladies__intro">
      For the ladies of Enon Baptist Church, we have two regular gatherings: a semi-monthly Ladies Meeting and a monthly Ladies Bible Study.
    </p>
    <p class="ladies__intro">
      If you have never been to Enon before and are a woman, you are very welcome to come along to either or both of these gatherings. We would love to meet you!
    </p>

    <div class="ladies__grid">
      <section class="ladies__card" aria-labelledby="ladies-meeting">
        <p class="ladies__label">Fellowship</p>
        <h2 id="ladies-meeting">Ladies Meeting</h2>
        <p class="ladies__when">1st and 3rd Thursday of each month, 1.45pm</p>
        <p>
          An afternoon to catch up, enjoy a hot drink and a slice of cake, and hear from
          the Bible together.
        </p>
      </section>

      <section class="ladies__card" aria-labelledby="ladies-bible-study">
        <p class="ladies__label">Bible study</p>
        <h2 id="ladies-bible-study">Ladies Bible Study</h2>
        <p class="ladies__when">One Tuesday each month</p>
        <p>
          A smaller, more focused time to open the Bible, discuss it and pray together.
          Please get in touch for the date, time and place:
          <CallWidget text="07508 779145" />
        </p>
      </section>
    </div>

    <section class="ladies__welcome" aria-labelledby="ladies-welcome">
      <h2 id="ladies-welcome">New here?</h2>
      <p>
        You don't need to know anyone or have any Bible knowledge to come along. If you'd
        like to know more before you visit, or would like someone to meet you at the door,
        give us a call on <CallWidget text="07508 779145" /> or use the
        <NuxtLink to="/contact-us">contact page</NuxtLink>.
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
import CallWidget from '../../components/widgets/CallWidget.vue';

// definePageMeta is auto-imported by Nuxt and compiled ahead of time,
// so it can only contain plain values.
definePageMeta({
  layout: 'whats-on',
  whatsOn: {
    title: 'Ladies Meeting & Bible Study',
    subtitle: 'Fellowship and Bible study for women at Enon Baptist Church, Chatham',
    heroImage: '/images/whats-on/ladies-meeting/hero.jpeg',
    facts: [
      { title: 'Ladies Meeting', detail: '1st & 3rd Thursday, 1.45pm' },
      { title: 'Ladies Bible Study', detail: 'Monthly, on a Tuesday' },
      // { title: 'All ladies welcome', detail: 'Newcomers very welcome' }
    ],

    pageUrl: 'https://enonbaptistchatham.org.uk/whats-on/ladies-meetings/',
    metaTitle: 'Ladies Meeting & Bible Study - Enon Baptist Church',
    description:
      'Find out about the Ladies Meeting and monthly Ladies Bible Study at Enon Baptist Church, Chatham. Fellowship and Bible study for women.'
    // No `event` block: the layout's structured data only supports a regular weekly or
    // fortnightly schedule, not "1st and 3rd Thursday of the month".
  }
});
</script>

<style scoped>
/* Colours fall back to values matching the current site; swap in your own tokens. */
.ladies {
  --ladies-navy: var(--color-primary, #12406b);
  --ladies-ink: #1f2933;
  --ladies-muted: #5b6770;
  --ladies-card: #ffffff;
  --ladies-accent: #f6e3b4;

  display: grid;
  gap: 2rem;
  padding-block: 1.5rem 2.5rem;
  color: var(--ladies-ink);
  line-height: 1.65;
}

.ladies__intro {
  margin: 0;
  font-size: 1.125rem;
  text-align: center;
  text-wrap: balance;
}

.ladies__grid {
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
}

.ladies__card {
  padding: 1.5rem;
  background: var(--ladies-card);
  border-radius: 0.75rem;
  border-top: 4px solid var(--ladies-navy);
  box-shadow: 0 2px 10px rgb(0 0 0 / 0.08);
}

.ladies__card p {
  margin: 0 0 0.75rem;
}

.ladies__card p:last-child {
  margin-bottom: 0;
}

.ladies__label {
  display: inline-block;
  padding: 0.15rem 0.6rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ladies-navy);
  background: var(--ladies-accent);
  border-radius: 999px;
}

.ladies h2 {
  margin: 0.5rem 0 0.25rem;
  font-size: 1.375rem;
  line-height: 1.25;
  color: var(--ladies-navy);
}

.ladies__when {
  font-weight: 600;
  color: var(--ladies-muted);
}

.ladies__welcome {
  padding: 1.5rem;
  text-align: center;
  background: rgb(255 255 255 / 0.6);
  border: 1px dashed var(--ladies-navy);
  border-radius: 0.75rem;
}

.ladies__welcome p {
  margin: 0;
  max-width: 40rem;
  margin-inline: auto;
}

.ladies a {
  color: var(--ladies-navy);
  font-weight: 600;
  text-underline-offset: 0.2em;
}

.ladies a:focus-visible {
  outline: 3px solid var(--ladies-navy);
  outline-offset: 2px;
  border-radius: 2px;
}
</style>
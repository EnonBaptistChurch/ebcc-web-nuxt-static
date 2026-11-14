<!-- pages/whats-on/first-steps.vue -->
<template>
  <div>
  <!-- Everything else (banner, hero, facts, notice, Find us, SEO) comes from layouts/whats-on.vue -->
  <p>
    Enon First Steps is a friendly, welcoming baby and toddler group in Chatham, Medway, where little ones can
    play, explore and make new friends, while parents and carers enjoy a cuppa and connect with others.
  </p>

  <!-- Photo beside the text on desktop; moves to the bottom of the page on mobile -->
  <div class="ep-feature">
    <div class="ep-image-wrap">
      <img
        src="/images/whats-on/first-steps/portrait-640.webp"
        alt="Enon First Steps Craft"
        class="ep-image"
        loading="lazy"
      />
    </div>

    <div class="ep-feature-text">
      <p>
        We meet every Thursday during term time, from 9 - 11am, and everyone is welcome. Our sessions are
        completely free, with free parking available too!
      </p>

      <h2>Play, explore and enjoy</h2>

      <p>
        Our mornings begin with plenty of time for free play, with a variety of toys and activities for all ages
        and stages. From baby toys and small world play to role play, a slide and seesaws, there’s lots for little
        ones to discover.
      </p>
      <p>
        We rotate some of our toys to keep things fresh and exciting. There is also a craft available for those
        who wish to do it.
      </p>
      <p>During playtime, we offer toast and drinks for both children and adults to enjoy.</p>
    </div>
  </div>

  <h2>Snacks, Bible story and songs</h2>

  <p>
    We finish each session with a snack, followed by a time of Bible story and songs, giving us a lovely
    opportunity to come together before heading home.
  </p>

  <p class="ep-box ep-welcome">
    Whether you’re a new parent in the area or have a curious toddler, we’d love to welcome you to Enon First
    Steps. Come along, get to know us and enjoy a relaxed morning of play, friendship and fun!
  </p>
</div>
</template>

<script setup lang="ts">

// Note: definePageMeta is compiled ahead of time, so it can only contain plain values
// (no variables declared elsewhere in this file).
definePageMeta({
  layout: 'whats-on',
  whatsOn: {
    title: 'First Steps',
    subtitle: 'Every Thursday in term time at Enon Baptist Church, Chatham',
    heroImage: '/images/whats-on/first-steps/landscape-1920.webp',
    facts: [
      { title: 'Thursdays, 9 - 11am', detail: 'During term time' },
      { title: 'Free entry', detail: 'Everyone welcome' },
      { title: 'Free parking', detail: 'Available on site' }
    ],
    notice: { label: 'Please note:', text: 'parents/carers need to stay with their children.' },

    pageUrl: 'https://enonbaptistchatham.org.uk/whats-on/first-steps/',
    metaTitle: 'Baby & Toddler Group in Chatham, Medway | Enon First Steps',
    description:
      'Free baby and toddler group in Chatham, Medway. Join Enon First Steps every Thursday in term time, 9–11am, for play, snacks, songs and free parking.',

    event: {
      name: 'Enon First Steps Baby & Toddler Group',
      byDay: 'Thursday',
      startTime: '09:00',
      endTime: '11:00',
      typicalAgeRange: '0-5',
      isAccessibleForFree: true
    }
  }
});
</script>
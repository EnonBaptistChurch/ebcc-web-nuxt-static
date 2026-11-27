<template>
    <div>
      <div class="text-content">

        <section class="im-new">
          <header class="intro">
            <div class="intro-main">
              <h1>I'm New</h1>

              <nav class="jump" aria-label="On this page">
            <a href="#accessibility">Accessibility</a>
                <a href="#children">Children</a>
            
            <a href="#young-people">Children &amp; young people</a>
          </nav>
            </div>

            <NuxtLink class="faq-card" to="/faq/">
              <span class="faq-title">Not sure what to expect?</span>
              <span class="faq-text">Read our frequently asked questions</span>
            </NuxtLink>
          </header>
          <p class="description">
            Whether it is your first time at Enon or are new to Christianity, you would be welcome to attend our meetings.
          </p>
          <p class="description">
            We have many different activities across the week for different people, but if it is your first time, we would encourage you to come Sunday morning.
          </p>
          <p class="description">
            On a Sunday morning you will be greeted by some of our Church members, who will be more than happy to help you.
          </p>
          <p class="description">
            If you would like to learn more about Christianity, please speak to our Pastor.
          </p>

          <section id="accessibility" class="block" aria-labelledby="access-heading">
            <h2 id="access-heading">Accessibility</h2>

            
              <ul class="access-list">
                <li>
                  <strong>Ramp access</strong>
                  <span>A ramp is available for Sunday services.</span>
                </li>
                <li>
                  <strong>Accessible toilet</strong>
                  <span>There is a disabled toilet inside the foyer/porch.</span>
                </li>
              </ul>

            <p class="additional-info">
              Any questions about access? Check our <NuxtLink to="/faq/">FAQs</NuxtLink> or
              <NuxtLink to="/contact-us/">get in touch</NuxtLink>.
            </p>
          </section>

          <section id="children" class="block" aria-labelledby="kids-heading">
            <h2 id="kids-heading">Children in the Service</h2>
            <p class="description">Children are very welcome at Enon. Here is what to expect on a Sunday.</p>

            <ul class="card-grid">
              <li class="card">
                <p class="tag">Little ones</p>
                <h3>Crèche</h3>
                <p>A crèche is available in the room just behind the pastor, which you are welcome to use if you need it during the service.</p>
              </li>
              <li class="card">
                <p class="tag">Older children</p>
                <h3>Sermon worksheets</h3>
                <p>Worksheets are given out partway through the service to help children follow what is being taught.</p>
              </li>
            </ul>
          </section>

          

          
        </section>

      </div>
    </div>
</template>

<script setup>
import { useHead } from 'nuxt/app';
useHead({
  title: "I'm New | Enon Baptist Church",
  meta: [
    {
      name: 'description',
      content:
        'New to Enon or to Christianity? Find out what to expect on a Sunday, including Sunday Club, the crèche and accessibility.',
    }
  ]
})
</script>

<style scoped>
/* Base Container (same as Small Groups) */
.im-new {
  max-width: 720px;
  margin: 0 auto;
  padding: 1.5rem 1rem;
  color: #222;
  line-height: 1.6;
}

.im-new h1 {
  margin-top: 0;
  margin-bottom: 0;
  font-size: 2rem;
}

.meeting-time {
  font-size: 1.1rem;
  color: #4a5568;
  margin: 0 auto 0.5rem auto;
}

/* Header: title left, FAQ card top right */
.intro {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.faq-card {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  align-self: flex-start;
  max-width: 15rem;
  padding: 0.75rem 1rem;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  color: #1a202c;
  text-decoration: none;
}

.faq-title {
  font-weight: 700;
}

.faq-text {
  font-size: 0.9rem;
  color: #4a5568;
}

.faq-card:hover .faq-text,
.faq-card:focus-visible .faq-text {
  text-decoration: underline;
}

/* Jump links */
.jump {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0 0 0rem;
}

.jump a {
  padding: 0.25rem 0.8rem;
  border: 1px solid #e2e8f0;
  border-radius: 999px;
  color: #1a202c;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
}

.jump a:hover,
.jump a:focus-visible {
  background-color: #f8fafc;
  text-decoration: underline;
}

/* Sections */
.block {
  margin-top: 2rem;
  /* keeps the heading clear of a fixed site header when jumping */
  scroll-margin-top: 6rem;
}

.block h2 {
  font-size: 1.4rem;
  margin: 0 0 0.5rem;
  color: #1a202c;
}

.additional-info a {
  color: #1a202c;
  font-weight: 700;
}

/* Cards (same look as Currently Studying) */
.card {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1.25rem;
}

.card h3,
.card p {
  margin: 0;
}

.featured {
  height: auto;
  margin: 1.5rem 0;
}

.featured h2 {
  font-size: 1.2rem;
  margin: 0 0 0.5rem;
  color: #1a202c;
}

.card-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1rem;
  margin: 1rem 0 0;
  padding: 0;
  list-style: none;
}

.tag {
  align-self: flex-start;
  padding: 0.1rem 0.7rem;
  border-radius: 999px;
  background: #e2e8f0;
  color: #1a202c;
  font-size: 0.8rem;
  font-weight: 600;
}

.card-link {
  color: inherit;
  text-decoration: none;
}

.card-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1a202c;
}

.card-when {
  color: #4a5568;
  font-size: 0.9rem;
  font-weight: 600;
}

.card-desc {
  color: #4a5568;
}

.card-more {
  margin-top: auto;
  padding-top: 0.5rem;
  font-weight: 700;
  color: #1a202c;
}

.card-link:hover .card-title,
.card-link:focus-visible .card-title,
.card-link:hover .card-more,
.card-link:focus-visible .card-more {
  text-decoration: underline;
}

/* Sunday times */
.times {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
  gap: 1.25rem;
}

.times p {
  margin: 0;
}

.time {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.2;
  color: #1a202c;
}

.time-label,
.time-note {
  color: #4a5568;
}

/* Accessibility */
.access-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.access-list li {
  display: flex;
  flex-direction: column;
}

.access-list span {
  color: #4a5568;
}

.additional-info {
  margin: 1rem 0 0;
  color: #4a5568;
}
.description {
    margin:0 0 0.75rem 0;
}

/* Desktop Styles */
@media (min-width: 600px) {
  .intro {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
  }

  .card-grid {
    grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
  }
}

@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}
</style>
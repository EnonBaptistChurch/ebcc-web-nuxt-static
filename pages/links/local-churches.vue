<template>
  <div>
    <section class="wrapper">
      <!-- Local Churches -->
      <header class="section-intro">
        <h2>Local Church Links</h2>
        <!-- <p class="subtitle">
          We have links with like-minded churches across Medway.
        </p>
        <p class="subtitle"> 
          We meet occasionally for prayer, fellowship and joint meetings.
        </p> -->
<p class="subtitle">
  We have links with like-minded churches across Medway, built on a shared commitment to the gospel and faithful Bible teaching.
</p>
<p class="subtitle">
  We meet roughly once a quarter for a variety of joint gatherings, these may be times of prayer and praise, preaching, or gospel mission updates. 
  These occasions also provide opportunities to meet with Christians from other like-minded churches, to catch up with one another, and to hear what God is doing in different congregations.
</p>
<p class="subtitle">
  They help to strengthen fellowship across likeminded local churches across Medway, encourage each other in the Gospel, and better inform our prayers for one another and for the work of the gospel both locally and further afield.

</p>

        <!-- <p class="subtitle">
          We have links with like-minded churches across Medway, built on a shared commitment to the gospel and faithful Bible teaching.
        </p>
        <p class="subtitle">
          We meet occasionally for prayer, fellowship, and joint services, encouraging one another in our local ministries and strengthening unity across the wider church family. 
        </p>
        <p class="subtitle">
          These gatherings provide opportunities to share what God is doing in each congregation, pray together for our communities, and support one another in gospel work across the area.
        </p>
        <p class="subtitle">
          We also sometimes gather for Bible Rallies, where a guest preacher opens God’s Word for a united meeting of the churches, helping to encourage and build up those who attend. 
          </p>
        <p class="subtitle">
          On occasion, these joint gatherings may also include updates or contributions from wider mission work overseas, such as in Zambia, as part of sharing and praying for gospel ministry in other contexts.
        </p>
        <p class="subtitle"></p> -->
      </header>

      <div class="card-grid">
        <article v-for="church in localChurches" :key="church.name" class="card">
          <div class="card-body">
            <h3 class="card-name">
              <a :href="church.url" target="_blank" rel="noopener">
                {{ church.name }}
              </a>
            </h3>

            <div class="card-details">
              <img
                v-if="church.imgSrc"
                :src="church.imgSrc"
                :alt="church.name"
                style="max-height: 100px; width: 100%; object-fit: contain;"
              />

              <p class="card-description">
                {{ church.description }}
              </p>
            </div>
          </div>

          <footer class="card-footer">
            <p v-if="church.pastor" class="meta">
              <span class="meta-label">Pastor</span>
              {{ church.pastor }}
            </p>

            <p v-if="church.location" class="meta">
              <span class="meta-label">Location</span>
              {{ church.location }}
            </p>
          </footer>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useHead } from 'nuxt/app';
import { localChurches } from '../../data/localChurches';
useHead({
  title: 'Links - Local Churches - Enon Baptist Church',
  meta: [
    {
      name: 'description',
      content: 'Links to local churches in the Medway area that we have fellowship with.'
    }
  ]
})
</script>

<style scoped>
:root {
  --cream:    #faf7f2;
  --parchment:#f0ead8;
  --stone:    #e8e0cc;
  --ink:      #1c1a17;
  --muted:    #6b6355;
  --gold:     #9a7c3f;
  --gold-lt:  #c4a55a;
  --navy:     #1e3557;
  --navy-lt:  #2a4a7f;
  --radius:   ;
  --shadow-sm: 0 2px 8px rgba(28,26,23,0.07);
  --shadow-md: 0 6px 20px rgba(28,26,23,0.11);
  --shadow-lg: 0 12px 36px rgba(28,26,23,0.14);
}

.link {
  color: var(--navy);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.15s;
}

/* ── Layout ─────────────────────────────────────────── */
.wrapper {
  max-width: 1600px;
  margin: 0 auto;
  padding: 3rem 1.5rem 4rem;
  background: var(--cream);
  font-family: 'Source Serif 4', Georgia, serif;
  color: var(--ink);
}

/* ── Section intro ──────────────────────────────────── */
.section-intro {
  text-align: center;
  margin-bottom: 2.5rem;
}

.eyebrow {
  display: inline-block;
  font-family: 'Source Serif 4', serif;
  font-size: 0.75rem;
  font-weight: 300;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 0.6rem;
}

.section-intro h2 {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 700;
  color: var(--navy);
  margin: 0 0 0.75rem;
  line-height: 1.15;
}

.subtitle {
  max-width: 66ch;
  margin: 1rem auto;
  color: var(--muted);
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.7;

}

/* ── Divider ────────────────────────────────────────── */
.section-divider {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 3.5rem 0;
  color: var(--stone);
}

.section-divider::before,
.section-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: linear-gradient(to right, transparent, var(--stone), transparent);
}

.divider-cross {
  color: var(--gold-lt);
  font-size: 1.1rem;
  flex-shrink: 0;
}

/* ── Grid ───────────────────────────────────────────── */
.card-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
}



@media (max-width: 1024px) {
  .card-grid       { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 600px) {
  .card-grid    { grid-template-columns: 1fr; }
  .section-intro h2 { font-size: 1.7rem; }
}

/* ── Card ───────────────────────────────────────────── */
.card {
  background: #fff;
  border: 1px solid var(--parchment);
  border-radius: 16px;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: transform 0.22s ease, box-shadow 0.22s ease;

}

.card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-lg);
}

.card::before {
  content: '';
  display: block;
  height: 3px;
  background: linear-gradient(90deg, var(--navy), var(--gold));
}

.card-body {
  padding: 1.25rem 1.25rem 0.75rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
}

.card-footer {
  padding: 0.75rem 1.25rem 1.1rem;
  border-top: 1px solid var(--parchment);
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  background: var(--cream);
}


.card-name {
  margin: 0;
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 1.3;
  text-align: center;;
}

.card-name a {
  color: var(--navy);
  text-decoration: none;
  transition: color 0.15s;
}

.card-name a:hover {
  color: var(--gold);
}
.card-details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.card-description {
  margin: 0;
  font-size: 0.9rem;
  font-style: italic;
  font-weight: 300;
  color: var(--muted);
  line-height: 1.6;
}

.meta {
  margin: 0;
  font-size: 0.8rem;
  color: var(--muted);
  line-height: 1.4;
  display: flex;
  gap: 0.4rem;
  align-items: baseline;
}

.meta-label {
  font-family: 'Source Serif 4', serif;
  font-weight: 400;
  font-style: normal;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-size: 0.65rem;
  color: var(--gold);
  flex-shrink: 0;
}
</style>
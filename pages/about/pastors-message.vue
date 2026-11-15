<template>
  <article class="text-content post">
    <header class="post-header">
      <p class="category">Pastor's Message</p>
      <h1>A Time of Uncertainty</h1>

      <div class="byline">
        <img
          src="/images/leaders/PR-8258-320.webp"
          alt="Pastor Paul Relf"
          class="byline-avatar"
          width="44"
          height="44"
        />
        <div class="byline-text">
          <span class="byline-name">Pastor Paul Relf</span>
          <span class="byline-meta">Enon Baptist Church · 2 min read</span>
        </div>
      </div>
    </header>

    <div class="post-body">
      <p class="intro">
        Life is full of uncertainty. This is a fact of life. Nobody knows the future. Perhaps the past three years have been particularly difficult for you. Perhaps as you consider the future and the rising cost of all your bills this causes greater uncertainty. With the cost of necessities like heating and food going up, there is no doubt that this is a very difficult time for all. Perhaps you are wondering … how will I and my family manage?
      </p>

      <p>
        There are no easy answers to the practical uncertainties we all face. We are thankful for Government financial support and thankful for others, perhaps including charities, who can help with our needs. Also, we need to try and think of ways to save money including as it comes to winter with the need for heating. But for Christians, while we shall need to consider all these money pressures and other uncertainties, we do know that God can help us and that the starting point to face the future is to seek to know Jesus Christ in a personal way as saviour.
      </p>

      <h2>Seek first the kingdom of God</h2>

      <p>
        In His message that He gave on the Mountain near Galilee (Matthew 5–7) Jesus spoke about worrying. He told us to think about the birds and the flowers and how God takes care of these and then he said …
      </p>

      <blockquote class="pullquote">
        <p>
          But seek first the kingdom of God and His righteousness, and all these things will be added to you.
        </p>
        <cite>Matthew 6:33 NKJV</cite>
      </blockquote>

      <p>
        You see in all the uncertainties of life there are some things that are certain. God, the God of the Bible who made our world knows our needs. He has given us His Word the Bible and the things that He has promised will happen. There are many other certainties that come from God, and you can read about these in the Bible.
      </p>

      <h2>So what do we need to do?</h2>

      <p>
        As Jesus said … seek God first. Ask (pray) God to help you. To know God and to know Jesus Christ is to have a strong hope for the future. A hope that rests in Jesus’ resurrection. You will be able to face the future knowing that God will be with you, you will be able to pray to God as your heavenly Father and you will have the encouragement of His word and promises.
      </p>

      <p class="blessing">May God help and be with you.</p>
    </div>

    <footer class="author-card">
      <img
        src="/images/leaders/PR-8258-320.webp"
        alt="Pastor Paul Relf"
        class="author-photo"
        width="72"
        height="72"
      />
      <div>
        <p class="author-label">Written by</p>
        <p class="author-name">Paul Relf</p>
        <p class="author-role">Pastor, Enon Baptist Church</p>
      </div>
    </footer>
  </article>
</template>

<script setup lang="ts">
import { useHead } from 'nuxt/app';

useHead({
  title: "Pastor's Message - Enon Baptist Church",
  meta: [
    {
      name: 'description',
      content:
        "Facing life’s uncertainties and rising costs? Pastor Paul Relf shares how Christians can find hope, guidance, and peace by seeking God first and trusting in His promises."
    }
  ],
});
</script>

<style scoped>
.post {
  --accent: #000000;
  --accent-soft: #efffff;
  --ink: #232323;
  --muted: #6b6b6b;
  max-width: 42rem;
  margin: 0 auto;
  padding: 2.5rem 1.25rem 4rem;
}

.post :deep(a.rtBibleRef),
.post :deep(a.rtBibleRef:visited),
.post :deep(a.rtBibleRef:hover),
.post :deep(a.rtBibleRef:active) {
  background-color: transparent !important;
  color: inherit !important;
  padding: 0 !important;
  border-radius: 0 !important;
  text-decoration: none !important;
  font-weight: inherit !important;
}

/* Header */
.post-header {
  margin-bottom: 2.5rem;
}

.category {
  display: inline-block;
  margin: 0 0 1rem;
  padding: 0.2rem 0.7rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent);
  background: var(--accent-soft);
  border-radius: 999px;
}

.post-header h1 {
  margin: 0 0 1.5rem;
  font-size: clamp(2.2rem, 5vw, 3.1rem);
  line-height: 1.1;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.byline {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.byline-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 0 0 2px #fff, 0 0 0 3px #e5e7eb;
}

.byline-text {
  display: flex;
  flex-direction: column;
  line-height: 1.3;
}

.byline-name {
  font-weight: 600;
  color: var(--ink);
}

.byline-meta {
  font-size: 0.875rem;
  color: var(--muted);
}

/* Body */
.post-body p {
  margin: 0 0 1.5rem;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 1.15rem;
  line-height: 1.85;
  color: var(--ink);
}

.post-body .intro {
  font-size: 1.3rem;
  line-height: 1.7;
}

/* .post-body .intro::first-letter {
  float: left;
  margin: 0.1em 0.12em 0 0;
  font-size: 4.2rem;
  line-height: 0.8;
  font-weight: 700;
  color: var(--accent);
} */

.post-body h2 {
  margin: 2.5rem 0 1rem;
  font-size: 1.6rem;
  line-height: 1.25;
  font-weight: 700;
}

/* Pull quote */
.pullquote {
  margin: 2rem 0;
  padding: 0.25rem 0 0.25rem 1.5rem;
  border-left: 4px solid var(--accent);
}

.pullquote p {
  margin: 0 0 0.5rem;
  font-size: 1.4rem;
  font-style: italic;
  line-height: 1.5;
}

.pullquote cite {
  font-family: system-ui, sans-serif;
  font-size: 0.9rem;
  font-style: normal;
  font-weight: 600;
  color: var(--accent);
}

.post-body .blessing {
  margin-top: 2.5rem;
  font-style: italic;
  font-size: 1.25rem;
  color: var(--accent);
}

/* Author card */
.author-card {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-top: 3rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.65);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 1rem;
}

.author-photo {
  flex-shrink: 0;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 0 0 2px #fff, 0 0 0 3px #e5e7eb;
}

.author-card p {
  margin: 0;
}

.author-label {
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted);
}

.author-name {
  font-size: 1.15rem;
  font-weight: 700;
}

.author-role {
  font-size: 0.9rem;
  color: var(--muted);
}

@media (max-width: 480px) {
  .post-body p {
    font-size: 1.075rem;
  }
  .post-body .intro {
    font-size: 1.2rem;
  }
  .pullquote p {
    font-size: 1.2rem;
  }
  .author-card {
    flex-direction: column;
    text-align: center;
  }
}
</style>
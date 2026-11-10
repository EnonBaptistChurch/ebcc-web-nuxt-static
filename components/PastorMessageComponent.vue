<template>
  <div class="pastor-message">
    <p class="pastor-message__label">Pastor's Message</p>

    <blockquote class="pastor-message__quote">
      <p>
        But seek first the kingdom of God and His righteousness, and all
        these things will be added to you.
      </p>
      <cite>Matthew 6:33 NKJV</cite>
    </blockquote>

    <div class="pastor-message__byline">
      <img
        src="/images/leaders/PR-8258-320.webp"
        alt="Pastor Paul Relf"
        class="pastor-message__avatar"
        width="44"
        height="44"
        loading="lazy"
      />
      <div class="pastor-message__byline-text">
        <span class="pastor-message__name">Pastor Paul Relf</span>
        <NuxtLink to="/about/pastors-message/" class="pastor-message__read">
          Read “A Time of Uncertainty” <span aria-hidden="true">→</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pastor-message {
  --accent: #000000;
  --accent-soft: #efffff;
  --ink: #232323;
  --muted: #6b6b6b;
}

.pastor-message__label {
  display: inline-block;
  margin: 0 0 1.5rem;
  padding: 0.2rem 0.7rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent);
  background: var(--accent-soft);
  border-radius: 999px;
}

.pastor-message__quote {
  margin: 0 0 2rem;
  padding: 0.25rem 0 0.25rem 1.5rem;
  border-left: 4px solid var(--accent);
}

.pastor-message__quote p {
  margin: 0 0 0.75rem;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: clamp(0.85rem, 2.6vw, 1.25rem);
  font-style: italic;
  line-height: 1.5;
  color: var(--ink);
}

.pastor-message__quote cite {
  font-family: system-ui, sans-serif;
  font-size: 0.9rem;
  font-style: normal;
  font-weight: 600;
  color: var(--accent);
}

.pastor-message__byline {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.pastor-message__avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 0 0 2px #fff, 0 0 0 3px #e5e7eb;
}

.pastor-message__byline-text {
  display: flex;
  flex-direction: column;
  line-height: 1.35;
}

.pastor-message__name {
  font-weight: 600;
  color: var(--ink);
}

.pastor-message__read {
  font-size: 0.95rem;
  color: var(--muted);
  text-decoration: none;
  transition: color 0.2s ease;
}

.pastor-message__read:hover,
.pastor-message__read:focus-visible {
  color: var(--accent);
  text-decoration: underline;
}

@media (max-width: 480px) {
  .pastor-message__quote {
    padding-left: 1rem;
  }
}
</style>
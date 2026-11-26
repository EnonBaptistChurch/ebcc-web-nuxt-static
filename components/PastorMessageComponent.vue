<template>
  <div
    class="pastor-message card group transition-lift hover:scale-up hover:shadow-lift"
  >
    <p class="pastor-message__label">Pastor's Message</p>

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
        <NuxtLink
          to="/about/pastors-message/"
          class="pastor-message__read stretched-link group-hover:underline"
        >
          Read “A Time of Uncertainty”
          <span aria-hidden="true">→</span>
        </NuxtLink>
      </div>
    </div>

    <blockquote class="pastor-message__quote">
      <p>
        But seek first the kingdom of God and His righteousness, and all
        these things will be added to you.
      </p>
      <cite>Matthew 6:33 NKJV</cite>
    </blockquote>
  </div>
</template>

<style scoped>
.pastor-message {
  --accent: #000000;
  --accent-soft: #efffff;
  --ink: #232323;
  --muted: #6b6b6b;
}

/* ---------- Tailwind-style utilities ---------- */

.card {
  position: relative; /* anchors the stretched link */
  padding: 1.5rem;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
}

.transition-lift {
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.hover\:scale-up:hover,
.hover\:scale-up:focus-within {
  transform: scale(1.03);
}

.hover\:shadow-lift:hover,
.hover\:shadow-lift:focus-within {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15),
    0 8px 10px -6px rgba(0, 0, 0, 0.1);
}

/* group-hover: hovering or focusing the .group drives its children */
.group:hover .group-hover\:underline,
.group:focus-within .group-hover\:underline {
  text-decoration: underline;
}

/* makes the link's click area cover the whole card */
.stretched-link::after {
  content: '';
  position: absolute;
  inset: 0;
}

@media (prefers-reduced-motion: reduce) {
  .transition-lift {
    transition: none;
  }

  .hover\:scale-up:hover,
  .hover\:scale-up:focus-within {
    transform: none;
  }
}

/* ---------- Component styles ---------- */

.pastor-message__label {
  display: inline-block;
  margin: 0 0 0.75rem;
  padding: 0.2rem 0.7rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent);
  background: var(--accent-soft);
  border-radius: 999px;
}

.pastor-message__byline {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0 0 1.25rem;
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
}

.pastor-message__quote {
  margin: 0;
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

@media (max-width: 480px) {
  .pastor-message__quote {
    padding-left: 1rem;
  }
}
</style>
<template>
  <article class="service">
    <div class="service-image">
      <img src="/images/building/from_the_front.jpg" class="morning-worship-image" alt="">
    </div>

    <div class="service-body">
      <p class="time-badge">Sunday · 11:15 AM</p>
      <h2>Morning Service</h2>

      <p class="lead-text">
        Join us for our Sunday morning service, where we gather to worship, pray, and hear from God's Word.
      </p>

      <div class="families">
        <p>
          Parents with little ones are welcome too! There’s a crèche available in the room just behind the
          pastor, where you can take your children if needed.
        </p>
        <p>
          For older children, we provide sermon worksheets partway through the service to help them engage
          with what’s being taught.
        </p>
      </div>
    </div>
  </article>
</template>

<style scoped>
.service {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--card-border, #e5e7eb);
  border-radius: 0.75rem;
  background: #fff;
  box-shadow: 0 1px 3px rgb(0 0 0 / 0.06);
}

.service-image {
  line-height: 0;
}

.morning-worship-image {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  object-position: center 30%;
}

.service-body {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 1.5rem 1.75rem 1.75rem;
  line-height: 1.6;
  color: var(--ink-soft, #4b5563);
}

.time-badge {
  align-self: flex-start;
  margin: 0 0 0.75rem;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  background: var(--accent-soft, #faf6ef);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--accent, #9a7b4f);
}

h2 {
  margin: 0 0 0.75rem;
  font-size: 1.6rem;
  line-height: 1.2;
  color: var(--ink, #1f2937);
}

.lead-text {
  margin: 0 0 1.25rem;
  font-size: 1.05rem;
  color: var(--ink, #1f2937);
}

.families {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding: 1rem 1.25rem;
  border-left: 4px solid var(--accent, #9a7b4f);
  border-radius: 0.5rem;
  background: var(--accent-soft, #faf6ef);
  font-size: 0.95rem;
}

.families p {
  margin: 0 0 0.75rem;
}

.families p:last-child {
  margin-bottom: 0;
}
</style>
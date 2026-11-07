<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import CallWidget from './widgets/CallWidget.vue'

const TURNSTILE_SITEKEY = '0x4AAAAAACDJOgyutnSkQsYR'

const formData = ref({ name: '', email: '', message: '' })
const status = ref<'idle' | 'success' | 'error'>('idle')
const errorMessage = ref('')
const isSubmitting = ref(false)
const honeypot = ref('') // anti-spam hidden input

// Turnstile
const captcha = ref<HTMLDivElement | null>(null)
let widgetId: string | null = null

const renderTurnstile = () => {
  const turnstile = (window as any).turnstile
  if (turnstile && captcha.value && widgetId === null) {
    widgetId = turnstile.render(captcha.value, { sitekey: TURNSTILE_SITEKEY })
  }
}

onMounted(() => {
  if ((window as any).turnstile) {
    renderTurnstile()
    return
  }

  const existing = document.querySelector<HTMLScriptElement>('script[data-turnstile]')
  if (existing) {
    existing.addEventListener('load', renderTurnstile)
    return
  }

  const script = document.createElement('script')
  script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
  script.async = true
  script.defer = true
  script.dataset.turnstile = 'true'
  script.onload = renderTurnstile
  document.head.appendChild(script)
})

onBeforeUnmount(() => {
  const turnstile = (window as any).turnstile
  if (turnstile && widgetId !== null) {
    turnstile.remove(widgetId)
    widgetId = null
  }
})

const handleSubmit = async () => {
  if (honeypot.value) {
    status.value = 'error'
    errorMessage.value = 'Something went wrong. Please try again.'
    return
  }

  const turnstileToken =
    widgetId !== null ? (window as any).turnstile.getResponse(widgetId) : null
  if (!turnstileToken) {
    status.value = 'error'
    errorMessage.value = 'Please complete the verification check below before sending.'
    return
  }

  isSubmitting.value = true
  status.value = 'idle'

  try {
    const response = await $fetch('/.netlify/functions/contact', {
      method: 'POST',
      body: { ...formData.value, turnstileToken }
    })

    if (typeof response === 'object' && response !== null && 'error' in response) {
      throw new Error((response as { error: string }).error)
    }

    status.value = 'success'
    formData.value = { name: '', email: '', message: '' }
    if (widgetId !== null) (window as any).turnstile.reset(widgetId)
  } catch (err) {
    status.value = 'error'
    errorMessage.value = 'Something went wrong. Please try again.'
    console.error('Submission failed:', err instanceof Error ? err.message : err)
    if (widgetId !== null) (window as any).turnstile.reset(widgetId)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="contact">
    <!-- Left: ways to reach us -->
    <aside class="contact-info">
      <h2 class="contact-info__title">We'd love to hear from you</h2>
      <p class="contact-info__text">
        If you have questions, or want to know more about us or about Christianity,
        give us a call outside of service times or send a message and we'll get back
        to you as soon as possible.
      </p>

      <div class="contact-info__card">
        <span class="contact-info__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </span>
        <div>
          <p class="contact-info__label">Give us a call</p>
          <p class="contact-info__value"><CallWidget text="07508 779145" /></p>
        </div>
      </div>
    </aside>

    <!-- Right: form -->
    <form class="email-form" novalidate @submit.prevent="handleSubmit">
      <h2 class="email-form__title">Send us a message</h2>

      <div class="form-row">
        <div class="form-group">
          <label for="name">Name</label>
          <input id="name" v-model="formData.name" type="text" name="name" autocomplete="name" required placeholder="Your full name" />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input id="email" v-model="formData.email" type="email" name="email" autocomplete="email" required placeholder="you@example.com" />
        </div>
      </div>

      <div class="form-group">
        <label for="message">Message</label>
        <textarea id="message" v-model="formData.message" name="message" required placeholder="Type your message here..." rows="8" class="contact-message"></textarea>
      </div>

      <!-- Honeypot hidden field -->
      <input v-model="honeypot" type="text" name="_gotcha" class="honeypot" tabindex="-1" autocomplete="off" aria-hidden="true" />

      <!-- Turnstile widget -->
      <div ref="captcha" class="captcha"></div>

      <button type="submit" :disabled="isSubmitting">
        <span v-if="isSubmitting" class="spinner" aria-hidden="true"></span>
        {{ isSubmitting ? 'Sending...' : 'Send message' }}
      </button>

      <div aria-live="polite">
        <p v-if="status === 'success'" class="status success">
          Thank you, your message has been sent. We'll be in touch soon.
        </p>
        <p v-else-if="status === 'error'" class="status error">{{ errorMessage }}</p>
      </div>
    </form>
  </div>
</template>

<style scoped>
.contact {
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
  gap: 2.5rem;
  max-width: 1100px;
  margin: 1.5rem auto;
  padding: 0 1rem;
  align-items: start;
}

/* ---------- Info panel ---------- */
.contact-info {
  padding: 0.5rem 0;
}

.contact-info__title {
  margin: 0 0 0.75rem;
  font-size: 1.75rem;
  line-height: 1.2;
  color: var(--nav-bar-bg-color, #1f3a5f);
}

.contact-info__text {
  margin: 0 0 1.75rem;
  line-height: 1.7;
  color: #444;
}

.contact-info__card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-left: 4px solid var(--nav-bar-bg-color, #1f3a5f);
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgb(0 0 0 / 0.06);
}

.contact-info__icon {
  display: grid;
  place-items: center;
  flex: none;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  color: var(--button-color, #fff);
  background: var(--nav-bar-bg-color, #1f3a5f);
}

.contact-info__label {
  margin: 0;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #6b7280;
}

.contact-info__value {
  margin: 0.15rem 0 0;
  font-size: 1.25rem;
  font-weight: 700;
}

/* ---------- Form card ---------- */
.email-form {
  padding: 2rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  box-shadow: 0 10px 30px -12px rgb(0 0 0 / 0.18);
}

.email-form__title {
  margin: 0 0 1.5rem;
  font-size: 1.35rem;
  color: #222;
}

.form-row {
  display: flex;
  gap: 1.25rem;
}

.form-group {
  flex: 1;
  margin-bottom: 1.25rem;
}

label {
  display: block;
  margin-bottom: 0.4rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: #333;
}

input,
textarea {
  width: 100%;
  padding: 0.75rem 0.9rem;
  font: inherit;
  color: #222;
  background: #f9fafb;
  border: 1px solid #d1d5db;
  border-radius: 0.6rem;
  box-sizing: border-box;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
}

input::placeholder,
textarea::placeholder {
  color: #9ca3af;
}

input:focus,
textarea:focus {
  background: #fff;
  border-color: var(--nav-bar-bg-color, #1f3a5f);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--nav-bar-bg-color, #1f3a5f) 20%, transparent);
  outline: none;
}

.contact-message {
  min-height: 150px;
  max-height: 500px;
  resize: vertical;
}

.honeypot {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  opacity: 0;
}

.captcha {
  margin-bottom: 1.25rem;
}

button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  width: 100%;
  padding: 0.85rem;
  font: inherit;
  font-weight: 600;
  color: var(--button-color, #fff);
  background-color: var(--nav-bar-bg-color, #1f3a5f);
  border: 1px solid var(--button-bg-color, #1f3a5f);
  border-radius: 0.6rem;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease, transform 0.1s ease;
}

button:hover:not(:disabled) {
  color: var(--button-bg-color, #1f3a5f);
  background-color: var(--button-color, #fff);
}

button:active:not(:disabled) {
  transform: translateY(1px);
}

button:focus-visible {
  outline: 3px solid color-mix(in srgb, var(--nav-bar-bg-color, #1f3a5f) 40%, transparent);
  outline-offset: 2px;
}

button:disabled {
  background-color: #aaa;
  border-color: #aaa;
  cursor: not-allowed;
}

.spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ---------- Status ---------- */
.status {
  margin: 1rem 0 0;
  padding: 0.75rem 1rem;
  font-weight: 500;
  text-align: center;
  border-radius: 0.6rem;
}

.success {
  color: #166534;
  background: #dcfce7;
  border: 1px solid #bbf7d0;
}

.error {
  color: #991b1b;
  background: #fee2e2;
  border: 1px solid #fecaca;
}

/* ---------- Responsive ---------- */
@media (max-width: 900px) {
  .contact {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

@media (max-width: 767px) {
  .form-row {
    flex-direction: column;
    gap: 0;
  }

  .email-form {
    padding: 1.25rem;
  }
}
</style>
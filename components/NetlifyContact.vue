<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import CallWidget from './widgets/CallWidget.vue'

const formData = ref({
  name: '',
  email: '',
  message: ''
})

const status = ref<'idle' | 'success' | 'error'>('idle')
const isSubmitting = ref(false)
const honeypot = ref('') // anti-spam hidden input

// Turnstile references
const captcha = ref<HTMLDivElement | null>(null)
let widgetId: string | null = null

// Dynamically load Turnstile on mount
onMounted(() => {
  // If Turnstile already loaded, just render
  if ((window as any).turnstile && captcha.value) {
    widgetId = (window as any).turnstile.render(captcha.value, {
      sitekey: '0x4AAAAAACDJOgyutnSkQsYR'
    })
    return
  }

  // Otherwise, dynamically load script 
  const script = document.createElement('script')
  script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
  script.async = true
  script.defer = true
  script.onload = () => {
    if (captcha.value) {
      widgetId = (window as any).turnstile.render(captcha.value, {
        sitekey: '0x4AAAAAACDJOgyutnSkQsYR'
      })
    }
  }
  document.head.appendChild(script)
})

// Submit the form
const handleSubmit = async () => {
  if (honeypot.value) {
    status.value = 'error'
    return
  }

  const turnstileToken = widgetId ? (window as any).turnstile.getResponse(widgetId) : null;

  console.log("Widget ID:", widgetId);
console.log("Turnstile token:", turnstileToken);
  if (!turnstileToken) {
    status.value = 'error'
    console.error('Turnstile verification missing')
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
      const message = (response as { error: string }).error
      throw new Error(message)
    }

    status.value = 'success'
    formData.value = { name: '', email: '', message: '' }

    // Reset Turnstile widget
    if (widgetId) {
      (window as any).turnstile.reset(widgetId)
    }
  } catch (err) {
    status.value = 'error'
    console.error('Submission failed:', err instanceof Error ? err.message : err)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div>
    <p class="text-content contact-form-intro">
      If you have questions or want to know more about us or Christianity, please give us a call outside of service times or fill out the form below and we'll get back to you as soon as possible. We'd love to hear from you.
    </p>

    <div class="text-content contact-form-intro">
      <h2>Phone: <CallWidget text="01634 301499" /></h2>
    </div>

    <h2 class="text-content contact-form-intro">Contact Form</h2>

    <form @submit.prevent="handleSubmit" class="email-form">
      <div class="form-row">
        <div class="form-group">
          <label for="name">Name</label>
          <input id="name" v-model="formData.name" type="text" name="name" required placeholder="Your full name" />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input id="email" v-model="formData.email" type="email" name="email" required placeholder="you@example.com" />
        </div>
      </div>

      <div class="form-group">
        <label for="message">Message</label>
        <textarea id="message" v-model="formData.message" name="message" required placeholder="Type your message here..." rows="9" class="contact-message"></textarea>
      </div>

      <!-- Honeypot hidden field -->
      <input v-model="honeypot" type="text" name="_gotcha" style="display: none;" />

      <!-- Turnstile widget -->
      <div ref="captcha"></div>

      <button type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? 'Sending...' : 'Send' }}
      </button>

      <p v-if="status === 'success'" class="status success">Message sent successfully!</p>
      <p v-else-if="status === 'error'" class="status error">Something went wrong. Please try again.</p>
    </form>
  </div>
</template>

<style scoped>
.contact-form-intro {
  max-width: 1000px;
  margin: 0.75rem auto 0 auto;
}

.email-form {
  max-width: 1000px;
  margin: 0.25rem auto 0 auto;
  padding: 0.25rem;
  border-radius: 0.1rem;
}

.form-row {
  display: flex;
  gap: 2rem;
}

.form-group {
  flex: 1;
  margin-bottom: 1.25rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
}

input,
textarea {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.75rem;
  box-sizing: border-box;
  transition: border-color 0.2s ease;
}

input:focus,
textarea:focus {
  border-color: var(--nav-bar-bg-color);
  outline: none;
}

button {
  display: block;
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  color: var(--button-color);
  background-color: var(--button-bg-color);
  border-color: var(--button-bg-color);
  border-width: 1px;
  border-style: solid; 
  border-radius: 0.75rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

button:disabled {
  background-color: #aaa;
  cursor: not-allowed;
  border-color: #aaa;
}

button:hover:not(:disabled) {
  color: var(--button-bg-color);
  background-color: var(--button-color);
  border-color: var(--button-bg-color);
}

.status {
  margin-top: 1rem;
  font-weight: 500;
  text-align: center;
}

.success {
  color: green;
}

.error {
  color: red;
}

.contact-message {
  min-height: 150px;
  max-width: 1000px;
  min-width: 150px;
  max-height: 500px;
}

/* Responsive */
@media (max-width: 767px) {
  .form-row {
    flex-direction: column;
  }
}
</style>

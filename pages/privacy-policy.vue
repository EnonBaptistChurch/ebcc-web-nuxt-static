<!-- pages/privacy-policy.vue -->
<script setup lang="ts">
useHead({
  title: 'Privacy Policy - Enon Baptist Church',
  meta: [
    {
      name: 'description',
      content:
        'How Enon Baptist Church, Chatham, collects, uses and protects personal information when you use this website or contact us.',
    },
  ],
})
</script>

<template>
  <main class="mx-auto max-w-3xl px-4 py-12">
    <h1 class="mb-2 text-3xl font-bold">Privacy Policy</h1>
    <p class="mb-8 text-sm">Last updated: November 2026</p>

    <p class="mb-4">
      Enon Baptist Church ("we", "us") respects your privacy. This policy
      explains what personal information we collect through this website, why we
      collect it, and what your rights are under UK data protection law (the UK
      GDPR and the Data Protection Act 2018).
    </p>

    <h2 class="mt-10 mb-3 text-2xl font-semibold">Who we are</h2>
    <p class="mb-4">
      Enon Baptist Church, Skinner Street, Chatham, ME4 5RF. We are the
      controller of the personal information described in this policy. You can
      reach us on
      <a href="tel:07508779145" class="underline">07508 779145</a> or through
      our <NuxtLink to="/contact-us/" class="underline">contact form</NuxtLink>.
    </p>

    <h2 class="mt-10 mb-3 text-2xl font-semibold">
      What information we collect and why
    </h2>

    <h3 class="mt-6 mb-2 text-xl font-semibold">Contact form</h3>
    <p class="mb-4">
      If you use our contact form, we receive the name, email address and
      message you enter. We use these only to read and reply to your enquiry.
      Our lawful basis is our legitimate interest in responding to people who
      get in touch with us. Please do not include more personal detail in your
      message than you are comfortable sharing.
    </p>

    <h3 class="mt-6 mb-2 text-xl font-semibold">Phone calls</h3>
    <p class="mb-4">
      If you ring the number on this website, we may note your name and number
      in order to call you back or pass on details of a meeting.
    </p>

    <h2 class="mt-10 mb-3 text-2xl font-semibold">
      Third-party content on this site
    </h2>
    <ul class="mb-4 list-disc pl-6">
      <li class="mb-2">
        <strong>Google Maps.</strong> Our
        <NuxtLink to="/find-us/" class="underline">Find Us</NuxtLink> page
        includes an embedded Google Map. When that page loads, Google may
        receive your IP address and may set cookies. See
        <a
          href="https://policies.google.com/privacy"
          class="underline"
          target="_blank"
          rel="noopener noreferrer"
          >Google's privacy policy</a
        >.
      </li>
      <li class="mb-2">
        <strong>Sermon audio and Spotify.</strong> Our sermons are published
        through Spotify, and we link to our Spotify page. If you follow those
        links or play audio from a third party, that provider's own privacy
        policy applies.
      </li>
    </ul>

    <h2 class="mt-10 mb-3 text-2xl font-semibold">Cookies</h2>
    <p class="mb-4">
      We do not use advertising or tracking cookies on this website. Any
      cookies that may be set come from the third-party content described
      above.
    </p>

    <h2 class="mt-10 mb-3 text-2xl font-semibold">Who we share information with</h2>
    <p class="mb-4">
      We do not sell your personal information or use it for marketing. We share
      it only with service providers who help us run the website and handle
      messages sent through it ([form handling / email provider]), and only so
      far as is needed to provide those services. We will disclose information
      if required to do so by law.
    </p>

    <h2 class="mt-10 mb-3 text-2xl font-semibold">How long we keep it</h2>
    <p class="mb-4">
      We keep enquiries for as long as is needed to deal with them and any
      follow-up, and then delete them.
    </p>

    <h2 class="mt-10 mb-3 text-2xl font-semibold">Your rights</h2>
    <p class="mb-4">You have the right to:</p>
    <ul class="mb-4 list-disc pl-6">
      <li>ask for a copy of the personal information we hold about you;</li>
      <li>ask us to correct anything that is inaccurate;</li>
      <li>ask us to delete your information;</li>
      <li>ask us to restrict, or object to, our use of your information.</li>
    </ul>
    <p class="mb-4">
      To exercise any of these rights, contact us using the details above. If
      you are unhappy with how we have handled your information, you can
      complain to the Information Commissioner's Office at
      <a
        href="https://ico.org.uk"
        class="underline"
        target="_blank"
        rel="noopener noreferrer"
        >ico.org.uk</a
      >
      or on 0303 123 1113.
    </p>

    <h2 class="mt-10 mb-3 text-2xl font-semibold">Children</h2>
    <p class="mb-4">
      This website is not aimed at children. If you are under 16, please ask a
      parent or carer to contact us on your behalf.
    </p>

    <h2 class="mt-10 mb-3 text-2xl font-semibold">Changes to this policy</h2>
    <p class="mb-4">
      We may update this policy from time to time. The date at the top of the
      page shows when it was last changed.
    </p>
  </main>
</template>
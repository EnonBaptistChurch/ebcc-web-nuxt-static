<script setup>
const props = defineProps({
  mobileMenuOpen: {
    type: Boolean,
    required: true
  },
  toggleMenu: {
    type: Function,
    required: true
  }
})
</script>

<template>
  <div class="mobile-menu-button">
        <button
          @click="toggleMenu"
          class="burger-button"
          aria-label="Toggle menu"
        >
          <svg
            v-if="!mobileMenuOpen"
            class="burger-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg
            v-else
            class="burger-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
</template>

<style scoped>
.mobile-menu-button {
  display: block;
}

.burger-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 0.375rem;
  border: none;
  background: transparent;
  color: var(--nav-text-color);
  cursor: pointer;
  transition: background-color 0.3s;
}

.burger-icon {
  height: 1.5rem;
  width: 1.5rem;
}

@media (min-width: 1024px) {
  .mobile-menu-button {
    display: none;
  }
}
</style>
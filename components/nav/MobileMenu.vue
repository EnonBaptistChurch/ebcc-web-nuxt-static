<script setup lang="ts">
import navItems from '../../data/NavigationLinks' 
const props = defineProps<{
  mobileMenuOpen: boolean
  mobileSubmenuOpen: string | null
  toggleMobileSubmenu: (title: string) => void
  closeMobileMenu: () => void
}>()

</script>

<template>
  <div v-if="mobileMenuOpen" class="mobile-menu">
    <div class="mobile-menu-content">
      <div
        v-for="item in navItems"
        :key="item.title"
        class="mobile-nav-item"
      >
        <!-- Normal link -->
        <NuxtLink
          v-if="!item.submenu"
          :to="item.link"
          prefetch
          class="mobile-nav-link"
          @click="closeMobileMenu"
        >
          {{ item.title }}
        </NuxtLink>

        <!-- Link with submenu -->
        <div v-else>
          <button
            class="mobile-submenu-button"
            @click="toggleMobileSubmenu(item.title)"
          >
          <NuxtLink :to="item.link"
          prefetch
          class="mobile-nav-link-submenu"
          @click.stop="closeMobileMenu">
            {{ item.title }}
            </NuxtLink>
            <div class="arrow-container">
                
            <svg
              class="submenu-arrow"
              :class="{ 'submenu-arrow-open': mobileSubmenuOpen === item.title }"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
            </div>
          </button>

          <div
            v-if="mobileSubmenuOpen === item.title"
            class="mobile-submenu"
          >
            <NuxtLink
              v-for="subitem in item.submenu"
              :key="subitem.title"
              :to="subitem.link"
              prefetch
              class="mobile-submenu-link"
              @click="closeMobileMenu"
            >
              {{ subitem.title }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.arrow-container {
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: 1px solid #bbb;
  padding-left: 0.75rem;
  height: 1.5rem;
  width: 1.5rem;
}
.mobile-menu {
  background-color: var(--nav-mobile-bg, #ffff);
}

.mobile-menu-content {
  padding: 0.5rem;
}

.mobile-nav-item {
  margin-bottom: 0.25rem;
}

.mobile-nav-item .mobile-nav-link {
  display: block;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-weight: 500;
  color: var(--nav-text-color);
  text-decoration: none;
  border-bottom: 1px solid #ccc;
}

.mobile-nav-item .mobile-nav-link-submenu {
  display: block;
  font-size: 1rem;
  font-weight: 500;
  color: var(--nav-text-color);
  text-decoration: none;
}

/* Remove border for the last top-level link in the menu */
.mobile-menu-content > .mobile-nav-item:last-of-type > .mobile-nav-link {
  border-bottom: none;
  padding-bottom: 0rem;;
}


.mobile-submenu-button {
  width: 100%;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-weight: 500;
  background: transparent;
  border: none;
  cursor: pointer;
  border-bottom:#ccc 1px solid;
}

.submenu-arrow {
  height: 1.25rem;
  width: 1.25rem;
  transition: transform 0.3s;
}

.submenu-arrow-open {
  transform: rotate(180deg);
}

.mobile-submenu {
  padding-left: 1rem;
}

.mobile-submenu-link {
  display: block;
  padding: 0.75rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  text-decoration: none;
  color: var(--nav-text-color);
  border-bottom:#ccc 1px solid;
}



.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
<script setup lang="ts">
import navItems from '../../data/NavigationLinks' 
import type { NavItem } from '../../types/NavItem'
import { ref } from 'vue'
let leaveTimer: NodeJS.Timeout | null = null
const activeSubmenu = ref<string | null>(null)

const props = defineProps({
  onCloseSubmenu: Function
})

const handleMouseEnter = (item: NavItem) => {
  if (leaveTimer) {
    clearTimeout(leaveTimer)
    leaveTimer = null
  }
  if (item.submenu) {
    activeSubmenu.value = item.title
  } else {
    activeSubmenu.value = null 
  }
}

const handleMouseLeave = () => {
  leaveTimer = setTimeout(() => {
    activeSubmenu.value = null
  }, 150)
}

const closeSubmenu = () => {
  activeSubmenu.value = null
  if (leaveTimer) {
    clearTimeout(leaveTimer)
    leaveTimer = null
  }
}
const isActive = (title: string) => {
  return activeSubmenu.value === title
}
</script>

<template>
  <div class="desktop-menu">
    <div
      v-for="item in navItems"
      :key="item.title"
      class="nav-item-wrapper"
      @mouseenter="handleMouseEnter(item)"
      @mouseleave="handleMouseLeave"
    >
      <NuxtLink 
        :to="item.link"
        prefetch
        class="nav-link"
      >
        {{ item.title }}
        <svg
          v-if="item.submenu"
          :class="['navdesktop-icon', { 'navdesktop-icon-rotated': activeSubmenu === item.title }]"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path>
        </svg>
      </NuxtLink>

      <div 
        v-if="item.submenu && isActive(item.title)"
        class="submenu"
      >
        <NuxtLink
          v-for="subitem in item.submenu"
          :key="subitem.title"
          :to="subitem.link"
          prefetch
          class="submenu-link"
          @click="closeSubmenu"
        >
          {{ subitem.title }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.navdesktop-icon {
  width: 14px;
  height: 14px;
  transition: transform 0.3s ease;
  margin-top: 0.25rem;
}

.navdesktop-icon-rotated {
  transform: rotate(180deg);
  
}

/* Desktop Menu */
.desktop-menu {
  display: none;
  align-items: center;
  gap: 0.25rem;
}

.nav-item-wrapper {
  position: relative;
}

.nav-link {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--nav-text-color);
  text-decoration: none;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: var(--nav-link-hover-bg, #f3f4f6);
}

.submenu {
  position: absolute;
  left: 0;
  top: 100%;
  margin-top: 0.25rem;
  width: 14rem;
  background-color: white;
  color: var(--nav-text-color);
  border-radius: 0.375rem;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  padding: 0.25rem 0;
  z-index: 50;
}

.submenu-link {
  display: block;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: #1f2937;
  text-decoration: none;
  transition: background-color 0.3s;
  transition: all 0.3s ease;
}

.submenu-link:hover {
  background-color: #f3f4f6;
  padding-left: 25px;
}
</style>
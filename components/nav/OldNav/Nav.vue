<template>
  <nav class="navbar">
    <div class="nav-container">
      <NuxtLink prefetch to="/" class="logo">Enon Baptist Church</NuxtLink>

      <!-- Desktop menu -->
      <ul class="nav-menu">
        <li v-for="(item, index) in navItems" :key="index" class="nav-item">
          <NuxtLink prefetch :to="item.link" class="nav-link">
            {{ item.title }}
            <svg
              v-if="item.submenu"
              class="navdesktop-icon"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path>
            </svg>
        </NuxtLink>
          <div v-if="item.submenu" class="submenu">
            <div v-for="sub in item.submenu" :key="sub.title" class="submenu-item">
              <NuxtLink prefetch :to="sub.link" class="submenu-link">{{ sub.title }}</NuxtLink>
            </div>
          </div>
        </li>
      </ul>

      <!-- Mobile toggle -->
      <button class="mobile-toggle" @click="toggleMobileMenu">
        {{ mobileMenuActive ? '✕' : '☰' }}
      </button>
    </div>

    <!-- Mobile menu -->
    <div class="mobile-menu" :class="{ active: mobileMenuActive }">
      <div v-for="(item, i) in navItems" :key="i" class="mobile-nav-item">
        <div v-if="item.submenu" class="mobile-nav-header">
          <NuxtLink prefetch :to="item.link" class="mobile-nav-link">{{ item.title }}</NuxtLink>
          <button class="mobile-submenu-toggle" @click="toggleSubmenu(i)">
            <svg
              class="toggle-icon"
              :style="{ transform: activeSubmenus[i] ? 'rotate(180deg)' : 'rotate(0deg)' }"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
        </div>
        <div v-else>
          <NuxtLink prefetch :to="item.link" class="mobile-nav-link single-mobile-link">{{ item.title }}</NuxtLink>
        </div>
        <div 
          v-if="item.submenu" 
          class="mobile-submenu" 
          :class="{ open: activeSubmenus[i] }"
        >
          <NuxtLink 
            v-for="sub in item.submenu" 
            :key="sub.title"
            :to="sub.link" 
            prefetch
            class="mobile-submenu-link"
          >
            {{ sub.title }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref, reactive } from 'vue'
import navItems from '../../../data/NavigationLinks'
export default {
  name: 'Navigation',
data() {
    return {
    navItems
    }
},
  setup(props) {
    const mobileMenuActive = ref(false)
    const activeSubmenus = reactive({})

    const toggleMobileMenu = () => {
      mobileMenuActive.value = !mobileMenuActive.value
    }

    const toggleSubmenu = (index) => {
      activeSubmenus[index] = !activeSubmenus[index]
      console.log(activeSubmenus);
    }

    return {
      mobileMenuActive,
      activeSubmenus,
      toggleMobileMenu,
      toggleSubmenu
    }
  }
}
</script>

<style scoped>
@import './desktopNav.css';
@import './mobileNav.css';
</style>
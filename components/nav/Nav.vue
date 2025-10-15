<template>
  <nav class="navbar">
    <div class="navbar-container">
      <div class="navbar-content">
        <!-- Logo/Brand -->
        <div class="navbar-brand">
          <NuxtLink to="/" class="brand-link">
            Enon Baptist Church
          </NuxtLink>
        </div>

        <!-- Desktop Menu -->
        <DesktopNav />
        <!-- Mobile menu button -->
        <MobileMenuButton
          :mobile-menu-open="mobileMenuOpen"
          :toggleMenu="toggleMobileMenu" />
      </div>
    </div>
      <MobileMenu
          :mobileMenuOpen="mobileMenuOpen"
          :mobileSubmenuOpen="mobileSubmenuOpen"
          :toggleMobileSubmenu="toggleMobileSubmenu"
          :closeMobileMenu="closeMobileMenu"
        />
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import DesktopNav from './DesktopNav.vue'
import MobileMenuButton from './MobileMenuButton.vue'
import MobileMenu from './MobileMenu.vue'

const mobileMenuOpen = ref(false)
const mobileSubmenuOpen = ref<string | null>(null)


function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value;
  if(!mobileMenuOpen.value) {
    mobileSubmenuOpen.value = null
  }
}
const closeMobileMenu = () => {
  console.log(mobileSubmenuOpen.value);
  mobileMenuOpen.value = false
  mobileSubmenuOpen.value = null
   
}

const toggleMobileSubmenu = (title: string) => {
  mobileSubmenuOpen.value = mobileSubmenuOpen.value === title ? null : title
}
</script>

<style scoped>
nav {
 --nav-bar-bg-color: #84c4f4;
    --nav-text-color: #333;  /* Use this consistently */
    --nav-bar-hover-color: #125a83;
    --mobile-bg: #ffff;
    --submenu-bg: #ffffff;
    --submenu-text: #333;
    --submenu-hover: #f3f4f6;
    --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter_Tight/static/InterTight-Regular.ttf') format('truetype'), 
       url('/fonts/Inter_Tight/static/InterTight-Black.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
 }

.navbar {
  background-color: var(--nav-bar-bg-color);
  /* glossy background effect 
  background: linear-gradient(90deg,  var(--nav-bar-bg-color),#fff, var(--nav-bar-bg-color));
  background-size: 300% 300%;
  animation: gradientShift 15s ease infinite; */
  color: #1f2937;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* @keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
} */

.navbar-container {
  margin: 0 auto;
  padding: 0 1rem;
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-brand {
  flex-shrink: 0;
}

.brand-link {
  font-size: 1.25rem;
  font-weight: bold;
  color: #1f2937;
  text-decoration: none;
  transition: color 0.3s;
}

.brand-link:hover {
  color: #bfdbfe;
}


/* Desktop breakpoint */
@media (min-width: 1024px) {
  .desktop-menu {
    display: flex;
  }
  
  .mobile-menu-button {
    display: none;
  }
}



</style>
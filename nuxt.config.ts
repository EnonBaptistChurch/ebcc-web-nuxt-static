import { defineNuxtConfig } from 'nuxt/config';
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  ssr: true,
  devtools: { enabled: false },
  css: ['~/public/css/site.css'], 
  alias: {
    '@': './',
  },
  app: {
    head: {
      title: 'Enon Baptist Church',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'icon',type: 'image/x-icon', href: '/images/new-logo.ico' },  
      ],
      htmlAttrs: {
        lang: 'en'
      }
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  typescript: {
    shim: false,
    tsConfig: {
      compilerOptions: {
        lib: ['esnext', 'dom'],  // Adding 'dom' here enables DOM-related types like window, document, etc.
      }
    }
  },
  vite: {
    build: {
      minify: 'esbuild',  // Minify JavaScript using esbuild
      terserOptions: {
        compress: {
          drop_console: true,  // Remove console.log and other debug output
        },
        mangle: {
          toplevel: true,  // Enable mangling of top-level variable names
        },
      },
      
    },
    server: {
      allowedHosts: ['enonbaptistchatham.org.uk', 'localhost']
    },
    optimizeDeps: {
      include: [
        '@vueuse/core',
      ]
    },
    plugins: [tsconfigPaths()]
  },
})

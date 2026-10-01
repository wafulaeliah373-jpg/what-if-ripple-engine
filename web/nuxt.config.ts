export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/sanity'],
  sanity: {
    projectId: 'c526wkjm',
    dataset: 'production',
    apiVersion: '2026-07-01',
  },
})
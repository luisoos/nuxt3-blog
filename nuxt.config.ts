import { defineNuxtConfig } from "nuxt";

export default defineNuxtConfig({
    modules: [
        "@nuxt/content"
    ],
    buildModules: [
        '@nuxtjs/tailwindcss',
    ],
    css: [
        '~/assets/css/index.css',
        '~/assets/css/toggle.css'
    ]
});

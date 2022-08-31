<template>
  <main :class="{ 'theme-light': !darkMode, 'theme-dark': darkMode }" class="h-screen bg-themeBackground p-5">
    <div class="main-div">
      <div class="flex justify-between">
        <nuxt-link to="/">&#8592; Back Home</nuxt-link>
        <Toggle v-model="darkMode" off-label="Light" on-label="Dark" />
      </div>

      <br>
      <br>

      <ContentDoc :path="$route.path">
        <template v-slot="{ doc }">  
            <ContentRenderer :value="doc" />
        </template>
        <template #not-found> <h1>Document not found</h1> </template>
      </ContentDoc>
    </div>
  </main>
</template>

<script setup lang="ts">
import Toggle from '@vueform/toggle';
import { useState } from '#app';
import { onMounted, watch } from '@vue/runtime-core';

type Theme = 'light' | 'dark';

const LOCAL_STORAGE_THEME_KEY = 'theme';

const darkMode = useState('theme', () => false);

const setTheme = (newTheme: Theme) => {
  localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
  darkMode.value = newTheme === 'dark';
};

onMounted(() => {
  const isDarkModePreferred = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;

  const themeFromLocalStorage = localStorage.getItem(
    LOCAL_STORAGE_THEME_KEY
  ) as Theme;

  if (themeFromLocalStorage) {
    setTheme(themeFromLocalStorage);
  } else {
    setTheme(isDarkModePreferred ? 'dark' : 'light');
  }
});

watch(darkMode, selected => {
  setTheme(selected ? 'dark' : 'light');
});
</script>
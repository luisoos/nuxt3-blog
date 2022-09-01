<template>
    <main :class="{ 'theme-light': !darkMode, 'theme-dark': darkMode }" class="h-screen bg-themeBackground p-5">
        <div class="main-div">
            <div class="flex justify-end nav">
                <Toggle v-model="darkMode" off-label="Light" on-label="Dark"/>
            </div>

            <br>
            <br>

            <h1>Blog</h1>
            <div class="articles" v-for="post in posts">
                <div class="post">
                    <a :href="post._path">
                        <p class="post-title"> {{ post.title }} </p>
                        <p class="post-description"> {{ post.description }} </p>
                    </a>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import Toggle from '@vueform/toggle';
import { useState } from '#app';
import { onMounted, watch } from '@vue/runtime-core';

const posts = await queryContent('posts').sort({date: -1}).find()


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
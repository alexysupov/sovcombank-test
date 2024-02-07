<script setup>
import { RouterLink, RouterView } from 'vue-router'
import AppNav from "@/components/App/AppNav.vue";
import AppHeader from "@/components/App/AppHeader.vue";
import AppMain from "@/components/App/AppMain.vue";
</script>

<template>
  <AppHeader class="app-header" />

  <AppMain class="app-main">
    <RouterView />
  </AppMain>

  <AppNav class="app-nav" />
</template>

<style>
#app {
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-template-rows: min-content 1fr;
  background: var(--color-grey-light);
  min-height: 100vh;
}
.app-nav {
  grid-column: 1 / 2;
  grid-row: 1 / 3;
}
.app-header {
  grid-column: 2 / 3;
  grid-row: 1 / 2;
}
.app-main {
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  margin: 32px;
}
</style>

<script setup>
import VIcon from "@/components/Base/VIcon.vue";
import VSvg from "@/components/Base/VSvg.vue";
import {ref} from "vue";

const navIsOpened = ref(false)
const navLinks = ref([
  {
    title: 'Главная',
    icon: 'dashboard-outline',
    iconActive: 'dashboard-bold',
    to: '/'
  },
  {
    title: 'ToDo лист',
    icon: 'todolist-outline',
    iconActive: 'todolist-bold',
    to: '/todos'
  }
])

function toggleNav() {
  navIsOpened.value = !navIsOpened.value
}
</script>

<template>
  <nav class="nav" :class="{ opened: navIsOpened }">
    <div class="nav-logo">
      <VSvg
          class="nav-logo__image"
          name="logo"
          v-show="navIsOpened"
      />
      <VIcon
          class="nav-logo__toggle"
          name="arrows-left"
          @click="toggleNav"
      />
    </div>

    <div class="nav-links">
      <h6 class="nav-links__title" v-show="navIsOpened">
        Основное
      </h6>

      <RouterLink
          v-for="link in navLinks"
          class="nav-link"
          :to="link.to"
          :key="link.to"
          v-slot="{ isActive }"
      >
        <VIcon :name="isActive ? link.iconActive : link.icon" />
        <span v-show="navIsOpened" v-text="link.title" />
      </RouterLink>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.nav {
  padding: 24px;
  border-right: 1px solid var(--color-grey);
  width: 280px;
  height: 100%;
  transition: width 0.1s linear;
  background: var(--color-white);

  &:not(.opened) {
    width: 90px;
    padding: 12px;
  }
}

.nav-logo {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .nav:not(.opened) & {
    justify-content: center;
    transform: rotate(180deg);
  }

  &__toggle {
    background: var(--color-grey-light);
    border-radius: 50%;
    transition: all 0.1s linear;
    cursor: pointer;

    &:hover {
      transform: scale(120%);
    }
  }
}

.nav-links {
  margin-top: 24px;

  &__title {
    padding: 0 20px;
    height: 56px;
    display: flex;
    align-items: center;
    font-weight: 600;
  }
}

.nav-link {
  height: 56px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 20px;
  border-radius: 8px;

  .nav:not(.opened) & {
    border-radius: 50%;
    padding: 0;
    aspect-ratio: 1 / 1;
    justify-content: center;
    margin: 0 auto;
  }

  &.router-link-active {
    background: var(--color-green-light);
  }
}
</style>
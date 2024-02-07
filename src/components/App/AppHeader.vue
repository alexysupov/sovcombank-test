<script setup>
import VIcon from "@/components/Base/VIcon.vue";
import users from "@/mocks/users.js";
import {ref} from "vue";
import {useUserStore} from "@/stores/user.js";

const showUsersPopup = ref(false)
const userStore = useUserStore()

function onClickProfile() {
  showUsersPopup.value = !showUsersPopup.value
}

function selectUser(user) {
  userStore.changeUser(user)
}
</script>

<template>
<header class="header">
  <div class="header-search">

  </div>
  <div class="header-profile">
    <div class="header-profile__mail">
      <VIcon name="mail" />
    </div>
    <div class="header-profile__notification">
      <VIcon name="notification" />
    </div>
    <div
        class="header-profile__select"
        @click="onClickProfile"
    >
      <img src="@/assets/avatar.png" alt="avatar">
      <VIcon name="chevron-down" />

      <div
          class="header-profile__popup"
          v-show="showUsersPopup"
      >
        <ul>
          <li
              v-for="user in users"
              v-text="user.name"
              :key="user.id"
              @click="selectUser(user)"
          />
        </ul>
      </div>
    </div>
  </div>
</header>
</template>

<style lang="scss" scoped>
.header {
  padding: 24px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-grey);
  background: var(--color-white);
}

.header-profile {
  display: flex;
  align-items: center;
  gap: 24px;
  position: relative;
  cursor: pointer;

  &__select {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  &__popup {
    position: absolute;
    top: calc(100% + 30px);
    right: 0;
    font-size: 14px;
    width: 100px;
    border: 1px solid var(--color-grey);
    background: var(--color-white);
    border-radius: 8px;
    z-index: 1;
    overflow: hidden;

    li {
      padding: 8px 16px;
      cursor: pointer;

      &:hover {
        background: var(--color-grey-light);
      }
    }
  }
}
</style>
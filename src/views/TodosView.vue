<script setup>
import VInput from "@/components/Base/VInput.vue";
import VTitle from "@/components/Base/VTitle.vue";
import TodoList from "@/components/Todo/TodoList.vue";

import {useTodoStore} from "@/stores/todo.js";
import {onBeforeMount, ref} from "vue";

const todoStore = useTodoStore()
const searchKeyword = ref('')

onBeforeMount(() => {
  todoStore.getTodoList()
})
</script>

<template>
<div class="todo-view">
  <RouterView />

  <div class="todo-view__header">
    <VTitle>Todo List</VTitle>
    <VInput
        v-model.trim="searchKeyword"
        :icon="true"
    />
  </div>

  <div class="todo-view__content">
    <TodoList
        :todos="todoStore.todoList"
        :keyword="searchKeyword"
    />
  </div>
</div>
</template>

<style lang="scss" scoped>
.todo-view {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h1 {
      font-weight: 600;
      font-size: 24px;
    }
  }
  &__content {
    margin-top: 32px;
  }
}
</style>
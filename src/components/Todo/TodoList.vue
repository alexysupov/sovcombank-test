<script setup>
import VTitle from "@/components/Base/VTitle.vue";
import TodoItem from "@/components/Todo/TodoItem.vue";
import {useRouter} from "vue-router";

const props = defineProps({
  todos: {
    type: Array,
    default: () => []
  },
  keyword: {
    type: String,
    default: ''
  }
})

const router = useRouter()

function checkShow(todoItem) {
  return todoItem.todo.toLowerCase().includes(props.keyword.toLowerCase())
}
</script>

<template>
<div class="todos">
  <div
      v-for="(todoGroup) in todos"
      class="todos-group"
      :key="todoGroup.id"
      @click="router.push(`/todos/${todoGroup.id}`)"
  >
    <VTitle level="h5">{{ todoGroup.title }}</VTitle>

    <div class="todos-items">
      <TodoItem
          class="todos-item"
          v-for="(todoItem) in todoGroup.items"
          v-show="checkShow(todoItem)"
          :todo="todoItem"
          :key="todoItem.id"
      />
    </div>
  </div>
</div>
</template>

<style scoped>
.todos {
  display: grid;
  gap: 32px;
}
.todos-group {
  cursor: pointer;
}
.todos-items {
  margin-top: 16px;
  display: grid;
  gap: 12px;
}
</style>
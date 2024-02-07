<script setup>
import {computed} from "vue";

const props = defineProps({
  todo: {
    type: Object,
    required: true
  },
})

const style = computed(() => {
  return props.todo.completed
      ? { background: 'var(--color-green)' }
      : { background: 'var(--color-pink)' }
})
</script>

<template>
<div class="todo">
  <div class="todo-status" v-bind="{ style }" />
  <div class="todo-text">{{ todo.todo }}</div>
</div>
</template>

<style scoped>
.todo {
  padding: 16px 32px;
  border-radius: 8px;
  background: var(--color-grey-light);
  display: flex;
  align-items: center;
  gap: 12px;
}
.todo-status {
  width: 12px;
  height: 12px;
  border-radius: 3px;
}
</style>
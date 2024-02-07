<script setup>
import dayjs from "dayjs";
import {computed} from "vue";

const props = defineProps({
  date: {
    type: String,
    required: true
  }
})

const diff = computed(() => {
  return dayjs(date).diff(dayjs(), 'days')
})

const style = computed(() => {
  if (diff.value > 4) {
    return {
      'background': 'var(--color-green-light)',
      'color': 'var(--color-green)'
    }
  }
  else if (diff.value > 2 && diff.value <= 4) {
    return {
      'background': 'var(--color-yellow-light)',
      'color': 'var(--color-yellow)'
    }
  }
  else if (diff.value >= 0 && diff.value < 2) {
    return {
      'background': 'var(--color-purple-light)',
      'color': 'var(--color-purple)'
    }
  }
  else {
    return {
      'background': 'var(--color-pink-light)',
      'color': 'var(--color-pink)'
    }
  }
})

const text = computed(() => {
  return dayjs(date).format('DD/MM/YYYY')
})
</script>

<template>
<div class="todo-badge" v-bind="{ style }">
  {{ text }}
</div>
</template>

<style scoped>
.todo-badge {
  padding: 2px 8px 2px 8px;
  border-radius: 16px;
}
</style>
<script setup>
const props = defineProps({
  level: {
    type: String,
    default: 'h1',
    validator: (v) => {
      return ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(v)
    }
  }
})
</script>

<template>
  <component :is="level" class="title">
    <slot></slot>
  </component>
</template>

<style scoped>
h3 {
  font-size: 32px;
}
h4 {
  font-size: 24px;
}
</style>
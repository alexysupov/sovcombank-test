<script setup>
defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <button v-bind="{ disabled }">
    <slot />
  </button>
</template>

<style scoped>
button {
  padding: 8px 16px;
  border-radius: 8px;
  display: inline-flex;
  justify-content: center;
  color: var(--color-white);
  background: var(--color-green);
  outline: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.1s linear;

  &:hover {
    filter: brightness(0.9);
  }

  &:disabled {
    background: var(--color-grey);
    pointer-events: none;
  }
}
</style>
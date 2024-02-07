<script setup>
import { defineAsyncComponent } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true
  }
})

const icon = defineAsyncComponent(() => {
  return import(`../../assets/${props.name}.svg`)
})
</script>

<template>
  <component :is="icon" class="icon" />
</template>

<style scoped>

</style>
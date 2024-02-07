<script setup>
import {computed, defineAsyncComponent} from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true
  }
})

const icon = computed(() => {
  const path = `../../assets/icons/${props.name}.svg`
  return defineAsyncComponent(() => import(path))
})
</script>

<template>
<component :is="icon" class="icon" />
</template>

<style scoped>

</style>
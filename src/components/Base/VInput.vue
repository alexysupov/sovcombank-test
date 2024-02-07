<script setup>
import {computed} from "vue";
import VIcon from "@/components/Base/VIcon.vue";

const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: true
  },
  placeholder: {
    type: String,
    default: ''
  },
  icon: {
    type: Boolean,
    default: false
  },
  fullWidth: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['update:modelValue'])

const customModel = computed({
  set: (v) => emits('update:modelValue', v),
  get: () => props.modelValue
})

const style = computed(() => {
  return props.fullWidth
      ? { width: '100%' }
      : { width: 'auto' }
})
</script>

<template>
  <div class="input-wrapper">
    <input
        v-model="customModel"
        :placeholder="placeholder"
        :style="style"
        :disabled="disabled"
        :class="{ icon }"
    >
    <VIcon
        name="search"
        v-if="icon"
    />
  </div>
</template>

<style scoped lang="scss">
.input-wrapper {
  position: relative;
}
input {
  padding: 16px 20px 16px 16px;
  border-radius: 10px;
  border: 1px solid var(--color-grey);
  outline: none;
  font-size: 16px;
  position: relative;

  &.icon {
    padding: 16px 20px 16px 50px;
  }

  &:disabled {
    background: var(--color-grey);
    pointer-events: none;
  }

  &:active, &:focus, &:hover {
    border: 1px solid var(--color-green);
    + svg { color: var(--color-green); }
  }
}
svg {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
}
</style>
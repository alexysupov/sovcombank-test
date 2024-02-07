<template>
  <label class="checkbox">
    <input
      type="checkbox"
      :hidden="true"
      :value="value"
      :disabled="disabled"
      :indeterminate.prop="indeterminate"
      @change="$emit('change', $event)"
      @click="$emit('click', $event)"
      v-model="customModel"
    />

    <span
      class="checkbox-icon"
      :class="{ hoverable: hoverableIcon, small }"
    />

    <span
      v-if="$slots.default || label"
      class="checkbox-text"
      :class="{ hoverable: hoverableText }"
    >
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script>
export default {
  name: "BasicCheckbox",
  props: {
    modelValue: {
      type: [Boolean, Array],
      default: undefined
    },
    value: {
      type: [String, Number, Boolean],
      default: false,
    },
    label: {
      type: [String, Number],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: true,
    },
    indeterminate: {
      type: Boolean,
      default: false,
    },
    hoverableIcon: {
      type: Boolean,
      default: true
    },
    hoverableText: {
      type: Boolean,
      default: true
    },
  },

  computed: {
    customModel: {
      get() { return this.modelValue || this.value },
      set(v) { this.$emit('update:modelValue', v) }
    }
  }
}
</script>

<style lang="scss" scoped>
.checkbox {
  display: inline-flex;
  align-items: center;
  margin-bottom: 0;
  cursor: pointer;
  gap: 8px;

  &:hover input:not(:disabled, :checked, :indeterminate) ~ &-icon.hoverable {
    border-color: var(--color-green);
    border-width: 2px;
  }

  &:hover input:not(:disabled) ~ &-text.hoverable {
    color: var(--color-green);
  }
}

.checkbox-icon {
  width: 20px;
  height: 20px;
  border-width: 1px;
  border-color: var(--color-grey);
  border-style: solid;
  border-radius: 4px;
  position: relative;
  flex: none;

  &.small {
    width: 16px;
    height: 16px;
  }

  &::after {
    content: '';
    position: absolute;
    mask-repeat: no-repeat;
    mask-position: center;
    mask-size: cover;
    bottom: 0;
    right: 0;
    left: 0;
    top: 0;
  }

  input:disabled + & {
    background: var(--color-grey);
  }

  input:checked + & {
    border: none;

    &::after {
      mask-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00IDBhNCA0IDAgMCAwLTQgNHYxMmE0IDQgMCAwIDAgNCA0aDEyYTQgNCAwIDAgMCA0LTRWNGE0IDQgMCAwIDAtNC00SDR6bTEyLjA0IDYuNzA3YTEgMSAwIDAgMC0xLjQxNC0xLjQxNEw4IDExLjkxOSA1LjM3NCA5LjI5M2ExIDEgMCAwIDAtMS40MTUgMS40MTRsMy4zMzQgMy4zMzMuNzA3LjcwOC43MDctLjcwOCA3LjMzMy03LjMzM3oiIGZpbGw9IiMwMDAiLz48L3N2Zz4=");
      background: var(--color-green);
    }

    &.small::after {
      mask-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00IDBhNCA0IDAgMCAwLTQgNHY4YTQgNCAwIDAgMCA0IDRoOGE0IDQgMCAwIDAgNC00VjRhNCA0IDAgMCAwLTQtNEg0em0yLjcwNyAxMi4wNCA3LjMzMy03LjMzM2ExIDEgMCAwIDAtMS40MTQtMS40MTRMNiA5LjkxOSAzLjM3NCA3LjI5M2ExIDEgMCAwIDAtMS40MTUgMS40MTRsMy4zMzQgMy4zMzMuNzA3LjcwOC43MDctLjcwOHoiIGZpbGw9IiMwMDAiLz48L3N2Zz4=");
    }
  }

  input:checked:disabled + & {
    &::after {
      background: var(--color-grey);
    }
  }

  input:indeterminate + & {
    border: none;

    &::after {
      mask-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzM1Nl8yMTUyNCkiIGZpbGw9IiMwMDAiPjxyZWN0IHg9IjUiIHk9IjgiIHdpZHRoPSIxMCIgaGVpZ2h0PSI0IiByeD0iMiIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTYgMkg0YTIgMiAwIDAgMC0yIDJ2MTJhMiAyIDAgMCAwIDIgMmgxMmEyIDIgMCAwIDAgMi0yVjRhMiAyIDAgMCAwLTItMnpNNCAwYTQgNCAwIDAgMC00IDR2MTJhNCA0IDAgMCAwIDQgNGgxMmE0IDQgMCAwIDAgNC00VjRhNCA0IDAgMCAwLTQtNEg0eiIvPjwvZz48cmVjdCB4PSIxIiB5PSIxIiB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHJ4PSIzIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMiIvPjwvc3ZnPg==");
      background: var(--color-green);
    }

    &.small::after {
      mask-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzM1Nl8yMTUyNykiIGZpbGw9IiMwMDAiPjxyZWN0IHg9IjQiIHk9IjYiIHdpZHRoPSI4IiBoZWlnaHQ9IjQiIHJ4PSIyIi8+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMiAySDRhMiAyIDAgMCAwLTIgMnY4YTIgMiAwIDAgMCAyIDJoOGEyIDIgMCAwIDAgMi0yVjRhMiAyIDAgMCAwLTItMnpNNCAwYTQgNCAwIDAgMC00IDR2OGE0IDQgMCAwIDAgNCA0aDhhNCA0IDAgMCAwIDQtNFY0YTQgNCAwIDAgMC00LTRINHoiLz48L2c+PC9zdmc+");
    }
  }

  input:indeterminate:disabled + & {
    &::after {
      background: var(--color-grey);
    }
  }
}

.checkbox-text {
  align-items: center;
  display: flex;
  gap: 4px;
}
</style>

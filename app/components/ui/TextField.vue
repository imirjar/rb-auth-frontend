<template>
  <div class="text-field">
    <div class="input-container">
      <input
        :type="obscureText ? 'password' : 'text'"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        @focus="isFocused = true"
        @blur="isFocused = false"
        class="input"
        :class="{ 'error': error, 'filled': modelValue || isFocused }"
        placeholder=" "
      />
      <label :class="{ 'floating': modelValue || isFocused }">{{ label }}</label>
    </div>
    <div v-if="error" class="error-text">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  label: String,
  obscureText: {
    type: Boolean,
    default: false
  },
  modelValue: String,
  error: String
})

defineEmits(['update:modelValue'])

const isFocused = ref(false)
</script>

<style scoped>
/* Базовые сбросы стилей */
.text-field {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.text-field {
  width: 100%;
  position: relative;
}

.input-container {
  position: relative;
  display: block;
}

label {
  position: absolute;
  left: 16px;
  top: 12px;
  color: #666;
  font-size: 16px;
  font-weight: 500;
  pointer-events: none;
  transition: all 0.3s ease;
  background-color: transparent;
}

.input {
  width: 100%;
  padding: 18px 16px 8px 16px;
  border-radius: 18px;
  background: rgba(244, 243, 243, 0.8);
  font-size: 16px;
  transition: all 0.3s;
  border: 1px solid transparent;
  box-sizing: border-box;
  font-family: inherit;
  line-height: normal;
  margin: 0;
  appearance: none;
}

.input:focus {
  outline: none;
  background: rgba(244, 243, 243, 0.8);
}

.input.error {
  border-color: #ff4444;
}

/* Стили для плавающего label */
label.floating {
  top: -8px;
  left: 12px;
  font-size: 12px;
  padding: 0 4px;
  color: #666;
  /* background-color: white; */
  z-index: 1;
}

.error-text {
  color: #ff4444;
  font-size: 12px;
  margin-top: 4px;
  padding-left: 16px;
}
</style>
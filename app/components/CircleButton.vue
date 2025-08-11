<template>
  <button class="circle-button" type="button" >
    <Icon class="button-icon" :name="icon"/>
  </button>
</template>

<script setup>
const props = defineProps({
  icon: {
    type: String,
    required: true,
  }
})
</script>

<style scoped>
/* Базовые сбросы стилей для кнопки */

/* Основные стили кнопки */
.circle-button {
  width: 80px;
  height: 80px;
  margin: 0;
  padding: 0;
  border: none;
  background: #f1f1f1;
  font: inherit;
  line-height: 1;
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-sizing: border-box;
  position: relative;
}

.button-icon {
  color: #666;
  display: block; /* На случай если иконка реализована как SVG */
  flex-shrink: 0; /* Предотвращает сжатие иконки */
  font-size: 2rem;
}

/* Состояния кнопки */
.circle-button:hover {
  background-color: #f9f9f9;
  box-shadow: 
    -6px -6px 16px rgba(255, 255, 255, 0.8),
    6px 6px 16px rgba(0, 0, 0, 0.1);
  outline: none;
}

.circle-button:active {
  background-color: #dfdfdf;
  box-shadow: inset 6px 6px 16px rgba(93, 93, 93, 0.3);
}

.circle-button:focus {
  outline: none;
}

/* Для доступности - фокусное состояние */
.circle-button:focus-visible {
  box-shadow: 
    0 0 0 2px #ffffff,
    0 0 0 4px #4285f4;
}
</style>
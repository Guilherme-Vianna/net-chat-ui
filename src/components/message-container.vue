<script setup lang="ts">
defineProps({
  message: String,
  author: String,
  sendByMe: Boolean,
})
</script>

<template>
  <div>{{ author }}</div>
  <div
    :class="{
      'bg-gradient-to-r from-indigo-600 to-indigo-500': sendByMe,
      'bg-gradient-to-l from-slate-600 to-slate-500': !sendByMe,
    }"
    class="flex flex-col max-w-1/2 p-5 shadow-xl rounded-xl"
  >
    <div>{{ message }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  friend_name: String,
  friend_id: String,
  last_message_date: Date,
  last_message: String,
})
</script>

<template>
  <div
    class="flex flex-col w-full h-full border-1 rounded-xl px-5 py-2 hover:shadow-md hover:shadow-indigo-500 transition ease-linear duration-150"
  >
    <div class="text-indigo-400 font-bold text-xl">{{ friend_name }}</div>
    <div class="opacity-50">{{ last_message?.slice(0, 10) + '...' }}</div>
  </div>
</template>

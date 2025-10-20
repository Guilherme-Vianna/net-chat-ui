<script setup lang="ts">
import MainHeader from './components/main-header.vue'
</script>
<template>
  <div class="min-h-screen flex flex-col bg-slate-900 text-white">
    <MainHeader></MainHeader>

    <main class="flex-grow flex justify-center items-center">
      <RouterView />
    </main>

    <footer class="bg-slate-900 flex justify-center items-center py-6 border-t border-slate-800">
      <p class="text-gray-400 text-sm">© 2025 NetChat. All rights reserved.</p>
    </footer>
  </div>
</template>

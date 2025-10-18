<script setup lang="ts"></script>

<template>
  <div class="min-h-screen flex flex-col bg-slate-900 text-white">
    <header class="flex justify-between items-center bg-slate-900 p-5">
      <h1 class="text-2xl font-bold">NetChat</h1>
      <nav class="flex gap-4">
        <RouterLink
          to="/login"
          class="py-1 px-5 bg-white text-black rounded-3xl hover:bg-gray-200 transition"
        >
          Entrar
        </RouterLink>
        <RouterLink
          to="/register"
          class="py-1 px-5 bg-white text-black rounded-3xl hover:bg-gray-200 transition"
        >
          Registrar
        </RouterLink>
      </nav>
    </header>

    <main class="flex-grow flex justify-center items-center">
      <RouterView />
    </main>

    <footer class="bg-slate-900 flex justify-center items-center py-6">
      <p class="text-gray-400 text-sm">© 2025 NetChat. All rights reserved.</p>
    </footer>
  </div>
</template>

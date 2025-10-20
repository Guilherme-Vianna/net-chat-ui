<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { AuthService } from './services/AuthService'
import { Search, MessageSquare, User, LogOut, Settings } from 'lucide-vue-next'
const isLoggedIn = ref(false)
const showProfileMenu = ref(false)

function toggleProfileMenu() {
  showProfileMenu.value = !showProfileMenu.value
}

function logout() {
  console.log('User logged out')
}
onMounted(async () => {
  const authService = new AuthService()
  const response = await authService.VerifyAuth()
  console.log(response)
  isLoggedIn.value = response
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-slate-900 text-white">
    <header class="flex justify-between items-center bg-slate-900 p-5 border-b border-slate-800">
      <h1 class="text-2xl font-bold">NetChat</h1>

      <nav class="flex gap-4" v-if="!isLoggedIn">
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

      <nav class="flex items-center gap-6" v-else>
        <RouterLink
          to="/new-chat"
          class="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-3xl transition"
        >
          <Search class="w-5 h-5" />
          <span>New Chat</span>
        </RouterLink>

        <RouterLink
          to="/chats"
          class="flex items-center gap-2 px-4 py-2 hover:bg-slate-800 rounded-3xl transition"
        >
          <MessageSquare class="w-5 h-5" />
          <span>Chats</span>
        </RouterLink>

        <div class="relative">
          <button
            @click="toggleProfileMenu"
            class="flex items-center gap-2 px-4 py-2 hover:bg-slate-800 rounded-3xl transition"
          >
            <User class="w-5 h-5" />
            <span>Profile</span>
          </button>

          <div
            v-if="showProfileMenu"
            class="absolute right-0 mt-2 w-40 bg-slate-800 rounded-xl shadow-lg border border-slate-700"
          >
            <RouterLink
              to="/profile/customize"
              class="flex items-center gap-2 px-4 py-2 hover:bg-slate-700 rounded-t-xl transition"
            >
              <Settings class="w-4 h-4" />
              <span>Customize</span>
            </RouterLink>

            <button
              @click="logout"
              class="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-slate-700 rounded-b-xl transition"
            >
              <LogOut class="w-4 h-4 text-red-400" />
              <span class="text-red-400">Logout</span>
            </button>
          </div>
        </div>
      </nav>
    </header>

    <main class="flex-grow flex justify-center items-center">
      <RouterView />
    </main>

    <footer class="bg-slate-900 flex justify-center items-center py-6 border-t border-slate-800">
      <p class="text-gray-400 text-sm">© 2025 NetChat. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { Search, MessageSquare, User, LogOut, Settings } from 'lucide-vue-next'
import { useRouter, RouterLink } from 'vue-router'
import { AuthService } from '@/services/AuthService'
import UserService from '@/services/UserService'

const router = useRouter()
const isLoggedIn = ref(false)
const showProfileMenu = ref(false)
const firstName = ref<string>('User')

function toggleProfileMenu() {
  showProfileMenu.value = !showProfileMenu.value
}

async function logout() {
  const service = new UserService()
  await service.logOut()
  isLoggedIn.value = false
  router.replace('/')
}

watchEffect(async () => {
  const authService = new AuthService()
  const response = await authService.VerifyAuth()
  isLoggedIn.value = response

  if (response) {
    const userService = new UserService()
    const userData = await userService.getData()
    firstName.value = userData?.name?.split(' ')[0] || 'User'
  }
})
</script>

<template>
  <header
    class="flex justify-between items-center bg-slate-900 p-5 border-b border-slate-800 sticky top-0 z-50"
  >
    <!-- Logo -->
    <h1 class="text-2xl font-bold tracking-wide">NetChat</h1>

    <!-- Guest Navigation -->
    <nav v-if="!isLoggedIn" class="flex gap-4">
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

    <!-- Logged-in Navigation -->
    <nav v-else class="flex items-center gap-5">
      <!-- New Chat -->
      <RouterLink
        to="/new-chat"
        class="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-3xl transition"
      >
        <Search class="w-5 h-5" />
        <span>New Chat</span>
      </RouterLink>

      <!-- Chats -->
      <RouterLink
        to="/chats"
        class="flex items-center gap-2 px-4 py-2 hover:bg-slate-800 rounded-3xl transition"
      >
        <MessageSquare class="w-5 h-5" />
        <span>Chats</span>
      </RouterLink>

      <!-- Profile -->
      <div class="relative">
        <button
          @click="toggleProfileMenu"
          class="flex items-center gap-2 px-4 py-2 hover:bg-slate-800 rounded-3xl transition"
        >
          <User class="w-5 h-5" />
          <span>{{ firstName }}</span>
        </button>

        <!-- Dropdown -->
        <transition
          enter-active-class="transition ease-out duration-150"
          enter-from-class="opacity-0 translate-y-1"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition ease-in duration-100"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 translate-y-1"
        >
          <div
            v-if="showProfileMenu"
            class="absolute right-0 mt-2 w-44 bg-slate-800 rounded-xl shadow-lg border border-slate-700 overflow-hidden"
          >
            <RouterLink
              to="/profile/customize"
              class="flex items-center gap-2 px-4 py-2 hover:bg-slate-700 transition"
            >
              <Settings class="w-4 h-4" />
              <span>Customize</span>
            </RouterLink>

            <button
              @click="logout"
              class="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-slate-700 transition"
            >
              <LogOut class="w-4 h-4 text-red-400" />
              <span class="text-red-400">Logout</span>
            </button>
          </div>
        </transition>
      </div>
    </nav>
  </header>
</template>

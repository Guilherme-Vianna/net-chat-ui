<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import { router } from '@/main'
import UserService from '@/services/UserService'

const notification = useToast()

const loginForm = ref({
  email: '',
  password: '',
})

async function loginUser() {
  if (!loginForm.value.email || !loginForm.value.password) {
    notification.warning('Por favor, preencha todos os campos.')
    return
  }

  const service = new UserService()
  try {
    const result = await service.loginUser(loginForm.value)
    if (result) {
      notification.success('Login realizado com sucesso!')
      window.location.reload()
    } else {
      notification.error('Credenciais inválidas. Verifique seu email e senha.')
    }
  } catch (err) {
    notification.error('Ocorreu um erro ao tentar fazer login.')
  }
}
</script>

<template>
  <div class="flex w-full justify-center items-center bg-slate-900">
    <form
      @submit.prevent="loginUser"
      class="flex flex-col w-full max-w-sm p-8 bg-slate-800 text-white rounded-2xl shadow-2xl space-y-6"
    >
      <h2 class="text-2xl font-semibold text-center text-white mb-4">Login</h2>

      <div class="flex flex-col space-y-2">
        <label for="email" class="text-sm font-medium text-gray-300">Email</label>
        <input
          v-model="loginForm.email"
          id="email"
          type="email"
          class="px-4 py-2 rounded-md bg-slate-700 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <div class="flex flex-col space-y-2">
        <label for="password" class="text-sm font-medium text-gray-300">Senha</label>
        <input
          v-model="loginForm.password"
          id="password"
          type="password"
          class="px-4 py-2 rounded-md bg-slate-700 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <button
        type="submit"
        class="mt-4 w-full py-2 rounded-md bg-blue-600 hover:bg-blue-700 font-medium transition duration-200"
      >
        Entrar
      </button>

      <p class="text-center text-sm text-gray-400">
        Não tem uma conta?
        <RouterLink to="/register" class="text-blue-400 hover:underline">Crie uma agora</RouterLink>
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { v4 } from 'uuid'
import UserService from '@/services/UserService'
import { useToast } from 'vue-toastification'
import { router } from '@/main'
import HeaderBar from '@/components/main-header.vue'

const notification = useToast()
interface TagRegisterDto {
  id: string
  name: string
}

const registerForm = ref({
  name: '',
  password: '',
  email: '',
  tags: [],
})

const tags = ref<TagRegisterDto[]>([])
const tagInput = ref('')

onMounted(() => {})

function addTag(tagName: string) {
  const cleanTag = tagName.toLowerCase().trim()

  if (!cleanTag) return

  if (tags.value.some((t) => t.name === cleanTag)) {
    alert('Essa tag já foi adicionada.')
    tagInput.value = ''
    return
  }

  if (tags.value.length >= 5) {
    alert('Limite máximo de tags é 5. Remova algumas primeiro.')
    return
  }

  const tag: TagRegisterDto = { id: v4(), name: cleanTag }
  tags.value.push(tag)
  tagInput.value = ''
}

function removeTag(id: string) {
  tags.value = tags.value.filter((x) => x.id !== id)
}

async function save() {}

watch(tagInput, (newVal) => {
  if (!newVal) return
  if (newVal.endsWith(' ')) {
    addTag(newVal)
  }
})
</script>

<template>
  <Notivue v-slot="item">
    <Notification :item="item" />
  </Notivue>

  <div class="flex w-full justify-center items-center bg-slate-900">
    <form
      @submit.prevent="registerUser"
      class="flex flex-col w-full max-w-sm p-8 bg-slate-800 text-white rounded-2xl shadow-2xl space-y-6"
    >
      <h2 class="text-2xl font-semibold text-center text-white mb-4">Create Account</h2>

      <div class="flex flex-col space-y-2">
        <label for="name" class="text-sm font-medium text-gray-300">Full Name</label>
        <input
          v-model="registerForm.name"
          @keydown.enter.prevent="addTag"
          id="name"
          type="text"
          class="px-4 py-2 rounded-md bg-slate-700 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <div class="flex flex-col space-y-2">
        <label for="email" class="text-sm font-medium text-gray-300">Email</label>
        <input
          v-model="registerForm.email"
          @keydown.enter.prevent="addTag"
          id="email"
          type="email"
          class="px-4 py-2 rounded-md bg-slate-700 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <div class="flex flex-col space-y-2">
        <label for="password" class="text-sm font-medium text-gray-300">Password</label>
        <input
          v-model="registerForm.password"
          @keydown.enter.prevent="addTag"
          id="password"
          type="password"
          class="px-4 py-2 rounded-md bg-slate-700 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <div class="flex space-y-2 items-center">
        <div class="flex flex-col">
          <label for="tags" class="text-sm flex items-center font-medium text-gray-300"
            >Tags
            <div class="text-sm/1">(máximo 5)</div></label
          >
          <input
            v-model="tagInput"
            id="tag"
            type="text"
            @keydown.enter.prevent="addTag(tagInput)"
            class="px-4 py-2 rounded-md bg-slate-700 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
      </div>

      <div class="flex flex-wrap gap-2">
        <div class="bg-slate-500 p-2 text-sm/3 rounded-sm" v-for="tag in tags" :key="tag.id">
          {{ tag.name }}
          <button @click.prevent @click="removeTag(tag.id)" class="p-1 bg-red-500 rounded-sm">
            -
          </button>
        </div>
      </div>

      <button
        type="submit"
        class="mt-4 w-full py-2 rounded-md bg-blue-600 hover:bg-blue-700 font-medium transition duration-200"
      >
        Sign Up
      </button>

      <button @click="push.success('Hi! I am your first notification!')">Push</button>

      <p class="text-center text-sm text-gray-400">
        Already have an account?
        <RouterLink to="/enter" class="text-blue-400 hover:underline">Log in</RouterLink>
      </p>
    </form>
  </div>
</template>

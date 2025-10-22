<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { v4 } from 'uuid'
import { useToast } from 'vue-toastification'
import ChatService from '@/services/ChatService.ts'
import FindChatDto from '@/types/FindChatDto.ts'
import FindChatResponse from '@/types/FindChatResponse.ts'

const notification = useToast()
interface TagRegisterDto {
  id: string
  name: string
}

const newChat = ref<FindChatResponse | null>(null)
const tags = ref<TagRegisterDto[]>([])
const tagInput = ref('')

onMounted(async () => {
  // const mockData = new FindChatResponse('Guilherme', ['programacao', 'dora', 'node'], new Date())
  // newChat.value = mockData
})

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

async function search() {
  const chatService = new ChatService()
  const dto = new FindChatDto(tags.value.map((x) => x.name))
  const result = await chatService.getChat(dto)
  newChat.value = result
}

function formatMemberSince(dateStr: string) {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays < 1) return 'menos de um dia'
  if (diffDays < 7) return `${diffDays} dia${diffDays > 1 ? 's' : ''}`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} semana${diffDays >= 14 ? 's' : ''}`
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} mês${diffDays >= 60 ? 'es' : ''}`
  return `${Math.floor(diffDays / 365)} ano${diffDays >= 730 ? 's' : ''}`
}


function tagFounded(tag: string): boolean {
  debugger;
  if (newChat.value?.tags.includes(tag)) {
    return true
  }
  return false
}

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
      @submit.prevent="search"
      class="flex flex-col w-full max-w-sm p-8 bg-slate-800 text-white rounded-2xl shadow-2xl space-y-6"
    >
      <div
        v-if="newChat != null"
        class="flex flex-col items-center"
      >
        <h3 class="text-2xl font-bold text-green-500 mb-2">
          Pessoa Encontrada!
        </h3>

        <h4 class="text-xl font-semibold text-white mb-3">
          Nome: <span class="text-blue-400">{{ newChat.username }}</span>
        </h4>

        <p class="text-gray-300 text-sm mb-4 italic">
          Membro há {{ formatMemberSince(newChat.user_createdat) }}
        </p>

        <div class="flex flex-wrap justify-center gap-3 mt-3">
          <div
            v-for="tag in tags"
            :key="tag.id"
            class="px-3 py-1 rounded-full text-sm font-semibold shadow-md"
            :class="tagFounded(tag.name)
        ? 'bg-green-800 text-green-200 border border-green-500'
        : 'bg-red-800 text-red-200 border border-red-500'"
          >
            {{ tag.name }}
          </div>
        </div>

        <button
          type="submit"
          class="mt-10 w-full py-2 rounded-md bg-blue-600 hover:bg-blue-700 font-medium transition duration-200"
        >
          Conversar
        </button>
      </div>

      <div v-else class="flex flex-col gap-5">
        <h2 class="text-2xl font-semibold text-center text-white">Encontrar Pessoa</h2>

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
          Procurar
        </button>
      </div>
    </form>
  </div>
</template>

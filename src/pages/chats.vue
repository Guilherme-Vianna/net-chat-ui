<script setup lang="ts">
import { v4 } from 'uuid'
import { useToast } from 'vue-toastification'
import ChatService from '@/services/ChatService.ts'
import FindChatResponse from '@/types/FindChatResponse.ts'
import type FriendInformation from '@/types/FriendInformulation'
import { ref } from 'vue'
import ChatContainer from '@/components/chat-container.vue'
import FriendContainer from '@/components/friend-container.vue'

const notification = useToast()

const names = [
  'Lucas Ferreira',
  'Ana Costa',
  'Pedro Silva',
  'Mariana Oliveira',
  'João Souza',
  'Camila Santos',
  'Rafael Lima',
  'Beatriz Gomes',
  'Felipe Martins',
  'Larissa Rocha',
  'Bruno Almeida',
  'Isabela Torres',
  'Matheus Ramos',
  'Carla Mendes',
  'Diego Barbosa',
  'Juliana Azevedo',
  'Gabriel Pires',
  'Sofia Duarte',
  'Leonardo Freitas',
  'Clara Nogueira',
]

const messages = [
  'Oi, tudo bem?',
  'Vamos marcar algo hoje?',
  'Você viu o que aconteceu?',
  'Estou indo agora!',
  'Te ligo mais tarde',
  'Haha, boa!',
  'Sério mesmo?',
  'Tá ótimo!',
  'Enviado!',
  'Confirmado!',
  'Beleza!',
  'Perfeito!',
  'Amanhã cedo?',
  'Deu certo!',
  'Valeu!',
  'Top!',
  'Boa noite!',
  'Bom dia!',
  'Fechado então',
  'Até mais!',
]

const fakeData = ref<FriendInformation[]>([
  {
    last_message: 'teste',
    friend_name: 'Guilherme Vianna',
    friend_id: v4(),
    last_message_date: new Date(),
  },
  ...Array.from({ length: 20 }, (_, i) => ({
    last_message: messages[Math.floor(Math.random() * messages.length)],
    friend_name: names[i],
    friend_id: v4(),
    last_message_date: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 7), // dentro de 7 dias
  })),
])
</script>

<template>
  <Notivue v-slot="item">
    <Notification :item="item" />
  </Notivue>

  <div class="flex w-full bg-slate-900 px-30">
    <div class="flex w-full border-2 rounded-xl shadow-2xl p-5">
      <div class="flex w-1/5 flex-col gap-5 overflow-y-auto max-h-150">
        <div v-for="chat in fakeData">
          <FriendContainer
            :friend_name="chat.friend_name"
            :last_message="chat.last_message"
          ></FriendContainer>
        </div>
      </div>
      <div class="flex flex-col w-4/4 px-5 max-h-150 gap-5">
        <div class="h-11/12 overflow-y-auto">
            <ChatContainer></ChatContainer>
        </div>
        <div class="flex h-1/12 gap-5">
            <input class="w-11/12 border-2 rounded-xl px-5"></input>
            <div class="flex w-1/12 justify-center items-center bg-indigo-500 rounded-xl">Enviar</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MessageContainer from './message-container.vue'
import { ActivitySquare } from 'lucide-vue-next'

defineProps({
  friend_name: String,
  friend_id: String,
  last_message_date: Date,
  last_message: String,
})

const messageFrom = ref<string[]>([
  'Oi!',
  'Como você tá?',
  'Eu tava pensando aqui... aquele projeto que a gente começou semana passada ainda precisa de alguns ajustes antes de enviar pro cliente.',
  'Você pode revisar a parte do layout mais tarde?',
  '👍',
  'Ah, e lembra de atualizar o README também, por favor!',
])

const messageTo = ref<string[]>([
  'E aí! Tudo certo por aqui 😄',
  'Claro, posso revisar sim!',
  'Acho que a parte de autenticação também precisa ser revisada, tava dando um bug estranho quando o token expirava.',
  'Depois te mando um print pra mostrar melhor.',
  'Beleza, vou ver o README hoje à noite.',
  'Valeu mesmo pela força 👊',
])

const messages = messageFrom.value.concat(messageTo.value)
</script>

<template>
  <div class="flex flex-col">
    <div v-for="value in messages" class="flex flex-col items-start">
      <MessageContainer :message="value" author="Fulano"></MessageContainer>
    </div>
    <div v-for="value in messages" class="flex flex-col items-end">
      <MessageContainer :message="value" author="Fulano" :send-by-me="true"></MessageContainer>
    </div>
  </div>
</template>

import Enviroment from "@/enviroment"
import type LoginDto from "@/types/LoginDto"
import type LoginResponse from "@/types/LoginResponse"
import UserDto from "@/types/UserDto"
import UserViewModel from "@/types/UserViewModel"
import axios from "axios"
import { useToast, type ToastInterface } from 'vue-toastification'
import {
    useCookies
} from '@vueuse/integrations/useCookies'
import type UpdateUserDto from '@/types/UpdateUserDto.ts'
import type FindChatResponse from '@/types/FindChatResponse.ts'
import type FindChatDto from '@/types/FindChatDto.ts'
export default class ChatService {
    toast: ToastInterface
    cookies: any

    constructor() {
        this.toast = useToast()
        this.cookies
            = useCookies
                (['locale'])
    }

    async getChat(data: FindChatDto): Promise<FindChatResponse> {
      const token = this.cookies.get("token")

      const response = await axios.post(Enviroment.API_URL + "chats", data,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (!response.status.toString().startsWith("2")) {
          this.toast.info("Ocorreu um erro durante a atualização!")
      }

      return response.data
    }
}

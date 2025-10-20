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
export default class UserService {
    toast: ToastInterface
    cookies: any


    constructor() {
        this.toast = useToast()
        this.cookies
            = useCookies
                (['locale'])
    }

    async createUser(data: UserDto): Promise<UserViewModel | null> {
        const response = await axios.post(Enviroment.API_URL + "users", data)
        if (!response.status.toString().startsWith("2")) {
            this.toast.info("Ocorreu um erro durante o cadastro!")
        }
        this.toast.success("Cadastro realizado!")
        return response.data
    }


    async getData(): Promise<UserViewModel> {
        const token = this.cookies.get("token")

        const response = await axios.get(Enviroment.API_URL + "users", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    }

    logOut(): void {
        this.cookies.remove("token")
    }

    async loginUser(data: LoginDto): Promise<LoginResponse> {
        const response = await axios.post(Enviroment.API_URL + "auth", data)
        if (!response.status.toString().startsWith("2")) {
            this.toast.info("Ocorreu um erro durante o cadastro!")
        }
        this.cookies.set("token", response.data.token)
        return response.data
    }
}

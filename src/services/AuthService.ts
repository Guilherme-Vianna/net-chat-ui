import Enviroment from "../enviroment";
import axios from "axios";
import { useCookies } from "@vueuse/integrations/useCookies";

export class AuthService {
    cookies: any


    constructor() {
        this.cookies
            = useCookies
                (['locale'])
    }

    async VerifyAuth(): Promise<boolean> {
        const tokenCookie = this.cookies.get("token")
        console.log(tokenCookie)
        // if (tokenCookie == null) return false;
        const response = await axios.get(Enviroment.API_URL + 'auth', {
            headers: {
                Authorization: `Bearer ${tokenCookie}`
            }
        })
        if (response.status == 401) {
            return false
        }
        return true;
    }
}       
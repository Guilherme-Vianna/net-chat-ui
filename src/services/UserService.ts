import Enviroment from "@/enviroment"
import UserDto from "@/types/UserDto"
import UserViewModel from "@/types/UserViewModel"
import axios from "axios"

export default class UserService {
    async createUser(data: UserDto): Promise<UserViewModel> {
        const response = await axios.post(Enviroment.API_URL + "users", data)
        return response.data
    }
}

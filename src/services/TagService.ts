import MostRecentTagResponse from "@/types/MostRecentTagResponse";
import Enviroment from "../enviroment";
import axios from "axios";

export class TagService {
    async loadAllTags(): Promise<MostRecentTagResponse> {
        const response = await axios.get(Enviroment.API_URL + 'tags/most-recent')
        return new MostRecentTagResponse(response.data.data)
    }
}       
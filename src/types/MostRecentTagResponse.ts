import { TagViewModel } from "./TagViewModel";

export default class MostRecentTagResponse {
    constructor(data: TagViewModel[]) {
        this.tags = data;
    }
    tags: TagViewModel[];
}
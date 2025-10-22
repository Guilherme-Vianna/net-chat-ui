export default class FindChatResponse {
  constructor(username: string, tags: string[], user_createdat: Date) {
    this.username = username
    this.tags = tags
    this.user_createdat = user_createdat
  }

  username: string
  tags: string[]
  user_createdat: Date
}

export default class UpdateUserDto {
  constructor(email: string, name: string, tags: string[]) {
    this.email = email
    this.name = name
    this.tags = tags
  }

  email: string;
  name: string;
  tags: string[];
}

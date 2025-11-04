export default class FriendInformation {
    constructor(last_message: string, friend_id: string, last_message_date: Date, friend_name: string) {
        this.last_message = last_message;
        this.friend_id = friend_id;
        this.last_message_date = last_message_date;
        this.friend_name = friend_name;
    }

    last_message: string;
    friend_id: string;
    friend_name: string;
    last_message_date: Date;
}
import {CreateChatRequest, DeleteChatRequest, UsersRequest} from "../api/types";
import {ChatApi} from "../api/chatApi";
import store from "../utils/store";

class ChatController {
    private readonly api: ChatApi;

    constructor() {
        this.api = new ChatApi();
    }

    async getChats() {
        try {
            const chats = await this.api.getChats();
            store.set('chats', chats);
        } catch (e) {
            console.error(e);
        }
    }

    async createChat(data: CreateChatRequest) {
        try {
            await this.api.createChat(data);
            await this.getChats();
        } catch (e) {
            console.error(e);
        }
    }

    async deleteChat(data: DeleteChatRequest) {
        try {
            await this.api.deleteChat(data);
        } catch (e) {
            console.error(e);
        }
    }

    async getCommonChat(id: number) {
        try {
            await this.api.getCommonChat(id);
        } catch (e) {
            console.error(e);
        }
    }

    async getChatUsers(id: number) {
        try {
            await this.api.getChatUsers(id);
        } catch (e) {
            console.error(e);
        }
    }

    async addUsers(data: UsersRequest) {
        try {
            await this.api.addUsers(data);
        } catch (e) {
            console.error(e);
        }
    }

    async getToken(id: number) {
        try {
            await this.api.getToken(id);
        } catch (e) {
            console.error(e);
        }
    }
}

export default new ChatController();

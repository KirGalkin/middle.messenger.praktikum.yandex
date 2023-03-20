import {BaseApi} from "./baseApi";
import {
    ChatData,
    CreateChatRequest,
    DeleteChatRequest,
    DeleteChatResponse,
    TokenResponse,
    User,
    UsersRequest
} from "./types";

export class ChatApi extends BaseApi {
    constructor() {
        super('/chats');
    }

    getChats(): Promise<ChatData[]> {
        return this.http.get<ChatData[]>('/', {});
    }

    createChat(data: CreateChatRequest): Promise<void> {
        return this.http.post('/', {data});
    }

    deleteChat(data: DeleteChatRequest): Promise<DeleteChatResponse> {
        return this.http.delete<DeleteChatResponse>('/', {data});
    }

    getCommonChat(id: number): Promise<ChatData[]> {
        return this.http.get<ChatData[]>(`/${id}/common`, {});
    }

    getChatUsers(id: number): Promise<User[]> {
        return this.http.get<User[]>(`/${id}/users`, {});
    }

    addUsers(data: UsersRequest): Promise<void> {
        return this.http.put('/users', {data});
    }

    getToken(id: number): Promise<TokenResponse> {
        return this.http.post<TokenResponse>(`/token/${id}`, {});
    }
}

export interface ProfileDataRequest {
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    email: string,
    phone: string
}

export interface User {
    id: number,
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    email: string,
    phone: string,
    avatar: string
}

export interface ApiError {
   reason: string
}

export interface SignInRequest {
    login: string,
    password: string
}

export interface SignUpRequest {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    password: string,
    phone: string
}

export interface PasswordRequest {
    oldPassword: string,
    newPassword: string
}

export interface UserByLoginRequest {
    login: string
}

export type ChatUser = Omit<User, 'id' | 'display_name'>

export interface ChatData {
    id: number,
    title: string,
    avatar: string,
    unread_count: number,
    last_message: {
        user: ChatUser,
        time: string,
        content: string
    }
}

export interface CreateChatRequest {
    title: string
}

export interface DeleteChatRequest {
    chatId: number
}

export interface DeleteChatResponse {
    userId: number,
    result: {
        id: number,
        title: string,
        avatar: string
    }
}

export interface UsersRequest {
    users: number[],
    chatId: number
}

export interface TokenResponse {
    token: string
}

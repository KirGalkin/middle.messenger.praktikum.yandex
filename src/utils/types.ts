import {Block} from "./block";

export type PlainObject<T = unknown> = {
    [k in string]: T;
}

export type Indexed<T = any> = {
    [key in string]: T;
}

export interface BlockConstructable<P extends Record<string, any> = any> {
    new(props: P): Block<P>;
}

export enum ROUTES {
    Index = '/',
    SignUp = '/signup',
    SignIn = '/signin',
    Chats = '/chats',
    Profile = '/profile',
    ProfileUpdate = '/profile-update',
    PasswordUpdate = '/password-update',
    AddNewChat = '/add-new-chat',
    AddUserToChat = '/add-user',
    RemoveUserToChat = '/remove-user'
}

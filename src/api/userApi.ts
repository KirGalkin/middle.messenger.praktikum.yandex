import {BaseApi} from "./baseApi";
import {PasswordRequest, ProfileDataRequest, User, UserByLoginRequest} from "./types";

export class UserApi extends BaseApi {
    constructor() {
        super('/user');
    }

    updateProfile(data: ProfileDataRequest) {
        return this.http.put<User>('/profile', {data})
    }

    updateAvatar(data: FormData) {
        return this.http.put<User>('/profile/avatar', {data})
    }

    updatePassword(data: PasswordRequest) {
        return this.http.put('/password', {data})
    }

    getUserById(id: number) {
        return this.http.get<User | undefined>(`/${id}`, {})
    }

    findUserByLogin(data: UserByLoginRequest) {
        return this.http.post<User | undefined>('/search', {data})
    }
}

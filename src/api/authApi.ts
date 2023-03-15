import {BaseApi} from "./baseApi";
import {SignInRequest, SignUpRequest, User} from "./types";

export class AuthApi extends BaseApi{
    constructor() {
        super('/auth');
    }

    signIn(data: SignInRequest) {
        return this.http.post('/signin', {data})
    }

    signUp(data: SignUpRequest) {
        return this.http.post('/signup', {data});
    }

    logout() {
        return this.http.post('/logout', {})
    }

    getUser() {
        return this.http.get<User>('/user', {});
    }
}

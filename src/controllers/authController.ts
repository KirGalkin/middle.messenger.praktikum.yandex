import store from "../utils/store";
import {AuthApi} from "../api/authApi";
import {SignInRequest, SignUpRequest} from "../api/types";

class AuthController {

    private readonly api: AuthApi;

    constructor() {
        this.api = new AuthApi();
    }

    async signIn(data: SignInRequest): Promise<void> {
        try {
            await this.api.signIn(data);
            await this.getUser();
        } catch (e) {
            console.error(e)
        }
    }

    async signUp(data: SignUpRequest): Promise<void> {
        try {
            await this.api.signUp(data);
            await this.getUser();
        } catch (e) {
            console.error(e)
        }
    }

    async logout(): Promise<void> {
        try {
            await this.api.logout();
            store.set('user', undefined);
        } catch (e) {
            console.error(e)
        }
    }

    async getUser(): Promise<void> {
        try {
            const user = await this.api.getUser();
            console.log('USER', user)
            store.set('user', user)
        } catch (e) {
            console.error(e)
        }
    }

}

export default new AuthController();

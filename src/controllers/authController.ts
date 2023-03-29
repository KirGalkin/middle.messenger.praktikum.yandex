import store from "../utils/store";
import {AuthApi} from "../api/authApi";
import {SignInRequest, SignUpRequest} from "../api/types";
import router from "../utils/router";
import {ROUTES} from "../utils/types";

class AuthController {

    private readonly api: AuthApi;

    constructor() {
        this.api = new AuthApi();
    }

    async signIn(data: SignInRequest): Promise<void> {
        try {
            await this.api.signIn(data);
            await this.getUser();

            router.go(ROUTES.Chats)
        } catch (e) {
            console.error(e)
        }
    }

    async signUp(data: SignUpRequest): Promise<void> {
        try {
            await this.api.signUp(data);

            await this.getUser();

            router.go(ROUTES.Chats);
        } catch (e) {
            console.error(e)
        }
    }

    async logout(): Promise<void> {
        try {
            await this.api.logout();
            store.set('user', undefined);
            router.go(ROUTES.Index)
        } catch (e) {
            console.error(e)
        }
    }

    async getUser(): Promise<void> {
        const response = await this.api.getUser();

        store.set('user', response)
    }
}

export default new AuthController();

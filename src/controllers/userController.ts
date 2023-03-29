import {UserApi} from "../api/userApi";
import {PasswordRequest, ProfileDataRequest, UserByLoginRequest} from "../api/types";
import store from "../utils/store";
import router from "../utils/router";
import {ROUTES} from "../utils/types";

class UserController {

    private readonly api: UserApi;

    constructor() {
        this.api = new UserApi();
    }

    async updateProfile(data: ProfileDataRequest) {
        try {
            const user = await this.api.updateProfile(data);
            store.set('user', user);
            router.go(ROUTES.Profile)
        } catch (e) {
            console.error(e)
        }
    }

    async updateAvatar(data: FormData) {
        try {
            const user = await this.api.updateAvatar(data);
            store.set('user', user);
            router.go(ROUTES.Profile)
        } catch (e) {
            console.error(e)
        }
    }

    async updatePassword(data: PasswordRequest) {
        try {
            await this.api.updatePassword(data);

            router.go(ROUTES.Profile);
        } catch (e) {
            console.error(e)
        }
    }

    async getUserById(id: number) {
        try {
            await this.api.getUserById(id);
        } catch (e) {
            console.error(e)
        }
    }

    async findUserByLogin(data: UserByLoginRequest) {
        try {
            return await this.api.findUserByLogin(data);
        } catch (e) {
            console.error(e)
        }
    }
}

export default new UserController();

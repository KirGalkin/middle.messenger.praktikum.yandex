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
            // console.log('upda')
            // await this.api.updateAvatar(data);
            //TODO FIX
            fetch(`https://ya-praktikum.tech/api/v2/user/profile/avatar`, {
                method: 'PUT',
                credentials: 'include', // Нам нужно подставлять cookies
                mode: 'cors', // Работаем с CORS
                body: data,
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    store.set('user', data);
                    return data;
                });
        } catch (e) {
            console.error(e)
        }
    }

    async updatePassword(data: PasswordRequest) {
        try {
            await this.api.updatePassword(data);
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

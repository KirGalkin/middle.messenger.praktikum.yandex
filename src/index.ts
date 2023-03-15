import Router from "./utils/router";
import {SignInPage} from "./pages/signIn";
import {SignUpPage} from "./pages/signUp";
import {ChatPage} from "./pages/chat";
import {ProfilePage} from "./pages/profile";
import {ProfileUpdatePage} from "./pages/profile-update";
import {PasswordUpdatePage} from "./pages/password-update";

enum ROUTES {
    Index = '/',
    SignUp = '/signup',
    SignIn = '/signin',
    Chats = '/chats',
    Profile = '/profile',
    ProfileUpdate = '/profile-update',
    PasswordUpdate = '/password-update',

}
window.addEventListener('DOMContentLoaded', () => {

    Router
        .use(ROUTES.SignUp, SignUpPage)
        .use(ROUTES.SignIn, SignInPage)
        .use(ROUTES.Chats, ChatPage)
        .use(ROUTES.Profile, ProfilePage)
        .use(ROUTES.PasswordUpdate, PasswordUpdatePage)
        .use(ROUTES.ProfileUpdate, ProfileUpdatePage)

    Router.start();

    // Router.go(ROUTES.SignIn);
})



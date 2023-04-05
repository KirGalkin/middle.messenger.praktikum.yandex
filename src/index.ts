import Router from "./utils/router";
import {SignInPage} from "./pages/signIn";
import {SignUpPage} from "./pages/signUp";
import {ChatPage} from "./pages/chat";
import {ProfilePage} from "./pages/profile";
import {ProfileUpdatePage} from "./pages/profile-update";
import {PasswordUpdatePage} from "./pages/password-update";
import {ROUTES} from "./utils/types";
import AuthController from "./controllers/authController";
import {AddNewUserToChatPage} from "./pages/add-new-user-to-chat";
import {DeleteUserFromChatPage} from "./pages/delete-user-from-chat";
import AddNewChat from "./pages/add-new-chat";
import './index.pcss'


window.addEventListener('DOMContentLoaded', async () => {

    Router
        .use(ROUTES.Index, SignInPage)
        .use(ROUTES.SignUp, SignUpPage)
        .use(ROUTES.Chats, ChatPage)
        .use(ROUTES.Profile, ProfilePage)
        .use(ROUTES.PasswordUpdate, PasswordUpdatePage)
        .use(ROUTES.ProfileUpdate, ProfileUpdatePage)
        .use(ROUTES.AddNewChat, AddNewChat)
        .use(ROUTES.AddUserToChat, AddNewUserToChatPage)
        .use(ROUTES.RemoveUserToChat, DeleteUserFromChatPage)

    let isProtectedRoute = true;

    switch (window.location.pathname) {
        case ROUTES.Index:
        case ROUTES.SignUp:
            isProtectedRoute = false;
            break;
    }

    try {
        await AuthController.getUser();

        Router.start();

        if (!isProtectedRoute) {
            Router.go(ROUTES.Chats)
        }
    } catch (e) {
        Router.start();

        if (isProtectedRoute) {
            Router.go(ROUTES.Index);
        }
    }
})



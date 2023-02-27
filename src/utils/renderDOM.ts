import {NavigationPage} from "../pages/navigation";
import {NotFoundErrorPage} from "../pages/404";
import {ServerErrorPage} from "../pages/500";
import {ChatPage} from "../pages/chat";
import {PasswordUpdatePage} from "../pages/password-update";
import {ProfilePage} from "../pages/profile";
import {ProfileUpdatePage} from "../pages/profile-update";
import {SignInPage} from "../pages/signIn";
import {SignUpPage} from "../pages/signUp";

const ROUTES: {[key: string]: any} = {
    'nav': NavigationPage,
    '404': NotFoundErrorPage,
    '500': ServerErrorPage,
    'chat': ChatPage,
    'passwordUpdate': PasswordUpdatePage,
    'profile': ProfilePage,
    'profileUpdate': ProfileUpdatePage,
    'signIn': SignInPage,
    'signUp': SignUpPage,
};

export function renderDOM(route: keyof typeof ROUTES, query: string = '#root' ): void {
    const root = document.querySelector(query);
    if (!root) {
        throw new Error(`Root element with query ${query} not found`);
    }

    root.innerHTML = '';

    const pageComponent = ROUTES[route];
    const page = new pageComponent({});

    root.appendChild(page.element);
    page.dispatchComponentDidMount();
}

import index from '../index.hbs';
import page404 from '../src/pages/404/404.hbs';
import page500 from '../src/pages/500/500.hbs';
import chat from '../src/pages/chat/chat.hbs';
import passwordUpdate from '../src/pages/password-update/password-update.hbs';
import profile from '../src/pages/profile/profile.hbs';
import profileUpdate from '../src/pages/profile-update/profile-update.hbs';
import signIn from '../src/pages/signIn/signIn.hbs';
import signUp from '../src/pages/signUp/signUp.hbs';

// import {HomePage} from "./pages/home";
// import {NotFoundErrorPage} from "./pages/404";
import {ServerErrorPage} from "./pages/500";
import {renderDOM} from "./utils/renderDOM";
import {NotFoundErrorPage} from "./pages/404";
import {HomePage} from "./pages/home";
import {SignInPage} from "./pages/signIn";
import {PasswordUpdate} from "./pages/password-update";
import {Profile, ProfilePage} from "./pages/profile";
import {ProfileUpdatePage} from "./pages/profile-update";
import {SignUpPage} from "./pages/signUp";
import {ChatPage} from "./pages/chat";

const ROUTES: {[key: string]: any} = {
    'nav': index,
    '404': page404,
    '500': page500,
    'chat': chat,
    'passwordUpdate': passwordUpdate,
    'profile': profile,
    'profileUpdate': profileUpdate,
    'signIn': signIn,
    'signUp': signUp,
};

window.goToPage = function (page: string): void {
    render(ROUTES[page]);
}

function render(html: () => string): void {
    const root = document.querySelector('#root');
    if (root) {
        root.innerHTML = html();
    }
}

window.addEventListener('DOMContentLoaded', () => {
    // window.goToPage('signUp');
    // const homePage = new HomePage({ title: 'Home p21312age' });
    // const notFoundErrorPage = new NotFoundErrorPage({});
    const page = new ChatPage({});

    renderDOM('#root', page);
    // root.appendChild(serverErrorPage.element!);

    // serverErrorPage.dispatchComponentDidMount();
})



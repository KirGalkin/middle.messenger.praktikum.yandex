import index from '../index.hbs';
import page404 from '../src/pages/404/404.hbs';
import page500 from '../src/pages/500/500.hbs';
import chat from '../src/pages/chat/chat.hbs';
import passwordUpdate from '../src/pages/password-update/password-update.hbs';
import profile from '../src/pages/profile/profile.hbs';
import profileUpdate from '../src/pages/profile-update/profile-update.hbs';
import signIn from '../src/pages/signIn/signIn.hbs';
import signUp from '../src/pages/signUp/signUp.hbs';

import link from '../src/partials/link/link.hbs';
import button from '../src/partials/button/button.hbs';
import errorMessage from '../src/partials/errorMessage/errorMessage.hbs';
import input from '../src/partials/input/input.hbs';
import line from '../src/partials/line/line.hbs';
import readonlyField from '../src/partials/readonlyField/readonlyField.hbs';
import updateField from '../src/partials/updateField/updateField.hbs';

// @ts-ignore
import Handlebars from 'handlebars/dist/handlebars.runtime';

Handlebars.registerPartial('link', link);
Handlebars.registerPartial('button', button);
Handlebars.registerPartial('errorMessage', errorMessage);
Handlebars.registerPartial('input', input);
Handlebars.registerPartial('line', line);
Handlebars.registerPartial('readonlyField', readonlyField);
Handlebars.registerPartial('updateField', updateField);

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
    if(root) {
        root.innerHTML = html();
    }
}

window.addEventListener('DOMContentLoaded', () => {
    window.goToPage('chat');
})



import {Block} from "../../utils/block";
import template from './navigation.hbs';
import {NavigationLink} from "../../components/navigationLink";
import {renderDOM} from "../../utils/renderDOM";

export class NavigationPage extends Block {
    constructor(props: {}) {
        super('nav', props);
    }

    protected init() {
        this.children.navigationLink404 = new NavigationLink({
            label: '404',
            events: {
                click: () => renderDOM('404'),
            },
        });

        this.children.navigationLink500 = new NavigationLink({
            label: '500',
            events: {
                click: () => renderDOM('500'),
            },
        });

        this.children.navigationLinkChat = new NavigationLink({
            label: 'Chat',
            events: {
                click: () => renderDOM('chat'),
            },
        });

        this.children.navigationLinkPassUpd = new NavigationLink({
            label: 'Password Update',
            events: {
                click: () => renderDOM('passwordUpdate'),
            },
        });

        this.children.navigationLinkProfile = new NavigationLink({
            label: 'Profile',
            events: {
                click: () => renderDOM('profile'),
            },
        });

        this.children.navigationLinkProfUpd = new NavigationLink({
            label: 'Profile Update',
            events: {
                click: () => renderDOM('profileUpdate'),
            },
        });

        this.children.navigationLinkSignIn = new NavigationLink({
            label: 'Sign In',
            events: {
                click: () => renderDOM('signIn'),
            },
        });

        this.children.navigationLinkSignUp = new NavigationLink({
            label: 'Sign Up',
            events: {
                click: () => renderDOM('signUp'),
            },
        });
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

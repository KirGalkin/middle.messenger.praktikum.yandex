import {Block} from "../../utils/block";
import template from './signIn.hbs';
import {Button} from "../../components/button";
import {Input} from "../../components/input";

export class SignInPage extends Block {
    constructor(props: {}) {
        super('main', props);
    }

    protected init() {
        this.element?.classList.add('signin-container');

        this.children.button = new Button({
            label: 'Sign in',
            events: {
                click: function () {
                }
            }
        });
        this.children.inputLogin = new Input({
            id: 'login',
            label: 'Login:',
            type: 'text'
        });
        this.children.inputPass = new Input({
            id: 'password',
            label: 'Password:',
            type: 'password'
        });
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

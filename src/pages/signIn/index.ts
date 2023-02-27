import {Block} from "../../utils/block";
import template from './signIn.hbs';
import {Button} from "../../components/button";
import {InputField} from "../../components/inputField";

export class SignInPage extends Block {
    constructor(props: {}) {
        super('main', props);
    }

    protected init() {
        this.element?.classList.add('signin-container');

        this.children.inputLogin = new InputField({
            htmlId: 'login',
            label: 'Login:',
            type: 'text'
        });
        this.children.inputPass = new InputField({
            htmlId: 'password',
            label: 'Password:',
            type: 'password'
        });

        this.children.button = new Button({
            label: 'Sign in',
            events: {
                click: (event) => {
                    event.preventDefault();
                    console.log((this.children.inputLogin as InputField).value);
                }
            }
        });
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

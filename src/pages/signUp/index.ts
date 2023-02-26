import {Block} from "../../utils/block";
import template from './signUp.hbs';
import {Button} from "../../components/button";
import {Input} from "../../components/input";

export class SignUpPage extends Block {
    constructor(props: {}) {
        super('main', props);
    }

    protected init() {
        this.element?.classList.add('signup-container');

        this.children.button = new Button({
            events: {
                click: function () {
                }
            },
            label: 'Sign up'
        });

        this.children.inputEmail = new Input({
            id: 'email',
            label: 'Email:',
            type: 'email'
        });

        this.children.inputLogin = new Input({
            id: 'login',
            label: 'Login:',
            type: 'text'
        });

        this.children.inputFirstName = new Input({
            id: 'first_name',
            label: 'First name:',
            type: 'text'
        })

        this.children.inputLastName = new Input({
            id: 'second_name',
            label: 'Last name:',
            type: 'text'
        })

        this.children.inputPhone = new Input({
            id: 'phone',
            label: 'Phone:',
            type: 'tel'
        })

        this.children.inputPassword = new Input({
            id: 'password',
            label: 'Password:',
            type: 'password'
        })

        this.children.inputPasswordRepeat = new Input({
            id: 'second_password',
            label: 'Password (one more time):',
            type: 'password'
        })
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

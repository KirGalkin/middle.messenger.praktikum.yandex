import {Block} from "../../utils/block";
import template from './signUp.hbs';
import {Button} from "../../components/button";
import {InputField} from "../../components/inputField";

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

        this.children.inputEmail = new InputField({
            htmlId: 'email',
            label: 'Email:',
            type: 'email'
        });

        this.children.inputLogin = new InputField({
            htmlId: 'login',
            label: 'Login:',
            type: 'text'
        });

        this.children.inputFirstName = new InputField({
            htmlId: 'first_name',
            label: 'First name:',
            type: 'text'
        })

        this.children.inputLastName = new InputField({
            htmlId: 'second_name',
            label: 'Last name:',
            type: 'text'
        })

        this.children.inputPhone = new InputField({
            htmlId: 'phone',
            label: 'Phone:',
            type: 'tel'
        })

        this.children.inputPassword = new InputField({
            htmlId: 'password',
            label: 'Password:',
            type: 'password'
        })

        this.children.inputPasswordRepeat = new InputField({
            htmlId: 'second_password',
            label: 'Password (one more time):',
            type: 'password'
        })
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

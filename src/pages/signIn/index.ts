import {Block} from "../../utils/block";
import template from './signIn.hbs';
import {Button} from "../../components/button";
import {InputField} from "../../components/inputField";
import {ValidationService} from "../../utils/validationService";

export class SignInPage extends Block {
    constructor(props: unknown) {
        super('main', props);
    }

    protected init() {
        this.element?.classList.add('signin-container');

        this.children.inputLogin = new InputField({
            htmlId: 'login',
            label: 'Login:',
            type: 'text',
            validationFn: ValidationService.validateLogin
        });
        this.children.inputPass = new InputField({
            htmlId: 'password',
            label: 'Password:',
            type: 'password',
            validationFn: ValidationService.validatePassword
        });

        this.children.button = new Button({
            label: 'Sign in',
            events: {
                click: (event: any) => {
                    event.preventDefault();
                    const login = (this.children.inputLogin as InputField).value;
                    const password = (this.children.inputPass as InputField).value;
                    console.log(
                        `Login: ${login}, 
                            ${ValidationService.validateLogin(login || '') || 'is valid'}\n`,
                        `Password: ${password}, 
                            ${ValidationService.validatePassword(password || '') || 'is valid'}\n`);
                }
            }
        });
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

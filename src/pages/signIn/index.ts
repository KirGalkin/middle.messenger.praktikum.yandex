import {Block} from "../../utils/block";
import template from './signIn.hbs';
import {Button} from "../../components/button";
import {InputField} from "../../components/inputField";
import {ValidationService} from "../../utils/validationService";
import AuthController from "../../controllers/authController";
import {Link} from "../../components/link";
import router from "../../utils/router";
import {ROUTES} from "../../utils/types";
import {withStore} from "../../utils/store";

class SignInPageBase extends Block {
    constructor(props: unknown) {
        super('div', props);
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
                click: (event: any) => this.onSubmit(event)
            }
        });

        this.children.link = new Link({
            label: 'Sign Up',
            to: ROUTES.SignUp,
        })
    }

    onSubmit(event: any): void {
        event.preventDefault();
        const login = (this.children.inputLogin as InputField).value;
        const password = (this.children.inputPass as InputField).value;
        console.log(
            `Login: ${login}, 
                            ${ValidationService.validateLogin(login || '') || 'is valid'}\n`,
            `Password: ${password}, 
                            ${ValidationService.validatePassword(password || '') || 'is valid'}\n`);

        if (!login || !password) {
            console.error('Login or password is empty');
            return;
        }
        AuthController.signIn({login, password})
    }

    logout(event: any) {
        event.preventDefault();

        AuthController.logout();
        router.go(ROUTES.SignIn)
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export const SignInPage = withStore((state) => {
    return state.user;
})(SignInPageBase)

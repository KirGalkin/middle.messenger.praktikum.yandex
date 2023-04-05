import {Block} from "../../utils/block";
import template from './signUp.hbs';
import {Button} from "../../components/button";
import {InputField} from "../../components/inputField";
import {ValidationService} from "../../utils/validationService";
import AuthController from "../../controllers/authController";
import {Link} from "../../components/link";
import {withStore} from "../../utils/store";

class SignUpPageBase extends Block {
    constructor(props: unknown) {
        super('div', props);
    }

    protected init() {
        this.getContent()?.classList.add('signup-container');

        this.children.button = new Button({
            events: {
                click: (event: Event) => this.onSubmit(event)
            },
            label: 'Sign up'
        });

        this.children.inputEmail = new InputField({
            htmlId: 'email',
            label: 'Email:',
            type: 'email',
            validationFn: ValidationService.validateEmail
        });

        this.children.inputLogin = new InputField({
            htmlId: 'login',
            label: 'Login:',
            type: 'text',
            validationFn: ValidationService.validateLogin
        });

        this.children.inputFirstName = new InputField({
            htmlId: 'first_name',
            label: 'First name:',
            type: 'text',
            validationFn: ValidationService.validateName
        })

        this.children.inputLastName = new InputField({
            htmlId: 'second_name',
            label: 'Last name:',
            type: 'text',
            validationFn: ValidationService.validateName
        })

        this.children.inputPhone = new InputField({
            htmlId: 'phone',
            label: 'Phone:',
            type: 'tel',
            validationFn: ValidationService.validatePhone
        })

        this.children.inputPassword = new InputField({
            htmlId: 'password',
            label: 'Password:',
            type: 'password',
            validationFn: ValidationService.validatePassword
        })

        this.children.inputPasswordRepeat = new InputField({
            htmlId: 'second_password',
            label: 'Password (one more time):',
            type: 'password',
            validationFn: ValidationService.validatePassword
        })

        this.children.link = new Link({
           label: 'Sign In',
           to: '/signin'
        });
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }

    private onSubmit(event: Event) {
        event.preventDefault();
        const email = (this.children.inputEmail as InputField)?.value;
        const login = (this.children.inputLogin as InputField)?.value;
        const firstName = (this.children.inputFirstName as InputField)?.value;
        const lastName = (this.children.inputLastName as InputField)?.value;
        const phone = (this.children.inputPhone as InputField)?.value;
        const password = (this.children.inputPassword as InputField)?.value;
        const passwordRepeat = (this.children.inputPasswordRepeat as InputField)?.value;
        console.log(
            `Email: ${email}, 
                            ${ValidationService.validateEmail(email || '')
            || 'is valid'}\n`,
            `Login: ${login}, 
                            ${ValidationService.validateLogin(login || '')
            || 'is valid'}\n`,
            `FirstName: ${firstName}, 
                            ${ValidationService.validateName(firstName || '')
            || 'is valid'}\n`,
            `LastName: ${lastName}, 
                            ${ValidationService.validateName(lastName || '')
            || 'is valid'}\n`,
            `Phone: ${phone}, 
                            ${ValidationService.validatePhone(phone || '')
            || 'is valid'}\n`,
            `Password: ${password}, 
                            ${ValidationService.validatePassword(password || '')
            || 'is valid'}\n`,
            `PasswordRepeat: ${passwordRepeat}, 
                            ${ValidationService.validatePassword(passwordRepeat || '')
            || 'is valid'}\n`,
        );

        AuthController.signUp({
            email: email!,
            first_name: firstName!,
            login: login!,
            password: password!,
            phone: phone!,
            second_name: lastName!
        })
    }
}

export const SignUpPage = withStore((state) => {
    return state.user;
})(SignUpPageBase)

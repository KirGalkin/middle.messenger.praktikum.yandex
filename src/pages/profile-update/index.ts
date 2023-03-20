import {Block} from "../../utils/block";
import template from './profile-update.hbs';
import {Button} from "../../components/button";
import {UpdateField} from "../../components/updateField";
import {ValidationService} from "../../utils/validationService";
import {Avatar} from "../../components/avatar";
import {Img} from "../../components/shared/img";
import arrow from "../../../static/nav_arrow.png";
import router from "../../utils/router";
import UserController from "../../controllers/userController";
import {User} from "../../api/types";
import AuthController from "../../controllers/authController";
import {withStore} from "../../utils/store";

class ProfileUpdatePageBase extends Block {
    constructor(props: unknown) {
        super('div', props);
    }

    protected init() {
        this.element?.classList.add('profile_update-container');

        AuthController.getUser();

        this.children.button = new Button({
            label: 'Update',
            events: {
                click: (event: any) => this.onSubmit(event)
            }
        });

        this.children.updateFieldEmail = new UpdateField({
            htmlId: 'email',
            label: 'Email',
            type: 'email',
            validationFn: ValidationService.validateEmail,
            value: ''
        })

        this.children.updateFieldLogin = new UpdateField({
            htmlId: 'login',
            label: 'Login',
            type: 'text',
            validationFn: ValidationService.validateLogin,
            value: ''

        })

        this.children.updateFieldFirstName = new UpdateField({
            htmlId: 'first_name',
            label: 'First name',
            type: 'text',
            validationFn: ValidationService.validateName,
            value: ''

        })

        this.children.updateFieldLastName = new UpdateField({
            htmlId: 'second_name',
            label: 'Last name',
            type: 'text',
            validationFn: ValidationService.validateName,
            value: ''

        })

        this.children.updateFieldPhone = new UpdateField({
            htmlId: 'phone',
            label: 'Phone',
            type: 'tel',
            validationFn: ValidationService.validatePhone,
            value: ''

        })

        this.children.avatar = new Avatar({
            name: 'Ivan!',
            imageSrc: ''
        })

        this.children.arrowImg = new Img({
            src: arrow,
            alt: 'back',
            className: 'navigation-arrow',
            events: {click: () => router.back()}
        })
    }

    private onSubmit(event: any) {
        event.preventDefault();
        const email = (this.children.updateFieldEmail as UpdateField)?.value;
        const login = (this.children.updateFieldLogin as UpdateField)?.value;
        const firstName = (this.children.updateFieldFirstName as UpdateField)?.value;
        const lastName = (this.children.updateFieldLastName as UpdateField)?.value;
        const phone = (this.children.updateFieldPhone as UpdateField)?.value;

        const emailValidationRes = ValidationService.validateEmail(email || '');
        const loginValidationRes = ValidationService.validateLogin(login || '');
        const firstnameValidationRes =  ValidationService.validateName(firstName || '');
        const lastnameValidationRes =  ValidationService.validateName(firstName || '');
        const phoneValidationRes =  ValidationService.validatePhone(phone || '');

        console.log(
            `Email: ${email}, 
                            ${emailValidationRes || 'is valid'}\n`,
            `Login: ${login}, 
                            ${loginValidationRes || 'is valid'}\n`,
            `FirstName: ${firstName}, 
                            ${firstnameValidationRes || 'is valid'}\n`,
            `LastName: ${lastName}, 
                            ${lastnameValidationRes || 'is valid'}\n`,
            `Phone: ${phone}, 
                            ${phoneValidationRes || 'is valid'}\n`,
        )

        if(emailValidationRes || loginValidationRes || firstnameValidationRes || lastnameValidationRes || phoneValidationRes) {
            console.log('Error profile validations')
            return;
        }

        UserController.updateProfile({
            display_name: login!,
            email: email!,
            first_name: firstName!,
            login: login!,
            phone: phone!,
            second_name: lastName!
        })
    }

    // @ts-ignore
    protected componentDidUpdate(oldProps: unknown, newProps: unknown): boolean {
        (this.children.updateFieldEmail as Block).setProps({value: (newProps as User).email});
        (this.children.updateFieldLogin as Block).setProps({value: (newProps as User).login});
        (this.children.updateFieldFirstName as Block).setProps({value: (newProps as User).first_name});
        (this.children.updateFieldLastName as Block).setProps({value: (newProps as User).second_name});
        (this.children.updateFieldPhone as Block).setProps({value: (newProps as User).phone});
        (this.children.avatar as Block).setProps({name: (newProps as User).login, imageSrc: (newProps as User).avatar});

        return true;
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export const ProfileUpdatePage = withStore((state) => {
    return state.user;
})(ProfileUpdatePageBase)

import {Block} from "../../utils/block";
import template from './profile-update.hbs';
import {Button} from "../../components/button";
import {UpdateField} from "../../components/updateField";
import {ValidationService} from "../../utils/validationService";

export class ProfileUpdatePage extends Block {
    constructor(props: unknown) {
        super('main', props);
    }

    protected init() {
        this.element?.classList.add('profile_update-container');

        this.children.button = new Button({
            label: 'Update',
            events: {
                click: (event) => {
                    event.preventDefault();
                    const email = (this.children.updateFieldEmail as UpdateField)?.value;
                    const login = (this.children.updateFieldLogin as UpdateField)?.value;
                    const firstName = (this.children.updateFieldFirstName as UpdateField)?.value;
                    const lastName = (this.children.updateFieldLastName as UpdateField)?.value;
                    const phone = (this.children.updateFieldPhone as UpdateField)?.value;

                    console.log(
                        `Email: ${email}, 
                            ${ValidationService.validateEmail(email || '') || 'is valid'}\n`,
                        `Login: ${login}, 
                            ${ValidationService.validateLogin(login || '') || 'is valid'}\n`,
                        `FirstName: ${firstName}, 
                            ${ValidationService.validateName(firstName || '') || 'is valid'}\n`,
                        `LastName: ${lastName}, 
                            ${ValidationService.validateName(lastName || '') || 'is valid'}\n`,
                        `Phone: ${phone}, 
                            ${ValidationService.validatePhone(phone || '') || 'is valid'}\n`,
                    )
                }
            }
        });

        this.children.updateFieldEmail = new UpdateField({
            htmlId: 'email',
            label: 'Email',
            type: 'email',
            validationFn: ValidationService.validateEmail
        })

        this.children.updateFieldLogin = new UpdateField({
            htmlId: 'login',
            label: 'Login',
            type: 'text',
            validationFn: ValidationService.validateLogin
        })

        this.children.updateFieldFirstName = new UpdateField({
            htmlId: 'first_name',
            label: 'First name',
            type: 'text',
            validationFn: ValidationService.validateName
        })

        this.children.updateFieldLastName = new UpdateField({
            htmlId: 'second_name',
            label: 'Last name',
            type: 'text',
            validationFn: ValidationService.validateName
        })

        this.children.updateFieldPhone = new UpdateField({
            htmlId: 'phone',
            label: 'Phone',
            type: 'tel',
            validationFn: ValidationService.validatePhone
        })

    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

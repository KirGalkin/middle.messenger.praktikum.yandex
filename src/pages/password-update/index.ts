import {Block} from "../../utils/block";
import template from './password-update.hbs';
import {UpdateField} from "../../components/updateField";
import {Button} from "../../components/button";
import {ValidationService} from "../../utils/validationService";
import {Avatar} from "../../components/avatar";
import {Img} from "../../components/shared/img";
import arrow from "../../../static/nav_arrow.png";
import router from "../../utils/router";
import UserController from "../../controllers/userController";

export class PasswordUpdatePage extends Block {
    constructor(props: unknown) {
        super('div', props);
    }

    protected init() {
        this.element?.classList.add('password_update-container');

        this.children.updateFieldOldPass = new UpdateField({
            htmlId: 'oldPassword',
            label: 'Old password',
            type: 'password',
            validationFn: ValidationService.validatePassword,
            value: ''
        });

        this.children.updateFieldNewPass = new UpdateField({
            htmlId: 'newPassword',
            label: 'New password',
            type: 'password',
            validationFn: ValidationService.validatePassword,
            value: ''
        });

        this.children.button = new Button({
            events: {
                click: (event: Event) => this.onSubmit(event)
            },
            label: 'Update'
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

    private onSubmit(event: Event) {
        event.preventDefault();
        const oldPassword =
            (this.children.updateFieldOldPass as UpdateField)?.value
        const newPassword =
            (this.children.updateFieldNewPass as UpdateField)?.value

        const oldPassValidationRes = ValidationService.validatePassword(oldPassword || '');
        const newPassValidationRes = ValidationService.validatePassword(newPassword || '');

        console.log(
            `Old Password: ${oldPassword}, 
                            ${oldPassValidationRes || 'is valid'}\n`,
            `New Password: ${newPassword}, 
                            ${newPassValidationRes || 'is valid'}\n`,
        )

        if(oldPassValidationRes || newPassValidationRes) {
            console.log('Error profile validations')
            return;
        }

        UserController.updatePassword({
            newPassword: newPassword!,
            oldPassword: oldPassword!
        })
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

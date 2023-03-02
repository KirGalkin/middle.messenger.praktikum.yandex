import {Block} from "../../utils/block";
import template from './password-update.hbs';
import {UpdateField} from "../../components/updateField";
import {Button} from "../../components/button";
import {ValidationService} from "../../utils/validationService";
import {Avatar} from "../../components/avatar";
import {Img} from "../../components/shared/img";
import arrow from "../../../static/nav_arrow.png";

export class PasswordUpdatePage extends Block {
    constructor(props: unknown) {
        super('main', props);
    }

    protected init() {
        this.element?.classList.add('password_update-container');

        this.children.updateFieldOldPass = new UpdateField({
            htmlId: 'oldPassword',
            label: 'Old password',
            type: 'password',
            validationFn: ValidationService.validatePassword
        });

        this.children.updateFieldNewPass = new UpdateField({
            htmlId: 'newPassword',
            label: 'New password',
            type: 'password',
            validationFn: ValidationService.validatePassword
        });

        this.children.updateFieldNewPassRepeat = new UpdateField({
            htmlId: 'newPasswordRepeat',
            label: 'Repeat new password',
            type: 'password',
            validationFn: ValidationService.validatePassword
        });

        this.children.button = new Button({
            events: {
                click: (event: any) => {
                    event.preventDefault();
                    const oldPassword =
                        (this.children.updateFieldOldPass as UpdateField)?.value
                    const newPassword =
                        (this.children.updateFieldNewPass as UpdateField)?.value
                    const newPasswordRepeat =
                        (this.children.updateFieldNewPassRepeat as UpdateField)?.value

                    console.log(
                        `Old Password: ${oldPassword}, 
                            ${ValidationService.validatePassword(oldPassword || '') 
                            || 'is valid'}\n`,
                        `New Password: ${newPassword}, 
                            ${ValidationService.validatePassword(newPassword || '') 
                            || 'is valid'}\n`,
                        `New Password repeat: ${newPasswordRepeat}, 
                            ${ValidationService.validatePassword(newPasswordRepeat || '') 
                            || 'is valid'}\n`,
                    )
                }
            },
            label: 'Update'
        })

        this.children.avatar = new Avatar({
            name: 'Ivan!'
        })

        this.children.arrowImg = new Img({
            src: arrow,
            alt: 'back',
            className: 'navigation-arrow'
        })
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

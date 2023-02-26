import {Block} from "../../utils/block";
import template from './password-update.hbs';
import {UpdateField} from "../../components/updateField";
import {Button} from "../../components/button";

export class PasswordUpdatePage extends Block {
    constructor(props: {}) {
        super('main', props);
    }

    protected init() {
        this.element?.classList.add('password_update-container');

        this.children.updateFieldOldPass = new UpdateField({
            id: 'oldPassword',
            label: 'Old password',
            type: 'password'
        });

        this.children.updateFieldNewPass = new UpdateField({
            id: 'newPassword',
            label: 'New password',
            type: 'password'
        });

        this.children.updateFieldNewPassRepeat = new UpdateField({
            id: 'newPasswordRepeat',
            label: 'Repeat new password',
            type: 'password'
        });

        this.children.button = new Button({
            events: {
                click: function () {
                }
            },
            label: 'Update'
        })
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

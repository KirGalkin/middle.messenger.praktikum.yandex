import {Block} from "../../utils/block";
import template from './profile-update.hbs';
import {Button} from "../../components/button";
import {UpdateField} from "../../components/updateField";

export class ProfileUpdatePage extends Block {
    constructor(props: {}) {
        super('main', props);
    }

    protected init() {
        this.element?.classList.add('profile_update-container');

        this.children.button = new Button({
            label: 'Update',
            events: {
                click: function () {
                }
            }
        });

        this.children.updateFieldEmail = new UpdateField({
            id: 'email',
            label: 'Email',
            type: 'email'
        })

        this.children.updateFieldLogin = new UpdateField({
            id: 'login',
            label: 'Login',
            type: 'text'
        })

        this.children.updateFieldFirstName = new UpdateField({
            id: 'first_name',
            label: 'First name',
            type: 'text'
        })

        this.children.updateFieldLastName = new UpdateField({
            id: 'second_name',
            label: 'Last name',
            type: 'text'
        })

        this.children.updateFieldPhone = new UpdateField({
            id: 'phone',
            label: 'Phone',
            type: 'tel'
        })

    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

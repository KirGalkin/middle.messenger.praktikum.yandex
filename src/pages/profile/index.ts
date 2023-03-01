import {Block} from "../../utils/block";
import template from './profile.hbs';
import {ReadonlyField} from "../../components/readonlyField";
import {Link} from "../../components/link";

export class ProfilePage extends Block {
    constructor(props: unknown) {
        super('main', props);
    }

    protected init() {
        this.element?.classList.add('profile-container');

        this.children.readonlyFieldEmail = new ReadonlyField({
            label: 'Email',
            value: 'pochta@yandex.ru'
        });

        this.children.readonlyFieldLogin = new ReadonlyField({
            label: 'Login',
            value: 'ivanivanov'
        });

        this.children.readonlyFieldFirstName = new ReadonlyField({
            label: 'First name',
            value: 'Ivan'
        });

        this.children.readonlyFieldLastName = new ReadonlyField({
            label: 'Last name',
            value: 'Ivanov'
        });

        this.children.readonlyFieldPhone = new ReadonlyField({
            label: 'Phone',
            value: '+7 (909) 967 30 30'
        });

        this.children.linkUpdateProfile = new Link({
            label: 'Update profile',
            link: '#',
            style: 'color: #44f0f8'
        })

        this.children.linkUpdatePassword = new Link({
            label: 'Update password',
            link: '#',
            style: 'color: #44f0f8'
        })

        this.children.linkExit = new Link({
            label: 'Exit',
            link: '#',
            style: 'color: #FE5B4A'
        })
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

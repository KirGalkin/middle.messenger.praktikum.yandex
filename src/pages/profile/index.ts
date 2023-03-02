import {Block} from "../../utils/block";
import template from './profile.hbs';
import {ReadonlyField} from "../../components/readonlyField";
import {Link} from "../../components/link";
import {Avatar} from "../../components/avatar";
import {Img} from "../../components/shared/img";
import arrow from '../../../static/nav_arrow.png';

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
            style: 'color: var(--primary-color)'
        })

        this.children.linkUpdatePassword = new Link({
            label: 'Update password',
            link: '#',
            style: 'color: var(--primary-color)'
        })

        this.children.linkExit = new Link({
            label: 'Exit',
            link: '#',
            style: 'color: var(--warning-color)'
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

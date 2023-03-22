import {Block} from "../../utils/block";
import template from './profile.hbs';
import {ReadonlyField} from "../../components/readonlyField";
import {Link} from "../../components/link";
import {Avatar} from "../../components/avatar";
import {Img} from "../../components/shared/img";
import arrow from '../../../static/nav_arrow.png';
import {ROUTES} from "../../utils/types";
import router from "../../utils/router";
import {Button} from "../../components/button";
import AuthController from "../../controllers/authController";
import {withStore} from "../../utils/store";
import {User} from "../../api/types";

class ProfilePageBase extends Block {

    constructor(props: unknown) {
        super('div', props);
    }

    protected init() {
        this.element?.classList.add('profile-container');

        AuthController.getUser();

        this.children.readonlyFieldEmail = new ReadonlyField({
            label: 'Email',
            value: 'dsa'
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
            style: 'color: var(--primary-color)',
            to: ROUTES.ProfileUpdate
        })

        this.children.linkUpdatePassword = new Link({
            label: 'Update password',
            style: 'color: var(--primary-color)',
            to: ROUTES.PasswordUpdate
        })

        this.children.buttonExit = new Button({
            events: {
                click: () => {
                    AuthController.logout();
                }
            },
            label: 'Logout',
            style: 'align-self: center; margin-top: 16px'

        })

        this.children.avatar = new Avatar({
            name: 'Ivan!',
            imageSrc: ""
        })

        this.children.arrowImg = new Img({
            src: arrow,
            alt: 'back',
            className: 'navigation-arrow',
            events: {click: () => router.back()}
        })
    }

    // @ts-ignore
    protected componentDidUpdate(oldProps: unknown, newProps: unknown): boolean {
        (this.children.readonlyFieldEmail as Block)
            .setProps({value: (newProps as User).email});
        (this.children.readonlyFieldLogin as Block)
            .setProps({value: (newProps as User).login});
        (this.children.readonlyFieldFirstName as Block)
            .setProps({value: (newProps as User).first_name});
        (this.children.readonlyFieldLastName as Block)
            .setProps({value: (newProps as User).second_name});
        (this.children.readonlyFieldPhone as Block)
            .setProps({value: (newProps as User).phone});
        (this.children.avatar as Avatar)
            .setProps({name: (newProps as User).login, imageSrc: (newProps as User).avatar});
        return false;
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export const ProfilePage = withStore((state) => {
    return state.user || {};
})(ProfilePageBase);

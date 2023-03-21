import {Block} from "../../utils/block";
import template from './avatar.hbs';
import imageAva from '../../../static/ava_blank.png';
import {Img} from "../shared/img";
import {Button} from "../button";
import userController from "../../controllers/userController";

interface AvatarProps {
    name: string,
    imageSrc: string,
    editMode?: boolean
}

export class Avatar extends Block<AvatarProps> {

    private url = 'https://ya-praktikum.tech/api/v2/resources'

    constructor(props: AvatarProps) {
        super('div', props);
    }

    protected init() {

        this.element?.classList.add('avatar')

        this.children.image = new Img({
            src: this.props.imageSrc ? `${this.url}${this.props.imageSrc}` : imageAva,
            alt: 'avatar',
            className: 'avatar-img'
        })

        this.children.button = new Button({
            events: {
                click: (event) => this.onSubmit(event)
            },
            label: "Update avatar"
        })
    }

    // @ts-ignore
    protected componentDidUpdate(oldProps: AvatarProps, newProps: AvatarProps): boolean {

        console.log('U{DATE', newProps.imageSrc);

        (this.children.image as Block).setProps({
            src: newProps.imageSrc ? `${this.url}${newProps.imageSrc}` : imageAva,
            alt: 'avatar',
            className: 'avatar-img'
        })

        return true;
    }

    protected async onSubmit(event: any) {
        event.preventDefault();
        const myUserForm = document.getElementById('myUserForm');

        if (myUserForm) {
            const form = new FormData((myUserForm as HTMLFormElement));
            await userController.updateAvatar(form);
        }
    }


    protected render(): DocumentFragment {
        return this.compile(template, this.props)
    }
}

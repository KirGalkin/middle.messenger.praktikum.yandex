import {Block} from "../../utils/block";
import template from './avatar.hbs';
import imageAva from '../../../static/ava_blank.png';
import {Img} from "../shared/img";
import {Button} from "../button";
import userController from "../../controllers/userController";

interface AvatarProps {
    name: string,
    imageSrc: string
}

export class Avatar extends Block<AvatarProps> {


    constructor(props: AvatarProps) {
        super('div', props);
    }

    protected init() {

        this.element?.classList.add('avatar')

        this.children.image = new Img({
            src: this.props.imageSrc ?? imageAva,
            alt: 'avatar',
            className: 'avatar-img'
        })

        this.children.button = new Button({
            events: {
                click: (event) => this.onSubmit(event)
            },
            label: "submit"
        })
    }

    // @ts-ignore
    protected componentDidUpdate(oldProps: unknown, newProps: unknown): boolean {
        // console.log('U{DATE', newProps, this.props);

        (this.children.image as Block).setProps({
            src: (newProps as AvatarProps).imageSrc,
            alt: 'avatar',
            className: 'avatar-img'
        })

        return true;
    }

    protected async onSubmit(event: any) {
        event.preventDefault();
        const myUserForm = document.getElementById('myUserForm');
        console.log('this.myUserForm?', (myUserForm as HTMLFormElement))

        if (myUserForm) {
            const form = new FormData((myUserForm as HTMLFormElement));
            await userController.updateAvatar(form);
        }
        console.log('HUI')
    }


    protected render(): DocumentFragment {
        return this.compile(template, this.props)
    }
}

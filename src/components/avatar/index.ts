import {Block} from "../../utils/block";
import template from './avatar.hbs';
import imageAva from '../../../static/ava_blank.png';
import {Img} from "../shared/img";

interface AvatarProps {
    name: string,
}
export class Avatar extends Block<AvatarProps> {
    constructor(props: AvatarProps) {
        super('div', props);
    }

    protected init() {
        this.element?.classList.add('avatar')

        this.children.image = new Img({
            src: imageAva,
            alt: 'avatar',
            className: 'avatar-img'
        })
    }

    protected render(): DocumentFragment {
        return this.compile(template ,this.props)
    }
}

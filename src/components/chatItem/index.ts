import {Block} from "../../utils/block";
import template from './chatItem.hbs';
import {Img} from "../shared/img";

interface ChatItemProps {
    name: string,
    message: string,
    time: string,
    count: number,
    isActive: boolean,
    imageSrc?: string,
    events?: {
        click: (...args: unknown[]) => void
    };
}
export class ChatItem extends Block<ChatItemProps> {

    constructor(props: ChatItemProps) {
        super('div', props);
    }

    protected init() {
        this.element?.classList.add('chat-list_card');
        if(this.props.isActive) {
            this.element?.classList.add('chat-active');
        }

        this.children.image = new Img({
            src: this.props.imageSrc ? 'https://ya-praktikum.tech/api/v2/resources' + this.props.imageSrc : '',
            alt: 'avatar',
            style: 'width: 47px; height: 47px;'
        })
    }

    // @ts-ignore
    protected componentDidUpdate(oldProps: ChatItemProps, newProps: ChatItemProps): boolean {
        if(newProps.isActive) {
            this.element?.classList.add('chat-active');
        }
        return false;
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

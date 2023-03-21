import {Block} from "../../utils/block";
import template from './chatItem.hbs';

interface ChatItemProps {
    name: string,
    message: string,
    time: string,
    count: number,
    isActive: boolean,
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

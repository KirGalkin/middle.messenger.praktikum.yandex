import {Block} from "../../utils/block";
import template from './chat.hbs';

interface ChatProps {
    name: string,
    message: string,
    time: string,
    count: number
}
export class Chat extends Block {
    constructor(props: ChatProps) {
        super('div', props);
    }

    protected init() {
        this.element?.classList.add('chat-list_card');
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

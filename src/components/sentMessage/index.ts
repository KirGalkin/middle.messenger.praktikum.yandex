import {Block} from "../../utils/block";
import template from './sentMessage.hbs';

interface SentMessageProps {
    message: string
}
export class SentMessage extends Block<SentMessageProps> {
    constructor(props: SentMessageProps) {
        super('div', props);
    }

    protected init() {
        this.element?.classList.add('sent-message');
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props)
    }
}

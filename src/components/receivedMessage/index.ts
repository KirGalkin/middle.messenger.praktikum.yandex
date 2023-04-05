import {Block} from "../../utils/block";
import template from './receivedMessage.hbs';

interface ReceivedMessageProps {
    message: string
}
export class ReceivedMessage extends Block<ReceivedMessageProps> {
    constructor(props: ReceivedMessageProps) {
        super('div', props);
    }

    protected init() {
        this.getContent()?.classList.add('received-message')
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }


}

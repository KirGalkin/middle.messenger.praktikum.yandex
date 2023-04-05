import template from './errorMessage.hbs';
import {Block} from '../../utils/block';

interface ErrorMessageProps {
    code: string,
    message: string,
    link: string
}

export class ErrorMessage extends Block<ErrorMessageProps> {
    constructor(props: ErrorMessageProps) {
        super('div', props);
    }

    protected init() {
        this.getContent()?.classList.add('error-message_container')
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

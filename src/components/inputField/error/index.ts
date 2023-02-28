import {Block} from "../../../utils/block";
import template from './error.hbs';

interface InputErrorProps {
    message?: string
}
export class InputError extends Block {
    constructor(props: InputErrorProps) {
        super('span', props);
    }

    protected init() {
        this.element?.classList.add('error');
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

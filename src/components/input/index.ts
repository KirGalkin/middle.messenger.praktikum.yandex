import {Block} from "../../utils/block";
import template from './input.hbs';

interface InputProps {
    id: string,
    label: string,
    type: string
}
export class Input extends Block {
    constructor(props: InputProps) {
        super('div', props);
    }

    protected init() {
        this.element?.classList.add('input');
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

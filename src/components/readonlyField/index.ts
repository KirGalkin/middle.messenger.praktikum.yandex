import {Block} from "../../utils/block";
import template from './readonlyField.hbs';

interface ReadonlyFieldProps {
    label: string,
    value: string
}
export class ReadonlyField extends Block {
    constructor(props: ReadonlyFieldProps) {
        super('div', props);
    }

    protected init() {
        this.element?.classList.add('readonly-field');
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props)
    }
}

import {Block} from "../../utils/block";
import template from './updateField.hbs';

interface UpdateFieldProps {
    id: string,
    label: string,
    type: string
}
export class UpdateField extends Block {
    constructor(props: UpdateFieldProps) {
        super('div', props);
    }

    protected init() {
        this.element?.classList.add('update-field');
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props)
    }
}
